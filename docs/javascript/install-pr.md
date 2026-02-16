---
tags: [npm, javascript, scripts, coding]
---
# Install a PR or a fork of an npm package

An npm module is unmaintained or has a nice PR that you'd like to install in your own project.

```bash
yarn patch unmaintained-package
# spits out /tmp/yarn/path
```

Then checkout the fork/branch:
```bash
git clone -b branch git@github.com:user/project.git
cd project
corepack yarn
corepack yarn build

rm -rf /tmp/yarn/path/dist
mv dist /tmp/yarn/path/
```

Then again in my project:
```bash
yarn patch-commit -s /tmp/yarn/path
yarn
```
