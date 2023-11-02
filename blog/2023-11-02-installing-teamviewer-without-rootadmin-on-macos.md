---
slug: installing-teamviewer-without-rootadmin-on-macos
title: 'Installing TeamViewer without root/admin on MacOS'
authors: 'mifi'
tags: []
---

How to install TeamViewer on a Mac without admin privileges ☺️

<!--truncate-->

It used to be so easy to connect to someone's computer using TeamViewer, because TeamViewer used to provide a Chrome app, however after 2022 they don't provide that anymore, and when downloading TeamViewer, we are presented with an `Install TeamViewer.app` that requires admin privileges to install.

## There is a solution

First, copy `Install TeamViewer.app` from the `.dmg` to your home folder. Now we can extract the `.pkg` file:

```bash
pkgutil --expand-full Install\ TeamViewer.app/Contents/Resources/Install\ TeamViewer.pkg TeamViewer-extracted/
```

Notice how the TeamViewer-extracted folder contains a lot of crap: 💩

```
$ ls TeamViewer-extracted
AuthPluginPackage.pkg/ RemotePrintingPackage.pkg/ Distribution Resources/ FullEnforceUIVersionPackage.pkg/ TeamViewerApp.pkg/ FullSilentInstallerPackage.pkg/ UninstallerAppPackage.pkg/ PriviledgedHelperPackage.pkg/ UninstallerHelperPackage.pkg/ RemoteAudioDriverPackage.pkg/
```

We don't need any of those. Instead we will just grab the `TeamViewer.app` from inside mv `TeamViewerApp.pkg`:
```bash
mv TeamViewer-extracted/TeamViewerApp.pkg/Payload/TeamViewer.app ~/Desktop/
```

Then we can simply run our *admin privilege-free* `TeamViewer.app` without installing any of the other invasive stuff and we can flush the rest of it down the 🚽

```bash
rm -rf TeamViewer-extracted 
```