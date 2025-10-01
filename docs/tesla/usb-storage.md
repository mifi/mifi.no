---
authors: mifi
tags: [tesla, usb, boombox, teslacam, sentry]
---

# USB storage

## Multiple partitions

How to format the Tesla USB stick to allow recording TeslaCam / Sentry Mode as well as Boombox with the same stick.

Command on MacOS:

**Note**: replace `/dev/disk4` with your USB stick.

```bash
diskutil partitionDisk /dev/disk4 MBR ExFAT "TESLACAM" 128.2G ExFAT "BOOMBOX" 100M
```

Then create the required directories:

```bash
mkdir /Volumes/TESLACAM/Teslacam
mkdir /Volumes/BOOMBOX/Boombox
```

See also https://tesla-info.com/blog/tesla-storage-sentry-mode-dashcam.php

## Custom lock chime sound effect

Put a <1MB `LockChime.wav` file on the `TESLACAM` partition. Remember to amplify the audio first with for example Audacity.

```bash
ffmpeg -i /path/to/sound -ar 44100 -ac 2 -f wav -c pcm_s16le /Volumes/TESLACAM/LockChime.wav
```

## Custom horn sound effect

Put an MP3 file on the `BOOMBOX` partition under the `Boombox` folder.

```bash
ffmpeg -i /path/to/sound -ar 44100 -ac 2 -f mp3 /Volumes/BOOMBOX/Boombox/MyCustomSound.mp3
```
