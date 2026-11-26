#!/usr/bin/env python3
"""tmux-resurrect: restore Claude Code and Codex with their exact session IDs.

resurrect сохраняет в панели команду из ps — для claude это голый `claude`
(а если claude сам процесс панели — вообще его MCP-дети). Хук находит в каждой
панели живой интерактивный claude по ~/.claude/sessions/<pid>.json и переписывает
строку панели в снапшоте: команда `claude --resume <sessionId>`, директория —
cwd сессии (под ней лежит транскрипт, иначе --resume его не найдёт).

Для Codex ID берётся из заголовка панели (tui.terminal_title: thread-id),
а cwd — из локальной базы Codex, открытой только для чтения. Уже открытые
панели без ID сопоставляются по уникальному имени диалога. По cwd или
последней сессии не угадываем: в одной папке могут работать разные диалоги.

Подключение: set -g @resurrect-hook-post-save-layout '<этот файл>'
resurrect вызывает хук с путём к только что записанному снапшоту.
"""
import json
import os
import re
import sqlite3
import subprocess
import sys
from contextlib import closing
from pathlib import Path

SESSIONS_DIR = Path.home() / ".claude" / "sessions"
CODEX_STATE = Path(os.environ.get("CODEX_HOME", str(Path.home() / ".codex"))) / "state_5.sqlite"
LINE_TYPES = ("pane", "window", "state", "grouped_session")
SESSION_ID_RE = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")


def proc_stat(pid):
    """(ppid, starttime) из /proc/<pid>/stat или None, если процесса нет."""
    try:
        raw = Path(f"/proc/{pid}/stat").read_text()
    except OSError:
        return None
    # comm в скобках может содержать пробелы — режем по последней ')'
    fields = raw[raw.rindex(")") + 2:].split()
    return int(fields[1]), fields[19]


def tmux_panes():
    """pane_pid -> (session_name, window_index, pane_index)."""
    out = subprocess.run(
        ["tmux", "list-panes", "-a", "-F",
         "#{pane_pid}\t#{session_name}\t#{window_index}\t#{pane_index}"],
        capture_output=True, text=True, check=True,
    ).stdout
    panes = {}
    for line in out.splitlines():
        pid, session, window, pane = line.split("\t")
        panes[int(pid)] = (session, window, pane)
    return panes


def claude_by_pane(panes):
    """(session, window, pane) -> (sessionId, cwd) для живых интерактивных claude."""
    found = {}
    for f in SESSIONS_DIR.glob("*.json"):
        try:
            data = json.loads(f.read_text())
            pid, sid, cwd = int(data["pid"]), data["sessionId"], data["cwd"]
        except (OSError, ValueError, KeyError, TypeError):
            continue
        if data.get("kind") != "interactive":
            continue
        # sessionId уходит в шелл через send-keys при restore, cwd — в
        # tab-separated снапшот: пропускаем всё, что не UUID / не чистый путь
        if not SESSION_ID_RE.fullmatch(str(sid)):
            continue
        if not str(cwd).startswith("/") or any(c in str(cwd) for c in "\t\n\r\\"):
            continue
        stat = proc_stat(pid)
        # procStart == starttime из /proc/<pid>/stat: защита от переиспользованного pid
        if stat is None or stat[1] != str(data.get("procStart")):
            continue
        # поднимаемся по родителям до процесса панели
        depth, p = 0, pid
        while p > 1:
            if p in panes:
                key = panes[p]
                # при вложенных claude берём ближайший к панели
                if key not in found or depth < found[key][0]:
                    found[key] = (depth, sid, cwd)
                break
            stat = proc_stat(p)
            if stat is None:
                break
            p, depth = stat[0], depth + 1
    return {key: (sid, cwd) for key, (_, sid, cwd) in found.items()}


def codex_by_pane(save_file, state_db=CODEX_STATE):
    """(session, window, pane) -> (thread ID, cwd) from the saved pane titles."""
    try:
        with closing(sqlite3.connect(Path(state_db).absolute().as_uri() + "?mode=ro",
                                     uri=True, timeout=1)) as con:
            sessions = list(con.execute("SELECT id, cwd, COALESCE(name, title) FROM threads"))
    except sqlite3.Error as exc:
        print(f"tmux-resurrect: cannot read Codex sessions: {exc}", file=sys.stderr)
        return {}

    sessions = [
        (sid, cwd, name) for sid, cwd, name in sessions
        if SESSION_ID_RE.fullmatch(str(sid)) and str(cwd).startswith("/")
        and not any(c in str(cwd) for c in "\t\n\r\\")
    ]
    found = {}
    for line in Path(save_file).read_text().splitlines():
        fields = line.split("\t")
        if len(fields) < 11 or fields[0] != "pane" or fields[9] != "codex":
            continue
        title = re.sub(r"^[\u2800-\u28ff]\s+", "", fields[6])
        # Codex truncates EACH title item to 32 chars. Expand the UUID prefix
        # against the DB, accepting it only when exactly one session matches.
        # Keep thread-id first so it survives any further title shortening.
        id_prefix = None
        for token in title.split(" | "):
            token = re.sub(r"^[\u2800-\u28ff]\s+", "", token)
            if SESSION_ID_RE.fullmatch(token):
                id_prefix = token
                break
            short = re.fullmatch(r"([0-9a-f]{8}-[0-9a-f-]{15,26})(?:\.{3}|…)", token)
            if short:
                id_prefix = short[1]
                break
        if id_prefix:
            matches = [(sid, cwd) for sid, cwd, _ in sessions if sid.startswith(id_prefix)]
        else:
            # Compatibility for TUIs started before thread-id was configured.
            matches = [
                (sid, cwd) for sid, cwd, name in sessions
                if name and re.search(r"(?:^| \| )(?:[\u2800-\u28ff]\s+)?"
                                      + re.escape(name) + r"(?: \| |$)", title)
            ]
        if len(matches) == 1:
            found[(fields[1], fields[2], fields[5])] = matches[0]
        else:
            print(f"tmux-resurrect: no unique Codex session for {fields[1]}:{fields[2]}.{fields[5]}",
                  file=sys.stderr)
    return found


def rewrite(save_file, resume, codex_resume=None):
    codex_resume = codex_resume or {}
    lines = Path(save_file).read_text().splitlines(keepends=True)
    result, skip_continuation = [], False
    for line in lines:
        fields = line.rstrip("\n").split("\t")
        if fields[0] not in LINE_TYPES:
            # хвост многострочной full_command (несколько детей у pane_pid)
            if not skip_continuation:
                result.append(line)
            continue
        skip_continuation = False
        if fields[0] == "pane" and len(fields) >= 11:
            key = (fields[1], fields[2], fields[5])
            if key in resume or key in codex_resume:
                if key in codex_resume:
                    sid, cwd = codex_resume[key]
                    command, resume_command = "codex", f"codex resume {sid}"
                else:
                    sid, cwd = resume[key]
                    command, resume_command = "claude", f"claude --resume {sid}"
                fields[7] = ":" + cwd.replace(" ", "\\ ")
                fields[9] = command
                fields[10] = ":" + resume_command
                line = "\t".join(fields) + "\n"
                skip_continuation = True
        result.append(line)
    tmp = f"{save_file}.tmp"
    Path(tmp).write_text("".join(result))
    os.replace(tmp, save_file)


def main():
    save_file = sys.argv[1]
    resume = claude_by_pane(tmux_panes())
    codex_resume = codex_by_pane(save_file)
    if resume or codex_resume:
        rewrite(save_file, resume, codex_resume)


if __name__ == "__main__":
    main()
