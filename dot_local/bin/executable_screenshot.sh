#!/usr/bin/env bash
# macOS-style screenshots for Hyprland.
#   area   -> select a region with the mouse (Cmd+Shift+4)
#   screen -> capture the focused monitor   (Cmd+Shift+3)
#   window -> capture the active window      (Cmd+Shift+5)
# Each shot is copied to the clipboard AND saved to ~/Pictures/Screenshots
# with a macOS-like filename, then a notification is shown.
set -euo pipefail

mode="${1:-area}"
dir="$HOME/Pictures/Screenshots"
mkdir -p "$dir"
file="$dir/Screenshot $(date '+%Y-%m-%d at %H.%M.%S').png"

case "$mode" in
  area)   grimblast --notify --freeze copysave area   "$file" ;;
  screen) grimblast --notify          copysave output "$file" ;;
  window) grimblast --notify --freeze copysave active "$file" ;;
  *) echo "usage: ${0##*/} {area|screen|window}" >&2; exit 1 ;;
esac
