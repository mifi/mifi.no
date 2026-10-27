#!/bin/bash
# Moves Xcode leftovers that regenerate without internet to the Trash. Run weekly by launchd.
# Original: https://mifi.no/scripts/xcode-tidy.sh (mifi.no repo: static/scripts/xcode-tidy.sh). Edit there, then reinstall:
#   curl -fsSL https://mifi.no/scripts/xcode-tidy.sh -o ~/bin/xcode-tidy.sh
# See https://mifi.no/docs/macos/clear-storage-space/#automatic-weekly-cleanup

XCODE=~/Library/Developer/Xcode

# DerivedData of projects not built for 7+ days
for d in "$XCODE"/DerivedData/*-*/; do
  [ -n "$(find "$d/info.plist" -mtime +7 2>/dev/null)" ] && /usr/bin/trash "$d"
done

# Shared caches (ModuleCache etc.) too, once no project is left in DerivedData
ls -d "$XCODE"/DerivedData/*-*/ >/dev/null 2>&1 ||
  find "$XCODE/DerivedData" -mindepth 1 -maxdepth 1 -exec /usr/bin/trash {} + 2>/dev/null

# iOS DeviceSupport: keep only the newest OS version per device model
cd "$XCODE/iOS DeviceSupport" 2>/dev/null && ls -t | awk '{ if (seen[$1]++) print }' |
  while IFS= read -r old; do /usr/bin/trash "$old"; done

# Crash reports older than 30 days
find ~/Library/Logs/DiagnosticReports -maxdepth 1 -type f ! -name '.*' -mtime +30 -exec /usr/bin/trash {} +
