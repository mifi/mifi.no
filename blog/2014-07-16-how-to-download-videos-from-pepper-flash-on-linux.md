---
slug: how-to-download-videos-from-pepper-flash-on-linux
title: How to download videos from Pepper Flash on linux
authors: mifi
tags:
  - script
---
The new Pepper Flash plugin broke my old script for listing/downloading cached flash/flv videos.

Here is a new script. Uses sudo because the `/proc/$PID/fd` directory is root only.
This solution is based on `silviot`'s solution here: [http://superuser.com/questions/622606/how-do-i-save-the-buffered-flash-video-on-linux](http://superuser.com/questions/622606/how-do-i-save-the-buffered-flash-video-on-linux).

```bash
#!/bin/bash
for FLASHPID in $( pgrep -f chrom ) ; do (for FLASHFILE in $(sudo ls -l /proc/$FLASHPID/fd|egrep "(/tmp/Flash|Pepper Data)" | sed -r 's/^.* ([0-9]+) -> .*$/\1/'); do echo /proc/$FLASHPID/fd/$FLASHFILE; done ); done
```

Then you can just copy the file into home, like:
```bash
cp /proc/26493/fd/30 ~/
```
