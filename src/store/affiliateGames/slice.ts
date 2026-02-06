import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { AffiliateApi, type GetAffiliateGamesRequestData } from 'api/affiliate/affiliate.api';
import type { AffiliateGame } from 'api/affiliate/affiliate.types';

export const getAffiliateGames = createAppAsyncThunk(
  'affiliateGames/get',
  async (data: GetAffiliateGamesRequestData, { rejectWithValue }) => {
    try {
      const response = await AffiliateApi.getAffiliateGames(data);
      return response.data?.games || [];
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

type AffiliateGamesState = {
  data: AffiliateGame[] | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: AffiliateGamesState = {
  data: null,
  loading: false,
  error: null,
};

const affiliateGamesSlice = createSlice({
  name: 'affiliateGames',
  initialState,
  reducers: {
    clearAffiliateGames: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAffiliateGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAffiliateGames.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAffiliateGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorState;
      });
  },
});

export const { clearAffiliateGames } = affiliateGamesSlice.actions;
export default affiliateGamesSlice.reducer;