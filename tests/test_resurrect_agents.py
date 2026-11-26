"""Regression tests for the tmux-resurrect agent snapshot hook."""
import importlib.util
from pathlib import Path
import sqlite3
import tempfile
import unittest
from contextlib import closing, redirect_stderr
from io import StringIO


spec = importlib.util.spec_from_file_location(
    "hook", Path(__file__).resolve().parents[1] / "dot_config/tmux/scripts/executable_resurrect-claude-hook.py"
)
hook = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hook)

FIRST = "11111111-0000-4000-8000-000000000001"
SECOND = "22222222-0000-4000-8000-000000000001"
CLAUDE = "33333333-0000-4000-8000-000000000001"


def pane(window, title, command="codex", full_command="/usr/bin/codex"):
    return "\t".join([
        "pane", "HOME", str(window), "0", ":", "0", title,
        ":/home/test", "1", command, ":" + full_command,
    ]) + "\n"


class SnapshotTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.snapshot = self.root / "snapshot.txt"
        self.db = self.root / "state_5.sqlite"
        with closing(sqlite3.connect(self.db)) as con, con:
            con.execute("CREATE TABLE threads (id TEXT, cwd TEXT, name TEXT, title TEXT)")
            con.executemany("INSERT INTO threads VALUES (?, ?, ?, ?)", [
                (FIRST, "/home/test", "VPN", "VPN question"),
                (SECOND, "/home/test/with space", "Save Codex", "Save my sessions"),
            ])

    def restore_commands(self, text, claude=None):
        self.snapshot.write_text(text)
        codex = hook.codex_by_pane(self.snapshot, self.db)
        hook.rewrite(self.snapshot, claude or {}, codex)
        return self.snapshot.read_text()

    def test_two_codex_sessions_in_same_directory_restore_their_own_ids(self):
        result = self.restore_commands(
            pane(5, f"VPN | test | {FIRST}")
            + pane(7, f"⠋ Save Codex | test | {SECOND}")
        )
        rows = [line.split("\t") for line in result.splitlines()]
        self.assertEqual(rows[0][10], f":codex resume {FIRST}")
        self.assertEqual(rows[1][10], f":codex resume {SECOND}")
        self.assertEqual(rows[1][7], ":/home/test/with\\ space")

    def test_current_title_overrides_stale_resume_command_after_switching(self):
        result = self.restore_commands(
            pane(5, f"Save Codex | test | {SECOND}", full_command=f"codex resume {FIRST}")
        )
        self.assertEqual(result.split("\t")[10].strip(), f":codex resume {SECOND}")

    def test_current_panels_without_uuid_match_unique_saved_names(self):
        result = self.restore_commands(pane(5, "VPN | test") + pane(7, "⠋ Save Codex | test"))
        self.assertIn(f":codex resume {FIRST}\n", result)
        self.assertIn(f":codex resume {SECOND}\n", result)

    def test_thread_id_at_start_survives_title_truncation(self):
        result = self.restore_commands(pane(5, f"{FIRST} | VPN | test"))
        self.assertIn(f":codex resume {FIRST}\n", result)

    def test_shortened_id_is_expanded_to_full_uuid_from_database(self):
        result = self.restore_commands(pane(5, f"{FIRST[:29]}... | Changed name | test"))
        self.assertIn(f":codex resume {FIRST}\n", result)

    def test_shortened_id_collision_does_not_restore_the_wrong_session(self):
        with closing(sqlite3.connect(self.db)) as con, con:
            con.execute("INSERT INTO threads VALUES (?, ?, ?, ?)",
                        (FIRST[:-1] + "8", "/home/test", "Other", "Other"))
        self.snapshot.write_text(pane(5, f"{FIRST[:29]}... | VPN | test"))
        with redirect_stderr(StringIO()):
            self.assertEqual(hook.codex_by_pane(self.snapshot, self.db), {})

    def test_legacy_name_matching_handles_action_required_prefix(self):
        result = self.restore_commands(pane(5, "[ . ] Action Required | Save Codex | test"))
        self.assertIn(f":codex resume {SECOND}\n", result)

    def test_ambiguous_names_do_not_pick_an_arbitrary_session(self):
        with closing(sqlite3.connect(self.db)) as con, con:
            con.execute("UPDATE threads SET name = 'Same name'")
        self.snapshot.write_text(pane(5, "Same name | test"))
        with redirect_stderr(StringIO()):
            self.assertEqual(hook.codex_by_pane(self.snapshot, self.db), {})

    def test_claude_and_unrelated_panels_keep_their_behavior(self):
        unrelated = pane(9, "editor", "nvim", "nvim file.txt")
        result = self.restore_commands(
            pane(5, f"VPN | test | {FIRST}")
            + pane(7, "Claude", "claude", "claude")
            + "old MCP child command\n"
            + unrelated,
            {("HOME", "7", "0"): (CLAUDE, "/home/test")},
        )
        self.assertIn(f":claude --resume {CLAUDE}\n", result)
        self.assertIn(f":codex resume {FIRST}\n", result)
        self.assertIn(unrelated, result)
        self.assertNotIn("old MCP child command", result)

    def test_unknown_uuid_does_not_fall_back_to_a_different_named_session(self):
        self.snapshot.write_text(pane(5, f"VPN | test | {CLAUDE}"))
        with redirect_stderr(StringIO()):
            self.assertEqual(hook.codex_by_pane(self.snapshot, self.db), {})

    def test_unsafe_directory_is_not_written_into_snapshot(self):
        with closing(sqlite3.connect(self.db)) as con, con:
            con.execute("UPDATE threads SET cwd = ? WHERE id = ?", ("/home/test\ncommand", FIRST))
        self.snapshot.write_text(pane(5, f"VPN | test | {FIRST}"))
        with redirect_stderr(StringIO()):
            self.assertEqual(hook.codex_by_pane(self.snapshot, self.db), {})

    def test_missing_database_leaves_claude_snapshot_rewrite_available(self):
        self.snapshot.write_text(pane(5, "VPN | test"))
        with redirect_stderr(StringIO()):
            self.assertEqual(hook.codex_by_pane(self.snapshot, self.root / "missing.sqlite"), {})


if __name__ == "__main__":
    unittest.main()
