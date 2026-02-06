import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BonusHistoryApi } from 'api/registerBonuses/bonusHistory.api';
import { BonusHistoryTransaction } from 'api/registerBonuses/bonusHistory.types';

interface BonusHistoryState {
    data: BonusHistoryTransaction[];
    totalRecords: number;
    loading: boolean;
    error: { message: string } | null;
    currentPage: number;
}

const initialState: BonusHistoryState = {
    data: [],
    totalRecords: 0,
    loading: false,
    error: null,
    currentPage: 0,
};

export const getBonusHistory = createAsyncThunk(
    'bonusHistory/getBonusHistory',
    async (pageNumber: number = 0, { rejectWithValue }) => {
        try {
            const response = await BonusHistoryApi.getBonusHistory({ pageNumber });

            if (!response.data.result || !response.data.result.data) {
                return rejectWithValue({
                    message: 'Invalid response format',
                });
            }

            const resultData = response.data.result.data;

            return {
                data: resultData.data || [],
                totalRecords: resultData.totalRecords || 0,
                pageNumber,
            };
        } catch (error: any) {
            return rejectWithValue({
                message: error?.response?.data?.message || 'Failed to fetch bonus history',
            });
        }
    }
);

const bonusHistorySlice = createSlice({
    name: 'bonusHistory',
    initialState,
    reducers: {
        clearBonusHistory: (state) => {
            state.data = [];
            state.totalRecords = 0;
            state.currentPage = 0;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBonusHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBonusHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.totalRecords = action.payload.totalRecords;
                state.currentPage = action.payload.pageNumber;
            })
            .addCase(getBonusHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as { message: string };
            });
    },
});

export const { clearBonusHistory } = bonusHistorySlice.actions;
export default bonusHistorySlice.reducer;