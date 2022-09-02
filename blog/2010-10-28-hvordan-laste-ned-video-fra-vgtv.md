---
slug: hvordan-laste-ned-video-fra-vgtv
title: Hvordan laste ned / rippe video fra VGTV
authors: mifi
tags:
  - script
---
Det er overraskende enkelt å lagre video fra [VGTV](http://www.vgtv.no/).

Jeg har laget et python-skript som automatisk henter ut adressen. [Last ned skriptet her](http://static.mifi.no/downloads/vgtv_url.py).

Kopier lenken til videoen du vil ha, feks. http://www.vgtv.no/?id=33283&category=1

Bruk python fra komandolinja og hent ut adressen ved hjelp av skriptet, eks.:
```bash
python vgtv_url.py http://www.vgtv.no/?id=33283
```

```bash
python.exe vgtv_url.py http://www.vgtv.no/?id=33283
```
(Windows CMD)

Du vil så få en `﻿rtmp://` URL. Åpne denne i VLC og fortell VLC å automatisk lagre videostrømmen.

**Eventuelt, bruk VLC eller mplayer på kommandolinjen med en av disse one-linerne:**
```bash
vlc "$(python vgtv_url.py http://www.vgtv.no/?id=X)" --demux=dump --demuxdump-file=video.mp4
```

```bash
mplayer -dumpfile video.mp4 -dumpstream "$(python vgtv_url.py http://www.vgtv.no/?id=X)"
```

**Gammel (manuell) metode:**
1. Ta URL-en til en video, f.eks.:
`http://www.vgtv.no/?id=33283&category=1`

2. Notér id (her: `33283`)

3. Gå inn på:
`http://www.vgtv.no/api/?do=playlist&id=NOTERT_ID`
F.eks.:
`http://www.vgtv.no/api/?do=playlist&id=33283`

3. Fra XML-filen, hent ut rtmp-adressen under følgende hierarki (prøv et vilkårlig location-element):
`<playlist> <trackList> <track> <location>`

Åpne så denne URL-en i MPlayer. F.eks.:
```bash
mplayer -dumpfile video.mp4 -dumpstream rtmp://88.87.43.102/streaming/mp4:storage/compressed//33283/flash_1000.mp4
```

Dette kan også gjøres med VLC:
```bash
vlc rtmp://88.87.43.98/streaming/mp4:storage/compressed//33283/flash_1000.mp4 --demux=dump --demuxdump-file=video.mp4
```

﻿Vent, og du har snart videoen på disk.
