import { AxiosClient } from '../axiosClient';
import type { ServiceResponse } from 'api/types/ServiceResponse';

export interface PlayerStatsResponse {
    averageBetAmount: number;
    averageWinAmount: number;
    biggestWin: number;
    currency: string;
    highestBetPlaced: number;
    mostPlayedGame: string;
    mostPlayedGameCategory: string | null;
    numberOfGamesPlayed: number;
    totalBetAmount: number;
    totalBetsCount: number;
    totalWinAmount: number;
    totalWinsCount: number;
}

import { config } from 'config/index';

class PlayerStatsApi extends AxiosClient {
    async getPlayerStats(body: {
        operatorId: string;
        playerId: number;
        productType: string;
        createdDate: string;
        updatedDate: string;
    }): Promise<ServiceResponse<PlayerStatsResponse[]>> {
        const response = await this.client.post('/api/v1/player/stats', body);
        return response.data;
    }
}

const playerStatsApiInstance = new PlayerStatsApi(config.wrapperServiceUrl);

export { playerStatsApiInstance as PlayerStatsApi };