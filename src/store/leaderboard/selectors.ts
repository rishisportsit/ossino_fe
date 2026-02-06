import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';

export const selectLeaderboard = (state: RootState) => state.leaderboard.data;

export const selectLeaderboardLoading = (state: RootState) =>
  state.leaderboard.loading;

export const selectLeaderboardError = (state: RootState) =>
  state.leaderboard.error;

export const selectFilteredLeaderboard = createSelector(
  selectLeaderboard,
  (leaderboard) => {
    if (leaderboard) {
      return {
        top: leaderboard.leaderboard.slice(0, 3),
        others: leaderboard.leaderboard.slice(3),
      };
    }

    return null;
  },
);

export const selectUserPosition = (state: RootState) =>
  state.leaderboard.data?.userPosition;
