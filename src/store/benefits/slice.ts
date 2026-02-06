import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { benefits } from './mockData';
// import { LoyaltyApi } from 'api/loyalty/loyalty.api';
// import { handleResponse } from './helpers';
// import { getLoyaltyData } from 'store/helpers/getLoyaltyData';

export const getBenefits = createAppAsyncThunk(
  'benefits/get',
  async (_, { rejectWithValue }) => {
    try {
      // const loyaltyData = getLoyaltyData(getState());
      // const response = await LoyaltyApi.getLoyaltyLevels({ ...loyaltyData });

      // const result = handleResponse(response);
      // return result;

      return benefits;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export type BenefitItem = {
  id: number;
  title: string;
  description: string;
  isOpened: boolean;
};

export type BenefitProgress = {
  title: string;
  percentage: number;
  currentPoints: number;
  totalPoints: number;
};

export type Benefit = {
  id: number;
  title: string;
  image: string;
  points: number;
  isOpened: boolean;
  items: BenefitItem[];
  progress?: BenefitProgress;
};

type LoyaltyPointsState = {
  data: Benefit[] | null;
  loading: boolean;
  error: ErrorState | null;
};

const initialState: LoyaltyPointsState = {
  data: null,
  loading: false,
  error: null,
};

const benefitsSlice = createSlice({
  name: 'benefits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBenefits.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getBenefits.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBenefits.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.loading = false;
        state.data = null;
      });
  },
});

export default benefitsSlice.reducer;
