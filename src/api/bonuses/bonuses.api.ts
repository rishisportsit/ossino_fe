import type { AxiosResponse } from 'axios';
import { config } from 'config/index';
import { AxiosClient } from '../axiosClient';
import type { 
  BonusesApiResponse, 
  GetBonusesRequest, 
  Bonus 
} from './bonuses.types';

class BonusesApi extends AxiosClient {
  async getAllBonuses(
    request: GetBonusesRequest = {}
  ): Promise<AxiosResponse<BonusesApiResponse>> {
    const defaultRequest: GetBonusesRequest = {
      allocationType: 'AUTO',
      bonusStatus: 'ACTIVE',
      bonusType: 'DEPOSIT',
      clientType: 'mobile',
      itemsPerPage: 10,
      pageNumber: 0,
      ...request,
    };

    return this.client.post<BonusesApiResponse>(
      '/api/v1/get/all/bonus',
      defaultRequest
    );
  }

  async getBonusesByType(
    applicableType: 'SPORTS' | 'CASINO' | 'ALL'
  ): Promise<Bonus[]> {
    const response = await this.getAllBonuses();
    const bonusesData = response.data.result.data.data;
    
    if (applicableType === 'ALL') {
      return bonusesData;
    }
    
    return bonusesData.filter(
      (bonus) => bonus.applicableType === applicableType || bonus.applicableType === 'ALL'
    );
  }
}

export const bonusesApi = new BonusesApi(config.wrapperServiceUrl);