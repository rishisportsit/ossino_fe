import { config } from 'config/index';
import { AxiosClient } from '../axiosClient';
import {
  GetAffiliateGamesRequestData,
  GetPlayerDetailsByBtagRequestData,
  GetPlayerDetailsByBtagResponseData
} from './affiliate.types';

export type { GetAffiliateGamesRequestData };

const { wrapperServiceUrl, loyaltyServiceUrl } = config;

class AffiliateApi extends AxiosClient {
  /**
   * Get affiliate games from loyalty API
   */
  async getAffiliateGames(data: GetAffiliateGamesRequestData): Promise<any> {
    const headers = {
      'Authorization': 'Basic ' + 'TE9ZQUxUWUFQSTpldzgpJHByYj1bPURCcyg=',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const response = await fetch(`${loyaltyServiceUrl}/api/getAffiliateGames`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Get player details by btag from affiliate API
   */
  async getPlayerDetailsByBtag(data: GetPlayerDetailsByBtagRequestData): Promise<GetPlayerDetailsByBtagResponseData> {
    const response = await this.client.post('/api/affiliate/player/details/by/btag', data, {
      headers: {
        'X-Trace-Id': crypto.randomUUID(), // Generate a unique trace ID
      },
    });
    return response.data;
  }
}

const AffiliateApiInstance = new AffiliateApi(wrapperServiceUrl);

export { AffiliateApiInstance as AffiliateApi };