---
tags: [macos, tips]
---
# macOS

## Keyboard shortcuts

`System Preferences` -> `Keyboard` -> `Shortcuts` -> `Keyboard` -> Move focus to next window: **<kbd>Cmd</kbd> + <kbd>`</kbd>**

### Finder shortcuts

| Action | Keys |
|-|-|
| Go to path | **<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd>** |
| cd .. | **<kbd>Cmd</kbd> + <kbd>↑</kbd>** |
| cd / "Run" file | **<kbd>Cmd</kbd> + <kbd>↓</kbd>** |
| Print screen | **<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>4</kbd>** (and press space to select window) |

## Troubleshooting

### Improve WiFi/AirPlay performance

Reduce stuttering in AirPlay Mirroring by disabling the extra wifi channel.

Make a script:

```bash
#https://medium.com/@mariociabarra/wifried-ios-8-wifi-performance-issues-3029a1$

UPDOWN="$1"

case "$UPDOWN" in
    up|down) echo "$UPDOWN" ;;
    *) echo 'Specify up or down'; exit 1 ;;
esac

sudo ifconfig awdl0 "$UPDOWN"
```

* https://medium.com/@mariociabarra/wifried-ios-8-wifi-performance-issues-3029a164ce94
* https://medium.com/@mariociabarra/wifriedx-in-depth-look-at-yosemite-wifi-and-awdl-airdrop-41a93eb22e48

### Fix slow/buggy WiFi

1. Turn OFF wi-fi by selecting the wi-fi menu bar item and choosing “Turn Wi-Fi Off”
2. `open /Library/Preferences/SystemConfiguration/`
3. Trash the following files:
```
com.apple.airport.preferences.plist
com.apple.network.eapolclient.configuration.plist
com.apple.wifi.message-tracer.plist
NetworkInterfaces.plist
preferences.plist
```
4. Reboot

Taken from https://osxdaily.com/2016/09/22/fix-wi-fi-problems-macos-sierra/
