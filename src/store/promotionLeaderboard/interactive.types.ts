import type { LeaderboardEntry } from 'api/promotions/promotions.api';

export interface PromotionInteractiveState {
  optInLoading: boolean;
  optInError: string | null;
  optedIn: boolean;
  leaderboardLoading: boolean;
  leaderboardError: string | null;
  leaderboard: LeaderboardEntry[];
  userRank?: number;
  userValue?: number;
}

export type PromotionDetailsInteractiveProps = {
  promotionId: string;
  userId?: string;
};
