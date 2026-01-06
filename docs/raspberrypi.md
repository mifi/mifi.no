---
tags: [linux, raspberry pi]
---
# Raspberry Pi

## Connecting to over USB or ethernet port (without DHCP)

```bash
ssh pi@raspberrypi.local
```

## Shrink SD card image from MacOS

```bash
docker run --privileged=true --rm --volume $(pwd):/workdir mgomesborges/pishrink pishrink -Zv rpi.img rpi-shrunk.img
```

https://github.com/Drewsif/PiShrink
