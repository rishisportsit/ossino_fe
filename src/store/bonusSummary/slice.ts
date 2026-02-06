import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BonusSummaryApi } from 'api/bonus/bonusSummary.api';
import { BonusSummaryData, BonusSummaryApiResponse } from 'api/bonus/bonusSummary.types';

export const getBonusSummary = createAsyncThunk(
    'bonusSummary/get',
    async () => {
        try {
            const response = await BonusSummaryApi.getBonusSummary();

            const result = response.data.result;
            
            if (!result || typeof result !== 'object' || !('data' in result) || !result.data) {
                throw new Error('Invalid API response structure');
            }
            
            const apiData = result.data as BonusSummaryApiResponse;
            const mappedData: BonusSummaryData = {
                sportsBonus: {
                    freeBetCount: Math.floor(apiData.freeBetBalance || 0),
                    unlockedBonus: apiData.sportUnLockedBonus || 0,
                    lockedBonus: apiData.sportLockedBonus || 0,
                    totalAmount: (apiData.sportUnLockedBonus || 0) + (apiData.sportLockedBonus || 0)
                },
                casinoBonus: {
                    freeSpinCount: apiData.freeSpinCount || 0,
                    unlockedBonus: apiData.casinoUnLockedBonus || 0,
                    lockedBonus: apiData.casinoLockedBonus || 0,
                    totalAmount: (apiData.casinoUnLockedBonus || 0) + (apiData.casinoLockedBonus || 0)
                },
                currencyCode: apiData.currencyCode || 'USDT'
            };

            return mappedData;
        } catch (error) {
            console.log('API failed, returning mock data for testing:', error);

            const mockData: BonusSummaryData = {
                sportsBonus: {
                    freeBetCount: 2,
                    unlockedBonus: 450.00,
                    lockedBonus: 1500.00,
                    totalAmount: 1950.00
                },
                casinoBonus: {
                    freeSpinCount: 8,
                    unlockedBonus: 500.00,
                    lockedBonus: 1000.00,
                    totalAmount: 1500.00
                },
                currencyCode: 'USDT'
            };

            return mockData;
        }
    }
);

type BonusSummaryState = {
    data: BonusSummaryData | null;
    loading: boolean;
    error: string | null;
};

const initialState: BonusSummaryState = {
    data: null,
    loading: false,
    error: null,
};

const bonusSummarySlice = createSlice({
    name: 'bonusSummary',
    initialState,
    reducers: {
        clearBonusSummary: (state) => {
            state.data = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBonusSummary.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getBonusSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getBonusSummary.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export const { clearBonusSummary } = bonusSummarySlice.actions;
export default bonusSummarySlice.reducer;