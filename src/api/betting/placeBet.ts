import { AxiosClient } from '../axiosClient';
import { config } from 'config/index';
import type { AxiosResponse } from 'axios';

export interface PlaceBetSelection {
  odds: number;
  selectionId: string;
  stake: number;
}

export interface PlaceBetRequest {
  accessToken: string;
  channel: 'Mobile' | 'Internet';
  currencyCode: string;
  oddsChangeType: 'any' | 'none';
  selections: PlaceBetSelection[];
  betType: 'single' | 'multi';
  stake: number;
}

export interface PlaceBetSelectionResult {
  statusCode: number;
  message?: string;
  eventId: string;
  sportId: string;
  marketId: string;
  outcomeId: string;
  odds: number;
  selectionId: string;
  live: boolean;
}

export interface PlaceBetResult {
  ticketId: string;
  shortBetId: string;
  betStatus: string;
  stake: string;
  selections: PlaceBetSelectionResult[];
  tId: number;
}

export interface PlaceBetResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: {
    code: string;
    message: string;
    statusCode: number;
    result: PlaceBetResult;
    targetSystem: string;
  };
  error?: boolean;
}

class PlaceBetApi extends AxiosClient {
  async placeBet(data: PlaceBetRequest): Promise<AxiosResponse<PlaceBetResponse>> {
    return this.client.post(`/api/v1/placebet?X-Client-Id=${config.xClientId}`, data);
  }
}

export const placeBetApi = new PlaceBetApi(config.wrapperServiceUrl);

export const placeBet = async (data: PlaceBetRequest): Promise<PlaceBetResponse> => {
  try {
    const response = await placeBetApi.placeBet(data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const getChannel = (): 'Mobile' | 'Internet' => {
  const isMobile = window.innerWidth <= 768 || 
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile ? 'Mobile' : 'Internet';
};

export const calculateActualStake = (userStake: number, isUsdMode: boolean, conversionRate?: number,currency?: string): number => {
  if (isUsdMode && conversionRate) {
    if(currency === 'USDT'){
      let truncate = Math.floor((userStake / conversionRate) * 100) / 100;
      return Number(truncate);  
    }
    let truncate = Math.floor((userStake / conversionRate) *  10000000000) / 10000000000;
      return Number(truncate);  
  }
    return Number(userStake); 
};

export const getBetType = (selectionsCount: number): 'single' | 'multi' => {
  return selectionsCount === 1 ? 'single' : 'multi';
};