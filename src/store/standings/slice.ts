import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { standingsApi } from 'api/standings/standings.api';
import type { Standing as StandingType } from 'api/standings/standings.types';
import { config } from 'config/index';

const { seasons } = config;

export const getStandings = createAppAsyncThunk(
  'standings/get',
  async (_, { rejectWithValue }) => {
    try {
      const data = await standingsApi.getStandings(seasons, 5);
      const first = Array.isArray(data) ? data[0] : data;
      return {
        standings: first?.standings ?? [],
        league: first?.league ?? ''
      };
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

interface StandingsState {
  standings: StandingType[];
  league: string;
  loading: boolean;
  error: ErrorState | null;
}

const initialState: StandingsState = {
  standings: [],
  league: '',
  loading: false,
  error: null,
};

const standingsSlice = createSlice({
  name: 'standings',
  initialState,
  reducers: {
    clearStandings(state) {
      state.standings = [];
      state.league = '';
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStandings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStandings.fulfilled, (state, action) => {
        state.loading = false;
        state.standings = action.payload.standings;
        state.league = action.payload.league;
      })
      .addCase(getStandings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
        state.standings = [];
        state.league = '';
      });
  },
});

export const { clearStandings } = standingsSlice.actions;
export default standingsSlice.reducer;
