import type { RootState } from '..';

export const selectBenefitsData = (state: RootState) => state.benefits.data;
export const selectBenefitsError = (state: RootState) => state.benefits.error;
export const selectBenefitsLoading = (state: RootState) => state.benefits.loading;
