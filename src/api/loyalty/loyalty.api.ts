import type { AxiosResponse } from 'axios';
import { config } from 'config/index';
import type { LoyaltyDetails } from 'store/loyaltyDetails/slice';
import { AxiosClient } from '../axiosClient';
import type {
  ApiRewardsSummary,
  BurnCoinsRequestData,
  GetDailyRewardsResponseData,
  GetLeaderBoardResponseData,
  GetLoyaltyLevelsResponseData,
  GetRewardHistoryResponseData,
  LoyaltyPaginatedRequestData,
  LoyaltyRequestData,
  LoyaltyResponseData,
} from './loyalty.types';
import type {
  RedeemPrizeRequestData,
  RedeemPrizeResponseData,
} from './redeemPrize.types';
import { toast } from 'sonner';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import type { LeaderboardApiResponse } from './loyalty.models';
import axios from 'axios';

const { loyaltyServiceUrl, brandId, loyaltyUsername, loyaltyPassword } = config;

class LoyaltyApi extends AxiosClient {
  public async getRedemptions(params: {
    userId: string;
    brand: string;
    platformId: number;
    operatorId: string;
    token: string;
  }) {
    return this.client.get('/api/redemptionList', {
      params,
      headers: this.getAuthHeaders(),
    });
  }

  async fetchLeaderboard(params: {
    brand: string;
    platformId: number;
    operatorId: string;
    limit: number;
    userId: string;
    username?: string;
  }): Promise<LeaderboardApiResponse> {
    const response = await this.client.get<LeaderboardApiResponse>(
      '/api/getLeaderboard',
      {
        params,
        headers: this.getAuthHeaders(),
      },
    );
    return response.data;
  }
  constructor(baseURL: string) {
    super(baseURL);
    this.setupAuthHeaders();
  }

  private setupAuthHeaders(): void {
    if (loyaltyUsername && loyaltyPassword) {
      const basicAuth = 'Basic' + btoa(loyaltyUsername + ':' + loyaltyPassword);

      this.client.defaults.headers.common['Authorization'] = basicAuth;
      this.client.defaults.headers.common['Content-Type'] = 'application/json';
    }
  }

  private getAuthHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (loyaltyUsername && loyaltyPassword) {
      headers['Authorization'] =
        'Basic ' + 'TE9ZQUxUWUFQSTpldzgpJHByYj1bPURCcyg=';
      // + btoa(loyaltyUsername + ':' + loyaltyPassword);
    }

    return headers;
  }
  async redeemPrize(
    data: RedeemPrizeRequestData,
  ): Promise<AxiosResponse<RedeemPrizeResponseData> | undefined> {
    const endpoint = 'api/Claimredemption';
    const loyaltyAuth = import.meta.env.VITE_LOYALTY_AUTH;
    const authorization = `Basic ${loyaltyAuth}`;
    const accept =
      import.meta.env.VITE_REDEEM_PRIZE_ACCEPT || 'application/json';
    const contentType =
      import.meta.env.VITE_REDEEM_PRIZE_CONTENT_TYPE || 'application/json';
    try {
      const result = await this.client.post(endpoint, data, {
        headers: {
          accept,
          authorization,
          'Content-Type': contentType,
        },
      });
      return result;
    } catch (error: any) {
      toast.error('Failed to redeem prize', {
        description: error?.message || 'An error occurred',
      });
      return undefined;
    }
  }
  async getLoyaltyDetails(
    data: LoyaltyRequestData,
  ): Promise<AxiosResponse<LoyaltyDetails>> {

    const code = LocalStorageHelper.getItem(STORAGE_KEYS.code) as string;
    const result = await this.client.post(
      'api/getUserLoyalty',
      {
        ...data,
        brandId,
        code
      },
      {
        headers: this.getAuthHeaders(),
      },
    );

    return result;
  }

  async getDailyRewards(
    data: LoyaltyRequestData,
  ): Promise<AxiosResponse<GetDailyRewardsResponseData>> {
    const result = await this.client.post(
      'api/loyalty/dailyrewards',
      {
        ...data,
        brandId,
      },
      {
        headers: this.getAuthHeaders(),
      },
    );

    return result;
  }

  async getLeaderBoard(
    data: LoyaltyPaginatedRequestData,
  ): Promise<AxiosResponse<GetLeaderBoardResponseData>> {
    const result = await this.client.post(
      '/api/loyalty/leaderboard',
      {
        ...data,
        brandId,
      },
      {
        headers: this.getAuthHeaders(),
      },
    );

    return result;
  }

  async getRewardsSummary(
    data: LoyaltyRequestData,
  ): Promise<AxiosResponse<ApiRewardsSummary>> {
    const result = await this.client.post(
      '/api/loyaltyHistory',
      {
        ...data,
        brandId,
      },
      {
        headers: this.getAuthHeaders(),
      },
    );

    return result;
  }

  async burnCoins(
    data: BurnCoinsRequestData,
  ): Promise<AxiosResponse<LoyaltyResponseData>> {
    const result = await this.client.post('/api/redeemCoins', data, {
      headers: this.getAuthHeaders(),
    });
    return result;
  }

  async getRewardHistory(
    data: LoyaltyPaginatedRequestData,
  ): Promise<AxiosResponse<GetRewardHistoryResponseData>> {
    const result = await this.client.post(
      '/api/loyaltyHistory',
      {
        ...data,
        brandId,
      },
      {
        headers: this.getAuthHeaders(),
      },
    );

    return result;
  }

  async getLoyaltyLevels(
    data: LoyaltyRequestData,
  ): Promise<AxiosResponse<GetLoyaltyLevelsResponseData>> {
    const result = await this.client.post(
      '/api/loyalty/levels',
      {
        ...data,
        brandId,
      },
      {
        headers: this.getAuthHeaders(),
      },
    );

    return result;
  }

  async claimPromotion(promotionId: string): Promise<AxiosResponse<any>> {
    const baseURL = import.meta.env.VITE_WRAPPER_SERVICE_URL as string;
    const userIdStr = LocalStorageHelper.getItem(STORAGE_KEYS.userId) as string;
    const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) as string;
    const userId = Number(userIdStr);
    const url = `/api/v1/player/claim/challenges`;
    try {
      const result = await axios.post(
        `${baseURL}${url}`,
        {
          promotionId,
          playerId: userId,
          accessToken
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return result;
    } catch (error: any) {
      toast.error('Failed to claim promotion', {
        description: error?.message || 'An error occurred',
      });
      return error;
    }
  }

  async creditCoinsForBetLoss(betData: {
    userId: string;
    betAmount: number;
    currency: string;
    gameId: string;
  }): Promise<any> { // Using any for flexible response handling or define interface
    try {
      const response = await this.client.post(
        '/api/loyalty/credit-bet-loss',
        { ...betData, brandId },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to credit loyalty coins for bet loss:', error);
      throw error;
    }
  }

  async claimDailyReward(userId: string): Promise<any> {
    try {
      const response = await this.client.post(
        '/api/loyalty/claim-daily-reward',
        { userId, brandId },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to claim daily reward:', error);
      throw error;
    }
  }
}

const LoyaltyInstance = new LoyaltyApi(loyaltyServiceUrl);
export { LoyaltyInstance as LoyaltyApi };
