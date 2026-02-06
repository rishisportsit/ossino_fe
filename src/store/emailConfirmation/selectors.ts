import type { RootState } from 'store/index';

export const selectEmailConfirmationState = (state: RootState) => state.emailConfirmation;
export const selectEmailConfirmationLoading = (state: RootState) => state.emailConfirmation.loading;
export const selectEmailConfirmationSuccess = (state: RootState) => state.emailConfirmation.success;
export const selectEmailConfirmationError = (state: RootState) => state.emailConfirmation.error;