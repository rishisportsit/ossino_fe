import { RootState } from '../index';

export const selectBonusSummaryState = (state: RootState) => state.bonusSummary;
export const selectBonusSummaryData = (state: RootState) => state.bonusSummary.data;
export const selectBonusSummaryLoading = (state: RootState) => state.bonusSummary.loading;
export const selectBonusSummaryError = (state: RootState) => state.bonusSummary.error;