// api/registerBonuses/registerBonuses.api.ts
import { AxiosClient } from 'api/axiosClient';
import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import type { RegisterBonusesResponseData } from './registerBonuses.types';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
const { wrapperServiceUrl } = config;

interface RegisterBonusesRequestData {
  accessToken?: string;
  channelType?: string;
  itemsPerPage: number;
  pageNumber: number;
  userId?: any;
  clientType: string;
  allocationType?: string;
  bonusStatus?: string;
  bonusType?: string;
}

class RegisterBonusesApi extends AxiosClient {
  async getRegisterBonuses(requestData?: Partial<RegisterBonusesRequestData>): Promise<
    AxiosResponse<ServiceResponse<RegisterBonusesResponseData>>> {
    const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId);
    const defaultRequestData: RegisterBonusesRequestData = {
      itemsPerPage: 10,
      pageNumber: 0,
      clientType: 'desktop',
      channelType: 'mobile',
      bonusStatus: 'ACTIVE',
      userId: userId,
      ...requestData,
    };

    try {
      const result = await this.client.post(
        '/api/v1/player/bonus',
        defaultRequestData,
      );

      return result;
    } catch (error) {
      console.error('Error fetching register bonuses:', error);
      throw error;
    }
  }
}

const ApiInstance = new RegisterBonusesApi(wrapperServiceUrl);

export {
  ApiInstance as RegisterBonusesApi,
  type RegisterBonusesRequestData
};