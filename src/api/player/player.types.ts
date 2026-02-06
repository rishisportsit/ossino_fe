import { SportsBetData } from "store/transactions/types";

export interface AccountHistoryRequest {
  accessToken?: string;
  clientType: string;
  endDate?: string;
  itemsPerPage?: number;
  pageNumber?: number;
  paymentType?: string;
  startDate?: string;
  status?: string;
  amount?: number;
  balance?: number;
  transactionType?: string;
}

export interface AccountHistoryResponse {
  data: any[];
  totalRecords: number;
}

export interface PlayerHistoryRequest {
  accessToken?: string;
  clientType: string;
  endDate?: string;
  itemsPerPage?: number;
  pageNumber?: number;
  startDate?: string;
  transactionEntityType: string;
  transactionPeriod: string;
}

export interface PlayerHistoryResponse {
  data: any[];
  totalRecords: number;
}

export interface CasinoBetHistoryRequest {
  accessToken?: string;
  betId?: string;
  betSize?: string;
  betStatus?: string;
  gameType: string;
  itemPerPage: number;
  pageNumber: number;
  placedAfter?: string;
  placedBefore?: string;
}

export interface SportsBetHistoryRequest {
  accessToken?: string;
  channel?: string;
  fromDate?: string | undefined;
  limit: number | string;
  offset: number;
  settled?: boolean;
  toDate?: string | undefined;
}

export interface CasinoBetHistoryItem {
  ageOfAccount: number;
  betId: string;
  betStatus: string;
  betType: number;
  currencyCode: string;
  fixtureName: string;
  gameType: string;
  odds: string;
  payout: number;
  placedDate: string;
  settledDate: string;
  sportName: string;
  stake: number;
  stakeFactor: number;
  userId: string;
}

export interface CasinoBetHistoryResponse {
  data: {
    data: CasinoBetHistoryItem[];
    totalRecords: number;
  };
  status: string;
}

export interface SportsBetSummary {
  offset?: number;
  limit?: number;
  total?: number;
  totalStake?: number;
  totalPayout?: number;
}

export interface SportsBetHistoryResponse {
  result: {
    pageInfo?: SportsBetSummary;
    bets?: SportsBetData[];
  };
}

export type UploadKycRequest = {
  file: File | Blob;
  idType: string;
  kycType: string;
  selfie?: File | Blob;
  traceId?: string;
};

export interface UploadKycResponse {
  [key: string]: any;
}

export interface CasinoBetHistoryWithRoundRequest {
  accessToken?: string;
  betId?: string;
  betSize?: string;
  betStatus?: string;
  gameType?: string;
  itemPerPage?: number;
  pageNumber?: number;
  placedAfter?: string;
  placedBefore?: string;
  roundId?: string
}