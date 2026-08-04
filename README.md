# mifi.no

Built using [Docusaurus](https://docusaurus.io/).

Old site can be found at https://github.com/mifi/mifi.no-old

### Installation

```bash
yarn
```

### Local Development

```bash
yarn dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Create blog post

```bash
yarn make-blogpost 'My blogpost title'
```

### Build

```bash
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Push master branch.

All branches are automatically deployed via [Cloudflare](https://dash.cloudflare.com/18e159c173866e22535de4ea38ad475c/workers/services/view/mifi-no/production) — non-`master` branches get their own preview URL, shown on each build in the Cloudflare dashboard.

### TODO

BugSnag
