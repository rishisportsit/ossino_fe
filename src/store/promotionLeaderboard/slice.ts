import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import {
  promotionsApi,
  GetLeaderboardResponse,
} from 'api/promotions/promotions.api';

export type LeaderboardEntry = {
  rankPosition: number;
  playerId: string;
  metricValue: number;
  metricType: string;
};

export type LeaderboardData = {
  leaderboard: LeaderboardEntry[];
  currentPlayer?: LeaderboardEntry;
};

export type LeaderboardState = {
  data: LeaderboardData | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: LeaderboardState = {
  data: null,
  loading: false,
  error: null,
};

export const getLeaderboard = createAppAsyncThunk<
  LeaderboardData,
  { promotionId: string; playerId: string; leaderboardSize: string },
  { rejectValue: ErrorState }
>('leaderboard/get', async (payload, { rejectWithValue }) => {
  try {
    const apiData = await promotionsApi.getLeaderboard(payload);
    const rawResult = apiData as GetLeaderboardResponse;
    const validEntries = Array.isArray(rawResult.leaderboard)
      ? rawResult.leaderboard.filter((item: any) => item.metricValue !== null)
      : [];

    const uniqueEntries = validEntries.reduce(
      (acc: typeof validEntries, current: any) => {
        const existingIndex = acc.findIndex(
          (item: any) => item.playerId === current.playerId,
        );
        if (existingIndex >= 0) {
          acc[existingIndex] = current;
        } else {
          acc.push(current);
        }
        return acc;
      },
      [] as typeof validEntries,
    );

    const leaderboard = uniqueEntries.map((item: any) => ({
      rankPosition: item.rankPosition,
      playerId: item.playerId,
      metricValue: item.metricValue as number,
      metricType: item.metricType,
    }));

    // Map currentPlayer to LeaderboardEntry type
    const currentPlayer =
      rawResult.currentPlayer && rawResult.currentPlayer.metricValue !== null
        ? {
            rankPosition: rawResult.currentPlayer.rankPosition,
            playerId: rawResult.currentPlayer.playerId,
            metricValue: rawResult.currentPlayer.metricValue as number,
            metricType: rawResult.currentPlayer.metricType,
          }
        : undefined;

    const result = {
      leaderboard,
      currentPlayer,
    };

    return result;
  } catch (err) {
    const errorState = handleError(err);
    return rejectWithValue(errorState);
  }
});

const promotionLeaderboardSlice = createSlice({
  name: 'promotionLeaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeaderboard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getLeaderboard.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getLeaderboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? null;
      state.data = null;
    });
  },
});

export default promotionLeaderboardSlice.reducer;
