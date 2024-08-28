# Customization

I bought a MacBook Pro and wanted to start using Mac OS X as my primary OS. I'm used to Windows/Linux so I have some preferences as to behaviour. There are some things that are kind of annoying, many of which can be fixed. Also there are some tricks that make me more productive.

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
# https://stackoverflow.com/questions/13959709/stopping-xcode-from-indexing
defaults write com.apple.dt.XCode IDEIndexDisable 1

# enable VSCode Autorepeat
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

# Show hidden / dotfiles
defaults write com.apple.finder AppleShowAllFiles true; killall Finder 
```

## Disable trackpad acceleration

Install [LinearMouse](https://github.com/linearmouse/linearmouse).

## Reduce animations

Makes mac faster and use less CPU/power:

`System Preferences` -> `Accessibility` -> `Display` -> `Reduce transparency`

## Other

* Remove iTunes Helper from Login Items to prevent auto launch on iPhone connect
* In iTunes, for iPhone, enable **Manually manage music and videos*.
* http://osxdaily.com/2013/03/01/9-simple-tricks-improve-finder-mac-os-x/
* http://osxdaily.com/2011/07/28/turn-off-auto-correct-in-mac-os-x-lion/

## Use Touch ID for sudo

Add to the **top** of `/etc/pam.d/sudo`:

```conf
auth       sufficient     pam_tid.so
```

## Reduce space usage

System Settings -> Storage
- Music Creation -> Remove Garageband Sound Library
- Remove unneeded stock apps from `/Applications`
- Developer tools

## References

- https://git.herrbischoff.com/awesome-macos-command-line/about/
- https://gist.github.com/lexrus/081fa687d8b2475d3367
- https://github.com/divio/osx-bootstrap/blob/master/core/defaults.sh
- http://osxdaily.com/2015/04/06/windowserver-high-cpu-usage-mac-os-x/
- https://www.bresink.com/osx/0TinkerTool/details.html