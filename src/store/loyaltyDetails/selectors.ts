import type { RootState } from '..';

export const selectLoyaltyDetails = (state: RootState) =>
  state.loyaltyDetails.data;

export const selectLoyaltyDetailsError = (state: RootState) =>
  state.loyaltyDetails.error;

export const selectLoyaltyDetailsLoading = (state: RootState) =>
  state.loyaltyDetails.loading;
