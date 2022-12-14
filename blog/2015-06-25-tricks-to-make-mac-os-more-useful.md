---
slug: tricks-to-make-mac-os-more-useful
title: Mac OS X preferences, improvements and config tricks
tags:
  - tip
  - apple
  - mac
---

I bought a MacBook Pro and wanted to start using Mac OS X as my primary OS. I'm used to Windows/Linux so I have some preferences as to behaviour. There are some things that are kind of annoying, many of which can be fixed. Also there are some tricks that make me more productive.

## Disable trackpad acceleration

Install https://github.com/linearmouse/linearmouse

## Command line settings

```bash
# Disable trackpad acceleration (no longer works on M2):
# defaults write .GlobalPreferences com.apple.trackpad.scaling -1

# If you have an external mouse, you have to disable its acceleration separately (no longer works on M2):
# defaults write .GlobalPreferences com.apple.mouse.scaling -1

# Always show Finder path bar
defaults write com.apple.finder ShowPathbar -bool true

# Always show Finder status bar
defaults write com.apple.finder ShowStatusBar -bool true

# Show full path in Finder title:
defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES; killall Finder

# Set Current Folder as Default Search Scope
defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"

# Show All File Extensions
defaults write -g AppleShowAllExtensions -bool true

# Dock instant hide/show (disable Dock animation):
defaults write com.apple.dock autohide-time-modifier -float 0.00; killall Dock

# Disable character picker
defaults write NSGlobalDomain ApplePressAndHoldEnabled -bool false

# Speed up animation
defaults write NSGlobalDomain NSWindowResizeTime -float 0.03

# Don’t prompt for TimeMachine when plugging devices
defaults write com.apple.TimeMachine DoNotOfferNewDisksForBackup -bool true

# Disable two finger swipe back/forward in browser etc.
defaults write com.google.Chrome AppleEnableSwipeNavigateWithScrolls -bool FALSE

# Disable local time machine (I have an external backup)
sudo tmutil disablelocal

# Disable Creation of Metadata Files on Network Volumes
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true

# Disable Auto-Correct
defaults write -g NSAutomaticSpellingCorrectionEnabled -bool false

# Disable SpotLight (saves space and CPU)
sudo mdutil -a -i off

# Disable indexing in XCode
defaults write com.apple.dt.XCode IDEIndexDisable 1

# enable VSCode Autorepeat
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

# Show hidden / dotfiles
defaults write com.apple.finder AppleShowAllFiles true; killall Finder 
```

## Reduce animations

Makes mac faster and use less CPU/power:

`System Preferences -> Accessibility -> Display -> Reduce transparency`

## Improve WiFi/AirPlay performance

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

## Fix slow/buggy WiFi

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

## Other

* Remove iTunes Helper from Login Items to prevent auto launch on iPhone connect
* In iTunes, for iPhone, enable **Manually manage music and videos*.
* http://osxdaily.com/2013/03/01/9-simple-tricks-improve-finder-mac-os-x/
* http://osxdaily.com/2011/07/28/turn-off-auto-correct-in-mac-os-x-lion/

## Use Touch ID for sudo

Add to the **top** of `/etc/pam.d/sudo`:

```
auth       sufficient     pam_tid.so
```

## Reduce space usage

System Settings -> Storage
- Music Creation -> Remove Garageband Sound Library
- Remove unneeded stock apps
- Developer tools

## Tricks

### Finder

Go to path: **<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd>**

cd .. **<kbd>Cmd</kbd> + <kbd>↑</kbd>**

cd / "Run" file **<kbd>Cmd</kbd> + <kbd>↓</kbd>**

Print screen: **<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>4</kbd>** (press space to select window)

### Keyboard shortcuts

`System Preferences -> Keyboard -> Shortcuts -> keyboard move focus to next window`: <kbd>Cmd</kbd>+<kbd><</kbd>

## References

* https://git.herrbischoff.com/awesome-macos-command-line/about/
* https://gist.github.com/lexrus/081fa687d8b2475d3367
* https://github.com/divio/osx-bootstrap/blob/master/core/defaults.sh
* https://github.com/herrbischoff/awesome-osx-command-line
* http://osxdaily.com/2015/04/06/windowserver-high-cpu-usage-mac-os-x/
