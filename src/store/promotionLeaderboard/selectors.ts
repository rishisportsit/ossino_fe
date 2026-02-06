import type { RootState } from 'store/index';
import type { LeaderboardState } from './slice';

export const selectLeaderboard = (state: RootState): LeaderboardState['data'] =>
  state.promotionLeaderboard.data;

export const selectLeaderboardLoading = (state: RootState): boolean =>
  state.promotionLeaderboard.loading;

export const selectLeaderboardError = (
  state: RootState,
): LeaderboardState['error'] => state.promotionLeaderboard.error;
