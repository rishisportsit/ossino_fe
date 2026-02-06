import { createSlice } from '@reduxjs/toolkit';
import { LoyaltyApi } from 'api/loyalty/loyalty.api';
import { STORAGE_KEYS } from 'constants/storage';
import { LocalStorageHelper } from 'helpers/storage';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';

export const getRedemptions = createAppAsyncThunk(
  'redemptions/get',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get user info from state (adjust selectors as needed)
      const state: any = getState();
      const userId = state.user?.id?.toString() || '';

      const operatorId = import.meta.env.VITE_OPERATOR_ID || '';
      const platformId = Number(import.meta.env.VITE_PLATFORM_ID) || 0;
      const brand = import.meta.env.VITE_OPERATOR_ID || '';
      const token = LocalStorageHelper.getItem(
        STORAGE_KEYS.accessToken,
      ) as string;

      const response = await LoyaltyApi.getRedemptions({
        userId,
        brand,
        platformId,
        operatorId,
        token,
      });
      return response.data.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const redeemReward = createAppAsyncThunk(
  'redemptions/redeem',
  async (
    data: import('api/loyalty/redeemPrize.types').RedeemPrizeRequestData,
    thunkAPI,
  ) => {
    const response = await LoyaltyApi.redeemPrize(data);
    return response?.data;
  },
);

export type Redemption = {
  id: number;
  href: string;
  name: string;
  value: number;
  description: string;
  bonusCount: number;
  bonusId: number;
  numberOfFreeSpins: number | null;
  gameName: string | null;
  gameCode: string | null;
  freeSpinAmount: number | null;
  providerName: string | null;
  subProviderName: string | null;
};

type RedemptionsState = {
  data: Redemption[] | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: RedemptionsState = {
  data: null,
  loading: false,
  error: null,
};

const redemptionsSlice = createSlice({
  name: 'redemptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRedemptions.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getRedemptions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRedemptions.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.loading = false;
        state.data = null;
      });
  },
});

export default redemptionsSlice.reducer;
