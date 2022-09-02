---
slug: getting-xbmc-to-work-with-airplay-on-ios7
title: Getting XBMC to work with AirPlay on iOS7
authors: mifi
tags:
  - apple
---
Since iOS 7 broke Airplay for XBMC, a guy figured out how to get it working again. It involves sending extra Bonjour publishes.

When building ffmpeg make sure to enable gnutls support (required for HTTP Live Streaming over HTTPS)
Make sure that you have enabled airplay and avahi support (in gentoo, use flags airplay, avahi), and that you have libshairplay installed when building XBMC.
https://github.com/juhovh/shairplay ([gentoo ebuild here](https://github.com/frace/xbmc-overlay/tree/master/media-plugins/xbmc-addon-libshairplay))

So the trick is to publish an extra airplay service with a different name after XBMC has published. For instance after 60 seconds:

```
avahi-publish -s "iXBMC" _airplay._tcp 36667 "deviceid=FF:FF:FF:FF:FF:FF" "features=0x77" "model=AppleTV3,2" "srcvers=101.28"
```

Replace `FF:FF:FF:FF:FF:FF` with your mac address

You can put it in `.xinitrc` or `rc.local`, like this:

```bash
(sleep 60 && avahi-publish -s "iXBMC" _airplay._tcp 36667 "deviceid=FF:FF:FF:FF:FF:FF" "features=0x77" "model=AppleTV3,2" "srcvers=101.28") &
```

Source:
[ermax @ xbmc forums](http://forum.xbmc.org/showthread.php?tid=179961)
