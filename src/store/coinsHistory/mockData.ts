import { type CoinHistory, CoinHistoryType } from './types';

export const coinsHistory: CoinHistory[] = [
  {
    id: 1,
    gameName: 'Sugar Rush',
    value: 10,
    date: new Date().toString(),
    type: CoinHistoryType.GameReward,
  },
  {
    id: 2,
    gameName: 'Instant Cashback',
    value: -50,
    date: new Date().toString(),
    type: CoinHistoryType.CoinsBurn,
  },
];