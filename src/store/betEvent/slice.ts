import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BetEvent } from './types';

type BetEventState = {
  selectedBetEvent: BetEvent;
};

const initialState: BetEventState = {
  selectedBetEvent: {
    type: null,
  },
};

const betEventSlice = createSlice({
  name: 'betEvent',
  initialState,
  reducers: {
    setSelectedBetEvent: (state, action: PayloadAction<BetEvent>) => {
      state.selectedBetEvent = action.payload;
    },
  },
});

export const { setSelectedBetEvent } = betEventSlice.actions;

export default betEventSlice.reducer;
