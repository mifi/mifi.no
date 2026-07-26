---
tags: [github, tips, ci, coding]
---
# GitHub tips

How to link to the artifacts from the latest GitHub Actions workflow run in your repository (e.g. latest nighly build)? [See here!](https://github.com/mifi/mifi.no/blob/master/src/pages/llc/nightly.tsx)

## Diff two commits in GitHub

https://github.com/username/repo/compare/v1.0.0...v2.0.0

## Self-hosted runner

Setup for Apple building.

Log into https://developer.apple.com/download/all/, download latest Xcode, then copy curl command from e.g. Chrome developer tools and run it on the server:

```bash
curl ... > Xcode.xip
```

Now set it up:

```bash
xip --expand Xcode.xip
sudo mv Xcode.app /Applications

sudo xcode-select -s /Applications/Xcode.app
sudo xcodebuild -license accept

sudo xcodebuild -runFirstLaunch
xcodebuild -downloadPlatform iOS
```
