---
slug: why-you-should-use-cache-control-no-store-on-indexhtml
title: 'Why you should use Cache-Control: no-store on index.html'
authors: 'mifi'
tags: []
---

Because of iOS Safari.

<!--truncate-->

I would say Safari on iOS has become the new IE - they just *have* to do things a little bit different.

Isn't it nice to have a HTTP standard [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) response header that lets us control how browsers cache our content? Well yes, until of course one of the most popular browsers doesn't follow that standard.

When building a website, e.g. single page application, we like to set `Cache-Control` `no-cache` or `max-age=300, must-revalidate` on the index page (`/`). That way, the browser will always revalidate with the server before considering using a cached version, and we can make sure that we're not serving old content to the user when pushing updates! 🙌 This seems to work nicely in most browsers. Even Safari on MacOS behaves like this. But not Safari on iOS 🤡

## How to reproduce 🤔

First start a HTTP server, e.g.:
```js
import http from 'http';

http.createServer((req, res) => {
  console.log(req.method, req.url, req.headers['user-agent'])
  res.setHeader('Cache-Control', 'no-cache')
  res.write('Hello World!');
  res.end();
}).listen(8080);
```

```bash
node index.mjs
```

Now open Safari on iOS and open your computer's IP in Safari `http://192.168.1.x:8080`

Observe an expected log line from the server:
```
GET / Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1
```

Now kill the Safari app and then repoen it. **This will cause Safari to load the page from its local cache without revalidating.**

Even adding `no-cache, must-revalidate, max-age=0` doesn't help. Safari still doesn't revalidate.

## Solution 🚀

The only sensible thing that makes sure nobody dares cache `index.html` is to set `Cache-Control: no-store`. This is not optimal, because it doesn't let us cache the page even for a short duration, and the browser always has to fully fetch the whole file every time, but hey, at least it works!

Alternatively, some people use `Vary: *`, which also seems to work, however I'm not sure how safe that is.
