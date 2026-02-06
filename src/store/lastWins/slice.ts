import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { type ApiLastWin } from './types';
import { HomePageApi } from 'api/homepage/homepage.api';
import { handleResponse } from './helpers';

export const fetchLastWins = createAsyncThunk<
  ApiLastWin[],
  { userId?: string } | void,
  { rejectValue: ErrorState }
>(
  'lastWins/fetch',
  async (params, { rejectWithValue }) => {
    try {
      const response = await HomePageApi.getRecentWins();
      const result = handleResponse(response);
      return result;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as any;
      const { loading, data, error } = state.lastWins;
      return !loading && !data && !error;
    },
  },
);

type StateType = {
  loading: boolean;
  error: ErrorState | null;
  data: ApiLastWin[] | null;
};

const initialState: StateType = {
  data: null,
  loading: false,
  error: null,
};

const lastWinsSlice = createSlice({
  name: 'lastWins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastWins.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        fetchLastWins.fulfilled,
        (state, action: PayloadAction<ApiLastWin[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchLastWins.rejected, (state, action) => {
        state.error = action.payload as ErrorState;
        state.loading = false;
      });
  },
});

export default lastWinsSlice.reducer;
