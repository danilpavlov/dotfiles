#!/bin/sh
# Open the controls workspace with its bluetooth, audio, and wifi panels.
running=$(hyprctl clients -j | python3 -c "import json,sys;print(' '.join(c['class'] for c in json.load(sys.stdin)))")
launch() { # class cmd
    case " $running " in *" local.panel.$1 "*) ;; *)
        hyprctl eval "hl.exec_cmd('ghostty --class=local.panel.$1 -e $2', { workspace = 'name:controls silent' })" >/dev/null ;;
    esac
}
launch bluetooth bluetui
launch audio wiremix
launch wifi nmtui
hyprctl dispatch 'hl.dsp.focus({ workspace = "name:controls" })' >/dev/null
