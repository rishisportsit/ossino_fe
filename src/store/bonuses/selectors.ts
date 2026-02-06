import type { RootState } from 'store/index';

export const selectRegistrationBonuses = (state: RootState) => 
  state.bonuses.registrationBonuses;

export const selectBonusOptions = (state: RootState) => 
  state.bonuses.bonusOptions;

export const selectRegistrationBonusesLoading = (state: RootState) => 
  state.bonuses.registrationLoading;

export const selectRegistrationBonusesError = (state: RootState) => 
  state.bonuses.registrationError;

// Keep old selectors for backward compatibility
export const selectBonuses = (state: RootState) => state.bonuses.data;
export const selectBonusesLoading = (state: RootState) => state.bonuses.loading;
export const selectBonusesError = (state: RootState) => state.bonuses.error;
