import { AxiosClient } from 'api/axiosClient';
import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import type { AxiosResponse } from 'axios';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { BonusSummaryData, BonusSummaryRequestData } from './bonusSummary.types';

const { wrapperServiceUrl } = config;

class BonusSummaryApi extends AxiosClient {
    async getBonusSummary(requestData?: Partial<BonusSummaryRequestData>): Promise<
        AxiosResponse<ServiceResponse<BonusSummaryData>>> {
        let userIdRaw = LocalStorageHelper.getItem(STORAGE_KEYS.userId);
        let userId = '';
        if (typeof userIdRaw === 'string' && userIdRaw.trim() !== '') {
            userId = userIdRaw;
        } else if (typeof userIdRaw === 'number' && userIdRaw > 0) {
            userId = userIdRaw.toString();
        }
        const defaultRequestData: BonusSummaryRequestData = {
            channelType: 'mobile',
            userId: userId,
            ...requestData,
        };

        try {
            const result = await this.client.post(
                '/api/v1/player/bonus/summary',
                defaultRequestData,
            );

            return result;
        } catch (error) {
            throw error;
        }
    }
}

const ApiInstance = new BonusSummaryApi(wrapperServiceUrl);

export {
    ApiInstance as BonusSummaryApi,
    type BonusSummaryRequestData
};