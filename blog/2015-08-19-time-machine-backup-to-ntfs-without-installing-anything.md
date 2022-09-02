---
slug: time-machine-backup-to-ntfs-without-installing-anything
title: Time Machine backup to NTFS without installing anything
authors: mifi
tags:
  - tip
  - apple
  - mac
---
Here's a way to use an NTFS drive for Time Machine backups, even though it is used for other purposes too.

Find out the NTFS drive volume's UUID:
```bash
diskutil info /Volumes/DRIVENAME | grep UUID
```

Put this in fstab: (Replace `ENTED_UUID_HERE` with the one you found from the previous command.)
```bash
sudo echo "UUID=ENTER_UUID_HERE none ntfs rw,auto,nobrowse" >> /etc/fstab
```

Eject, plug out and back in. **MAKE SURE THE DRIVE WAS SAFELY REMOVED FROM WINDOWS**, or it will not mount RW in Mac (See dmesg when plugging in).

Find your RW mounted volume
```bash
open /Volumes
```

Now we will create a Mac OS disk image on the NTFS volume.
1. Open `Disk Utility`
2. Click `New Image`
3. Select a large enough size
4. Format: `Mac OS Extended (Journaled)`
5. Partitions: `Single Partition - Apple Partition Map`
6. When done, mount this image

Now we will tell Time Machine to use this disk. It does not show up in the list of available drives, so we will use a command:
```bash
sudo tmutil setdestination /Volumes/MOUNTED-DISK-IMAGE
```
(Replace `MOUNTED-DISK-IMAGE` with the disk image you created, NOT the NTFS drive)

Now just test backing up and see that it works.

Resources:
- http://osxdaily.com/2013/10/02/enable-ntfs-write-support-mac-os-x/
- http://basilsalad.com/how-to/create-time-machine-backup-network-drive-lion/

I use this for backing up to my NAS via SMB/NFS
