---
slug: tesla-usb-multi-partitions
title: Format Tesla USB stick with multiple partitions
authors: mifi
tags: [tesla, usb, boombox, teslacam, sentry]
---

How to format the Tesla USB stick to allow recording TeslaCam / Sentry Mode as well as Boombox with the same stick.

<!--truncate-->

**Note: [Moved here](/docs/tesla/usb-storage).**

Command on MacOS:

**Note**: replace `/dev/disk4` with your USB stick.

```bash
diskutil partitionDisk /dev/disk4 MBR ExFAT "TESLACAM" 128.2G ExFAT "BOOMBOX" 100M
```

Then create the required directories:

```bash
mkdir /Volumes/TESLACAM/Teslacam
mkdir /Volumes/BOOMBOX/Boombox

See also https://tesla-info.com/blog/tesla-storage-sentry-mode-dashcam.php
