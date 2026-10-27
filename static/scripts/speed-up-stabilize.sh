#!/bin/bash
# Speeds up a video (e.g. a long handheld clip into a hyperlapse) and stabilizes it. Audio is dropped.
# Usage: speed-up-stabilize.sh input.mp4 [speedup factor, default 28]
# Needs ffmpeg with vidstab: brew install ffmpeg
# Original: https://mifi.no/scripts/speed-up-stabilize.sh
# See https://mifi.no/docs/media-cli/#speed-up-and-stabilize-a-video
set -e

IN_FILE="$1"
SPEEDUP="${2:-28}"
[ -f "$IN_FILE" ] || { echo "Usage: $0 input.mp4 [speedup]"; exit 1; }

FAST_FILE="$IN_FILE-fast.mp4"
TRF_FILE="$IN_FILE.trf"
OUT_FILE="$IN_FILE-stabilized.mp4"

ffmpeg -i "$IN_FILE" -vf "setpts=PTS/$SPEEDUP" -r 25 -an -c:v libx264 -crf 17 -preset slow -y "$FAST_FILE"

ffmpeg -i "$FAST_FILE" -vf vidstabdetect=stepsize=32:shakiness=10:accuracy=10:result="$TRF_FILE" -f null -
ffmpeg -i "$FAST_FILE" -vf vidstabtransform=input="$TRF_FILE":zoom=0:smoothing=10 -c:v libx264 -crf 17 -preset slow -an -y "$OUT_FILE"

echo "Done: $OUT_FILE"
