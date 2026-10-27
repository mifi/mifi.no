---
tags: [macos, tips, backup]
---
# Back up a Mac with rclone

[rclone](https://rclone.org/) can back up your home folder to almost any cloud storage (I use Jottacloud). The trick is excluding everything that is a cache, can be regenerated, or is synced elsewhere already, which on a Mac used for development is a lot.

## Command

```bash
brew install rclone
rclone config # set up a remote, e.g. "jottacloud"

curl -fsSL https://mifi.no/scripts/rclone-mac-excludes.txt -o rclone-mac-excludes.txt

rclone sync -v \
  --track-renames \
  --links \
  --no-update-modtime \
  --local-no-check-updated \
  --exclude-from rclone-mac-excludes.txt \
  ~ jottacloud:backup-my-mac
```

- `--track-renames`: a moved or renamed file is renamed on the remote instead of uploaded again (needs a remote with hashes).
- `--links`: symlinks are stored as small `.rclonelink` files instead of being followed.
- `--no-update-modtime`: don't touch the remote file when only the modification time differs.
- `--local-no-check-updated`: don't fail on files that change while they upload (logs, databases). The uploaded copy of such a file may be inconsistent, so quit apps with open databases first if they matter.

Run it with `--dry-run` first to see what would be uploaded and deleted.

## Exclude list

```text file=../../static/scripts/rclone-mac-excludes.txt
```

To exclude your own folders too (projects you don't need backed up, big media), put them in a second file and add another `--exclude-from my-excludes.txt`.

## Things to know

- **`sync` mirrors deletions.** A file you delete locally is deleted from the backup on the next run. With Jottacloud, rclone moves it to the Trash, where it's kept for 30 days (unless you pass `--jottacloud-hard-delete`), and Jottacloud [keeps the last 5 versions](https://jottacloud.com/en/features) of changed files. So an accidental delete can only be recovered for 30 days after the next backup run. Check what your provider does, or use `rclone copy` (never deletes) or `--backup-dir` (moves deleted and changed files to another folder) instead.
- **iCloud Drive (`~/Library/Mobile Documents`) is not excluded.** With "Optimize Mac Storage" on, some files there are only in iCloud, and reading them makes macOS download them. Uncomment its line in the exclude list if it's backed up by iCloud well enough for you.
- **`.git` folders are excluded,** because repositories are usually on GitHub anyway. That means commits and branches you haven't pushed are not in the backup.
- **Run it from a terminal that has Full Disk Access** (System Settings -> Privacy & Security -> Full Disk Access), or macOS blocks it from protected data like Mail, Messages and Safari, and asks before it can read Desktop, Documents and Downloads.
- **External drives** work the same way, for example `rclone sync -v --track-renames --exclude '.DS_Store' /Volumes/MyDrive/photos jottacloud:photos`.

See also: [Clearing storage space on macOS](clear-storage-space.md).
