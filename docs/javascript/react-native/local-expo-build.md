---
tags: [expo, react native, github, ci, typescript, coding]
---

# Fully local Expo EAS build for CI

[Expo EAS CLI](https://docs.expo.dev/eas/cli/) has a `--local` build mode but it's not completely local out of the box. This article describes how to make it less reliant on the [expo.dev](https://expo.dev/) cloud in order to build your app on a CI like GitHub Actions.

While Expo's documentation is quite comprehensive, their documentation for the `--local` mode is not that good (understandably, as it drives customers away from their paid cloud build service).

## Avoiding expo.dev login and interactivity

Create a token on the expo.dev site and use it as an env variable `EXPO_TOKEN`. Then run the build command with `--non-interactive`.

Ref:
- https://docs.expo.dev/accounts/programmatic-access/

## Local signing `credentials.json`

Normally credentials have to be set up in expo.dev and `eas build` will pull them from there on every build.

Solution: Set up a local `credentials.json` file and set `build.base.credentialsSource` to `local` inside `eas.json`.

```json
{
  "ios": {
    "distributionCertificate": {
      "path": "credentials/ios/dist-cert.p12",
      "password": "..."
    },
    "provisioningProfilePath": "credentials/ios/profile.mobileprovision"
  }
}
```

Generate signing credentials:

1. [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/certificates/list)
2. New certificate -> Apple Distribution
3. On macOS open Keychain Access -> Request certificate from authority -> Save CSR locally
4. Upload CSR file
5. Download resulting `distribution.cer`
6. Open `distribution.cer` in Keychain Access
7. Right click new cert in Keychain Access and export as `p12` with a password (GA secret `DISTRIBUTION_CERT_PASSWORD`), save it to `credentials/ios/dist-cert.p12`
8. Delete the certificate you just imported from the keychain
9. GA secret `DISTRIBUTION_CERT_BASE64` to output of `base64 -i credentials/ios/dist-cert.p12 -o -`
10. Identifiers -> Create new app ID
11. Create new App Store Connect provisioning profile, download `.mobileprovision` file and move it to `credentials/ios/profile.mobileprovision`
12. GA secret `PROVISIONING_PROFILE_BASE64` to output of `base64 -i credentials/ios/profile.mobileprovision -o -`

Remember to add `/credentials` and `/credentials.json` to `.gitignore` (and `.easignore`).

For CI you will have to generate this `credentials.json` dynamically from secrets.

Ref
- https://docs.expo.dev/app-signing/local-credentials/#credentialsjson
- https://docs.expo.dev/app-signing/syncing-credentials/

## Local versioning

By default expo stores version in expo.dev and auto increments it there on every build. To instead use the local version, update `eas.json`:
- Add: `cli.appVersionSource: local`
- Remove: `build.*.autoIncrement`

Ref
- https://docs.expo.dev/build-reference/app-versions/

## Local `.env` not picked up

EAS will only use local `.env` files that are not `.gitignore`d. But it's common practice to ignore such files.

Solution: create a `.easignore` which contains the same content as `.gitignore`, *except* `.env` entries (and any other things that should be included).

Ref:
- https://www.reddit.com/r/expo/comments/1b7wn4y/local_eas_build_env_variables/
- https://docs.expo.dev/build-reference/easignore/
- https://docs.expo.dev/guides/environment-variables/
- `NODE_ENV` or not? https://github.com/expo/expo/issues/39842

## Building

Install fastlane:

```bash
brew install fastlane
```

Complete local build command:

```bash
EXPO_TOKEN='...' \
NODE_ENV=production \
EAS_LOCAL_BUILD_WORKINGDIR=./release \
EAS_LOCAL_BUILD_SKIP_CLEANUP=1 \
EAS_BUILD_DISABLE_EXPO_DOCTOR_STEP=1 \
EAS_LOCAL_BUILD_PLUGIN_PATH="$(yarn bin eas-cli-local-build-plugin)" \
yarn eas build --local --non-interactive --platform ios --profile production --output=./app.ipa
```

Explanation:
- `EXPO_TOKEN` is needed even if running local build in order to increment version in expo cloud (unless local versioning is enabled) and for environment variables in expo cloud
- `EAS_LOCAL_BUILD_WORKINGDIR` and `EAS_LOCAL_BUILD_SKIP_CLEANUP` is good for debugging failed builds.
- `EAS_LOCAL_BUILD_PLUGIN_PATH` is only needed if you don't want it to run a (slow) `npx eas-cli-local-build-plugin`, but instead use a local package with `yarn`.

## Uploading the build to App Store Connect

Initial setup:

1. [Users and Access](https://appstoreconnect.apple.com/access/users)
2. [Integrations](https://appstoreconnect.apple.com/access/integrations/api)
3. Create Team key
4. Role: *Developer*
5. Download key p8 and save it to `~/.appstoreconnect/private_keys/AuthKey_*.p8` and GA secret `API_KEY`
6. Copy Issuer ID to GA secret `API_ISSUER`
7. Copy Key ID to GA secret `API_KEY_ID`

This command can be run for every new `.ipa` to upload:
```bash
xcrun altool --upload-app --type ios --file app.ipa --apiKey $API_KEY_ID --apiIssuer $API_ISSUER
```

This can also be automated in CI with secrets.

## Other

If you're getting a signing error, you may have to patch this package: https://github.com/expo/eas-cli/pull/3679

## Limitations

Some operations are still hitting the expo.dev API, although I don't think that should be necessary. Hopefully this gets improved by the Expo team in the future.

## Related

- https://www.expobuilder.app/
- https://mifi.no/docs/github/electron-ci/ (Electron)
