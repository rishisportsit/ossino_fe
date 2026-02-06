import type { AxiosResponse } from 'axios';
import { AxiosClient } from '../axiosClient';
import type { BetConfigRequest, BetConfigResponse } from './betConfig.types';
import { config } from 'config/index';

const { wrapperServiceUrl } = config;

class BetConfigApi extends AxiosClient {
  async getBetConfig({
    'X-Client-Id': clientId,
    'X-Currency-Code': currencyCode
  }: BetConfigRequest): Promise<AxiosResponse<BetConfigResponse>> {
    const result = await this.client.get(
      `/api/v1/new/betconfig?X-Client-Id=${clientId}&X-Currency-Code=${currencyCode}`,
    );
    return result;
  }
}

const betConfigApiInstance = new BetConfigApi(wrapperServiceUrl);

export { betConfigApiInstance as BetConfigApi };