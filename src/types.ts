export interface Sponsor {
  id: string,
  type: 'github' | 'patreon' | 'opencollective' | 'other';
  name: string;
  from: string | undefined;
  until?: string | undefined;
  // medianAmount: number;
  totalAmount: number;
  recurring: boolean;
  active: boolean;
  url?: string;
}
