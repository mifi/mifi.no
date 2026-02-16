---
title: 'TinyShare — TypeScript-first social share helper'
authors: 'mifi'
tags: [typescript, javascript, open-source]
---

TinyShare is a tiny, TypeScript-first helper that builds social sharing URLs and opens share windows. It’s a single-file, dependency-free, programmatic alternative to DOM-bound sharer libraries.

<!--truncate-->

Why use it?

- Type-safe options per service (good autocompletion and compile-time checks).
- Minimal: no runtime dependencies, small footprint.
- Programmatic: call `share(...)` from your UI code — no attribute bindings.

Example

```ts
import share from 'tinyshare'
share('https://example.com', 'twitter', { title: 'Hello', hashtags: 'news' })
```

See the repo: https://github.com/mifi/tinyshare — MIT licensed.

Credits: Forked from [Sharer.js](https://github.com/ellisonleao/sharer.js) by Ellison Leao.
