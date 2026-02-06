export interface SportsBonusData {
    freeBetCount: number;
    unlockedBonus: number;
    lockedBonus: number;
    totalAmount: number;
}

export interface CasinoBonusData {
    freeSpinCount: number;
    unlockedBonus: number;
    lockedBonus: number;
    totalAmount: number;
}

export interface BonusSummaryData {
    sportsBonus: SportsBonusData;
    casinoBonus: CasinoBonusData;
    currencyCode: string;
}

export interface BonusSummaryApiResponse {
    lockedBonus: number;
    unLockedBonus: number;
    sportLockedBonus: number;
    sportUnLockedBonus: number;
    casinoLockedBonus: number;
    casinoUnLockedBonus: number;
    neGameLockedBonus: number;
    neGameUnLockedBonus: number;
    currencyCode: string;
    freeSpinCount: number;
    freeBetBalance: number;
}

export interface BonusSummaryApiResult {
    status: number;
    data: BonusSummaryApiResponse;
    message: string;
}

export interface BonusSummaryRequestData {
    accessToken?: string;
    channelType?: string;
    userId?: string;
}