import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sleep } from 'helpers/common';
import { data } from './mockData';

export const getLevels = createAsyncThunk('levels/get', async () => {
  await sleep(1);
  return data;
});

export type Level = {
  id: number;
  feature: string;
  sprite: boolean;
  griffin: boolean;
  phoenix: boolean;
  dragon: boolean;
  chimera: boolean;
  hydra: boolean;
  leviathan: boolean;
};

type LevelImage = {
  level: string;
  image: string;
};

export type LevelsState = {
  data: {
    overview: Level[];
    images: LevelImage[];
  } | null;
  loading: boolean;
  error: Error | null;
};

const initialState: LevelsState = {
  data: null,
  loading: false,
  error: null,
};

const levelsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLevels.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getLevels.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
        state.data = null;
      });
  },
});

export default levelsSlice.reducer;
