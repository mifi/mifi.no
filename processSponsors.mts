import assert from 'node:assert';
import { readFile, writeFile } from 'node:fs/promises';
import { z } from 'zod';
import { DateTime } from 'luxon';
import { parse as csvParse } from 'csv-parse/sync';
import { Sponsor } from './src/types';


const outputPath = 'src/pages/thanks/sponsors.json';

const githubPath = process.argv[2];
const patreonPath = process.argv[3];
const openCollectivePath = process.argv[4];
assert(githubPath, 'Missing GitHub sponsorships JSON path argument');
assert(patreonPath, 'Missing Patreon members CSV path argument');
assert(openCollectivePath, 'Missing Open Collective CSV path argument');


function median(arr: number[]) {
  if (arr.length === 0) return undefined;

  // 1. Sort numerically in ascending order without mutating original array
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  // 2. If odd, return middle. If even, return average of the two middle elements.
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

async function parseGithub(path: string) {
  const githubSponsorshipSchema = z.object({
    sponsor_handle: z.string(),
    sponsor_profile_name: z.string().nullable(),
    sponsor_public_email: z.string().nullable(),
    sponsorship_started_on: z.string(),
    is_public: z.boolean(),
    is_yearly: z.boolean(),
    transactions: z.array(z.object({
      transaction_id: z.string(),
      tier_name: z.string(),
      tier_monthly_amount: z.string(),
      processed_amount: z.string(),
      is_prorated: z.boolean(),
      status: z.string(),
      transaction_date: z.string(),
      billing_country: z.string().nullable(),
      billing_region: z.string().nullable(),
      vat: z.string().nullable(),
    })),
    payment_source: z.string(),
    metadata: z.record(z.unknown()),
  }).array();

  const githubSponsorships = githubSponsorshipSchema.parse(JSON.parse(await readFile(path, 'utf8')));

  const githubSponsors: Sponsor[] = githubSponsorships.flatMap((s) => {
    if (!s.is_public) return [];

    // eslint-disable-next-line camelcase
    const transactions = s.transactions.map(({ transaction_date, processed_amount: amount, ...t }) => {
      const currency = amount[0];
      assert(currency === '$', `Unexpected currency: ${currency}`);
      return {
        ...t,
        transactionDate: new Date(transaction_date),
        amount: parseFloat(amount.slice(1)),
      };
    });

    if (transactions[0] == null) return [];

    const latestTransaction = transactions.reduce((latest, current) => (
      current.transactionDate > latest.transactionDate ? current : latest
    ), transactions[0]);

    const from = DateTime.fromISO(s.sponsorship_started_on);
    assert(from.isValid);

    const latestTransactionDateTime = DateTime.fromJSDate(latestTransaction.transactionDate);
    const until = DateTime.now().diff(latestTransactionDateTime).as('months') < 1 ? undefined : latestTransactionDateTime.plus({ months: 1 });

    const tierMatch = latestTransaction.tier_name.match(/^\$(\d+) a month$/);
    const active = tierMatch != null && until == null;
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

    const medianAmount = median(transactions.map((t) => t.amount));
    assert(medianAmount != null);

    return [{
      id: `github_${s.sponsor_handle}`,
      type: 'github',
      name: s.sponsor_handle,
      from: from.toISODate(),
      until: until?.toISODate() ?? undefined,
      recurring: transactions.length > 1,
      // medianAmount,
      totalAmount,
      active,
      url: `https://github.com/${s.sponsor_handle}`,
    }];
  });

  return githubSponsors;
}

function amountStringToNumber(s?: string | null) {
  if (s == null || String(s).trim() === '') return 0;
  // remove any character that is not a digit, dot or minus
  const cleaned = String(s).replaceAll(/[^\d.-]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function optionalDateFromString(s?: string | null) {
  if (!s || s.trim() === '') return undefined;
  const d = DateTime.fromFormat(s.replace(/\.(\d{3})\d+$/, ''), 'yyyy-MM-dd HH:mm:ss');
  if (d.isValid) return d;
  return undefined;
}

async function parsePatreon(path: string) {
  const patreonMemberSchema = z.object({
    Name: z.string(),
    Email: z.string(),
    Discord: z.string(),
    'Patron Status': z.enum(['', 'Active patron', 'Former patron', 'Declined patron']),
    'Follows You': z.enum(['Yes', 'No']),
    'Free Member': z.enum(['Yes', 'No']),
    'Free Trial': z.enum(['Yes', 'No']),
    'Lifetime Amount': z.string().transform((s) => amountStringToNumber(s)),
    'Pledge Amount': z.string().transform((s) => amountStringToNumber(s)),
    'Charge Frequency': z.string(),
    Tier: z.string(),
    Addressee: z.string(),
    Street: z.string(),
    City: z.string(),
    State: z.string(),
    Zip: z.string(),
    Country: z.string(),
    Phone: z.string(),
    'Patronage Since Date': z.string().transform((s) => optionalDateFromString(s)),
    'Last Charge Date': z.string().transform((s) => optionalDateFromString(s)),
    'Last Charge Status': z.string(),
    'Additional Details': z.string(),
    'User ID': z.string(),
    'Last Updated': z.string().transform((s) => optionalDateFromString(s)),
    Currency: z.string(),
    'Max Posts': z.string(),
    'Access Expiration': z.string().transform((s) => optionalDateFromString(s)),
    'Next Charge Date': z.string().transform((s) => optionalDateFromString(s)),
    'Full country name': z.string(),
    'Subscription Source': z.string(),
  });

  const records: Record<string, string>[] = csvParse(await readFile(path, 'utf8'), { columns: true, skip_empty_lines: true, trim: true });

  const patreonMembers: Sponsor[] = Object.values(records).map((record) => patreonMemberSchema.parse(record))
    .flatMap((member) => {
      assert(member.Currency === 'USD', `Unexpected currency: ${member.Currency}`);
      if (member['Free Member'] === 'Yes') return [];

      // 2026-01-08 02:14:21
      const from = member['Patronage Since Date'];

      return {
        id: `patreon_${member['User ID']}`,
        type: 'patreon',
        name: member.Name,
        from: from?.toISODate(),
        until: member['Access Expiration']?.toISODate(),
        recurring: member['Charge Frequency'] === 'monthly',
        // medianAmount: member['Pledge Amount'] ?? 0,
        totalAmount: member['Lifetime Amount'] ?? 0,
        active: member['Patron Status'] === 'Active patron',
        url: `https://www.patreon.com/user?u=${member['User ID']}`,
      };
    });

  return patreonMembers;
}

async function parseOpenCollective(path: string) {
  const records: Record<string, string>[] = csvParse(await readFile(path, 'utf8'), { columns: true, skip_empty_lines: true, trim: true });

  const openCollectiveRowSchema = z.object({
    'Effective Date & Time': z.string(),
    'Transaction ID': z.string(),
    Description: z.string(),
    'Credit/Debit': z.enum(['CREDIT', 'DEBIT']),
    Kind: z.string(),
    'Group ID': z.string(),
    'Amount Single Column': z.string(),
    Currency: z.string(),
    'Is Reverse': z.string(),
    'Is Reversed': z.string(),
    'Reverse Transaction ID': z.string(),
    'Account Handle': z.string(),
    'Account Name': z.string(),
    'Opposite Account Handle': z.string(),
    'Opposite Account Name': z.string(),
    'Payment Processor': z.string(),
    'Payment Method': z.string(),
    'Contribution Memo': z.string(),
  });

  const parsed = records.map((r) => openCollectiveRowSchema.parse(r));

  // Keep only credit transactions
  const credits = parsed.filter((r) => r['Credit/Debit'] === 'CREDIT');

  // Ensure currency is USD where present
  for (const r of credits) {
    assert.strictEqual(r['Currency'], 'USD');
  }

  // Group by Opposite Account Handle (fallback to Opposite Account Name or Account Handle)
  const groups = new Map<string, typeof parsed[0][]>();
  for (const r of credits) {
    const handle = r['Opposite Account Handle'];
    assert(handle);
    if (!groups.has(handle)) groups.set(handle, []);
    groups.get(handle)!.push(r);
  }

  const sponsors: Sponsor[] = [];

  groups.forEach((recs, handle) => {
    const firstRow = recs[0];
    if (firstRow == null) return;

    const amounts = recs.map((r) => amountStringToNumber(r['Amount Single Column']));
    if (amounts.length === 0) return;

    const totalAmount = amounts.reduce((s, a) => s + a, 0);
    const medianAmount = median(amounts);
    assert(medianAmount != null);

    const datetimes = recs.map((r) => DateTime.fromISO(r['Effective Date & Time']));
    assert(datetimes.every((d) => d.isValid), 'Invalid date in Open Collective data');

    if (datetimes.length === 0) return;

    const earliest = datetimes.reduce((a, b) => (a < b ? a : b));
    const latest = datetimes.reduce((a, b) => (a > b ? a : b));

    const until = DateTime.now().diff(latest).as('months') < 1 ? undefined : latest.plus({ months: 1 });
    const active = until == null;

    const from = earliest.toISODate();

    sponsors.push({
      id: `opencollective_${handle}`,
      type: 'opencollective',
      name: firstRow['Opposite Account Name'] || firstRow['Opposite Account Handle'],
      from,
      until: until?.toISODate() ?? undefined,
      recurring: recs.length > 1,
      // medianAmount,
      totalAmount,
      active,
      url: `https://opencollective.com/${encodeURIComponent(handle)}`,
    });
  });

  return sponsors;
}

const githubSponsors = await parseGithub(githubPath);
const patreonMembers = await parsePatreon(patreonPath);
const openCollectiveSponsors = await parseOpenCollective(openCollectivePath);

await writeFile(outputPath, JSON.stringify([...githubSponsors, ...patreonMembers, ...openCollectiveSponsors], null, 2), 'utf8');
