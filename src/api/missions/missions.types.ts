// Mission Reward API Request Types
export interface MissionRewardRequest {
  playerId: string;
  operatorId: string;
  brand: string;
}

// Mission Reward API Response Types
export interface MissionReward {
  promotionId: string;
  prizeType: string;
  brandId: string;
  description: string;
  imageUrl: string;
  progress: number;
  prizeAmount: number | null;
  operatorId: string;
  providerId: string;
  aggregator: string;
  gameCode: string;
  prizeAwarded: boolean;
}

export interface MissionRewardResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: MissionReward[];
}

// Claim Reward API Request Types
export interface ClaimRewardRequest {
  promotionId: string;
  playerId: number;
  accessToken: string;
  claimApiKey: string;
}

// Claim Reward API Response Types
export interface ClaimRewardResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: string;
}

// Parsed Claim Reward Result
export interface ClaimRewardResult {
  message: string;
  status: string;
}