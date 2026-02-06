import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import { type ErrorState } from 'store/types/Error';
// import { loyaltyDetails } from './mockData';
import { LoyaltyApi } from 'api/loyalty/loyalty.api';
import { getLoyaltyData } from 'store/helpers/getLoyaltyData';
import { RootState } from '..';

export const getLoyaltyDetails = createAppAsyncThunk(
  'loyaltyDetails/get',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const loyaltyData = getLoyaltyData(state);
      const response = await LoyaltyApi.getLoyaltyDetails({
        ...loyaltyData,
        platformId: 2,
        operatorId: "ossino"
      });

      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export type LoyaltyDetails = {
  loyaltyLevelId: number;
  loyaltyLevelName: string;
  lifeTimeRewardPoints: number;
  pointsInCurrentLevel: number;
  pointsToNextLevel: number;
  nextLevelId: number;
  nextLevelName: string;
  logoUrl: string;
  nextLevelLogoUrl: string;
  coins: number;
  lifeTimeCoins: any
  level: any
  points: any
};

type LoyaltyDetailsState = {
  data: LoyaltyDetails | null;
  loading: boolean;
  error: ErrorState | null;
  showCongratulationsModal: boolean;
  lastRewardClaimed?: {
    amount: number;
    type: string;
  };
};

const initialState: LoyaltyDetailsState = {
  data: null,
  loading: false,
  error: null,
  showCongratulationsModal: false,
};

export const creditBetLossCoins = createAppAsyncThunk(
  'loyaltyDetails/creditBetLoss',
  async (betData: { userId: string; betAmount: number; currency: string; gameId: string }, { dispatch }) => {
    const result = await LoyaltyApi.creditCoinsForBetLoss(betData);
    if (result.success && result.coinsAwarded && result.coinsAwarded > 0) {
      // We can dispatch fetch loyalty details if updated
      dispatch(getLoyaltyDetails());
    }
    return result;
  }
);

export const claimDailyReward = createAppAsyncThunk(
  'loyaltyDetails/claimDailyReward',
  async (userId: string, { dispatch }) => {
    const result = await LoyaltyApi.claimDailyReward(userId);
    if (result.success && result.coinsAwarded) {
      dispatch(getLoyaltyDetails());
    }
    return result;
  }
);

const loyaltyDetailsSlice = createSlice({
  name: 'loyaltyDetails',
  initialState,
  reducers: {
    showCongratulationsModal: (state, action) => {
      state.showCongratulationsModal = true;
      state.lastRewardClaimed = action.payload;
    },
    hideCongratulationsModal: (state) => {
      state.showCongratulationsModal = false;
      state.lastRewardClaimed = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLoyaltyDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getLoyaltyDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getLoyaltyDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? null;
    });
    builder.addCase(claimDailyReward.fulfilled, (state, action) => {
      if (action.payload.success && action.payload.coinsAwarded) {
        state.showCongratulationsModal = true;
        state.lastRewardClaimed = {
          amount: action.payload.coinsAwarded,
          type: 'daily_reward'
        };
      }
    });
  },
});

export const { showCongratulationsModal, hideCongratulationsModal } = loyaltyDetailsSlice.actions;

export default loyaltyDetailsSlice.reducer;
