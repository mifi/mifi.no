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
    winston.format.simple(),
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
