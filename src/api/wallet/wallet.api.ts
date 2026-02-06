import { CLIENT_TYPE } from 'constants/clientType';
import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { AxiosClient } from '../axiosClient';
import type {
  WalletListResponse,
  WalletAddressListResponse,
  WalletAddressRequestData,
  WalletCurrencyRequestData
} from './wallet.types';

const { wrapperServiceUrl } = config;

class WalletApi extends AxiosClient {
  async getWalletList({ currencyCode = "", currencyType = "" }: WalletCurrencyRequestData): Promise<AxiosResponse<ServiceResponse<WalletListResponse>>> {
    const result = await this.client.post(`/api/v1/player/wallet/list`, { currencyCode, currencyType, channelType: CLIENT_TYPE });
    return result;
  }

  async getAddressList({ currencyCode = "BTC_TEST" }: WalletAddressRequestData): Promise<AxiosResponse<ServiceResponse<WalletAddressListResponse>>> {
    const result = this.client.post(`/api/v1/player/wallet/addresses/list`, { currencyCode, channelType: CLIENT_TYPE });
    return result;
  }
}

const walletApiInstance = new WalletApi(wrapperServiceUrl);

export {
  walletApiInstance as WalletApi
};