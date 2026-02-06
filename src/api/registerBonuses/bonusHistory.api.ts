import { AxiosClient } from 'api/axiosClient';
import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { BonusHistoryResponseData } from './bonusHistory.types';

const { wrapperServiceUrl } = config;

interface BonusHistoryRequestData {
    accessToken?: string;
    channelType?: string;
    itemsPerPage: number;
    pageNumber: number;
    userId?: any;
}

class BonusHistoryApi extends AxiosClient {
    async getBonusHistory(requestData?: Partial<BonusHistoryRequestData>): Promise<
        AxiosResponse<ServiceResponse<BonusHistoryResponseData>>> {
        const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId);
        const defaultRequestData: BonusHistoryRequestData = {
            itemsPerPage: 10,
            pageNumber: 0,
            channelType: 'mobile',
            userId: userId,
            ...requestData,
        };

        try {
            const result = await this.client.post(
                '/api/v1/player/bonus/history',
                defaultRequestData,
            );

            return result;
        } catch (error) {
            console.error('Error fetching bonus history:', error);
            throw error;
        }
    }
}

const ApiInstance = new BonusHistoryApi(wrapperServiceUrl);

export {
    ApiInstance as BonusHistoryApi,
    type BonusHistoryRequestData
};