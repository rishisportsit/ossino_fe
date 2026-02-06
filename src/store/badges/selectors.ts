import type { RootState } from '..';

export const selectBadges = (state: RootState) => state.badges.data;
export const selectBadgesError = (state: RootState) => state.badges.error;
export const selectBadgesLoading = (state: RootState) => state.badges.loading;
