---
tags: [electron]
---
# Electron

## Using `@electron/remote` with ESM

Unfortunately using `window.require('@electron/remote').require('./main.js')` doesn't work anymore when using ESM. Luckily there's a workaround. We can use the `remote-require` event to override the require and return our API. First register an event handler on your `main` file's `app`.

```ts
const api = {
  // Put all the things that you would previously put in `module.exports`:
  myApiFunction1,
  myApiFunction2,
  // ...
}

app.addListener('remote-require', (event, _webContents: unknown, moduleName: string) => {
  if (moduleName === './main.js') {
    // eslint-disable-next-line no-param-reassign
    event.returnValue = api;
  }
});
```

Now in your renderer you can use it as normal:

```ts
const { myApiFunction1, myApiFunction2 } = window.require('@electron/remote').require('./main.js');
```

See also [LosslessCut code](https://github.com/mifi/lossless-cut).
