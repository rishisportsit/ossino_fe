import { config } from 'config/index';
import { AxiosClient } from '../axiosClient';
import type { ServiceResponse } from 'api/types/ServiceResponse';

export interface CreateTipPayload {
    accessToken: string;
    amount: number;
    clientType: string;
    countryCode: string;
    currencyCode: string;
    receiverUserName: string;
    userId: string;
}

export interface TipApiResponse {
    statuscode: string;
    message: string;
    targetSystem: string;
    result: {
        status: number;
        data: {
            transactionId: string;
            status: string;
            amount: number;
            currencyCode: string;
        };
        message: string;
    };
}
const { wrapperServiceUrl } = config;

class TipApi extends AxiosClient {
    async createTip(payload: CreateTipPayload): Promise<TipApiResponse> {
        const response = await this.client.post<TipApiResponse>('/api/v1/player/create/tip', payload);
        return response.data;
    }
}

const tipApiInstance = new TipApi(wrapperServiceUrl);

export {
    tipApiInstance as TipApi
};

