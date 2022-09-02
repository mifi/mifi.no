---
slug: readynas-rn102-constant-activity-remedy
title: ReadyNAS RN102 constant activity remedy
authors: mifi
tags:
  - tip
---
My Netgear ReadyNAS RN102 keeps constantly writing to a file `/var/readynasd`
I don't want to hold my breath waiting for Netgear to fix this so I took matters into my own hands and implemented a TMPFS fix for my NAS.
What it does is mount `/var/readynasd` as a tmpfs of 2MB, and copy files to here from `/etc/readynas-db` on every boot, and copy back every hour, and on shutdown.

## Setup instructions
```bash
systemctl stop readynasd
mkdir /etc/readynasd-db
cp -a /var/readynasd /etc/readynasd-db/
```

Edit `/lib/systemd/system/tmpdb.service`:
```
[Unit]
Description=Mount RAMFS for SQLITE DB file
Before=readynasd.service

[Service]
Type=oneshot
ExecStart=/bin/sh -c "mount -t tmpfs -o size=2m tmpfs /var/readynasd && cp -a /etc/readynasd-db/readynasd /var/"
#ExecStop=/bin/sh -c "cp -a /var/readynasd /etc/readynasd-db/" # TODO not working
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

Edit /etc/cron.daily/tmpdb-sync
```bash
#!/bin/bash
cp -a /var/readynasd /etc/readynasd-db/
```

Now finish up:
```bash
chmod +x /etc/cron.daily/tmpdb-sync
systemctl enable tmpdb
reboot
```
