import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { rgsApi } from 'api/rgs/rgs.api';
import { type RecentlyPlayedGame } from './types';

export const getRecentlyPlayedGames = createAsyncThunk(
  'recentlyPlayed/getRecentlyPlayedGames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rgsApi.getRecentlyPlayedGames();
      const games = response.data.result.data.map((game) => ({
        ...game,
        image:
          (game.imageConfigUrl && game.imageConfigUrl !== 'NoIcon'
            ? game.imageConfigUrl
            : game.imageUrl) || '',
      }));

      games.sort((a, b) => {
        const dateA = new Date(a.betPlacedDate);
        const dateB = new Date(b.betPlacedDate);
        return dateB.getTime() - dateA.getTime();
      });

      

      return games;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

type RecentlyPlayedState = {
  data: RecentlyPlayedGame[];
  loading: boolean;
  error: ErrorState | null;
};

const initialState: RecentlyPlayedState = {
  data: [],
  loading: false,
  error: null,
};

const recentlyPlayedSlice = createSlice({
  name: 'recentlyPlayed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecentlyPlayedGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecentlyPlayedGames.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRecentlyPlayedGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorState;
      });
  },
});

export default recentlyPlayedSlice.reducer;
