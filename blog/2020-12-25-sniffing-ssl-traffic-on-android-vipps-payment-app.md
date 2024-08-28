---
slug: sniffing-ssl-traffic-on-android-vipps-payment-app
title: Sniffing SSL traffic on Android (Vipps Payment App)
authors: mifi
tags: []
---

I [previously attempted to do the same](./2017-03-30-vipps-reverse-engineering.md) with an early version of the Vipps (Norwegian easy payment app), but the app has changed a lot since then. I decided to try again with the current version, and I learned that it has implemented quite a few new countermeasures preventing the old method from working.

<!--truncate-->

## The process

First download Vipps app on an Android phone, then connect it and copy the app over USB:

```sh
adb shell pm list packages | grep vipps
adb shell pm path no.dnb.vipps

adb pull /data/app/no.dnb.vipps-QLoJ4giHA8cXj7Pl6RI20A==/base.apk
adb pull /data/app/no.dnb.vipps-QLoJ4giHA8cXj7Pl6RI20A==/split_config.arm64_v8a.apk
adb pull /data/app/no.dnb.vipps-QLoJ4giHA8cXj7Pl6RI20A==/split_config.xxhdpi.apk
```

Note that app is split into 3 apk's. Now decompile the main APK:

```bash
apktool -r d base.apk
```

