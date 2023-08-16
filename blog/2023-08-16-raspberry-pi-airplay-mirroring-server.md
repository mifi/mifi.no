---
slug: raspberry-pi-airplay-mirroring-server
title: 'Raspberry Pi AirPlay Mirroring server'
authors: 'mifi'
tags: [airplay, apple, raspberrypi, ]
---

How to setup an AirPlay server on a Raspberry Pi.

<!--truncate-->

Start with a fresh Raspberry Pi OS Bullseye **Lite**.

## Setup WiFi

https://wiki.archlinux.org/title/wpa_supplicant

First run `raspi-config` and enable WiFi.

```bash
wpa_cli -i wlan0
```

```
scan
scan_results
add_network
set_network 0 ssid "MYSSID"
set_network 0 psk "passphrase"
enable_network 0
save_config
quit
```

## Install X11

```
sudo apt-get install --no-install-recommends xserver-xorg xserver-xorg-legacy xinit x11-xserver-utils xinput libnss3
```

```
sudo usermod -a -G tty pi
```

`sudo nano /etc/X11/Xwrapper.config` and change it to:

```
allowed_users = anybody
```


## Install UxPlay

Reference: https://github.com/FDH2/UxPlay

```bash
sudo apt install cmake build-essential pkg-config

# uxplay deps
sudo apt-get install libx11-dev libssl-dev libplist-dev libavahi-compat-libdnssd-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev gstreamer1.0-plugins-base gstreamer1.0-libav gstreamer1.0-plugins-good gstreamer1.0-plugins-bad
```

Build UxPlay
```bash
git clone https://github.com/FDH2/UxPlay
cd UxPlay
cmake .
make
```

To test it:
```bash
# one terminal:
startx
# other terminal:
DISPLAY=:0 ./uxplay -bt709 -nh -n TV -fs
```

## Setup audio

```bash
sudo apt install gstreamer1.0-alsa
```

```bash
sudo usermod -a -G audio pi
```

`sudo raspi-config` then choose: System -> Audio -> HDMI

## Setup simple desktop (run on boot)

We'll use LightDM to provide a desktop.

```
sudo apt install -y lightdm
```

`sudo nano /etc/lightdm/lightdm.conf` and change these under `[Seat:*]`:

```
autologin-user=pi
```

```
xserver-command=X -nocursor
```

Then `nano ~/.xsession`:

```
xset s off
xset -dpms
xset s noblank

while true; do
  /home/pi/UxPlay/uxplay -bt709 -nh -n TV -fs -as alsasink
  sleep 5
done
```

`sudo raspi-config` then enable: System -> Boot -> Desktop GUI, automatically logged in as 'pi' user.

Reboot and test!
