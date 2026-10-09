#!/bin/sh
# Print the connected Wi-Fi SSID for yambar, or "off" when not connected.

ssid=$(nmcli -t -f ACTIVE,SSID dev wifi 2>/dev/null | awk -F: '$1=="yes"{print $2; exit}')
[ -z "$ssid" ] && ssid="off"

printf 'wifi|string|%s\n\n' "$ssid"
