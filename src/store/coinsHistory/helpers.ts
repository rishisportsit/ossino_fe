import type { AxiosResponse } from 'axios';
import { CoinHistoryType, type CoinHistory } from './types';

type GetRewardHistoryResponseData = {
  data?: any[];
  rewardPointsHistory?: any[];
};

export const handleRewardHistoryResponse = (
  response: AxiosResponse<any[] | GetRewardHistoryResponseData | any>,
): CoinHistory[] => {
  let historyData: any[] = [];

  if (Array.isArray(response.data)) {
    historyData = response.data;
  } else if (response.data?.rewardPointsHistory) {
    historyData = response.data.rewardPointsHistory;
  } else if (response.data?.data) {
    historyData = response.data.data;
  }

  const coinHistory: CoinHistory[] = historyData.map((item) => ({
    id: item._id,
    gameName: item.gameName || 'Unknown Game',
    value: item.coinsCredit || item.coinsDebit || 0,
    date: item.created_date,
    type: item.loyaltyType as CoinHistoryType,
    loyaltyType: item.loyaltyType,
    transactionType: item.transactionType,
    coinsCredit: item.coinsCredit,
    coinsDebit: item.coinsDebit,
    amount: item.amount,
    loyaltyLevel: item.loyaltyLevel,
    created_date: item.created_date,
    betId: item.betId || item.bet_id || item.transactionId,
  }));

  return coinHistory;
};