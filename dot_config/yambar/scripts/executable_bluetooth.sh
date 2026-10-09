#!/bin/sh
# Print Bluetooth status for yambar:
#   "off"            when the controller is powered off / blocked
#   "<device name>"  when a device is connected
#   "on"             when powered on but nothing connected

powered=$(bluetoothctl show 2>/dev/null | awk '/Powered:/{print $2; exit}')

if [ "$powered" != "yes" ]; then
	status="off"
else
	name=$(bluetoothctl devices Connected 2>/dev/null | head -n1 | cut -d' ' -f3-)
	if [ -n "$name" ]; then
		status="$name"
	else
		status="on"
	fi
fi

printf 'bt|string|%s\n\n' "$status"
