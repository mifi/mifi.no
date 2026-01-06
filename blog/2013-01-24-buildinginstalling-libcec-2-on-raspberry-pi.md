---
slug: buildinginstalling-libcec-2-on-raspberry-pi
title: Building/installing libcec 2 on Raspberry PI
authors: mifi
tags:
  - tips
---
Tested on Raspbian wheezy

## On your linux computer
From [https://github.com/Pulse-Eight/libcec/tags](https://github.com/Pulse-Eight/libcec/tags) download libcec-2.0.5-repack.
Apply this patch to configure.ac: [https://github.com/vulpesvelox/libcec/commit/3671569235896a7ed448384ea6777a981fd49be9](https://github.com/vulpesvelox/libcec/commit/3671569235896a7ed448384ea6777a981fd49be9).
```bash
tar xvf libcec-2.0.5-repack.tar.gz && cd libcec-libcec-2.0.5-repack
./project/RPi/build.sh "${PWD}"/project/RPi/build
```

## On the PI
```bash
apt-get install rsync
```

## On your linux computer
```bash
rsync -avz -e ssh project/RPi/build pi@192.168.1.121:
rsync -avz -e ssh project/RPi/deps/lib/liblockdev.* pi@192.168.1.121:build/lib
```

# On the PI
```bash
cp -a build/* /usr/local/
/usr/local/bin/cec-client
```

Fun time!
