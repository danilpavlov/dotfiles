#!/bin/sh
# Print the current keyboard layout for yambar (Hyprland adaptation).

layout=$(hyprctl devices -j 2>/dev/null | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
except Exception:
    d = {}
km = ''
for k in d.get('keyboards', []):
    if k.get('main'):
        km = k.get('active_keymap', '')
        break
print(km)
" 2>/dev/null)

case "$layout" in
    English*|*US*|*us*) layout="EN" ;;
    Russian*|*RU*|*ru*) layout="RU" ;;
    *) layout=$(printf '%s' "$layout" | cut -c1-2 | tr '[:lower:]' '[:upper:]') ;;
esac
[ -z "$layout" ] && layout="??"

printf 'layout|string|%s\n\n' "$layout"
