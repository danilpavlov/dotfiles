#!/usr/bin/env bash
# Ensure a detached tmux session named HOME exists, with the VPN tunnel
# running in its first window, then attach to it.
# Launched at login / Hyprland startup (see ~/.config/hypr/hyprland.conf).
set -u

SESSION="HOME"
TMUX_BIN="$(command -v tmux || echo /usr/bin/tmux)"
VPN_CMD="$HOME/.local/bin/vpn"

if ! "$TMUX_BIN" has-session -t "$SESSION" 2>/dev/null; then
    "$TMUX_BIN" new-session -d -s "$SESSION" -n vpn
    "$TMUX_BIN" send-keys -t "$SESSION:vpn" "$VPN_CMD" C-m
fi

"$TMUX_BIN" attach-session -t "$SESSION"

# If the session is killed or we detach, fall back to a login shell so the
# terminal window stays usable instead of closing.
exec "${SHELL:-/usr/bin/zsh}" -l
