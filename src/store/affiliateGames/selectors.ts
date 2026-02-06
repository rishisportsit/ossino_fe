import type { RootState } from '..';

export const selectAffiliateGames = (state: RootState) => state.affiliateGames.data;
export const selectAffiliateGamesLoading = (state: RootState) => state.affiliateGames.loading;
export const selectAffiliateGamesError = (state: RootState) => state.affiliateGames.error;