#!/usr/bin/env bash
# ExecStop для tmux-resurrect-save.service: финальное сохранение tmux при
# poweroff/reboot/logout. Порядок обеспечивает drop-in
# ~/.config/systemd/user/tmux-.scope.d/: все tmux-*.scope (сервер и панели)
# останавливаются только после этого скрипта.
set -u

if ! tmux has-session 2>/dev/null; then
    echo "tmux server not running, nothing to save"
    exit 0
fi

~/.config/tmux/plugins/tmux-resurrect/scripts/save.sh quiet 2>/dev/null
echo "tmux sessions saved: $(readlink ~/.local/share/tmux/resurrect/last)"
