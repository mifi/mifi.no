import fs from 'node:fs';
import path from 'node:path';
import type { Code, Root, RootContent } from 'mdast';
import type { VFile } from 'vfile';

// Fills a code block with a file's contents at build time, so the file stays the only original:
// ```bash file=../../static/scripts/example.sh
// ```
// The path is relative to the markdown file. The file name becomes the block's title, unless it has one.
function fill(node: Code, vfile: VFile) {
  const [, relativePath] = node.meta?.match(/(?:^|\s)file=(\S+)/) ?? [];
  if (relativePath == null) return;

  const filePath = path.resolve(path.dirname(vfile.path), relativePath);
  // eslint-disable-next-line no-param-reassign
  node.value = fs.readFileSync(filePath, 'utf8').replace(/\n$/, '');
  // eslint-disable-next-line no-param-reassign
  if (!/(?:^|\s)title=/.test(node.meta ?? '')) node.meta = `${node.meta} title="${path.basename(filePath)}"`;
}

export default function codeFromFile() {
  return (tree: Root, vfile: VFile) => {
    const visit = (node: Root | RootContent) => {
      if (node.type === 'code') fill(node, vfile);
      else if ('children' in node) node.children.forEach((child) => visit(child));
    };
    visit(tree);
  };
}
