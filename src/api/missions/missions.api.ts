import { AxiosClient } from '../axiosClient';
import axios from 'axios';
import type {
  MissionRewardRequest,
  MissionRewardResponse,
  ClaimRewardRequest,
  ClaimRewardResponse,
} from './missions.types';

const baseURL = import.meta.env.VITE_JAVA_WRAPPER_SERVICE_URL;
const claimApiKey = import.meta.env.VITE_MISSION_CLAIM_API_KEY;

class MissionsApi extends AxiosClient {
  /**
   * Create a claim request with the API key from environment
   */
  createClaimRequest(promotionId: string, playerId: number, accessToken: string): ClaimRewardRequest {
    return {
      promotionId,
      playerId,
      accessToken,
      claimApiKey,
    };
  }

  /**
   * Fetch mission rewards for a player (without access token)
   */
  async getMissionRewards(data: MissionRewardRequest): Promise<MissionRewardResponse> {
    
    // Use direct axios call to bypass the AxiosClient's token injection
    const response = await axios.post(
      `${baseURL}/promotion/v1/player/mission/reward`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    

    return response.data;
  }

  /**
   * Claim a specific mission reward
   */
  async claimMissionReward(data: ClaimRewardRequest): Promise<ClaimRewardResponse> {

    
    // Use direct axios call to handle the new API structure with accessToken and claimApiKey
    const response = await axios.post(
      `${baseURL}/promotion/v1/player/mission/claim/reward`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  }
}

export const missionsApi = new MissionsApi(baseURL);