import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AffiliateApi } from 'api/affiliate/affiliate.api';
import type {
  GetPlayerDetailsByBtagRequestData,
  PlayerDetailsData,
} from 'api/affiliate/affiliate.types';
import { handleError } from 'store/helpers/handleError';

export const getPlayerDetailsByBtag = createAsyncThunk(
  'affiliatePlayerDetails/getByBtag',
  async (params: GetPlayerDetailsByBtagRequestData, { rejectWithValue }) => {
    try {
      const response = await AffiliateApi.getPlayerDetailsByBtag(params);
      return response.result.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  }
);

export type AffiliatePlayerDetailsState = {
  data: PlayerDetailsData | null;
  loading: boolean;
  error: Error | null;
  lastFetch: number | null;
};

const initialState: AffiliatePlayerDetailsState = {
  data: null,
  loading: false,
  error: null,
  lastFetch: null,
};

const affiliatePlayerDetailsSlice = createSlice({
  name: 'affiliatePlayerDetails',
  initialState,
  reducers: {
    clearPlayerDetails: (state) => {
      state.data = null;
      state.error = null;
      state.lastFetch = null;
    },
    resetPlayerDetailsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerDetailsByBtag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerDetailsByBtag.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastFetch = Date.now();
      })
      .addCase(getPlayerDetailsByBtag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
        state.data = null;
      });
  },
});

export const { clearPlayerDetails, resetPlayerDetailsState } =
  affiliatePlayerDetailsSlice.actions;

export default affiliatePlayerDetailsSlice.reducer;