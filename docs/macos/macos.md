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

## Change mac-address

```bash
# First build it:
git clone https://github.com/shilch/macchanger.git maccchanger
(cd macchanger && make)

# Now randomize the mac address on eth0:
./macchanger/macchanger -r en0
```
See also https://github.com/shilch/macchanger/issues/2

`ifconfig` used to work, but no longer works:
```bash
sudo /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -z
sudo ifconfig en0 ether aa:bb:cc:dd:ee:ff
# Fails
```
