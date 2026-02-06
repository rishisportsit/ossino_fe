import type { RootState } from '..';

export const selectLoyaltyPointsData = (state: RootState) =>
  state.loyaltyPoints.data;
