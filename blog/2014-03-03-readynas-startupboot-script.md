---
slug: readynas-startupboot-script
title: ReadyNAS startup/boot script
authors: mifi
tag:
  - script
---
I needed to add some startup command to run as root on my Netgear ReadyNAS (RN102). Turns out you don't have any `/etc/rc.local`, so I added a new boot script `/etc/init.d/local`:
```
#! /bin/sh
### BEGIN INIT INFO
# Provides:          local
# Required-Start:    $all
# Required-Stop:
# Default-Start:     2 3 4 5
# Default-Stop:
# Short-Description: Local scripts
# Description:       Local scripts
### END INIT INFO

PATH=/sbin:/bin
. /lib/init/vars.sh

do_start () {
        hdparm -S 253 /dev/sdc
}

case "$1" in
  start)
        do_start
        ;;
  restart|reload|force-reload)
        echo "Error: argument '$1' not supported" >&2
        exit 3
        ;;
  stop)
        # No-op
        ;;
  status)
        echo "Error: argument '$1' not supported" >&2
        exit 3
        ;;
  *)
        echo "Usage: $0 start|stop" >&2
        exit 3
        ;;
esac

:
```

Just type whatever u need inside `do_start`. I needed to set a higher spindown timeout.

Then:
```bash
chmod +x /etc/init.d/local
update-rc.d local defaults
```

Tested on ReadyNASOS 6.1.6
