import { AxiosClient } from '../axiosClient';
import { config } from 'config/index';
import type { AxiosResponse } from 'axios';

export interface BetHistoryRequest {
  accessToken: string;
  channel: 'Mobile' | 'Internet';
  fromDate?: string;
  toDate?: string;
  limit: number;
  offset: number;
  settled?: boolean;
}

export interface BetPart {
  selectionId: string;
  sportId: number;
  sportName: string;
  categoryId: number;
  categoryName: string;
  tournamentId: number;
  tournamentName: string;
  competitionId: number;
  eventCode: number;
  competitionName: string;
  competitionStartDate: string;
  competitionStatus: string;
  marketId: number;
  marketName: string;
  subMarketName: string;
  outcomeId: string;
  outcomeName: string;
  odds: string;
  outcomeResult: string;
  scores: string;
  ticketTimeScore: string;
  settleTimeScore: string;
  isoutrights: boolean;
  matchStatus: string;
  eventStatus: string;
  newScheduledTime: string;
  currentEventStatus: string;
  ticketTimeProbability: number | string;
  currentTimeProbability: number | string;
  country: string;
  ticketTimeEventStatus: string;
  currentMatchMinutes: string;
  settleTimeMatchMinutes: string;
  ticketTimeMatchMinutes: string;
  settleTimeEventStatus: string;
  providerId: number;
  round: string;
  boostedOdds: string;
  providerOdds: string;
  isBoosted: boolean;
}

export interface BetHistoryItem {
  ticketId: string;
  channel: string;
  oddsChangeType: string;
  status: 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'PENDING';
  createdDate: string;
  stake: string;
  remainingStake: number;
  isPartialCoBet: boolean;
  currency: string;
  totalOdds: string;
  payout: string;
  potentialPayout: string;
  cashoutStatus: string;
  cashOutAmount: string;
  isFreeBet: boolean;
  stakeBonus: number;
  stakeReal: number;
  bonusWinnings: number;
  bonusPercentage: number;
  groupCount: number;
  combinationCount: number;
  minOdds: number;
  maxOdds: number;
  minPayout: number;
  maxPayout: number;
  freeBetId: string;
  bonusType: string;
  resultedDate: string;
  betType: string;
  maxWinAmount: string;
  maxWinPercentage: string;
  clientMaxPayout: number;
  betParts: BetPart[];
  cashoutHistory: any[];
  stakeTaxAmount: number;
  winningTaxAmount: number;
  stakeTax: number;
  winningTax: number;
  stakeAfterTax: number;
  totalStake: number;
  isNftHoldingCreated: boolean;
  isNftTraded: boolean;
  subBetType: string;
  maxPayoutCapped: boolean;
  shortBetId: string;
  betEligibleForOneCutBonus: boolean;
  betEligibleForTwoCutBonus: boolean;
  partialCoBet: boolean;
  tId: number;
  isPrinted: boolean;
}

export interface BetHistoryPageInfo {
  offset: number;
  limit: number;
  total: number;
  totalStake: number;
  totalPayout: number;
}

export interface BetHistoryResult {
  pageInfo: BetHistoryPageInfo;
  bets: BetHistoryItem[];
}

export interface BetHistoryResponse {
  code: string;
  message: string;
  statusCode: number;
  result: BetHistoryResult;
  targetSystem: string;
}

class BetHistoryApi extends AxiosClient {
  async getBetHistory(data: BetHistoryRequest): Promise<AxiosResponse<BetHistoryResponse>> {
    return this.client.post(`/api/v1/bethistory?X-Client-Id=${config.xClientId}`, data);
  }
}

export const betHistoryApi = new BetHistoryApi(config.wrapperServiceUrl);

export const getBetHistory = async (data: BetHistoryRequest): Promise<BetHistoryResponse> => {
  try {
    const response = await betHistoryApi.getBetHistory(data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const validateBetFromHistory = (response?: BetHistoryResponse, targetTicketId?: string) => {
  const bets = response?.result?.bets || [];
  const targetBet = bets.find(bet => bet.ticketId === targetTicketId);
  
  if (targetBet) {
    return {
      found: true,
      status: targetBet.status,
      shortBetId: targetBet.shortBetId,
      bet: targetBet
    };
  }
  
  return { 
    found: false,
    status: null,
    shortBetId: null,
    bet: null
  };
};