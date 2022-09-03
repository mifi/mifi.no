---
slug: vipps-reverse-engineering
title: Reverse engineering DNB VIPPS API by injecting Charles cert as pinned SSL certificate
authors: mifi
tags: []
---

**UPDATE:** Outdated - [See new article](https://blog.mifi.no/2020/12/25/sniffing-ssl-traffic-on-android-vipps-payment-app/)

The VIPPS app is using API SSL certificate pinning to prevent MITM attacks, and the pinned certificate(s) is stored in the APK itself, so it can easily be replaced by our own generated Charles certificate. This allows sniffing the data going from the app to VIPPS servers.

<!--truncate-->

![charles](https://static.mifi.no/uploads/2017/03/Screen-Shot-2017-03-05-at-22.33.17.png)

# Instructions
First download the APK from somewhere (google it)

Debuild APK  
`apktool d no.dnb.vipps-1.6.5.apk`

Export Charles MITM SSL certificate by going to `Help -> SSL Proxying -> Save Charles Root Certificate`

Inject Charles certificate into app  
`cp charles-ssl-proxying-certificate.cer no.dnb.vipps-1.6.5.apk.out/res/raw/prod_priority_1.cer`

Put APK back together  
`apktool b no.dnb.vipps-1.6.5.apk.out -o vipps-modified.apk`

Generate debug keystore for signing the new app  
`echo y | keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "cn=Mark Jones, ou=JavaSoft, o=Sun, c=US"`

Sign app with keystore  
`apksigner sign --ks debug.keystore --out vipps-modified-signed.apk vipps-modified.apk`

Enter pw `android`

Verify signing  
`apksigner verify vipps-modified-signed.apk`

Install new APK to device  
`adb install vipps-modified-signed.apk`

Now just start Charles with SSL proxying enabled and set Charles (your computer's IP) as the proxy under WIFI settings on the Android device.

# Going further - decompiling

`brew install dex2jar`

`d2j-dex2jar -f -o vipps.jar no.dnb.vipps-1.6.5.apk`

Use one of the following GUI tools for decompiling and looking at the code:

- [https://github.com/skylot/jadx](https://github.com/skylot/jadx)
- [http://jd.benow.ca/](http://jd.benow.ca/)

None of them are perfect, and some code seems to fail decompiling in both.

## Links
- [http://stackoverflow.com/questions/21010367/how-to-decompile-an-apk-or-dex-file-on-android-platform](http://stackoverflow.com/questions/21010367/how-to-decompile-an-apk-or-dex-file-on-android-platform)
- [http://stackoverflow.com/questions/1249973/decompiling-dex-into-java-sourcecode](http://stackoverflow.com/questions/1249973/decompiling-dex-into-java-sourcecode)
