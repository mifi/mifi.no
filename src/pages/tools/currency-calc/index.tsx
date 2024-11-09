import React, { HTMLAttributes, useCallback, useEffect, useMemo } from 'react';
import Layout from '@theme/Layout';
import { z } from 'zod';
import { DateTime } from 'luxon';
import ky, { HTTPError } from 'ky';
import { parse } from 'csv-parse/browser/esm/sync';
import invariant from 'tiny-invariant';
import useSWR from 'swr';

import 'flag-icons/css/flag-icons.min.css';
import { Currency, CurrencyWithNok, supportedCurrencies, supportedCurrenciesWithNok, supportedCurrencyCodes } from './currencies';


const currencySchema = z.object({
  FREQ: z.string(),
  Frekvens: z.string(),
  BASE_CUR: z.string(),
  Basisvaluta: z.string(),
  QUOTE_CUR: z.string(),
  Kvoteringsvaluta: z.string(),
  TENOR: z.string(),
  Løpetid: z.string(),
  DECIMALS: z.string(),
  CALCULATED: z.string(),
  UNIT_MULT: z.string(),
  Multiplikator: z.string(),
  COLLECTION: z.string(),
  Innsamlingstidspunkt: z.string(),
  TIME_PERIOD: z.string(),
  OBS_VALUE: z.string(),
}).array();

/**
 * Parse a localized number to a float.
 * https://stackoverflow.com/a/29273131/6519037
 * @param stringNumber - the localized number
 * @param locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
 */
function parseLocaleNumber(stringNumber: string, locale: string) {
  // eslint-disable-next-line unicorn/prefer-string-replace-all
  const thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '');
  // eslint-disable-next-line unicorn/prefer-string-replace-all
  const decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '');

  return parseFloat(stringNumber
    // eslint-disable-next-line unicorn/prefer-string-replace-all, prefer-template
    .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
    // eslint-disable-next-line unicorn/prefer-string-replace-all, prefer-template
    .replace(new RegExp('\\' + decimalSeparator), '.'));
}


const quoteCur = 'NOK';
const timeZone = 'Europe/Oslo'; // make all accounting transactions relative to Norway TZ, so we don't get any discrepancies

