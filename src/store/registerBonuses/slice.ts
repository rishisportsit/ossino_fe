import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { RegisterBonusesApi } from 'api/registerBonuses/registerBonuses.api';
import type { RegisterBonus } from 'api/registerBonuses/registerBonuses.types';
import { handleRegisterBonusesResponse } from './helpers';

export const getRegisterBonuses = createAppAsyncThunk(
  'registerBonuses/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await RegisterBonusesApi.getRegisterBonuses();
      const result = handleRegisterBonusesResponse(response);

      return result;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

type RegisterBonusesState = {
  data: RegisterBonus[] | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: RegisterBonusesState = {
  data: null,
  loading: false,
  error: null,
};

const registerBonusesSlice = createSlice({
  name: 'registerBonuses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRegisterBonuses.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getRegisterBonuses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRegisterBonuses.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.loading = false;
        state.data = null;
      });
  },
});

export default registerBonusesSlice.reducer;
