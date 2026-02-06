import { type RootState } from '..';

export const selectProviders = (state: RootState) => state.providers.data;
export const selectProvidersError = (state: RootState) => state.providers.error;
export const selectProvidersLoading = (state: RootState) => state.providers.loading;
