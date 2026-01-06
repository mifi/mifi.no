---
tags: [macos, tips, coding]
---
# Installing `.pkg` files without admin

How to install a MacOS `.pkg` on a Mac without root/admin privileges ☺️

<!--truncate-->

First download the `.dmg`, then extract it:

```bash
7z x Downloaded.dmg
```

Alternatively, if you don't have 7zip mount dmg and copy out `.pkg` file.

Next, extract the `.pkg` file:

```bash
pkgutil --expand "App/App.pkg" pkg-unpacked
```

Next, extract the Payload inside the extracted `.pkg`:

```bash
tar xvf pkg-unpacked/*.pkg/Payload
```

See also:
- [TeamViewer](/blog/installing-teamviewer-without-rootadmin-on-macos)
- [Java JDK](/blog/install-java-jdk-on-mac-osx-from-dmg-pkg-without-admin-root)
