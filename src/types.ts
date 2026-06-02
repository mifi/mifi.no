export interface Sponsor {
  type: 'github' | 'patreon';
  name: string;
  from?: string | undefined;
  until?: string | undefined;
  medianAmount: number;
  totalAmount: number;
  active: boolean;
  url?: string;
}
