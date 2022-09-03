---
slug: aws-eb-yarn
title: Use Yarn for Elastic Beanstalk (or any other package manger than npm)
authors: mifi
tags: [eb, elasticbeanstalk, yarn, npm, nodejs]
---

This article describes how to use `yarn` instead of `npm` when deploying an Elastic Beanstalk Node.js app.

<!--truncate-->

One problem is that EB will automatically run `npm install` if it finds a `package.json` file. An easy way to prevent EB from running `npm install` is to create an empty `node_modules` folder in a `prebuild` hook:

Inside your project root directory (where EB is configured), run:
```bash
mkdir -p .platform/hooks/{prebuild,predeploy}
```

Then create `.platform/hooks/prebuild/prevent-npm.sh`:
```bash
#!/bin/bash
# EB build scripts will not install using npm if node_modules folder exists
mkdir node_modules
```

This way, EB will still install Node.js, so you don't have to install that yourself. But it will skip `npm install` when `node_modules` exists.

Then, inside the `predeploy` hook, you can run `yarn` or whatever you like. If you are running Node.js 16 or newer, you can use `corepack yarn`, and it will *just work* (you don't have to install yarn from yum, npm or anything else.)

Create `.platform/hooks/predeploy/yarn.sh`:
```bash
#!/bin/bash
corepack yarn
```

> :warning: Be sure to also create symlinks under `confighooks` in your project, or else it will fail to build when changing config (e.g. updating environment values):

```bash
mkdir -p .platform/confighooks/{prebuild,predeploy}
ln -s ../../hooks/predeploy/yarn.sh .platform/confighooks/predeploy/yarn.sh
ln -s ../../hooks/prebuild/prevent-npm.sh .platform/confighooks/prebuild/prevent-npm.sh
```

## References:
- https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.html
- https://stackoverflow.com/questions/41657226/customize-aws-elasticbeanstalk-nodejs-install-use-yarn/73522936#73522936
- https://pm2.keymetrics.io/docs/tutorials/use-pm2-with-aws-elastic-beanstalk/
