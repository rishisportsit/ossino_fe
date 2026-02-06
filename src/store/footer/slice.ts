import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ApiOtherLinkInfo } from 'api/content/content.types';
import { ContentApi } from 'api/content/content.api';

export const getFooterLinks = createAsyncThunk('footerLinks/get', async () => {
  try {
    const response = await ContentApi.getOtherLinkInfo(5);
    return response.data as ApiOtherLinkInfo[];
  } catch (error) {
    throw new Error('Failed to fetch footer links from CMS');
  }
});

export const getSecurityLinks = createAsyncThunk('footerLinks/security', async () => {
  try {
    const response = await ContentApi.getOtherLinkInfo(5);
    return response.data as ApiOtherLinkInfo[];
  } catch (error) {
    throw new Error('Failed to fetch security links from CMS');
  }
});

export const getQuickLinks = createAsyncThunk('footerLinks/quick', async () => {
  try {
    const response = await ContentApi.getOtherLinkInfo(6);
    return response.data as ApiOtherLinkInfo[];
  } catch (error) {
    throw new Error('Failed to fetch quick links from CMS');
  }
});

type FooterLinksState = {
  data: ApiOtherLinkInfo[] | null;
  securityLinks: ApiOtherLinkInfo[] | null;
  quickLinks: ApiOtherLinkInfo[] | null;
  loading: boolean;
  error: Error | null;
};

const initialState: FooterLinksState = {
  data: null,
  securityLinks: null,
  quickLinks: null,
  loading: false,
  error: null,
};

const footerLinksSlice = createSlice({
  name: 'footerLinks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFooterLinks.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getFooterLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getFooterLinks.rejected, (state, action) => {
        state.error = action.error as Error;
        state.loading = false;
        state.data = null;
      })
      .addCase(getSecurityLinks.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getSecurityLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.securityLinks = action.payload;
      })
      .addCase(getSecurityLinks.rejected, (state, action) => {
        state.error = action.error as Error;
        state.loading = false;
        state.securityLinks = null;
      })
      .addCase(getQuickLinks.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getQuickLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.quickLinks = action.payload;
      })
      .addCase(getQuickLinks.rejected, (state, action) => {
        state.error = action.error as Error;
        state.loading = false;
        state.quickLinks = null;
      });
  },
});

export default footerLinksSlice.reducer;