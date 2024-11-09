export const supportedCurrencies = {
  USD: {
    cc: 'US',
    name: 'Amerikanske dollar',
  },
  AUD: {
    cc: 'AU',
    name: 'Australske dollar',
  },
  BDT: {
    cc: 'BD',
    name: 'Bangladeshi taka',
  },
  BYN: {
    cc: 'BY',
    name: 'Belarusiske nye rubler',
  },
  BRL: {
    cc: 'BR',
    name: 'Brasilianske real',
  },
  GBP: {
    cc: 'GB',
    name: 'Britiske pund',
  },
  BGN: {
    cc: 'BG',
    name: 'Bulgarske lev',
  },
  DKK: {
    cc: 'DK',
    name: 'Danske kroner',
  },
  EUR: {
    cc: 'EU',
    name: 'Euro',
  },
  PHP: {
    cc: 'PH',
    name: 'Filippinske peso',
  },
  HKD: {
    cc: 'HK',
    name: 'Hong Kong dollar',
  },
  INR: {
    cc: 'IN',
    name: 'Indiske rupi',
  },
  IDR: {
    cc: 'ID',
    name: 'Indonesiske rupiah',
  },
  ISK: {
    cc: 'IS',
    name: 'Islandske kroner',
  },
  JPY: {
    cc: 'JP',
    name: 'Japanske yen',
  },
  CAD: {
    cc: 'CA',
    name: 'Kanadiske dollar',
  },
  CNY: {
    cc: 'CN',
    name: 'Kinesiske yuan',
  },
  MYR: {
    cc: 'MY',
    name: 'Malaysiske ringgit',
  },
  MXN: {
    cc: 'MX',
    name: 'Meksikanske peso',
  },
  MMK: {
    cc: 'MM',
    name: 'Myanmar kyat',
  },
  NZD: {
    cc: 'NZ',
    name: 'New Zealand dollar',
  },
  ILS: {
    cc: 'IL',
    name: 'Ny israelsk shekel',
  },
  RON: {
    cc: 'RO',
    name: 'Ny rumenske leu',
  },
  TWD: {
    cc: 'TW',
    name: 'Nye taiwanske dollar',
  },
  PKR: {
    cc: 'PK',
    name: 'Pakistanske rupi',
  },
  PLN: {
    cc: 'PL',
    name: 'Polske zloty',
  },
  RUB: {
    cc: 'RU',
    name: 'Russiske rubler',
  },
  SGD: {
    cc: 'SG',
    name: 'Singapore dollar',
  },
  CHF: {
    cc: 'CH',
    name: 'Sveitsiske franc',
  },
  SEK: {
    cc: 'SE',
    name: 'Svenske kroner',
  },
  ZAR: {
    cc: 'ZA',
    name: 'Sørafrikanske rand',
  },
  KRW: {
    cc: 'KR',
    name: 'Sørkoreanske won',
  },
  THB: {
    cc: 'TH',
    name: 'Thailandske baht',
  },
  CZK: {
    cc: 'CZ',
    name: 'Tsjekkiske koruna',
  },
  TRY: {
    cc: 'TR',
    name: 'Tyrkiske lira',
  },
  HUF: {
    cc: 'HU',
    name: 'Ungarske forinter',
  },
  VND: {
    cc: 'VN',
    name: 'Vietnamesiske dong',
  },
} as const;

export const supportedCurrenciesWithNok = {
  ...supportedCurrencies,
  NOK: {
    cc: 'NO',
    name: 'Norske kroner',
  },
};

export const supportedCurrencyCodes = Object.keys(supportedCurrencies) as unknown as (keyof typeof supportedCurrencies)[];
export type Currency = typeof supportedCurrencyCodes[number];
export type CurrencyWithNok = Currency | 'NOK';
