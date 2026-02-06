import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';

import { LoyaltyApi } from 'api/loyalty/loyalty.api';
import type {
  LeaderboardData,
  LeaderboardApiResponse,
} from 'api/loyalty/loyalty.models';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { config } from 'config/index';
import { selectUserName } from 'store/user/slice';
import { store } from 'store/index';

export const getLeaderboard = createAppAsyncThunk(
  'leaderboard/get',
  async (_: void, { rejectWithValue }) => {
    try {
      // TODO: Replace with real user/brand/platform/operator IDs from state/auth
      const userId =
        LocalStorageHelper.getItem<string>(STORAGE_KEYS.userId) || '1';
      const params = {
        brand: config.operatorId,
        platformId: config.platformId,
        operatorId: config.operatorId,
        limit: 10,
        userId,
      };
      // Get username from user state slice
      const username = selectUserName(store.getState());
      const apiData = (await LoyaltyApi.fetchLeaderboard({
        ...params,
        username,
      })) as LeaderboardApiResponse;
      let userPosition = -1;
      let foundCurrentUser = false;
      const leaderboard = (apiData.data || []).map((item) => {
        const isCurrent =
          apiData.currentUser && item.userId === apiData.currentUser.userId;
        if (isCurrent) {
          foundCurrentUser = true;
          userPosition = item.rank;
        }
        return {
          id: Number(item.userId),
          place: item.rank,
          username: isCurrent && username ? username : item.userId,
          avatar: '/images/users/user.png',
          value: item.loyalty_coins || 0,
        };
      });
      if (apiData.currentUser && !foundCurrentUser) {
        const currentUser = apiData.currentUser;
        leaderboard.push({
          id: Number(currentUser.userId),
          place: currentUser.rank,
          username: username || currentUser.userId,
          avatar: '/images/users/user.png',
          value: currentUser.loyalty_coins || 0,
        });
        userPosition = currentUser.rank;
      }
      return { leaderboard, userPosition };
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

type LeaderboardState = {
  data: LeaderboardData | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: LeaderboardState = {
  data: null,
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.loading = false;
        state.data = null;
      });
  },
});

export default leaderboardSlice.reducer;
