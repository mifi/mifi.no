---
slug: xbmc-memory-leak-remedy
title: XBMC memory leak remedy
authors: mifi
tags:
  - script
  - tips
  - xbmc
---
XBMC (now Kodi) has always had a tendency of leaking memory, so that it will eventually thrash and crash. My simple solution to this is to run xbmc inside a for loop instead of directly (just run the script from `.xinitrc`):

xbmc_angel.sh:
```bash
#!/bin/bash
while [ 1 ]; do
        xbmc
        nohup sleep 10
done
```

...And add the following to the local XBMC user's crontab:
```
0 4 * * *       killall xbmc.bin
```

This will kill XBMC every night at 4 o'clock. And give you a fresh XBMC every day!
