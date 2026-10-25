---
tags: [macos, tips, cleanup]
---
# Clearing storage space on macOS

As we all know, Mac's come with relatively small storage space, so we need to keep periodically cleaning up files periodically. Especially when doing software development which adds up a lot of cache files around the system.

## 🥇 Run Mole

Use the AI agent skill `/mole`

# macOS misc

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

# Don't delete! yarn/corepack cache is here
# rm -rf ~/.cache/node
```

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

## macOS manual UI

```bash
open x-apple.systempreferences:com.apple.settings.Storage
```

## Chrome manual

- `chrome://settings/clearBrowserData` -> Cached images and files
- `chrome://settings/content/all` -> Sort by: Data stored

## Manual file system check

```bash
sudo ncdu --exclude /System/Volumes/Data /
# or
ncdu ~/Library/Caches/
```

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
