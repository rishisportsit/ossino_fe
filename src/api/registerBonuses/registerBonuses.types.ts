export interface RegisterBonus {
  id: number;
  userBonusId: number;
  userId: number;
  bonusId: number;
  bonusCode: string;
  status: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  bonusExpiry: string;
  addedDate: string;
  updatedDate: string;
  lockedBonus: number;
  unlockedBonus: number;
  totalLocked: number;
  totalUnlocked: number;
  usedBonus: number;
  bonusRemaining: number;
  totalBonus: number;
  bonusType: string;
  bonusSubType: string[];
  optIn: string;
  brand: string | null;
  wagerCriteria: number;
  rollOverMultiplier: number;
  bonusCriteria: string;
  stakeWagered: number;
  stakeToBeWagered: number;
  depositedAmount: number;
  minStake: number;
  minDeposit: number;
  maxWinPercentage: number;
  maxWinAmount: number;
  maxWinAmountUsed: number;
  maxWinAmountRemaining: number;
  applicableSports: string[];
  applicableSportsNames: string;
  applicableType: string;
  oddsThreshold: number;
  numberOfLegs: number;
  unlockApplicableType: string;
  unlockApplicableSports: string[];
  unlockApplicableSportsNames: string;
  unlockOddsThreshold: number;
  unlockNumberOfLegs: number;
  isOddsThresholdCumulative: boolean;
  tags: string[];
  allowTags: string[];
  denyTags: string[];
  allowTagNames: string[];
  denyTagNames: string[];
  referrerPercentage: number;
  refereePercentage: number;
  recurReferrerPercentage: number;
  isFreeSpinBonus: boolean;
  freeSpinConfig: any | null;
  totalFreeSpinsRemaining: number;
  totalFreeSpinsAllocated: number;
  totalFreeSpinsUsed: number;
  totalFreeSpinAmount: number | null;
  createdBy: string;
  addedBy: string | null;
  betReference: string | null;
  currencyCode: string;
}

export interface RegisterBonusesResponseData {
  totalRecords: number;
  data: RegisterBonus[];
}

export interface ApiResult<T> {
  status: number;
  data: T;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  targetSystem: string;
  result: ApiResult<T>;
}