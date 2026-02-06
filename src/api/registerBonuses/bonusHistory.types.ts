export interface UserBonusDetails {
  id: number;
  userId: number;
  bonusId: number;
  bonusCode: string;
  lockedBonus: number;
  usedBonus: number;
  unlockedBonus: number;
  brand: string;
  applicableType: string;
  bonusType: string;
  bonusExpiry: string;
  totalBonus: number;
  totalLocked: number;
  totalUnlocked: number;
  betReference: string | null;
  maxWinPercentage: number;
  maxWinAmount: number;
  maxWinAmountUsed: number;
  maxWinAmountRemaining: number;
  bonusCriteria: string;
  rollOverMultiplier: number;
  addedDate: string;
  updatedDate: string;
  isActive: boolean;
  depositedAmount: number;
  bonusSubType: string | null;
}

export interface BonusHistoryTransaction {
  id: number;
  bonusCode: string;
  userBonusId: number;
  userId: number;
  unlockedBonus: number;
  lockedBonus: number;
  transactionType: string;
  transactionAmount: number;
  transactionReference: string | null;
  brand: string;
  status: string | null;
  bonusId: number | null;
  releasedDate: string;
  userBonusDetails: UserBonusDetails | null;
  totalRecords: any;
}

export interface BonusHistoryResponseData {
  totalRecords: number;
  data: BonusHistoryTransaction[];
}

export interface ApiSuccessResult<T> {
  status: number;
  data: T;
  message: string;
}

export interface ApiErrorResult {
  status: number | string;
  data: null;
  message: string;
}

export type ApiResult<T> = ApiSuccessResult<T> | ApiErrorResult;

export interface ApiResponse<T> {
  code: string;
  message: string;
  targetSystem: string;
  result: ApiResult<T>;
}