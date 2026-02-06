import type { RootState } from '..';

export const selectRedemptions = (state: RootState) => state.redemptions.data;
export const selectRedemptionsError = (state: RootState) => state.redemptions.error;
export const selectRedemptionsLoading = (state: RootState) => state.redemptions.loading;
