---
slug: migrate-wordpress-urls-to-nginx
title: Migrate WordPress URLs to nginx (hexo)
authors: mifi
tags:
  - script
  - tips
---
I have migrated my blog from [WordPress](https://wordpress.org/) to [hexo](https://hexo.io/), but the old URLs need to be permanently redirected.
I'm using NGINX as my web server, so I set up some rules for redirecting the old posts to the new URLs. It's a bit tricky because WordPress used query string param for identifying the page, but it can be sorted out using `if` and the NGINX `$arg_` variable. In order to generate these rules, I wrote a simple node script that runs through the exported Markdown files from WordPress. Markdown files were exported using [Jekyll Exporter](https://nb.wordpress.org/plugins/jekyll-exporter/) plugin.)

<!--truncate-->

`index.js`:
```javascript
const fm = require('front-matter');
const fs   = require('fs');
const moment = require('moment');
const path = require('path');

const dir = 'blog.mifi.no/source/_posts';
const baseUrl = 'https://blog.mifi.no/';

const files = fs.readdirSync(dir);

files.forEach((file) => {
  var doc = fm(fs.readFileSync(path.join(dir, file), 'utf8'));

  const id = doc.attributes['id'];
  if (!id) return;

  const date = moment(doc.attributes.date).utc()
  const url = `${baseUrl}${date.format('YYYY/MM/DD')}/${file.split('.md')[0]}`;

  console.log(`if ($arg_p = ${id}) { return 301 ${url}; }`);
});
```
```bash
npm i front-matter
npm i moment
node .
```

Then insert output from the script to the nginx server block of the old blog:

```
location /blog {
  <output from index.js cmd>

  # default redirect
  return 301 https://blog.mifi.no/;
}
```

Now that all pages have been redirected 301 to their new paths, a simple comment export from WordPress and import to Disqus was automatically able to crawl the old URL 301 redirects and update the URL of the Disqus comments. (Using the crawl migration tool in Disqus admin.)
