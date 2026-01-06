---
tags: [coding, pdf]
---
# PDF development resources

Gathering some options for generating PDFs and pros/cons, in particular for very large PDF reports (100+ pages). Creating such large PDFs in a fast and reliable way is not trivial.

## Puppeteer
- Chromium based. Lots of print features, battle tested.
- Generates large PDF files and is extremely slow (5000 rows takes 2 minutes to generate).
- Can easily crash or run out of memory

## [`react-pdf`](https://github.com/diegomura/react-pdf)
- [Kind of supports tables](https://github.com/diegomura/react-pdf/issues/2099)
- Uses `pdfkit` internally
- Development is slow, [React18 not officially supported](https://github.com/diegomura/react-pdf/pull/1879#issuecomment-1355751515)

## [`pdfmake`](https://github.com/bpampuch/pdfmake)
Supports tables/multipage, but unstable/beta.

## [`react-to-print`](https://github.com/gregnb/react-to-print)
Render everything in the browser using HTML, and then use browser's print function to print/generate PDF from a subset of the page.
- Slow in Chrome (like Puppeteer)
- Generates huge files (900mb for 5000 rows.)

## [`pdfme`](https://github.com/pdfme/pdfme)
Template based. Not suited for multi-page tables.

## Low level JS PDF libraries
These have seemingly no multipage layouts and table support:
- https://github.com/parallax/jsPDF
- https://github.com/foliojs/pdfkit
- https://github.com/Hopding/pdf-lib

## [`html2pdf.js`](https://github.com/eKoopmans/html2pdf.js)
- uses jsPDF
- Con: Renders all content into an image, then places that image into a PDF: This means text is not selectable or searchable, and causes large file sizes.

# Alternatives

## CSV

Fast and easy to generate. No layout/styling possibilities.

## [XLSX](https://docs.sheetjs.com/) export

Although XLSX does have layout options, styling is only suported in their Pro version https://sheetjs.com/pro
alternatively https://github.com/gitbrent/xlsx-js-style
