---
tags: [video, photo, ffmpeg, tips, coding]
---
# FFmpeg, ImageMagick and ExifTool cheat sheet

Commands I keep coming back to for video and photos. Install the tools with `brew install ffmpeg imagemagick exiftool` (the stabilizing scripts need [a different ffmpeg](#stabilizing-needs-vidstab)).

See also [LosslessCut](https://losslesscut.app/) for lossless cutting and merging with a GUI.

## Video (FFmpeg)

### Count frames

```bash
ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 input.mp4
```

### Images to video

5 images per second, output 25 fps. Then copy the first image's date to the video:

```bash
ffmpeg -framerate 5 -pattern_type glob -i '*.jpg' -c:v libx264 -r 25 -pix_fmt yuv420p out.mp4
touch -r "$(ls *.jpg | head -1)" out.mp4
```

Add `-vf reverse` to play it backwards.

### Shrink all videos in a folder

720p H.264, keeping each file's date:

```bash
mkdir -p out
for file in *; do
  [ -f "$file" ] || continue
  ffmpeg -i "$file" -y -c:a aac -b:a 120k -vf scale=-2:720 -c:v libx264 -crf 30 -pix_fmt yuv420p "out/$file" || break
  touch -r "$file" "out/$file"
done
```

Raise `-crf` for smaller files and lower quality (23 is the default, 30 is quite compressed). `-pix_fmt yuv420p` keeps the output 8-bit, so iPhone HDR (10-bit) videos still play everywhere.

### Generate silent audio

10 seconds of stereo silence:

```bash
ffmpeg -f lavfi -i anullsrc=r=44100:cl=stereo -t 10 -y silence.wav
```

### Aurora timelapse from photos

Turns a folder of photos (I used iPhone HEIC photos of the northern lights) into a smooth timelapse: converts them to JPEG, merges them at a few photos per second, stabilizes the result with [vidstab](https://github.com/georgmartius/vid.stab), and blends frames up to 25 fps with `minterpolate` so it doesn't look choppy. Run it in the folder with the photos, and tweak the settings at the top.

```bash file=../static/scripts/aurora-timelapse.sh
```

### Speed up and stabilize a video

Turns a long handheld clip into a smooth hyperlapse: speeds it up (28× by default) and stabilizes it with vidstab.

```bash file=../static/scripts/speed-up-stabilize.sh
```

### Stabilizing needs vidstab

The stabilizing scripts use the vidstab filters, which Homebrew's own `ffmpeg` is built without. Check with `ffmpeg -filters | grep vidstab`. To get them, replace it with the [homebrew-ffmpeg](https://github.com/homebrew-ffmpeg/homebrew-ffmpeg) build:

```bash
brew uninstall ffmpeg
brew tap homebrew-ffmpeg/ffmpeg
brew install homebrew-ffmpeg/ffmpeg/ffmpeg --with-libvidstab
```

## Photos (ImageMagick and ExifTool)

### Shrink photos to a number of pixels

The `@` suffix resizes to a total pixel area instead of a width or height, so portrait and landscape photos end up the same size (300000 pixels is about 670×450):

```bash
shopt -s nullglob nocaseglob
for file in *.jpg *.jpeg; do
  [[ "$file" == *-small.jpg ]] && continue
  magick "$file" -resize 300000@ -auto-orient -quality 70 "${file%.*}-small.jpg"
  touch -r "$file" "${file%.*}-small.jpg"
done
```

### Set file dates from the photo's EXIF date

Useful after copying photos, which often resets the file dates:

```bash
exiftool "-FileModifyDate<DateTimeOriginal" folder/
```

### Strip all metadata

Removes location, camera and other metadata before sharing a photo, but keeps the rotation and colour profile so it still looks right. `-overwrite_original` stops ExifTool from leaving a `photo.jpg_original` copy (with all the metadata) next to it:

```bash
exiftool -all= -tagsfromfile @ -Orientation -ICC_Profile -overwrite_original photo.jpg
```
