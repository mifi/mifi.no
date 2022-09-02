---
slug: tool-to-make-unreadable-production-stack-traces-readable-using-source-maps
title: Quickly identify minified React Native / web production stacktraces with stacktracify
authors: mifi
tags:
  - stacktrace development node
---
Error in production? 😨

Stack trace looks like this? 😱

```
TypeError h is not a function. (In 'h()', 'h' is undefined) 
    main.jsbundle:954:5353 
    main.jsbundle:112:423 p
    main.jsbundle:112:1740 
    main.jsbundle:112:423 p
    main.jsbundle:112:898 n
    main.jsbundle:112:1273 
    main.jsbundle:50:205 c
    main.jsbundle:50:1623 b
    main.jsbundle:50:488 _
    [native code] value
    [native code] value
```

...perhaps from production from a minified web JS bundle or a React Native error report in a tool like Bugsnag, Sentry or Crashlytics

No source map yet uploaded to bugsnag? 😰

**stacktracify** takes a source map and a stack trace from **your clipboard** (or from a file) and outputs a readable stacktrace with proper line numbers for each line**

Example output:
```
TypeError h is not a function. (In 'h()', 'h' is undefined) 
    at getAuthToken (logic/api.js:67:20)
    at authRequest (logic/api.js:127:8)
    at data (logic/SaveQueue.js:30:20)
    at op (logic/SaveQueue.js:43:29)
    at __callImmediates (node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js:143:11)
```

## How to do this? 😰

**Copy the minified stack trace to clipboard, then run:**

```bash
npm i -g stacktracify

react-native bundle --platform ios --entry-file index.js --dev false --bundle-output ios-release.bundle --sourcemap-output ios-release.bundle.map

stacktracify ios-release.bundle.map
```

Now sit back and relax, analyze the stack trace 😅 and fix the bug 😎💯

Read more: https://github.com/mifi/stacktracify