import { CLIENT_TYPE } from 'constants/clientType';
import { config } from 'config/index';
import type { AxiosResponse } from 'axios';
import { type RecentlyPlayedGame } from 'store/recentlyPlayed/types';
import { AxiosClient } from '../axiosClient';

const { wrapperServiceUrl } = config;

class RgsApi extends AxiosClient {
  async getRecentlyPlayedGames(): Promise<
    AxiosResponse<{
      result: {
        data: RecentlyPlayedGame[];
      };
    }>
  > {
    const result = await this.client.post(`/api/v1/rgs/recent/game/data/user`, {
      clientType: CLIENT_TYPE,
    });
    return result;
  }
}

export const rgsApi = new RgsApi(wrapperServiceUrl);
