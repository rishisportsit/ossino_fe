import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CmsPromotionResponse } from 'api/content/content.types';
import { ContentApi } from 'api/content/content.api';

export const getPromotions = createAsyncThunk('promotions/get', async () => {
  try {
    const response = await ContentApi.getPromotions();
    return response.data as CmsPromotionResponse[];
  } catch (error) {
    throw new Error('Failed to fetch promotions from CMS');
  }
});

type PromotionsState = {
  data: CmsPromotionResponse[] | null;
  loading: boolean;
  error: Error | null;
};

const initialState: PromotionsState = {
  data: null,
  loading: false,
  error: null,
};

const promotionsSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPromotions.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getPromotions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPromotions.rejected, (state, action) => {
        state.error = action.error as Error;
        state.loading = false;
        state.data = null;
      });
  },
});

export default promotionsSlice.reducer;