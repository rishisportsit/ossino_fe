import { STORAGE_KEYS } from 'constants/storage';
import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { LocalStorageHelper } from 'helpers/storage';
import { AxiosClient } from '../axiosClient';

interface ApiLastWin {
  gameName: string;
  betId: string;
  gameId: string;
  amount: number;
  currency: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

interface LastWinsResponse {
  lastWins: ApiLastWin[];
}

const { wrapperServiceUrl } = config;

class HomePageApi extends AxiosClient {
  async getRecentWins(): Promise<AxiosResponse<ServiceResponse<LastWinsResponse>>> {
    const result = await this.client.get(`/api/v1/user/player-insights`, {
      params: {
        userId: LocalStorageHelper.getItem(STORAGE_KEYS.userId) || '',
        types: 'LAST_WINS',
        gameTypes: 'CASINO,NE_GAMES',
        fromDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        toDate: new Date().toISOString(),
      },
    });
    return result;
  }
}

const homePageApiInstance = new HomePageApi(wrapperServiceUrl);

export {
  homePageApiInstance as HomePageApi
};