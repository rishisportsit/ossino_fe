import type { AxiosResponse } from 'axios';
import { config } from 'config/index';
import { AxiosClient } from '../axiosClient';

export type AffiliateApprovalRequestData = {
    affiliatePin: string;
    applyDefaultCommissionPercentage: boolean;
    channel: string;
    commissionPercentage: number;
    firstName: string;
    gender: string;
    lastName: string;
    password: string;
    payoutCycle: number;
    role: string;
    setupCost: number;
    state: string;
    updatedBy: string;
    updatedDate: string;
    userName: string;
};

export type AffiliateApprovalResponseData = {
    code: string;
    message: string;
    targetSystem: string;
    result: {
        status: number;
        data: {
            id: number;
            userName: string;
            firstName: string;
            lastName: string;
            affiliatePin: string;
            phoneNumber: string;
            url: string;
            commissionPercentage: number;
            setupCost: number;
            payoutCycle: number;
            btag: string;
        };
        message: string;
    };
};

export type VipGame = {
    gameName: string;
    aggregator_type?: string;
    aggregator?: string;
    provider: string;
    game_code?: string;
    gameCode?: string;
    image: {
        url: string;
        configurl: string;
    };
    gametype?: string;
    name?: string;
    active?: boolean;
};



const { wrapperServiceUrl, loyaltyServiceUrl } = config;

class VipApi extends AxiosClient {
    /**
     * Generate affiliate approval request
     */
    async generateAffiliate(data: AffiliateApprovalRequestData): Promise<AxiosResponse<AffiliateApprovalResponseData>> {
        const result = await this.client.post('/api/v1/affiliate/approval/request', data);
        return result;
    }

    /**
     * Get VIP games list from loyalty API
     */
    async getVipGamesList(data: any): Promise<any> {
        const headers = {
            'Authorization': 'Basic ' + 'TE9ZQUxUWUFQSTpldzgpJHByYj1bPURCcyg=',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const response = await fetch(`${loyaltyServiceUrl}/api/vipgamesList`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Update VIP games selection
     */
    async updateVipGames(data: any): Promise<any> {
        const headers = {
            'Authorization': 'Basic ' + 'TE9ZQUxUWUFQSTpldzgpJHByYj1bPURCcyg=',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const response = await fetch(`${loyaltyServiceUrl}/api/vipgamesList`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }


    /**
     * Generate VIP report
     */
    async generateVipReport(data: any): Promise<AxiosResponse<any>> {
        const result = await this.client.post('/api/v1/affiliate/vip/report', data);
        return result;
    }

    /**
     * Get affiliate earnings details
     */
    async getAffiliateEarnings(data: any): Promise<AxiosResponse<any>> {
        const result = await this.client.post('/api/v1/affiliate/earnings', data);
        return result;
    }

    /**
     * Get affiliate data summary
     */
    async getAffiliateData(data: { bTag: string; channel: string }): Promise<AxiosResponse<any>> {
        const result = await this.client.post('/api/v1/affiliate/data', data);
        return result;
    }

    /**
     * Get affiliate summary overview
     */
    async getAffiliateSummary(data: { bTag: string; channel: string }): Promise<AxiosResponse<any>> {
        const result = await this.client.post('/api/v1/affiliate/summary', data);
        return result;
    }

    /**
     * Get loyalty coin history for VIP users
     */
    async getCoinsHistory(userId: string, transactionType?: string): Promise<any> {
        const headers = {
            'Authorization': 'Basic ' + 'TE9ZQUxUWUFQSTpldzgpJHByYj1bPURCcyg=',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const payload = {
            operatorId: config.operatorId || 'ossino',
            platformId: Number(config.platformId) || 2,
            brand: config.operatorId || 'ossino',
            userId: userId.toString(),
            ...(transactionType && transactionType !== 'ALL' && { transactionType }),
        };

        const response = await fetch(`${loyaltyServiceUrl}/api/coinsHistory`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Get VIP games from loyalty API - New Real API
     */
    async getVipGames(data: any): Promise<any> {
        const headers = {
            'Authorization': 'Basic ' + 'TE9ZQUxUWUFQSTpldzgpJHByYj1bPURCcyg=',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const response = await fetch(`${loyaltyServiceUrl}/api/getGames`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Update VIP games - New Real API
     */
    async updateVipGamesReal(data: any): Promise<any> {
        const headers = {
            'Authorization': 'Basic ' + 'TE9ZQUxUWUFQSTpldzgpJHByYj1bPURCcyg=',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const response = await fetch(`${loyaltyServiceUrl}/api/updateGamesList`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }


}

const VipInstance = new VipApi(wrapperServiceUrl);

export { VipInstance as VipApi };