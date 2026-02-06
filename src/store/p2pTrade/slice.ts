import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Trade } from './types';

type P2PTradeState = {
  selectedTrade: Trade | null;
};

const initialState: P2PTradeState = {
  selectedTrade: null,
};

const p2pTradeSlice = createSlice({
  name: 'p2pTrade',
  initialState,
  reducers: {
    setSelectedTrade: (state, action: PayloadAction<Trade | null>) => {
      state.selectedTrade = action.payload;
    },
  },
});

export const { setSelectedTrade } = p2pTradeSlice.actions;

export default p2pTradeSlice.reducer;
