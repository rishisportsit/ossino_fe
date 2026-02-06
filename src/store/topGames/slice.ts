import { createSlice } from '@reduxjs/toolkit';
import { type RoundedGameIconProps } from 'components/features/main-page/GameIcon/GameRoundedCard';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { games } from './mockData';

interface TopGamesState {
  games: RoundedGameIconProps[] | null;
  loading: boolean;
  error: ErrorState | null;
}

const initialState: TopGamesState = {
  games: null,
  loading: false,
  error: null,
};

export const fetchTopGames = createAppAsyncThunk(
  'topGames/fetchTopGames',
  async (_, { rejectWithValue }) => {
    try {
      // const response = await HomePageApi.getTopGames();
      // const result = handleResponse(response);
      // return result;
      return games;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

const topGamesSlice = createSlice({
  name: 'topGames',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchTopGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export default topGamesSlice.reducer;
