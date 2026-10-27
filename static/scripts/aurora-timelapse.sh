#!/bin/bash
# Turns a folder of photos (e.g. iPhone HEIC photos of the northern lights) into a smooth, stabilized timelapse video.
# Run it in the folder with the photos. Needs ImageMagick (brew install imagemagick) and an ffmpeg with vidstab
# (Homebrew's ffmpeg doesn't have it, see the link below).
# Original: https://mifi.no/scripts/aurora-timelapse.sh
# See https://mifi.no/docs/media-cli/#aurora-timelapse-from-photos
set -e

# Stabilizing needs ffmpeg built with libvidstab
if ! ffmpeg -hide_banner -filters 2>/dev/null | grep -q vidstabdetect; then
  echo "This ffmpeg has no vidstab filters, see https://mifi.no/docs/media-cli/#stabilizing-needs-vidstab"
  exit 1
fi

# Photos per second. Lower is slower; the smoothing step fills in frames in between.
IMAGE_RATE=4/3
# Output size: 720 wide, height keeping the aspect ratio. Use scale=-2:720 for 720 high.
SCALE="scale=720:-2"
INPUT_GLOB='IMG_*.HEIC'

echo "Converting to JPEG"
mkdir -p jpeg-tmp
for f in $INPUT_GLOB; do
  [ -f "jpeg-tmp/$f.jpg" ] || magick "$f" "jpeg-tmp/$f.jpg"
done

echo "Merging"
ffmpeg -r "$IMAGE_RATE" -pattern_type glob -i "jpeg-tmp/$INPUT_GLOB.jpg" -c:v libx264 -vf "$SCALE" -pix_fmt yuv420p -crf 15 -y merged.mp4

echo "Stabilizing"
ffmpeg -i merged.mp4 -vf vidstabdetect=stepsize=32:shakiness=10:accuracy=10:result=transform_vectors.trf -f null -
ffmpeg -i merged.mp4 -vf vidstabtransform=input=transform_vectors.trf:zoom=0:smoothing=10 -c:v libx264 -crf 15 -preset slow -an -y stabilized.mp4

echo "Smoothing (blending frames to 25 fps)"
ffmpeg -i stabilized.mp4 -vf minterpolate=fps=25:mi_mode=blend -c:v libx264 -crf 17 -pix_fmt yuv420p -y output.mp4

echo "Done: output.mp4"
