export type LeaderboardApiItem = {
  userId: string;
  loyalty_coins: number;
  loyalty_level: string;
  rank: number;
};

export type LeaderboardApiResponse = {
  data: LeaderboardApiItem[];
  message: string;
  success: number;
  error: any[];
  currentUser?: LeaderboardApiItem;
};

export type UserLeaderboard = {
  id: number;
  place: number;
  username: string;
  avatar: string;
  value: number;
};

export type LeaderboardData = {
  leaderboard: UserLeaderboard[];
  userPosition: number;
};
