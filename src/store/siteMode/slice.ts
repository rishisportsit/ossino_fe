import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SiteMode = 'sports' | 'casino';

interface SiteModeState {
  mode: SiteMode;
}

const initialState: SiteModeState = {
  mode: 'casino',
};

const siteModeSlice = createSlice({
  name: 'siteMode',
  initialState,
  reducers: {
    setSiteMode: (state, action: PayloadAction<SiteMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setSiteMode } = siteModeSlice.actions;

export default siteModeSlice.reducer;



