# mifi.no

[Docusaurus](https://docusaurus.io/) site (blog + docs). Production is S3/CloudFront, deployed from `master` by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Build output goes to `build/`.

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

Prefer this over creating the files by hand.

### Show a file in a code block

Put the file in `static/` (so it's also downloadable), and reference it from an empty code block with a path relative to the markdown file:

````md
```bash file=../../static/scripts/example.sh
```
````

The build fills in the file's contents and uses the file name as the title ([src/remark/codeFromFile.ts](src/remark/codeFromFile.ts)). The page stays plain `.md`, and the file stays the only original.

### Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Push the `master` branch.

### Branch previews

Every pushed branch is also built by Cloudflare Workers ([`wrangler.jsonc`](wrangler.jsonc)) and gets its own preview URL. `master` goes to the worker's own hostname. This is separate from production, which stays on S3/CloudFront: pushing to `master` triggers both.

### TODO

BugSnag
