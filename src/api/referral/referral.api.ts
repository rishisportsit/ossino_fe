import type { AxiosResponse } from 'axios';
import { AxiosClient } from 'api/axiosClient';
import { config } from 'config/index';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import type { ServiceResponse } from '../types/ServiceResponse';
import type {
  GetAffiliateSummaryRequestData,
  GetReferralDetailsResponseData,
} from './referral.types';

const { wrapperServiceUrl } = config;

class ReferralApi extends AxiosClient {
  async getAffiliateSummary(data: GetAffiliateSummaryRequestData) {
    const result = await this.client.post('/api/v1/affiliate/summary', data);
    return result;
  }

  async getReferralDetails(): Promise<
    AxiosResponse<ServiceResponse<GetReferralDetailsResponseData>>
  > {
    const accessToken =
      LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) || '';
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(userAgent);
    const clientType = isMobile ? 'mobile' : 'desktop';
    const payload = { accessToken, clientType };
    return this.client.post<ServiceResponse<GetReferralDetailsResponseData>>(
      '/api/v1/player/referral/details',
      payload,
    );
  }
}

const ReferralInstance = new ReferralApi(wrapperServiceUrl);

export { ReferralInstance as ReferralApi };
