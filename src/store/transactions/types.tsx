import type { CryptoCurrencyEntity, CURRENCIES } from 'constants/currencies';
import type { ReactNode } from 'react';
import type {
  BET_STATUS,
  CATEGORY,
  SORT_FIELD,
  SORT_STATE,
  TRANSACTION_STATUS,
} from './constants';

export type TransactionStatusKey = keyof typeof TRANSACTION_STATUS;
export type TransactionStatus =
  (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

export type BetStatusKey = keyof typeof BET_STATUS;
export type BetStatus = (typeof BET_STATUS)[keyof typeof BET_STATUS];

export type TransactionCategory = {
  title: string;
  content: ReactNode;
};

export type SortConfig = {
  field: SortField;
  order: SortState;
}[];

export type CategoryKey = keyof typeof CATEGORY;
export type Category = (typeof CATEGORY)[keyof typeof CATEGORY];

export type SortFieldKey = keyof typeof SORT_FIELD;
export type SortField = (typeof SORT_FIELD)[keyof typeof SORT_FIELD];

export type SortStateKey = keyof typeof SORT_STATE;
export type SortState = (typeof SORT_STATE)[keyof typeof SORT_STATE];

export type ApiDepositTransaction = {
  id: number;
  amount: number;
  balance: number;
  betId: string | null;
  createdDate: string;
  currencyCode: string | null;
  description: string | null;
  lockedBonus: number;
  paymentType: string;
  shortBetId: string | null;
  status: TransactionStatus;
  totalRecordsCount: number;
  transactionId: string;
  transactionType: string;
  unlockedBonus: number;
  userId: number;
  userName: string | null;
};

export type ApiWithdrawTransaction = {
  id: number;
  amount: number;
  balance: number;
  betId: string | null;
  createdDate: string;
  currencyCode: string | null;
  description: string | null;
  lockedBonus: number;
  paymentType: string;
  shortBetId: string | null;
  status: TransactionStatus;
  totalRecordsCount: number;
  transactionId: string;
  transactionType: string;
  unlockedBonus: number;
  userId: number;
  userName: string | null;
};

export type DepositTransaction = {
  userId: number;
  date: {
    day: string;
    time: string;
  };
  currency: CryptoCurrencyEntity;
  amount: number;
  status: TransactionStatus;
};

export type WithdrawTransaction = {
  userId: number;
  date: {
    day: string;
    time: string;
  };
  amount: number;
  currency: CryptoCurrencyEntity;
  transactionId: string;
  status: TransactionStatus;
};

export type TipTransaction = {
  senderId: number;
  receiverId: number;
  userId?: number;
  isPublic: boolean;
  date: {
    day: string;
    time: string;
  };
  amount: number;
  currency: CryptoCurrencyEntity;
  status: TransactionStatus;
  userName?: string | null;
  counterPartyUserName?: string | null;
};

export type SportBet = {
  userId: number;
  date: {
    day: string;
    time: string;
  };
  event: string;
  odds: string;
  stake: number;
  currency: CryptoCurrencyEntity;
  payout: number;
  transactionId: string;
  status: BetStatus;
};

export type SportsBetData = {
  ticketId?: string;
  channel?: string;
  oddsChangeType?: string;
  status?: string;
  createdDate?: string;
  stake?: string;
  remainingStake?: number;
  isPartialCoBet?: boolean;
  currency?: string;
  totalOdds?: string;
  payout?: string;
  potentialPayout?: string;
  cashoutStatus?: string;
  cashOutAmount?: string;
  isFreeBet?: boolean;
  stakeBonus?: number;
  stakeReal?: number;
  bonusWinnings?: number;
  bonusPercentage?: number;
  groupCount?: number;
  combinationCount?: number;
  minOdds?: number;
  maxOdds?: number;
  minPayout?: number;
  maxPayout?: number;
  freeBetId?: string;
  bonusType?: string;
  resultedDate?: string;
  betType?: string;
  maxWinAmount?: string;
  maxWinPercentage?: string;
  clientMaxPayout?: number;
  cashoutHistory?: any;
  stakeTaxAmount?: number;
  winningTaxAmount?: number;
  stakeTax?: number;
  winningTax?: number;
  stakeAfterTax?: number;
  totalStake?: number;
  isNftHoldingCreated?: boolean;
  isNftTraded?: boolean;
  subBetType?: string;
  maxPayoutCapped?: boolean;
  betEligibleForOneCutBonus?: boolean;
  betEligibleForTwoCutBonus?: boolean;
  shortBetId?: string;
  partialCoBet?: boolean;
  tId?: number;
  isPrinted?: boolean;
  currencyCode?: string,
  betParts: Array<any>;
}

// will be used in Redux slice
export type Transaction =
  | DepositTransaction
  | WithdrawTransaction
  | TipTransaction
  | SportBet;

export type TransactionType =
  | 'BET_RESETTLEMENT'
  | 'BET_ROLLBACK'
  | 'BET_SETTLEMENT'
  | 'BONUS_CASH'
  | 'BONUS_CASH_TRANSFER'
  | 'BONUS_RELEASE'
  | 'CANCEL_BET'
  | 'DEPOSIT'
  | 'PLACE_BET'
  | 'SETTLE_BET'
  | 'WITHDRAW'
  | 'WITHDRAW_CANCEL'
  | 'WITHDRAW_DECLINE'
  | 'WITHDRAW_FAILED'
  | 'WITHDRAW_INIT'
  | 'WITHDRAW_SUCCESS'
  | 'USER_TRANSFER'
  | 'ALL'
  | 'TRANSFER_WITHDRAW';

export type CurrencyName = keyof typeof CURRENCIES;

export const CURRENCY_CODE_TO_NAME: { [key: string]: keyof typeof CURRENCIES } = {
  'BTC_TEST': 'Bitcoin',
  'BTC': 'Bitcoin',
  'ETH_TEST': 'Etherium',
  'ETH': 'Etherium',
  'MTL_TEST': 'Metal',
  'MTL': 'Metal',
  'MET_TEST': 'Metronome',
  'MET': 'Metronome',
  'NANO_TEST': 'Nano',
  'NANO': 'Nano',
  'OXY_TEST': 'Oxygen',
  'OXY': 'Oxygen',
  'PLTC_TEST': 'PlatonCoin',
  'PLTC': 'PlatonCoin',
  'USDT_TEST': 'Tether',
  'USDT': 'Tether',
};


export type CasinoBet = {
  roundId: string;
  betStatus: string;
  currencyCode: string;
  currency: string;
  odds: string;
  stake: number;
  payout: number;
  rejectionCode?: string | null;
  gameType: string;
  placedDate: string;
  settledDate: string;
  stakeTax?: number;
  winningsTax?: number;
  stakeTaxAmount?: number;
  stakeAfterTax?: number;
  betType?: string;
  totalCount?: number;
  providerName?: string;
  subProviderName?: string;
  gameCode?: string;
  gameName?: string | undefined;
  category?: string;
  userFreeSpinId?: string | null;
  winningsTaxAmount?: number;
};

export type CasinoBetRounds = {
  betStatus: string;
  betId: string;
  gameType: string;
  providerName: string;
  subProviderName: string;
  gameCode: string;
  gameName: string;
  category: string;
  placedOn: string;
  settledOn: string;
  stake: number;
  stakeTax: number;
  stakeAfterTax: number;
  winningsTax: number;
  winningsAfterTax: number;
  bonusMaxWinAmount: number;
  bonusMaxWinPercentage: number | null;
  payout: number;
  placeBetType: string | null;
  totalCount: number;
  winningsTaxAmount: number;
  stakeTaxAmount: number;
  betTransactionType: string;
  winnigsTaxAmount: number;
}

