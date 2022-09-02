---
slug: xbmc-with-canal-digital-norway-using-tvheadendoscam-for-crypted-channels-on-gentoo
title: XBMC with Canal Digital Norway using tvheadend/oscam for crypted channels on Gentoo
authors: mifi
tags: [dvb, xbmc]
---
So I decided to set up DVB support on my XBMC, so that i can use XBMC for all my media needs. With `oscam`, the only hardware we need is a DVB-C card and a cheap PCSC smart card reader.

My TV card is a TerraTecCinergy C DVB-C.
My Smartcard reader is a SDI010 (works with CCID).
I did this on gentoo but it should be just as easy on most Linux OS.

## The process

First you need to install `CCID` and `pcsc-lite`:
```bash
emerge -av pcsc-lite ccid
```

On gentoo PCSC daemon will auto start when you plug in the USB reader if you add this to `/etc/rc.conf`:
```
rc_hotplug="pcscd"
```
Else you might need to start the service.

Checkout oscam source:
```bash
svn co http://www.streamboard.tv/svn/oscam/trunk oscam
cd oscam
```

Now let's build `oscam` with PCSC support:
```bash
make pcsc-libusb
```

Now configure oscam:
```bash
mkdir /usr/local/etc
```

Contents of `/usr/local/etc/oscam.conf`:
```
[global]
nice = -1
WaitForCards = 1
logfile = /tmp/oscam.log
usrfile = /tmp/oscamuser.log
cwlogdir = /tmp/cw
[webif]
httpport = 8888
httpallowed = 127.0.0.1
[newcamd]
key = 0102030405060708091011121314
port = 32000@0B00:000000
```

Note that you should change key to something more non-predictable.

Contents of `/usr/local/etc/oscam.server`:
```
[reader]
label                 = canaldigital
protocol              = pcsc
device                = 0
caid                  = 0B00
detect                = cd
ident                 = 0B00:000000
group                 = 1
emmcache              = 1,3,2
```

Contents of `/usr/local/etc/oscam.user`:
```
[account]
user = tvheadend
pwd = tvheadend
uniq = 0
group = 1
ident = 0B00:000000
caid = 0B00
au = canaldigital
```

Note that you should change user/pwd.

Run oscam:
```bash
./Distribution/oscam-1.20-unstable_*-libusb-pcsc
```

You can see its output from `/tmp/oscam.log`

Install and start `tvheadend`:
```bash
emerge -av tvheadend
/etc/init.d/tvheadend start
```

1. Browse to http://localhost:9981/
2. Go to Configuration -> Code word client
3. Add entry
4. Hostname: *your ip*
5. Port: `32000`
6. Username: `tvheadend`
7. Password: `tvheadend`
8. DES Key: `01:02:03:04:05:06:07:08:09:10:11:12:13:14`
9. Check `Enabled` and `Update card`.
10. Save

Now you can install XBMC tvheadend addon, plugin the smart card and, in theory just start watching TV!

(For XBMC addons i used this ebuild: [http://data.gpo.zugaina.org/vdr-devel/media-plugins/xbmc-addon-pvr/xbmc-addon-pvr-9999.ebuild](http://data.gpo.zugaina.org/vdr-devel/media-plugins/xbmc-addon-pvr/xbmc-addon-pvr-9999.ebuild))

## References
[http://www.satnigmo.com/900/canaldigital-nordic-oscam-config/](http://www.satnigmo.com/900/canaldigital-nordic-oscam-config/)
[http://cardshare-viasat-canaldigital.blogspot.no/2012/08/oscam-config-oscamserver.html](http://cardshare-viasat-canaldigital.blogspot.no/2012/08/oscam-config-oscamserver.html)
[http://www.streamboard.tv/oscam/wiki/CardsList](http://www.streamboard.tv/oscam/wiki/CardsList)
[https://tvheadend.org/projects/tvheadend/wiki/Tvheadend_oscam_ziggo](https://tvheadend.org/projects/tvheadend/wiki/Tvheadend_oscam_ziggo)
