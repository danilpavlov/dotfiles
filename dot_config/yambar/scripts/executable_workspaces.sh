#!/bin/sh
# Emit yambar show/active booleans for workspaces 1-9 (Hyprland adaptation of the
# original mango/mmsg script). "show" = workspace is focused or has windows;
# "active" = currently focused workspace.

tag_count=9

emit() {
    active=$(hyprctl activeworkspace -j 2>/dev/null \
        | python3 -c "import sys,json;print(json.load(sys.stdin).get('id',0))" 2>/dev/null)
    occupied=$(hyprctl workspaces -j 2>/dev/null \
        | python3 -c "import sys,json;print(' '.join(str(w['id']) for w in json.load(sys.stdin) if w.get('windows',0)>0))" 2>/dev/null)

    i=1
    while [ "$i" -le "$tag_count" ]; do
        show=false; act=false
        case " $occupied " in *" $i "*) show=true ;; esac
        if [ "$i" = "$active" ]; then show=true; act=true; fi
        printf 'show%d|bool|%s\n' "$i" "$show"
        printf 'active%d|bool|%s\n' "$i" "$act"
        i=$((i + 1))
    done
    printf '\n'
}

emit

# Update instantly on Hyprland events (falls back to polling without socat).
sock="$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock"
if command -v socat >/dev/null 2>&1 && [ -S "$sock" ]; then
    socat -U - UNIX-CONNECT:"$sock" 2>/dev/null | while IFS= read -r line; do
        case "$line" in
            workspace*|focusedmon*|createworkspace*|destroyworkspace*|openwindow*|closewindow*|movewindow*)
                emit ;;
        esac
    done
else
    while true; do sleep 0.5; emit; done
fi
