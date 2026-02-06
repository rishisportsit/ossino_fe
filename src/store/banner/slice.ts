import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ContentApi } from 'api/content/content.api';
import type { BannerData } from 'api/content/content.types';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';

interface BannerState {
  bannerList: BannerData[];
  loading: boolean;
  error: ErrorState | null;
}

const initialState: BannerState = {
  bannerList: [],
  loading: false,
  error: null,
};

export const fetchBanner = createAppAsyncThunk(
  'banner/fetchBanner',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ContentApi.getBanners();
      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBanner.fulfilled,
        (state, action: PayloadAction<BannerData[]>) => {
          state.loading = false;
          state.bannerList = action.payload; 
        },
      )
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export default bannerSlice.reducer;
