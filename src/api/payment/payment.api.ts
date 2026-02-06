import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { AxiosClient } from '../axiosClient';
import type { UserLimitsUpdateRequest, UserLimitsUpdateResponse, PaymentConfigRequest, PaymentConfigResponse } from './payment.types';

const { wrapperServiceUrl } = config;

class PaymentApi extends AxiosClient {
  async getPaymentConfig(data: PaymentConfigRequest): Promise<AxiosResponse<ServiceResponse<PaymentConfigResponse>>> {
    return this.client.post('/api/v1/payment/config', data);
  }

  async updateUserLimits(data: UserLimitsUpdateRequest): Promise<AxiosResponse<ServiceResponse<UserLimitsUpdateResponse>>> {
    return this.client.post('/api/v1/player/userlimits/update', data);
  }
}

const paymentApiInstance = new PaymentApi(wrapperServiceUrl);

export {
  paymentApiInstance as PaymentApi
}; 