const formatNo = (val: number) => new Intl.NumberFormat('nb-NO', { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(val);

const maxDays = 7;

function getNow() {
  const str = DateTime.now().setZone(timeZone).toISODate();
  invariant(str != null);
  return str;
}

// eslint-disable-next-line react/jsx-props-no-spreading
const CurrencyIcon = ({ currency, style, ...rest }: { currency: CurrencyWithNok } & HTMLAttributes<HTMLSpanElement>) => <span className={`fi fi-${supportedCurrenciesWithNok[currency].cc.toLocaleLowerCase()}`} style={{ borderRadius: '10%', ...style }} {...rest} />;

export default function CurrencyCalc() {
  const [requestedDateStr, setRequestedDateStr] = React.useState<string>(getNow());
  const [requestedAmount, setRequestedAmount] = React.useState<number | undefined>(100);
  const [requestedAmountStr, setRequestedAmountStr] = React.useState(requestedAmount ? String(requestedAmount) : undefined);
  const [requestedCurrency, setRequestedCurrency] = React.useState<Currency>('USD');
  const [actualDate, setActualDate] = React.useState<DateTime<true>>();
  const [result, setResult] = React.useState<number | null>();

  const requestedDate = useMemo(() => (requestedDateStr != null ? DateTime.fromISO(requestedDateStr, { zone: timeZone }).setZone(timeZone) : undefined), [requestedDateStr]);

  // eslint-disable-next-line no-shadow
  const { data: currencies } = useSWR({ requestedDate }, async ({ requestedDate }) => {
    if (requestedDate == null) return undefined;
    const until = requestedDate;
    invariant(until.isValid, `Date ${requestedDateStr} is invalid`);

    const from = until.minus({ days: maxDays }); // assume if we have to fallback to previous day, assume there's at least some data for the last week

    const query = {
      startPeriod: from.toISODate(),
      endPeriod: until.toISODate(),
      format: 'csv',
      locale: 'no',
    };

    try {
      const csv = await ky.get(`https://data.norges-bank.no/api/data/EXR/B.${supportedCurrencyCodes.join('+')}.${encodeURIComponent(quoteCur)}.SP?${new URLSearchParams(query).toString()}`).text();
      // eslint-disable-next-line no-shadow
      const currencies = currencySchema.parse(parse(csv, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ';',
      }));

      // console.log(currencies)
      currencies.forEach((currency) => {
        invariant(currency.FREQ === 'B', 'FREQ mismatch');
        invariant(currency.Frekvens === 'Virkedag', 'Frekvens mismatch');
        invariant(currency.QUOTE_CUR === 'NOK', 'QUOTE_CUR mismatch');
        invariant(currency.TENOR === 'SP', 'TENOR mismatch');
        invariant(currency.Løpetid === 'Spot', 'Løpetid mismatch');
        invariant(currency.COLLECTION === 'C', 'COLLECTION mismatch');
      });

      return currencies;
    } catch (err) {
      if (err instanceof HTTPError && err.response.status === 404) {
        return undefined;
      }
      throw err;
    }
  }, { revalidateOnFocus: false });

  useEffect(() => {
    try {
      setResult(undefined);
      setActualDate(undefined);

      console.log({ currencies, requestedDate, requestedAmount });
      if (currencies == null || requestedDate == null || requestedAmount == null) return;

      const findCurrency = () => {
        for (let i = 0; i < maxDays; i += 1) {
          const day = i === 0 ? requestedDate : requestedDate.minus({ days: i });
          const candidate = currencies.find((c) => c.TIME_PERIOD === day.toISODate() && c.BASE_CUR === requestedCurrency && c.CALCULATED === 'false');
          if (candidate != null) return candidate;
        }
        return undefined;
      };

      const currency = findCurrency();
      if (currency == null) {
        setResult(null);
        return;
      }

      const timePeriod = DateTime.fromISO(currency.TIME_PERIOD, { zone: timeZone }).setZone(timeZone);
      invariant(timePeriod.isValid);
      setActualDate(timePeriod);

      const rate = parseLocaleNumber(currency.OBS_VALUE, 'nb-NO');

      invariant(!Number.isNaN(rate));

      // console.log(1, requestedCurrency, '=', rate, 'NOK');
      // console.log();
      // console.log('NOK:');

      // https://stackoverflow.com/a/12402322/6519037
      const converted = Number((requestedAmount * rate).toFixed(2));
      setResult(converted);
    } catch (err) {
      window.alert(`Something went wrong: ${(err as Error).message}`);
    }
  }, [requestedDate, requestedCurrency, requestedAmount, currencies]);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Date', e.target.value);
    setRequestedDateStr(e.target.value);
  }, []);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Amount', e.target.value);
    setRequestedAmountStr(e.target.value);

    let amount: number;
    if (/^[\d\s,]+\.\s*\d{2}\s*$/.test(e.target.value)) {
      amount = parseFloat(e.target.value.replaceAll(/[\s,]/g, '')); // 1,000.00
    } else if (/^[\d\s.]+,\s*\d{2}\s*$/.test(e.target.value)) {
      amount = parseFloat(e.target.value.replaceAll(/[\s.]/g, '').replace(',', '.')); // 1.000,00
    } else {
      amount = parseFloat(e.target.value.replaceAll(/\s/g, '')); // 1000.00 or 1000
    }
    if (Number.isNaN(amount) || amount < 0) {
      setRequestedAmount(undefined);
      return;
    }
    setRequestedAmount(amount);
  }, []);

  return (
    <Layout title="Valutakalkulator med historiske valutakurser fra Norges Bank">
      <main style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1em' }}>
        <div style={{ maxWidth: '30em' }}>
          <h1>Valutakurser</h1>
          <p style={{ opacity: 0.7, fontSize: '.8em' }}>Currency calculator for NOK based on <a href="https://www.norges-bank.no/en/" target="blank">Bank of Norway</a>. Norwegian only (not very useful for non-Norwegians)</p>
          <p>Her kan du konvertere valuta til norske kroner (NOK) med historiske valutakurser fra <a href="https://www.norges-bank.no/tema/Statistikk/Valutakurser/?tab=api" target="_blank" rel="noreferrer">Norges Bank</a> for bruk i regnskap o.l.</p>
          <p><strong>NB!</strong> Bruk på eget ansvar! Jeg tar intet ansvar for feil eller annet.</p>
        </div>

        <div style={{ width: '15em' }}>
          <select value={requestedCurrency} onChange={(e) => setRequestedCurrency(e.target.value as Currency)} style={{ width: '100%', fontSize: '1em', padding: '.3em', background: 'transparent', border: 'none', margin: '.3em 0' }}>
            <option disabled>Velg valuta</option>
            {Object.entries(supportedCurrencies).map(([code, { name }]) => <option key={code} value={code}>{code} - {name}</option>)}
          </select>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '.5em', top: 0, bottom: 0, display: 'flex', alignItems: 'center' }}>
              <CurrencyIcon currency={requestedCurrency} style={{ verticalAlign: 'middle' }} />
            </div>
            <input
              type="text"
              placeholder="eks. 1.000,00"
              value={requestedAmountStr}
              onChange={handleAmountChange}
              style={{ all: 'unset', width: '100%', fontSize: '1.3em', margin: '.3em 0', padding: '0 .3em 0 1.7em', borderBottom: '1px solid rgba(0,0,0,0.3)' }}
            />
          </div>

          <input style={{ all: 'unset', display: 'block', width: '100%', fontSize: '1.3em', padding: '.3em' }} type="date" value={requestedDateStr} onChange={handleDateChange} />
        </div>

        <div style={{ margin: '2em .5em', fontSize: '1.3em', display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', width: '8em' }}>
            <div>
              <CurrencyIcon currency={requestedCurrency} style={{ verticalAlign: 'middle', fontSize: '1.5em', marginRight: '.4em', boxShadow: '0 0 .3em rgba(0,0,0,0.1)' }} />
              <span style={{ opacity: 0.5 }}>{requestedCurrency}</span>
            </div>
            <div style={{ fontSize: '1.5em' }}>{requestedAmount != null && formatNo(requestedAmount)}</div>
          </div>

          <div style={{ textAlign: 'center', width: '8em' }}>
            <div>
              <CurrencyIcon currency="NOK" style={{ verticalAlign: 'middle', fontSize: '1.5em', marginRight: '.4em', boxShadow: '0 0 .3em rgba(0,0,0,0.1)' }} />
              <span style={{ opacity: 0.5 }}>NOK</span>
            </div>
            <div style={{ fontSize: '1.5em' }}>
              {result != null && formatNo(result)}
              {result === null && 'N/A'}
              {result === undefined && '...'}
            </div>
            <div style={{ textAlign: 'center', marginTop: '-.5em' }}>
              {actualDate != null ? <span style={{ opacity: 0.5, fontSize: '.8em' }}>{actualDate.toLocaleString(DateTime.DATE_SHORT)}</span> : <>&nbsp;</>}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
