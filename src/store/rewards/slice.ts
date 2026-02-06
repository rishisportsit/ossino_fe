import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { rewards } from './mockData';
import { missionsApi } from 'api/missions/missions.api';
import type { MissionReward } from 'api/missions/missions.types';
import { toast } from 'sonner';
import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';
// import { LoyaltyApi } from 'api/loyalty/loyalty.api';
// import { handleResponse } from './helpers';
// import { getLoyaltyData } from 'store/helpers/getLoyaltyData';

export const getMissionRewards = createAppAsyncThunk(
  'rewards/getMissionRewards',
  async (
    data: { playerId: string; operatorId: string; brand: string },
    { rejectWithValue }
  ) => {
    try {

      const response = await missionsApi.getMissionRewards(data);


      return response.result;
    } catch (error) {
      console.error('getMissionRewards error:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('Error response:', (error as any).response?.data);
        console.error('Error status:', (error as any).response?.status);
      }
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const claimMissionReward = createAppAsyncThunk(
  'rewards/claimMissionReward',
  async (
    data: { promotionId: string; playerId: number; accessToken: string; prizeAmount?: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const claimApiKey = import.meta.env.VITE_MISSION_CLAIM_API_KEY;
      const requestPayload = {
        promotionId: data.promotionId,
        playerId: data.playerId,
        accessToken: data.accessToken,
        claimApiKey,
      };
      const response = await missionsApi.claimMissionReward(requestPayload);

      // Parse the nested JSON result to extract prizeAmount and success message
      let displayMessage = 'Reward claimed successfully';
      let prizeAmount = data.prizeAmount || 0;

      try {
        const parsedResult = JSON.parse(response.result);
        if (parsedResult.message) {
          displayMessage = parsedResult.message;
        }
        if (parsedResult.prizeAmount) {
          prizeAmount = parsedResult.prizeAmount;
        }
      } catch (parseError) {
        console.warn('Failed to parse claim response result:', parseError);
        // Fallback to raw result if JSON parsing fails
        displayMessage = response.result;
      }
      // Show congratulations dialog
      dispatch(openDialog({
        id: DIALOG_TYPE.success,
        data: {
          message: 'Congratulations!',
          buttonText: 'Got it!',
          details: `You've won ${prizeAmount} Loyalty coins`
        }
      }));

      return { promotionId: data.promotionId, message: displayMessage, prizeAmount };
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getRewards = createAppAsyncThunk(
  'rewards/get',
  async (_, { rejectWithValue }) => {
    try {
      // const loyaltyData = getLoyaltyData(getState());
      // const response = await LoyaltyApi.getDailyRewards(loyaltyData);

      // const result = handleResponse(response);
      // return result;

      return rewards;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export type Reward = {
  id: number;
  opened: boolean;
  value: number;
  available_at: number;
};

type RewardsState = {
  data: Reward[] | null;
  missionRewards: MissionReward[] | null;
  loading: boolean;
  missionRewardsLoading: boolean;
  claimingReward: string | null; // promotionId of the reward being claimed
  error: ErrorState | null;
  missionRewardsError: ErrorState | null;
  claimError: ErrorState | null;
};

const initialState: RewardsState = {
  data: null,
  missionRewards: null,
  loading: false,
  missionRewardsLoading: false,
  claimingReward: null,
  error: null,
  missionRewardsError: null,
  claimError: null,
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    clearClaimError: (state) => {
      state.claimError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Legacy rewards
      .addCase(getRewards.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRewards.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.loading = false;
        state.data = null;
      })
      // Mission rewards
      .addCase(getMissionRewards.pending, (state) => {
        state.missionRewardsError = null;
        state.missionRewardsLoading = true;
      })
      .addCase(getMissionRewards.fulfilled, (state, action) => {
        state.missionRewardsLoading = false;
        state.missionRewards = action.payload;
      })
      .addCase(getMissionRewards.rejected, (state, action) => {
        state.missionRewardsError = action.payload ?? null;
        state.missionRewardsLoading = false;
        state.missionRewards = null;
      })
      // Claim reward
      .addCase(claimMissionReward.pending, (state, action) => {
        state.claimError = null;
        state.claimingReward = action.meta.arg.promotionId;
      })
      .addCase(claimMissionReward.fulfilled, (state, action) => {
        state.claimingReward = null;

        // Update the reward as claimed
        if (state.missionRewards) {
          const rewardIndex = state.missionRewards.findIndex(
            (reward) => reward.promotionId === action.payload.promotionId
          );
          if (rewardIndex !== -1) {
            state.missionRewards[rewardIndex].prizeAwarded = true;
          }
        }
      })
      .addCase(claimMissionReward.rejected, (state, action) => {
        state.claimError = action.payload ?? null;
        state.claimingReward = null;
      });
  },
});

export const { clearClaimError } = rewardsSlice.actions;

export default rewardsSlice.reducer;
