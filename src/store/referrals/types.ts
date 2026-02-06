export const CRYPTO_CURRENCY_TYPE = {
  btc: 'btc',
  eth: 'eth',
  sol: 'sol',
} as const;

export type Code = {
  code: string;
};

export type Details = {
  totalReferrals: number;
  totalWagered: number;
  referralEarnings: number;
};

export type UserReferral = {
  id: number;
  name: string;
  date: string;
};

export type Earning = {
  id: number;
  currency: keyof typeof CRYPTO_CURRENCY_TYPE;
  value: number;
};

export type EarningDetails = {
  totalClaimed: number;
  totalClaimable: number;
  earnings: Earning[];
};
