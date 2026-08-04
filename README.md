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

### Previewing changes

Two ways to look at work in progress, both free and already set up.

**Branch previews (pushed state).** Every branch push is built automatically by
[Cloudflare](https://dash.cloudflare.com/18e159c173866e22535de4ea38ad475c/workers/services/view/mifi-no/production).
`master` deploys to the worker's own hostname; every other branch gets its own
**Version Preview URL**, printed at the end of that build's log and linked from
the build in the dashboard. Production hosting is unaffected — that stays on
S3/CloudFront via `.github/workflows/deploy.yml`.

**Live dev server (unpushed work).** The dev server can be exposed at
<https://dev-tunnel.einemo.com> through
[mifi/dev-tunnel](https://github.com/mifi/dev-tunnel), a small self-hosted
tunnel on Cloudflare Workers. Useful for watching changes as they happen
without pushing, and it works from restricted environments (e.g. Claude Code
sessions) where cloudflared and ngrok cannot connect.

```bash
yarn dev --port 8080

# in the dev-tunnel checkout, with TUNNEL_SECRET set in the environment
cd agent && npm install
TUNNEL_HOST=dev-tunnel.einemo.com LOCAL_PORT=8080 node agent.mjs
```

Hot reload does not survive the tunnel (no WebSocket forwarding), so refresh
the page to pick up changes.

### TODO

BugSnag
