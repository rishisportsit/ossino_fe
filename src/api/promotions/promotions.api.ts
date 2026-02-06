import { AxiosClient } from '../axiosClient';
import type { ServiceResponse } from '../types/ServiceResponse';

export interface UpdateOptRequest {
  playerId: string;
  operatorId: string;
  brand: string;
  promotionId: string;
  optIn: boolean;
  missionType: string;
}

export interface UpdateOptResponse {
  id: number;
  status: string;
  message: string;
  playerId: string;
  promotionId: string;
  optIn: boolean;
  startedAt: string;
}

export interface LeaderboardEntry {
  playerId: string;
  rankPosition: number;
  metricValue: number | null;
  metricType: string;
}

export interface GetLeaderboardRequest {
  promotionId?: string;
  playerId?: string;
  leaderboardSize?: string;
}

export interface CurrentPlayer {
  playerId: string;
  rankPosition: number;
  metricValue: number | null;
  metricType: string;
}

export interface GetLeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  currentPlayer: CurrentPlayer | null;
}

const baseURL = import.meta.env.VITE_JAVA_WRAPPER_SERVICE_URL;

class PromotionsApi extends AxiosClient {
  async updateOpt(data: UpdateOptRequest): Promise<UpdateOptResponse> {
    const response = await this.client.post(
      `/promotion/v1/leaderboard/opt`,
      data,
    );
    return response.data.result;
  }

  async getLeaderboardPromotions(
    operatorId: string,
    providerName: string,
    playerId: string,
  ): Promise<any[]> {
    let url = `/promotion/v1/leaderboard/promotions?operatorId=${operatorId}`;
    if (providerName) url += `&providerName=${providerName}`;
    if (playerId) url += `&playerId=${playerId}`;
    const response = await this.client.get(url);
    const raw = response.data?.result?.rawResponse;
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return [];
      }
    }
    return [];
  }

  async getLeaderboard(
    data: GetLeaderboardRequest,
  ): Promise<GetLeaderboardResponse> {
    // Keep the original leaderboard POST for specific promotionId
    const response = await this.client.post(`/v1/leaderboard/standings`, data);
    // The API response shape is: { result: { currentPlayer, leaderboard }, ... }
    return response.data.result;
  }
}

export const promotionsApi = new PromotionsApi(baseURL);
