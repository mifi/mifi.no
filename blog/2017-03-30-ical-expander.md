---
slug: ical-expander
title: Complete ICS / iCal / iCalendar parser / expander
authors: mifi
tags:
  - open source
  - javascript
  - nodejs
---
I had trouble finding a iCalendar parser that lets me get the actual events as shown in my google calendar. This means automatically handling EXDATE (excluded recursive occurrences), RRULE and recurring events overridden by RECURRENCE-ID. Also timezones need to be supported.

So I made a library that builds on [ical.js](https://github.com/mozilla-comm/ical.js).

[ical-expander](https://github.com/mifi/ical-expander)
