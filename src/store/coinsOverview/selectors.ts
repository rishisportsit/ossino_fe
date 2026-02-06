import { type RootState } from '..';

export const selectCoinsOverview = (state: RootState) =>
  state.coinsOverview.data?.coinsOverview;

export const selectTotalCoins = (state: RootState) =>
  state.loyaltyDetails.data?.coins || 0;

export const selectCoinsOverviewError = (state: RootState) =>
  state.coinsOverview.error;

export const selectCoinsOverviewLoading = (state: RootState) =>
  state.coinsOverview.loading;

export const selectCoinsOverviewHistoryAggregates = (state: RootState) =>
  state.coinsOverview.historyAggregates;
