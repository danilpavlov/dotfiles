#!/bin/sh
# Start hyprpaper and apply a random wallpaper via IPC.
# Runs at startup (exec-once) and on demand from the $mainMod+0 keybind.
#
# The config `wallpaper=` line is unreliable on this hyprpaper version, so we
# set it explicitly once the daemon's IPC socket is up. The `wallpaper` command
# auto-preloads, so no separate preload step is needed.
#
# The daemon is restarted on every run on purpose: this build rejects
# `unload`, so re-setting the wallpaper in a live daemon would leak the
# decoded image of every wallpaper seen so far (~78 MB for the 6000x3274 one).

WALLPAPER_DIR="${WALLPAPER_DIR:-$HOME/github/wallpapers}"

ALL=$(find "$WALLPAPER_DIR" -maxdepth 1 -type f \
        \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \))

if [ -z "$ALL" ]; then
    echo "set-wallpaper: no images found in $WALLPAPER_DIR" >&2
    exit 1
fi

# Drop the wallpaper that is already up, so the keybind always visibly changes
# something. At startup nothing is active yet and this filters nothing out.
CURRENT=$(hyprctl hyprpaper listactive 2>/dev/null | sed -n 's/^[^:]*: //p' | head -n 1)
CANDIDATES=$(printf '%s\n' "$ALL" | grep -vxF "$CURRENT")
[ -z "$CANDIDATES" ] && CANDIDATES=$ALL

WALL=$(printf '%s\n' "$CANDIDATES" | shuf -n 1)

pkill -x hyprpaper 2>/dev/null
hyprpaper &

# Wait for the IPC socket to respond, then set the wallpaper on all monitors.
for i in $(seq 1 20); do
    if hyprctl hyprpaper listactive >/dev/null 2>&1; then
        hyprctl hyprpaper wallpaper ",$WALL" >/dev/null 2>&1
        break
    fi
    sleep 0.25
done
