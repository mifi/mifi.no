#!/usr/bin/env node
import assert from 'assert';
import { writeFile } from 'fs/promises';

const author = 'mifi';

const title = process.argv[2];
assert(title, 'Title needed');

// https://stackoverflow.com/a/1054862/6519037
const slug = title.toLowerCase().replace(/ /g, '-').replace(/[-]+/g, '-').replace(/[^\w-]+/g, '');

const esc = (str) => `'${str.replace(/'/g, "''")}'`;

const md = `\
---
slug: ${slug}
title: ${esc(title)}
authors: ${esc(author)}
tags: []
---

EXCERPT

<!--truncate-->

CONTENT

`;

const date = new Date().toISOString().split('T')[0];
const filename = `${date}-${slug}.md`;

const filePath = new URL(`blog/${filename}`, import.meta.url);

await writeFile(new URL(filePath), md);

console.log(filePath.toString());
