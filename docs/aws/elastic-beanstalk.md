---
tags: [aws, elasticbeanstalk, yarn, npm, nodejs, coding]
---
# Use Yarn for Elastic Beanstalk

This article describes how to use `yarn` (or any other package manager than npm) instead of `npm` when deploying an Elastic Beanstalk Node.js app.

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

**Update:** As of Amazon Linux 2023, `corepack` is no longer included, and needs to be explicitly installed:

Edit `your_project/.platform/hooks/prebuild/corepack.sh`:
```bash
#!/bin/bash
npm i -g corepack
```

> :warning: Be sure to also create symlinks under `confighooks` in your project, or else it will fail to build when changing config (e.g. updating environment values):

```bash
mkdir -p .platform/confighooks/{prebuild,predeploy}
ln -s ../../hooks/predeploy/yarn.sh .platform/confighooks/predeploy/yarn.sh
ln -s ../../hooks/prebuild/prevent-npm.sh .platform/confighooks/prebuild/prevent-npm.sh
ln -s ../../hooks/prebuild/corepack.sh .platform/confighooks/prebuild/corepack.sh
```

## References:
- https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-linux-extend.html
- https://stackoverflow.com/questions/41657226/customize-aws-elasticbeanstalk-nodejs-install-use-yarn/73522936#73522936
- https://pm2.keymetrics.io/docs/tutorials/use-pm2-with-aws-elastic-beanstalk/