This will extract APK contents to `base`. I then used [jaxd-gui](https://github.com/skylot/jadx) to decompile and inspect the (obfuscated) Java/smali source code.

Now we need to remove the code that checks the SSL certificates inside the `X509TrustManager`s. These can be found in `base/smali_classes3/util/h/bs/a.smali` and `base/smali_classes3/util/ma/c.smali`. Just return `void` early:

```diff
.method public checkServerTrusted([Ljava/security/cert/X509Certificate;Ljava/lang/String;)V
+   return-void
```

Next, inside the file `base/smali/com/dnb/vipps/android/common/networking/h.smali` there is extra certificate pinning code, we need to remove that:

```diff
    public final l.h a() {
        h.a aVar = new h.a();
-       aVar.a("api.vipps.no", "sha256/nTNUIFsFUeN3c+hYZzlJfKRIwoRtRDyY6sVGPEauJWY=");
-       aVar.a("api.vipps.no", "sha256/O+qzlJSyoBSdYsSMceGYjjRqDxKVzUFjX0ymP+AC0f0=");
-       aVar.a("*.api.vipps.no", "sha256/nTNUIFsFUeN3c+hYZzlJfKRIwoRtRDyY6sVGPEauJWY=");
-       aVar.a("*.api.vipps.no", "sha256/O+qzlJSyoBSdYsSMceGYjjRqDxKVzUFjX0ymP+AC0f0=");
-       aVar.a("ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net", "sha256/Fig44L8aGm+MmceSD17e15lV7pWlsDvgViYUSaj/mqM=");
-       aVar.a("*.ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net", "sha256/Fig44L8aGm+MmceSD17e15lV7pWlsDvgViYUSaj/mqM=");
        return aVar.b();
    }
```

Next, the Android operating system provides an additional network security config. Add to `application` in `base/AndroidManifest.xml`:

```xml
<application ... android:networkSecurityConfig="@xml/network_security_config">
```

Then create a new file `base/res/xml/network_security_config.xml` with the contents:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="user" />
        </trust-anchors>
    </base-config>
</network-security-config>
```

Now recompile the modified APK:
```sh
apktool b base -o vipps-modified.apk
```

Now create a debug signing certificate for signing the APKs with:

```sh
echo y | keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "cn=Mark Jones, ou=JavaSoft, o=Sun, c=US"
```

Re-sign **all APKs** using the same debug keystore just created:

```sh
echo android | apksigner sign --ks debug.keystore --out vipps-signed.apk vipps-modified.apk
echo android | apksigner sign --ks debug.keystore --out split_config.arm64_v8a-signed.apk split_config.arm64_v8a.apk
echo android | apksigner sign --ks debug.keystore --out split_config.xxhdpi-signed.apk split_config.xxhdpi.apk
```

Install all the new APKs to the Android phone
```
adb install-multiple vipps-signed.apk split_config.arm64_v8a-signed.apk split_config.xxhdpi-signed.apk
```

Run [Charles proxy](https://www.charlesproxy.com/) with SSL proxying and add the following domains to `includes`:

```
api.vipps.no
login.vipps.io
*.bankidnorge.no
*.bankidapis.no
*.bankid.no
```

From Charles, export the generated root certificate and download it to your Android phone and trust it for all apps/browser.

On the Android phone, launch

Start the app and start sniffing SSL traffic!

## Next steps / observations

All Vipps related requests from startup, OTP, BankID auth and setting PIN as well as logging in:

```
https://api.vipps.no/app/security/v1/register
https://api.vipps.no/vipps-1.8/u-security/v1/generateotp/
https://api.vipps.no/vipps-1.8/u-security/v1/validateotp/
https://api.vipps.no/app/security/v1/token
https://api.vipps.no/bankid-auth/v1/bankid/url?login_hint=BID
https://login.vipps.io/vinx?login_hint=BID&requestId=...&session=...&target=https%3A%2F%2Fvipps.no%2F
https://login.vipps.io/bid/oidc/callback?state=vinx%3A...&session_state=...&code=...
https://login.vipps.io/vinx/callback?state=vinx%3A...&session_state=...&code=...
https://oidc.bankidapis.no/auth/realms/prod/precheck/auth?client_id=Vipps-BankID-Prod&login_hint=BID&nonce=...&redirect_uri=https%3A%2F%2Flogin.vipps.io%2Fbid%2Foidc%2Fcallback&response_type=code&scope=openid+profile+nnin_altsub&state=vinx%3A...&ui_locales=en
https://api.vipps.no/app/security/v1/token
https://api.vipps.no/app/security/v1/passphrase/srp/pin
https://api.vipps.no/app/security/v1/login/srp/init
https://api.vipps.no/app/security/v1/login/srp/pin/verify
https://api.vipps.no/vipps-1.8/u-security/v1/vinxlogin
https://api.vipps.no/vipps-1.8/a-profile/v1/details
https://api.vipps.no/vipps-1.8/customer/fetchblockedusers
https://api.vipps.no/vipps-1.8/merchantTransaction/v1/dueList
https://api.vipps.no/vipps-1.8/utility/v1/configParams
https://api.vipps.no/vipps-1.8/oneclick/v1/pendingRequests
https://api.vipps.no/vipps-1.8/invoice/v2/invoices_v3
https://api.vipps.no/vipps-1.8/a-profile/v1/details
https://api.vipps.no/vipps-1.8/payment/api/v1/agreement?includeCharges=true&status=PENDING
https://api.vipps.no/vipps-1.8/a-profile/v1/details
https://api.vipps.no/vipps-1.8/a-profile/v1/consents/consentcard
https://api.vipps.no/vipps-1.8/vippslogin/v1/vippslogintoken
```

- I'm stuck at the salting/hashing algorith of the PIN when creating/authenticating with a PIN. Seems like the app uses the [Secure Remote Password protocol (SRP)](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol)
- Seems like it uses [JSON Web Key](https://auth0.com/docs/tokens/json-web-tokens/json-web-key-sets) for the initial `/app/security/v1/register` `deviceKeys`  call.
- SRP hashes and salt seems to be encoded using (base64url)[https://github.com/joaquimserafim/base64-url]

## Other reverse engineering tips

- Dump resources (strings/translations): `aapt dump resources base.apk | less`

## References

- https://developer.android.com/training/articles/security-config
- https://medium.com/@SwiftSafe/bypassing-and-disabling-ssl-pinning-on-android-to-perform-man-in-the-middle-attack-1ef18f5a453a
- https://medium.com/@hojat.sajadinia/bypass-okhttp-certificatepinner-on-android-9a45ad80a58b
