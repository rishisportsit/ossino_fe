import { AxiosClient } from 'api/axiosClient';
import type { StandingsResponse } from './standings.types';
import { config } from 'config/index';

const { newsStandingsServiceUrl } = config;

class StandingsApi extends AxiosClient {
  async getStandings(
    season: string,
    limit: number = 5
  ): Promise<StandingsResponse> {
    const res = await this.client.get(
      `${newsStandingsServiceUrl}/api/v1/football/standings?season=${season}&limit=${limit}`
    );
    return res.data;
  }
}

export const standingsApi = new StandingsApi(newsStandingsServiceUrl);
