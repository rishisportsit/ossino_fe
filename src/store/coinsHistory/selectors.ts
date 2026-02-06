import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { burns, earns } from './const';
import type { CoinHistory } from './types';

export const selectCoinsHistoryLoading = (state: RootState) =>
  state.coinsHistory.loading;

export const selectCoinsHistoryError = (state: RootState) =>
  state.coinsHistory.error;

const selectCoinsHistory = (state: RootState) => state.coinsHistory.data;

export const selectFilteredCoinsHistory = createSelector(
  selectCoinsHistory,
  (coinsHistory) => {
    if (!coinsHistory) return null;

    const data = coinsHistory.reduce(
      (result, current) => {
        const newResult = { ...result };

        if (earns.includes(current.loyaltyType)) {
          newResult.earns.push(current);
        }

        if (burns.includes(current.loyaltyType)) {
          newResult.burns.push(current);
        }

        return newResult;
      },
      {
        earns: [] as CoinHistory[],
        burns: [] as CoinHistory[],
        all: [] as CoinHistory[],
      },
    );

    data.all = coinsHistory;
    return data;
  },
);