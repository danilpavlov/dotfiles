#!/usr/bin/env python3
"""tmux-resurrect post-save-layout hook: claude-панели -> `claude --resume <id>`.

resurrect сохраняет в панели команду из ps — для claude это голый `claude`
(а если claude сам процесс панели — вообще его MCP-дети). Хук находит в каждой
панели живой интерактивный claude по ~/.claude/sessions/<pid>.json и переписывает
строку панели в снапшоте: команда `claude --resume <sessionId>`, директория —
cwd сессии (под ней лежит транскрипт, иначе --resume его не найдёт).

Подключение: set -g @resurrect-hook-post-save-layout '<этот файл>'
resurrect вызывает хук с путём к только что записанному снапшоту.
"""
import json
import os
import re
import subprocess
import sys
from pathlib import Path

SESSIONS_DIR = Path.home() / ".claude" / "sessions"
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


def rewrite(save_file, resume):
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
            if key in resume:
                sid, cwd = resume[key]
                fields[7] = ":" + cwd.replace(" ", "\\ ")
                fields[9] = "claude"
                fields[10] = f":claude --resume {sid}"
                line = "\t".join(fields) + "\n"
                skip_continuation = True
        result.append(line)
    tmp = f"{save_file}.tmp"
    Path(tmp).write_text("".join(result))
    os.replace(tmp, save_file)


def main():
    save_file = sys.argv[1]
    resume = claude_by_pane(tmux_panes())
    if resume:
        rewrite(save_file, resume)


if __name__ == "__main__":
    main()
