import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { type CoinHistory } from './types';
import { getLoyaltyData } from 'store/helpers/getLoyaltyData';
import { LoyaltyApi } from 'api/loyalty/loyalty.api';
import { handleRewardHistoryResponse } from './helpers';
import { RootState } from '..';

export const getCoinsHistory = createAppAsyncThunk(
  'coinsHistory/get',
  async (_, { rejectWithValue, getState }) => {
    try {
      const loyaltyData = getLoyaltyData(getState() as RootState);
      const response = await LoyaltyApi.getRewardsSummary({
        ...loyaltyData,
        platformId: 2,
        operatorId: "ossino"
      });


      const result = handleRewardHistoryResponse(response);

      return result;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

type CoinsHistoryState = {
  data: CoinHistory[] | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: CoinsHistoryState = {
  data: null,
  loading: false,
  error: null,
};

const coinsHistorySlice = createSlice({
  name: 'coinsHistory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoinsHistory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getCoinsHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCoinsHistory.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.loading = false;
        state.data = null;
      });
  },
});

export const { clearError } = coinsHistorySlice.actions;
export default coinsHistorySlice.reducer;

