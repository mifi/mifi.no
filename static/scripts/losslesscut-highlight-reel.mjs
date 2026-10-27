#!/usr/bin/env node
// Makes a highlight reel from LosslessCut projects: the cut segments of every .llc project file in a folder,
// scaled to the same size and joined into one video (video only, no audio).
// Usage: node losslesscut-highlight-reel.mjs <folder> [--shuffle] [--max 20] [--width 1280] [--height 720]
// Needs Node.js 20+, ffmpeg, and the json5 package (npm install json5) next to this script.
// Original: https://mifi.no/scripts/losslesscut-highlight-reel.mjs
// See https://mifi.no/blog/losslesscut-highlight-reel/
import { spawn } from 'node:child_process';
import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import JSON5 from 'json5';

const { positionals: [dir], values } = parseArgs({
  allowPositionals: true,
  options: {
    shuffle: { type: 'boolean', default: false },
    max: { type: 'string' },
    width: { type: 'string', default: '1280' },
    height: { type: 'string', default: '720' },
  },
});
if (!dir) {
  console.error('Usage: node losslesscut-highlight-reel.mjs <folder> [--shuffle] [--max 20] [--width 1280] [--height 720]');
  process.exit(1);
}

// Collect segments from the project files, in file name order
let clips = [];
for (const name of (await readdir(dir)).filter((n) => n.endsWith('.llc')).sort()) {
  const { mediaFileName, cutSegments = [] } = JSON5.parse(await readFile(join(dir, name), 'utf8'));
  const filePath = join(dir, mediaFileName);
  if (await access(filePath).then(() => true, () => false)) {
    clips.push(...cutSegments.map(({ start, end }) => ({ filePath, start, end })));
  } else {
    console.warn(`Skipping ${name}: ${mediaFileName} not found`);
  }
}

if (values.shuffle) clips = clips.map((c) => [Math.random(), c]).sort(([a], [b]) => a - b).map(([, c]) => c);
if (values.max) clips = clips.slice(0, Number(values.max));
if (clips.length === 0) throw new Error('No segments found');
console.log(`Joining ${clips.length} segments`);

const { width, height } = values;
const outputPath = join(dir, 'highlight-reel.mp4');

const args = [
  // One input per segment, seeking fast to its start (a segment without an end lasts to the end of the file)
  ...clips.flatMap(({ filePath, start, end }) => ['-ss', String(start ?? 0), ...(end != null ? ['-to', String(end)] : []), '-i', filePath]),
  '-filter_complex', [
    // Fit each segment inside width x height, with black bars where the aspect ratio differs
    ...clips.map((_, i) => `[${i}:v]scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,setpts=PTS-STARTPTS[v${i}]`),
    `${clips.map((_, i) => `[v${i}]`).join('')}concat=n=${clips.length}:v=1:a=0[out]`,
  ].join(';'),
  '-map', '[out]', '-c:v', 'libx264', '-crf', '20', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-y', outputPath,
];

const ffmpeg = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' });
const code = await new Promise((resolve) => ffmpeg.on('close', resolve));
if (code !== 0) throw new Error(`ffmpeg failed with exit code ${code}`);
console.log(`Done: ${outputPath}`);
