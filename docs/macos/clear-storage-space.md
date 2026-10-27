---
tags: [macos, tips, cleanup]
---
# Clearing storage space on macOS

As we all know, Macs come with relatively small storage space, so we need to keep cleaning up files periodically. Especially when doing software development, which adds up a lot of cache files around the system.

## 🥇 Run Mole

[Mole](https://github.com/tw93/Mole) (`brew install mole`) finds and cleans caches, logs and leftovers. Preview first with `mo clean --dry-run`, or let an AI agent drive it with the `/mole` skill.

## macOS misc

```bash
rm -rf ~/'Library/Caches/com.apple.nsurlsessiond'/*
rm -rf ~/'Library/Containers/com.apple.Home/Data/Library/Caches'/*
rm -rf ~/'Library/Containers/com.apple.iMovieApp/Data/Library/Caches'/*
rm -rf ~/'Library/Containers/com.apple.mediaanalysisd/Data/Library/Caches'
rm -rf ~/'Library/Containers/com.apple.geod/Data/tmp'

# deletes /private/var/db/diagnostics
sudo log erase --all
```

## Homebrew

```bash
brew cleanup
```

## Node.js, npm and yarn

I use mostly yarn berry so clear others

```bash
rm -rf ~/.npm
rm -rf ~/.node-gyp
rm -rf ~/Library/Caches/node-gyp
rm -rf ~/Library/pnpm/store

# Delete all yarn v1 caches:
rm -rf ~/Library/Caches/Yarn

# For yarn berry, remove large deps:
find ~/.yarn/berry/cache -mindepth 1 -maxdepth 1 -type f -exec du -sm {} + | awk '$1 > 5 {print $2}' | xargs -r rm -rf

# Or clear the whole yarn berry global cache (run from inside a yarn berry project, so it's not yarn v1 running it)
yarn cache clean --all
# Cached npm registry metadata, safe to delete
rm -rf ~/.yarn/berry/metadata

# Don't delete! yarn/corepack cache is here
# rm -rf ~/.cache/node
```

⚠️ Projects using Plug'n'Play (they have a `.pnp.cjs` file) load packages directly from the global cache, so they need `yarn install` again after clearing it. Projects with `nodeLinker: node-modules` are not affected.

## Chromium / Chrome

⚠️ Close all the Chromium based apps first!

```bash
# Chromium app cache
rm -rf ~/Library/Application\ Support/{Claude,Code,'GitHub Desktop',Slack,LosslessCut,Local,Cypress,beekeeper-studio}/{Cache,'Code Cache',GPUCache}

# Claude Cowork VM, see also https://github.com/anthropics/claude-code/issues/57371#issuecomment-4633312480
rm -rf ~/Library/Application\ Support/Claude/{vm_bundles,claude-code-vm}

# Slack (App Store):
rm -rf ~/'Library/Containers/com.tinyspeck.slackmacgap/Data/Library/Application Support/Slack/Cache/Cache_Data'

# Chrome crashpad
rm -f ~/Library/Application\ Support/Google/Chrome/Crashpad/completed/*.dmp

# Service worker cache and indexeddb
mkdir -p ~/Desktop/chrome-cache-todo-delete/service-worker
mv ~/Library/Application\ Support/Google/Chrome/Default/Service\ Worker/{CacheStorage,ScriptCache} ~/Desktop/chrome-cache-todo-delete/service-worker/
mkdir -p ~/Desktop/chrome-cache-todo-delete/indexeddb
mv ~/Library/Application\ Support/Google/Chrome/Default/IndexedDB ~/Desktop/chrome-cache-todo-delete/indexeddb/

# VSCode (Note: close VSCode first)
rm -rf ~/Library/Application\ Support/Code/User/History/*

# Old Electron user data can cause crashes too: https://github.com/electron/electron/issues/47947#issuecomment-3199650075
rm -rf ~/Library/Application\ Support/Electron

# Squirrel updater
rm -rf ~/Library/Caches/*.ShipIt
```

## Docker

⚠️ Start docker first.

```bash
docker system prune --volumes --all
#docker rmi $(docker images -q)
#rm -rf ~/Library/Containers/com.docker.docker/Data/*
```

## Other software you might have

```bash
rm -rf ~/Library/Caches/'Raspberry Pi'/Imager
rm -rf ~/Library/Caches/typescript
rm -rf ~/Library/Caches/Firefox
```

Uninstalled apps (especially games) often leave GBs behind in `~/Library/Application Support`, e.g. `Steam` and `minecraft`. Back up `minecraft/saves` first if you want to keep your worlds.

## macOS manual UI

```bash
open x-apple.systempreferences:com.apple.settings.Storage
```

System Settings -> Storage
- Music Creation -> Remove Garageband Sound Library
- Remove unneeded stock apps from `/Applications`
- Developer tools

Also:
- `~/Library/Application Support/com.apple.wallpaper/aerials/videos` (downloaded screen saver videos)
- Finder -> Settings -> Advanced -> **Remove items from the Trash after 30 days**
- Reboot: frees swap (the `VM` volume), which can be several GBs.

## Chrome manual

- `chrome://settings/clearBrowserData` -> Cached images and files
- `chrome://settings/content/all` -> Sort by: Data stored

## Manual file system check

```bash
sudo ncdu --exclude /System/Volumes/Data /
# or
ncdu ~/Library/Caches/

# Space per APFS volume (System, Preboot, VM, Data, simulator disks).
# Explains why folder sizes don't add up to the disk total.
diskutil apfs list
```

⚠️ Give your terminal Full Disk Access first (System Settings -> Privacy & Security -> Full Disk Access), or folders like Documents, Downloads, Mail, Photos and iCloud Drive will show up as empty.

After a macOS upgrade, `Preboot` and `/System/Library/AssetsV2` grow. Those are managed by macOS and cannot be cleaned.

## Dev manual

```bash
# must be manually moved to Trash from Finder due to macOS security:
open -R ~/Library/Caches/dotslash
open -R /Library/Caches/com.apple.iconservices.store

# Old Electron versions
ncdu ~/Library/Caches/electron

# Playwright cache
ncdu ~/Library/Caches/ms-playwright

# Delete old versions (and current) of React Native Pods
rm -rf ~/Library/Caches/CocoaPods/Pods/External
rm -rf ~/Library/Caches/ReactNative

rm -rf ~/Library/Containers/com.apple.CoreDevice.CoreDeviceService/Data/Library/Caches

rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ~/Library/Developer/Xcode/'iOS DeviceSupport'
rm -rf ~/Library/Developer/Xcode/Archives/*
```

## Xcode simulator runtimes

Usually the biggest win after an Xcode upgrade: each runtime is ~8 GB and old ones pile up.

```bash
xcrun simctl runtime list
xcrun simctl runtime delete <id>
# Remove simulator devices left behind by deleted runtimes
xcrun simctl delete unavailable
```

Or Xcode -> Settings -> Components.

You don't need any simulator runtime to build and deploy to a physical device (tested with Xcode 27 and `npx expo run:ios --device`). Simulators and SwiftUI previews won't work though. To get it back: `xcodebuild -downloadPlatform iOS`.

## Automatic weekly cleanup

A small script run weekly by `launchd` that moves Xcode leftovers that regenerate without internet to the Trash (using the built-in `/usr/bin/trash`), so nothing is lost if it's wrong.

The script, [xcode-tidy.sh](pathname:///scripts/xcode-tidy.sh), moves to the Trash:
- DerivedData of projects not built for 7+ days, and the shared caches (`ModuleCache` etc.) once no project is left
- older iOS DeviceSupport versions, keeping the newest per device model
- crash reports older than 30 days

Install it (run again to update):

```bash
mkdir -p ~/bin
curl -fsSL https://mifi.no/scripts/xcode-tidy.sh -o ~/bin/xcode-tidy.sh
```

⚠️ Don't keep it in `~/Desktop`, `~/Documents` or `~/Downloads`: macOS blocks scripts started by `launchd` from reading those folders.

`~/Library/LaunchAgents/local.xcode-tidy.plist` (runs Sundays at 10:00, or at next wake). Replace `YOUR_USER`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>local.xcode-tidy</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>/Users/YOUR_USER/bin/xcode-tidy.sh</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Weekday</key>
    <integer>0</integer>
    <key>Hour</key>
    <integer>10</integer>
  </dict>
</dict>
</plist>
```

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/local.xcode-tidy.plist
# Run once now to test
launchctl kickstart gui/$(id -u)/local.xcode-tidy
# Uninstall
launchctl bootout gui/$(id -u)/local.xcode-tidy
```
