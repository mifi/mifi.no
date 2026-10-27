import fs from 'node:fs';
import path from 'node:path';
import type { Code, Root, RootContent } from 'mdast';
import type { VFile } from 'vfile';

// Fills a code block with a file's contents at build time, so the file stays the only original:
// ```bash file=../../static/scripts/example.sh
// ```
// The path is relative to the markdown file and must be inside static/ (so it's public anyway).
// The file name becomes the block's title, unless it has one.
function fill(node: Code, vfile: VFile, staticDir: string) {
  const [, relativePath] = node.meta?.match(/(?:^|\s)file=(\S+)/) ?? [];
  if (relativePath == null) return;

  const fail = (reason: string) => new Error(`${vfile.path}: code block file=${relativePath}: ${reason}`);
  const filePath = path.resolve(path.dirname(vfile.path), relativePath);
  const relativeToStatic = path.relative(staticDir, filePath);
  if (relativeToStatic.startsWith('..') || path.isAbsolute(relativeToStatic)) throw fail(`must be inside ${staticDir}`);

  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    throw fail(err instanceof Error ? err.message : String(err));
  }

  // eslint-disable-next-line no-param-reassign
  node.value = content.replaceAll('\r\n', '\n').replace(/\n$/, '');
  // eslint-disable-next-line no-param-reassign
  if (!/(?:^|\s)title=/.test(node.meta ?? '')) node.meta = `${node.meta} title="${path.basename(filePath)}"`;
}

export default function codeFromFile({ staticDir }: { staticDir: string }) {
  return (tree: Root, vfile: VFile) => {
    const visit = (node: Root | RootContent) => {
      if (node.type === 'code') fill(node, vfile, staticDir);
      else if ('children' in node) node.children.forEach((child) => visit(child));
    };
    visit(tree);
  };
}
