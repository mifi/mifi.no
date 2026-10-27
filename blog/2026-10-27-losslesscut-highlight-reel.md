---
slug: losslesscut-highlight-reel
title: 'Make a highlight reel from your LosslessCut projects'
authors: 'mifi'
tags: [losslesscut, ffmpeg, video, nodejs]
---

If you've marked the best moments of many videos as segments in [LosslessCut](https://losslesscut.app/), this script joins them all into one highlight reel, without exporting each file first.

<!--truncate-->

LosslessCut saves the segments you mark in a project file (`.llc`) next to each video. The script reads every `.llc` file in a folder, takes the segments from each one, scales them to the same size (adding black bars when the aspect ratio differs) and joins them with FFmpeg into `highlight-reel.mp4` in the same folder.

Unlike LosslessCut's own export, this re-encodes the video, so it works across videos with different sizes, frame rates and codecs. It's video only: audio is left out, since clips from different cameras rarely mix well anyway.

## Usage

You need [Node.js](https://nodejs.org/) 20 or newer and FFmpeg (`brew install ffmpeg` on a Mac).

```bash
mkdir highlight-reel && cd highlight-reel
curl -fsSLO https://mifi.no/scripts/losslesscut-highlight-reel.mjs
npm install json5

node losslesscut-highlight-reel.mjs /path/to/videos
```

Options:

- `--shuffle`: random order instead of by file name.
- `--max 20`: use at most 20 segments (after shuffling, so `--shuffle --max 20` makes a random selection).
- `--width 1920 --height 1080`: output size (default 1280×720).

A segment without an end point lasts until the end of its video.

## The script

```js file=../static/scripts/losslesscut-highlight-reel.mjs
```
