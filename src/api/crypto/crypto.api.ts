import { AxiosResponse } from "axios";

import { config } from "config/index";
import { CryptoWithdrawRequestData, CryptoWithdrawResponse } from "./crypto.types";
import { AxiosClient } from "api/axiosClient";
import { ServiceResponse } from "api/types/ServiceResponse";

const { wrapperServiceUrl } = config;

class CryptoApi extends AxiosClient {
    async withdraw(data: CryptoWithdrawRequestData): Promise<AxiosResponse<ServiceResponse<CryptoWithdrawResponse>>> {
        const result = await this.client.post('/api/v1/crypto/withdraw', data);
        return result
    }
}

const cryptoApiInstance = new CryptoApi(wrapperServiceUrl);

export {
    cryptoApiInstance as CryptoApi
};