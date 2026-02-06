import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ApiFooterContent } from 'api/content/content.types';
import { ContentApi } from 'api/content/content.api';

export const getFooterContent = createAsyncThunk('footerContent/get', async () => {
  try {
    const response = await ContentApi.getFooterInfo();
    return response.data 
  } catch (error) {
    throw new Error('Failed to fetch footer content from CMS');
  }
});

type FooterContentState = {
  data: ApiFooterContent[] | null;
  loading: boolean;
  error: Error | null;
};

const initialState: FooterContentState = {
  data: null,
  loading: false,
  error: null,
};

const footerContentSlice = createSlice({
  name: 'footerContent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFooterContent.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getFooterContent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getFooterContent.rejected, (state, action) => {
        state.error = action.error as Error;
        state.loading = false;
        state.data = null;
      });
  },
});

export default footerContentSlice.reducer;