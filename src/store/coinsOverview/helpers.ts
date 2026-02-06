import type { ApiRewardsSummary } from 'api/loyalty/loyalty.types';
import type { AxiosResponse } from 'axios';
import { getLoyaltyData } from 'store/helpers/getLoyaltyData';
import type { RootState } from '..';
import { type CoinsOverview } from './types';

export const handleRewardsSummaryResponse = (
  response: AxiosResponse<ApiRewardsSummary>,
): CoinsOverview => {
  const { data } = response;

  return {
    coinsOverview: {
      earns: data.lifeTimeEarnings,
      burns: data.lifeTimeBurns,
      cashback: data.lifeTimeCashback,
    },
    totalCoins: data.totalCoins,
    coinExchangeCurrency: data.coinExchangeCurrency,
  };
};

export const getBurnCoinsData = (state: RootState) => {
  const loyaltyData = getLoyaltyData(state);

  return { ...loyaltyData };
};
