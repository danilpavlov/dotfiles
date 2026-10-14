#!/usr/bin/env bash
# Ensure a detached tmux session named HOME exists, then attach to it.
# Launched at login / Hyprland startup (see ~/.config/hypr/hyprland.conf).
#
# On a fresh boot (no tmux server yet) the server is started in its own systemd
# user scope, tmux-server.scope, and the last tmux-resurrect snapshot is
# restored. The scope matters: ~/.config/systemd/user/tmux-.scope.d/ orders
# every tmux-*.scope after tmux-resurrect-save.service, so on poweroff/reboot
# the final save runs while the server and its panes are still alive.
set -u

SESSION="HOME"
TMUX_BIN="$(command -v tmux || echo /usr/bin/tmux)"

start_server() {
    systemd-run --user --scope --collect --quiet --unit=tmux-server \
        "$TMUX_BIN" new-session -d -s "$SESSION" \
        || "$TMUX_BIN" new-session -d -s "$SESSION"
}

restore_sessions() {
    local restore_script="" i
    # resurrect publishes its script path once TPM has loaded the plugins
    for i in $(seq 50); do
        restore_script="$("$TMUX_BIN" show-option -gqv @resurrect-restore-script-path)"
        [ -n "$restore_script" ] && break
        sleep 0.1
    done
    # via run-shell, not directly: restore.sh needs $TMUX of the server to
    # create sessions (outside tmux it silently restores only existing ones)
    [ -x "$restore_script" ] && "$TMUX_BIN" run-shell "$restore_script >/dev/null 2>&1"
}

if ! "$TMUX_BIN" list-sessions >/dev/null 2>&1; then
    start_server
    restore_sessions
fi

if ! "$TMUX_BIN" has-session -t "$SESSION" 2>/dev/null; then
    "$TMUX_BIN" new-session -d -s "$SESSION"
fi

"$TMUX_BIN" attach-session -t "$SESSION"

# If the session is killed or we detach, fall back to a login shell so the
# terminal window stays usable instead of closing.
exec "${SHELL:-/usr/bin/zsh}" -l
