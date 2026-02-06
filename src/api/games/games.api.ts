import type { AxiosResponse } from 'axios';
import { config } from 'config/index';
import { AxiosClient } from '../axiosClient';
import type { LaunchDemoGameRequest, LaunchDemoGameResponse, LaunchRealGameRequest, LaunchRealGameResponse } from './games.types';

class GamesApi extends AxiosClient {
  async launchDemoGame(data: LaunchDemoGameRequest): Promise<AxiosResponse<LaunchDemoGameResponse>> {
    return this.client.post('/casino/v1/launchDemoGame', data);
  }
  async launchRealGame(data: LaunchRealGameRequest): Promise<AxiosResponse<LaunchRealGameResponse>> {
    return this.client.post('/casino/v1/launchGame', data);
  }
}

export const gamesApi = new GamesApi(config.gamesServiceUrl); 