---
slug: install-java-jdk-on-mac-osx-from-dmg-pkg-without-admin-root
title: Install Java JDK on Mac OSX from dmg/pkg without admin/root
authors: mifi
tags: [java]
---

Oracle no longer provides compressed versions of JDK 😡 and require root to install (probably they also install an auto updater nagging you all the time)

Download .dmg from Oracle and put in a directory

`cd directory-with-dmg`

`7z x jdk-8u181-macosx-x64.dmg`

*(alternatively, if you don't have 7zip mount dmg and copy out .pkg)*

`pkgutil --expand "JDK 8 Update 181/JDK 8 Update 181.pkg" jdk-pkg-unpacked`

`tar xvf jdk-pkg-unpacked/jdk180181.pkg/Payload`

Contents/Home is now the JDK root

`mv Contents/Home ~/jdk180181`

**Now you can put `JAVA_HOME="$HOME/jdk180181"` and `PATH="$PATH:$JAVA_HOME/bin"` and start using it**
