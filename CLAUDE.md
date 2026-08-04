# mifi.no

Docusaurus site (blog + docs). Production is S3/CloudFront, deployed from
`master` by `.github/workflows/deploy.yml`. Build output goes to `build/`.

## Showing the user your work

Do not leave the user guessing what a change looks like — this repo has two
preview mechanisms, both documented under **Previewing changes** in
[README.md](README.md):

- **Live dev server over the tunnel** — best during active iteration; the user
  gets a URL that reflects the running dev server, no push needed. Offer this
  when starting visual work.
- **Cloudflare branch previews** — every pushed branch gets its own URL, good
  for reviewing a finished state.

Read the README section for the exact commands before using either.

## Notes

- `yarn make-blogpost 'Title'` scaffolds a blog post; prefer it over creating
  files by hand.
- Preview builds and production deploys are separate systems; pushing to
  `master` triggers both.
