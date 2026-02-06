export interface BonusSportSelection {
  id: number;
  sportId: number;
  sportName: string;
  countryId: number;
  countryName: string;
  leagueId: number;
  leagueName: string;
  eventId: number;
  eventName: string;
}

export interface Bonus {
  id: number;
  bonusCode: string | null;
  maxBonus: number;
  minDeposit: number;
  wagerBonus: number;
  instantBonus: number;
  bonusPercentage: number;
  depositCriteria: number;
  wagerCriteria: number;
  oddsThreshold: number;
  bonusStatus: string;
  optIn: string;
  bonusType: string;
  tags: string[];
  bonusDescription: string | null;
  applicableType: 'SPORTS' | 'CASINO' | 'ALL';
  applyExpiry: number;
  brand: string | null;
  startDate: string;
  validUntil: string;
  createdDate: string;
  updatedDate: string;
  applicableSports: string | null;
  minStake: number;
  numberOfLegs: number;
  bonusPayoutPercentage: number;
  maximumTotalBonus: number;
  referrerPercentage: number;
  recReferrerPercentage: number;
  refereePercentage: number;
  maxWinPercentage: number;
  maxWinAmount: number;
  rollOverMultiplier: number;
  bonusCriteria: string;
  createdBy: string;
  unlockApplicableType: string;
  unlockOddsThreshold: number;
  unlockNumberOfLegs: number;
  unlockApplicableSports: string | null;
  unlockApplicableSportsNames: string | null;
  allowTags: string[];
  denyTags: string[];
  providerName: string[];
  gameName: string[];
  unlockProviderName: string[];
  unlockGameName: string[];
  isCutBonusWithdrawable: boolean;
  affiliateBtags: string[];
  paymentMethods: string[];
  allowTagNames: string | null;
  denyTagNames: string | null;
  cashBackCriteria: string | null;
  cashBackFrequency: string | null;
  cashBackType: string | null;
  cashBackPercentage: number;
  maxCashBackAmount: number;
  minStakeAmount: number;
  minCashBackOdds: number;
  minCashBackLegs: string | null;
  cashBackBetType: string | null;
  cashBackBetStatus: string | null;
  addToWithdrawableAmount: boolean;
  isOddsThresholdCumulative: boolean | null;
  maxInstantBonus: number;
  bonusSubType: string | null;
  isFreeSpinBonus: boolean;
  freeSpinConfig: any | null;
  currencyCode: string | null;
  gameCode: string[];
  unlockGameCode: string[];
  campaignDays: string | null;
  campaignTimeFrom: string | null;
  campaignTimeTo: string | null;
  baseCurrencyRate: number | null;
  bonusSportSelection: BonusSportSelection[];
}

export interface BonusesResponseData {
  totalRecords: number;
  data: Bonus[];
}

export interface BonusesApiResult {
  status: number;
  data: BonusesResponseData;
  message: string;
}

export interface BonusesApiResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: BonusesApiResult;
}

export interface GetBonusesRequest {
  allocationType?: 'AUTO' | 'MANUAL';
  bonusStatus?: 'ACTIVE' | 'INACTIVE';
  bonusType?: 'DEPOSIT' | 'NO_DEPOSIT' | 'REFERRAL';
  clientType?: 'mobile' | 'desktop';
  itemsPerPage?: number;
  pageNumber?: number;
}

export interface BonusOption {
  id: number | string | 'none';
  type: 'SPORTS' | 'CASINO' | 'NONE';
  title: string;
  description: string;
  percentage?: number;
  maxAmount?: number;
  icon: string;
}