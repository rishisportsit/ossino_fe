import type { RootState } from '..';

export const selectRecentlyPlayedGames = (state: RootState) =>
  state.recentlyPlayed.data;

export const selectRecentlyPlayedError = (state: RootState) =>
  state.recentlyPlayed.error;

export const selectRecentlyPlayedLoading = (state: RootState) =>
  state.recentlyPlayed.loading;
