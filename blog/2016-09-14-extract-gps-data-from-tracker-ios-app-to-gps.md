---
slug: extract-gps-data-from-tracker-ios-app-to-gps
title: 'Extract GPS data from "Tracker" iOS app to GPS'
authors: mifi
tags:
  - script
---
Quick script for extracting gps data from the `Tracker` GPS app

First export data from app `com.eofster.tracker` using something like iPhone Backup Extractor (http://supercrazyawesome.com/)

```bash
mkdir tracker-extract && cd tracker-extract

npm install csvtojson
npm install gps-to-gpx

(cd 'com.eofster.tracker/Library/Application Support/com.eofster.tracker' && sqlite3 -header -csv Tracker.sqlite "select * from ZTRACKPOINT order by ZTIMESTAMP;" > out.csv)
```

Create `index.js`:
```javascript
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

const createGpx = require('gps-to-gpx').default;

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonArray) {
   //console.log(jsonArray);
   const converted = jsonArray.map(pos => {
     return {
       latitude: pos.ZLATITUDE,
       longitude: pos.ZLONGITUDE,
       elevation: pos.ZALTITUDE,
       time: new Date((pos.ZTIMESTAMP+978307200)*1000).toISOString()
     };
   });

   const gpx = createGpx(converted, {
     activityName: 'tur',
     startTime: converted[0].time,
   });

   console.log(gpx);
});

//read from file
require("fs").createReadStream("out.csv").pipe(converter);
```

Run:
```
node . > out.gpx
```
