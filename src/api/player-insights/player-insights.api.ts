import { STORAGE_KEYS } from 'constants/storage';
import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { LocalStorageHelper } from 'helpers/storage';
import { AxiosClient } from '../axiosClient';
import type { PlayerInsightsResponse, TopLossesResponse } from './player-insights.types';

const { wrapperServiceUrl, javaWrapperServiceUrl } = config;

class PlayerInsightsApi extends AxiosClient {
    async getPlayerInsights(): Promise<AxiosResponse<ServiceResponse<PlayerInsightsResponse>>> {
        const result = await this.client.get(`/api/v1/user/player-insights`, {
            params: {
                userId: LocalStorageHelper.getItem(STORAGE_KEYS.userId) || '',
                types: 'HIGHEST_BETS',
                gameTypes: 'CASINO,NE_GAMES',
                fromDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                toDate: new Date().toISOString(),
            },
        });
        return result;
    }

   async getTopLossesGames(): Promise<TopLossesResponse> {
        const authHeader = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);

        const result = await this.client.get(`${javaWrapperServiceUrl}/v1/games/top/losses`, {
            headers: authHeader ? {
                'Authorisation': `${authHeader}`
            } : undefined
        });

        return result.data;
    }
      async getPlayerInsightsForTopWinnings(): Promise<AxiosResponse<ServiceResponse<PlayerInsightsResponse>>> {
        const result = await this.client.get(`/api/v1/user/player-insights`, {
            params: {               
                types: 'HIGHEST_WINS',
                gameTypes: 'SPORTS',
                fromDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                toDate: new Date().toISOString(),
            },
        });
        return result;
    }
}

const playerInsightsApiInstance = new PlayerInsightsApi(wrapperServiceUrl);

export {
    playerInsightsApiInstance as PlayerInsightsApi
};