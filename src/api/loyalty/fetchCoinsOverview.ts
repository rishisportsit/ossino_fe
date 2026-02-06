import axios from 'axios';
import { config } from 'config/index';
import type { CoinsOverview } from 'store/coinsOverview/types';

/**
 * Fetches the user's loyalty/coins overview from the loyalty API and maps it to the CoinsOverview shape.
 * @param params - The request payload for the API
 * @returns CoinsOverview object
 */
export async function fetchCoinsOverview(params: {
  operatorId: string;
  platformId: number;
  brand: string;
  userId: string;
}): Promise<CoinsOverview> {
  const endpoint = `${config.loyaltyServiceUrl}/api/getUserLoyalty`;
  const loyaltyUsername = config.loyaltyUsername || '';
  const loyaltyPassword = config.loyaltyPassword || '';
  const authorization = 'Basic ' + btoa(loyaltyUsername + ':' + loyaltyPassword);
  const accept = import.meta.env.VITE_GET_USER_LOYALTY_ACCEPT || 'application/json';
  const contentType = import.meta.env.VITE_GET_USER_LOYALTY_CONTENT_TYPE || 'application/json';

  const response = await axios.post(endpoint, params, {
    headers: {
      accept,
      authorization,
      'Content-Type': contentType,
    },
  });
  const data = response.data;
  return {
    coinsOverview: {
      burns: data.lifeTimeCoins - data.coins, // Example: total spent
      earns: data.lifeTimeCoins, // Example: total earned
      cashback: 0, // Not present in API, set to 0 or map if available
    },
    totalCoins: data.coins,
    coinExchangeCurrency: '', // Not present in API, set as needed
  };
}
