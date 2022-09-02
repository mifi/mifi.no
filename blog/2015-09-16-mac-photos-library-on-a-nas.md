---
slug: mac-photos-library-on-a-nas
title: Mac Photos Library on a NAS
authors: mifi
tags:
  - apple
  - mac
---
I struggled a bit to find out how to store my Photo Library on a NetGear ReadyNAS. SMB did not work, and SSHFS did not work either. I was unable to get AFP working too, and I saw that it was discouraged.

The solution was to mount the drive using NFS. Then I created a sparse bundle disk image with a Mac OS Extended (Journaled) partition with an Apple Partition Map, on the NFS mounted partition, and moved my `Photos Library.photoslibrary` onto the mounted image. Everything seems to be running fast and smoothly. (I'm on a gigabit LAN.)

It should be noted that I use ext4 for my NAS partitions, don't know if it matters.
