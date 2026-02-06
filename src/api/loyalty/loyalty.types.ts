export type LoyaltyRequestData = {
  userId: string;
  brand: string;
  platformId: number;
  operatorId: string;
  code?: string;
};

export type LoyaltyResponseData = {
  status: number;
  message: string;
};

type ApiReward = {
  rewardId: number;
  rewardName: string;
  rewardImageUrl: string;
  rewardIconUrl: string;
  rewardActionType: string;
  rewardStartDate: string;
  rewardEndDate: string;
  isRead: boolean;
  unlockDate: string;
  coins: number;
};

export type GetDailyRewardsResponseData = {
  dailyRewardsList: ApiReward[];
};

type PaginationData = {
  offset: number;
  limit: number;
};

export type LoyaltyPaginatedRequestData = LoyaltyRequestData & PaginationData;

type ApiPlayerRewardDetails = {
  userId: number;
  userName: string;
  position: number;
  score: number;
  points: number;
  userImageUrl: string;
  userIconUrl: string;
};

type ApiLeaderBoardItem = {
  userId: number;
  userName: string;
  rank: number;
  score: number;
  points: number;
  userImageUrl: string;
  userIconUrl: string;
};

export type GetLeaderBoardResponseData = {
  playerRewardDetails: ApiPlayerRewardDetails;
  leaderBoard: ApiLeaderBoardItem[];
};

export type RedeemRewardRequestData = LoyaltyRequestData & {
  redemptionId: number;
};

export type BurnCoinsRequestData = LoyaltyRequestData & {
  coins: number;
  exchangeCurrency: string;
};

export type ApiRewardsSummary = {
  totalCoins: number;
  lifeTimeEarnings: number;
  lifeTimeBurns: number;
  lifeTimeCashback: number;
  minCoinsToCashback: number;
  maxCoinsToCashback: number;
  coinExchangeRate: number;
  coinExchangeCurrency: string;
};

type ApiLoyaltyLevel = {
  levelId: number;
  levelName: string;
  levelImageUrl: string;
  levelIconUrl: string;
  levelEligibilityPoints: number;
};

export type GetLoyaltyLevelsResponseData = {
  loyaltyLevelsList: ApiLoyaltyLevel[];
};

type RewardPoint = {
  transactionType: string;
  transactionDescription: string;
  transactionSubType: string;
  transactionSubTypeDesc: string;
  coins: number;
  amount: number;
};

export type GetRewardHistoryResponseData = {
  rewardPointsHistory: RewardPoint[];
  data: any;
};
