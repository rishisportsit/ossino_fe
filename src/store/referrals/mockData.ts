import {
  type Details,
  type Code,
  type UserReferral,
  type EarningDetails,
  CRYPTO_CURRENCY_TYPE,
} from './types';

export const code: Code = { code: '' }; // Empty code so components use dynamic affiliate URL instead

export const details: Details = {
  totalReferrals: 0,
  totalWagered: 0,
  referralEarnings: 0,
};

export const referrals: UserReferral[] = [
  {
    id: 1,
    name: 'arti5sun',
    date: new Date().toString(),
  },
  {
    id: 2,
    name: 'arti5sun',
    date: new Date().toString(),
  },
  {
    id: 3,
    name: 'arti5sun',
    date: new Date().toString(),
  },
];

export const earnings: EarningDetails = {
  totalClaimed: 20,
  totalClaimable: 50,
  earnings: [
    {
      id: 1,
      currency: CRYPTO_CURRENCY_TYPE.btc,
      value: -0.00034213,
    },
    {
      id: 2,
      currency: CRYPTO_CURRENCY_TYPE.eth,
      value: -0.00034213,
    },
    {
      id: 3,
      currency: CRYPTO_CURRENCY_TYPE.sol,
      value: -0.00034213,
    },
  ],
};
