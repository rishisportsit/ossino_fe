// Models for redeemPrize API
export interface RedeemPrizeRequestData {
  operatorId: string;
  platformId: number;
  brand: string;
  userId: string;
  loyaltyType: string;
  bonusId: number;
  token: string;
  bonusPrice: number;
  bonusCount: number;
}

export interface RedeemPrizeResponseData {
  // Define according to actual API response
  [key: string]: any;
}