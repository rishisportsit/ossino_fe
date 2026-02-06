import { type RootState } from '..';

export const selectRegisterBonusesData = (state: RootState) =>
  state.registerBonuses.data;

export const selectRegisterBonusesLoading = (state: RootState) =>
  state.registerBonuses.loading;

export const selectRegisterBonusesError = (state: RootState) =>
  state.registerBonuses.error;
