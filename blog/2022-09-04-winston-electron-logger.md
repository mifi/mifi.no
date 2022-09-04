---
slug: winston-electron-logger
title: Using winston with electron
authors: mifi
tags: [winston, electron, logger]
---

Electron logs to `stdout` by default, so when you build a production app, those logs will not be saved anywhere. However `winston` opens up a whole plethora of options.

<!--truncate-->

First install deps:
```bash
yarn add winston electron-is-dev
```

```js
// logger.js

import winston from 'winston';
import util from 'util';
import isDev from 'electron-is-dev';
import { app } from 'electron';
import { join } from 'path';

// https://github.com/winstonjs/winston/issues/1427
const combineMessageAndSplat = () => ({
  transform(info) {
    const { [Symbol.for('splat')]: args = [], message } = info;
    // eslint-disable-next-line no-param-reassign
    info.message = util.format(message, ...args);
    return info;
  },
});

const createLogger = () => winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    combineMessageAndSplat(),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
});

const logDirPath = isDev ? '.' : app.getPath('userData');

const logger = createLogger();
logger.add(new winston.transports.File({ level: 'debug', filename: join(logDirPath, 'app.log'), options: { flags: 'a' } }));
if (isDev) logger.add(new winston.transports.Console());

export default logger;
```

> :warning: This assumes you're transpiling ESM, because Electron does [not yet support ESM](https://github.com/electron/electron/issues/21457). Tip: You can use [build-electron](https://github.com/mifi/build-electron) for this.

Then use your logger:
```js
import logger from './logger.js';

logger.error('Some error happened', err);
```

This will make your app log to `Library/Application\ Support/Your app/app.log` (on MacOS, and accordingly on other platforms). When running in development it will still log to your console.


Example outputs:
```js
logger.info({ someObj: 1 });
```
```
2022-09-04T14:28:09.278Z info: { someObj: 1 }
```
.
```js
logger.info('test', 1, 'a', { b: 2, c: 3 });
```
```
2022-09-04T14:28:09.281Z info: test 1 a { b: 2, c: 3 }
```
.
```js
logger.info('string');
```
```
2022-09-04T14:28:09.281Z info: string
```

.

```js
logger.info({ a: 1, b: [{ c: [1] }] });
```
```
2022-09-04T14:28:09.281Z info: { a: 1, b: [ { c: [Array] } ] }
```
.
```js
logger.info('1', '2', { a: 1 });
```
```
2022-09-04T14:28:09.281Z info: 1 2 { a: 1 }
```
.
```js
logger.info([{}, '']);
```
```
2022-09-04T14:28:09.281Z info: [ {}, '' ]
```
.
```js
logger.error(new Error('test1'), { additional: 'data' }, 'hmm');
```
```
2022-09-04T14:28:09.282Z error: Error: test1
    at Object.<anonymous> (app.js:39:14)
    at Module._compile (internal/modules/cjs/loader.js:968:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:986:10)
    at Module.load (internal/modules/cjs/loader.js:816:32)
    at Module._load (internal/modules/cjs/loader.js:728:14)
    at Function.Module._load (electron/js2c/asar.js:748:26)
    at Module.require (internal/modules/cjs/loader.js:853:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (electron.js:9:16)
    at Module._compile (internal/modules/cjs/loader.js:968:30) { additional: 'data' } hmm
```
.
```js
logger.error('error occurred', new Error('test2'), { additional: 'data' }, 'hmm');
```
```
2022-09-04T14:28:09.283Z error: error occurred test2 Error: test2
    at Object.<anonymous> (app.js:40:32)
    at Module._compile (internal/modules/cjs/loader.js:968:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:986:10)
    at Module.load (internal/modules/cjs/loader.js:816:32)
    at Module._load (internal/modules/cjs/loader.js:728:14)
    at Function.Module._load (electron/js2c/asar.js:748:26)
    at Module.require (internal/modules/cjs/loader.js:853:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (electron.js:9:16)
    at Module._compile (internal/modules/cjs/loader.js:968:30) { additional: 'data' } hmm
```
