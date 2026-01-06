---
tags: [scripts, coding]
---
# Scripts

## Split a PDF by ranges/subranges

```js
import { DateTime } from 'luxon';
import assert from 'node:assert';
import { readFile, writeFile } from 'node:fs/promises';
import { PDFDocument } from 'pdf-lib';

// eslint-disable-next-line unicorn/no-unreadable-array-destructuring
const [, , pdfPath, fromYearMonth, pageLengthsStr] = process.argv;

assert(pdfPath);
assert(fromYearMonth);

const sourceDoc = await PDFDocument.load(await readFile(pdfPath));
// console.log(sourceDoc.getPageIndices())

const currencies = ['EUR', 'NOK', 'USD'];

const pages = sourceDoc.getPages();
assert(pages.length >= currencies.length);

assert(pageLengthsStr && /^[\d,]+$/.test(pageLengthsStr));
const pageLengths = pageLengthsStr.split(',').map((str) => parseInt(str, 10));
assert(pageLengths.every((l) => !Number.isNaN(l)));

console.log(`${pages.length} pages`);
if (pageLengths != null) console.log(`Document page lengths: ${pageLengths.join(', ')}`);
else console.log('assuming all documents have pages of length 1');

const firstDate = DateTime.fromISO(`${fromYearMonth}-01`);
assert(firstDate.isValid);

let pageAt = 0;
for (let i = 0; pageAt < pages.length; i += 1) {
  const currency = currencies[i % currencies.length];
  const relMonth = Math.floor(i / currencies.length);

  const fromDate = firstDate.plus({ months: relMonth });
  const toDate = fromDate.endOf('month');

  const numPagesToCopy = pageLengths != null ? pageLengths[i] : 1;
  if (numPagesToCopy == null) throw new Error(`page length not found for document ${i + 1}`);
  // eslint-disable-next-line no-loop-func
  const pagesToCopy = Array.from({ length: numPagesToCopy }).map((_v, j) => pageAt + j);

  console.log('Copying month', fromDate.toISODate(), 'to', toDate.toISODate(), currency, 'pages', pagesToCopy);

  if ((pagesToCopy.at(-1) ?? 0) >= pages.length) {
    throw new Error('Page overflow');
  }

  const outDoc = await PDFDocument.create();
  const copiedPages = await outDoc.copyPages(sourceDoc, pagesToCopy);
  copiedPages.forEach((copiedPage) => outDoc.addPage(copiedPage));
  const pdfBytes = await outDoc.save();

  const outPath = `${fromDate.toISODate()}-Revolut-${currency}.pdf`;
  await writeFile(outPath, pdfBytes);

  pageAt += numPagesToCopy;
}
```
