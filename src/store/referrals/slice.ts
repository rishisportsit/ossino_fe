import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sleep } from 'helpers/common';
import { code, details, earnings, referrals } from './mockData';
import { ReferralApi } from 'api/referral/referral.api';
import { type Code, type EarningDetails, type UserReferral } from './types';
import type {
  GetReferralDetailsResponseData,
  ReferralItem,
} from 'api/referral/referral.types';

export const getReferralCode = createAsyncThunk(
  'referrals/code/get',
  async () => {
    await sleep(1);
    return code;
  },
);

export const getReferralDetails = createAsyncThunk(
  'referrals/details/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ReferralApi.getReferralDetails();
      // Assuming API returns { data: { data: ReferralItem[] } }

      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  },
);

export const getReferralReferrals = createAsyncThunk(
  'referrals/referrals/get',
  async () => {
    await sleep(1);
    return referrals;
  },
);

export const getReferralEarnings = createAsyncThunk(
  'referrals/earnings/get',
  async () => {
    await sleep(1);
    return earnings;
  },
);

type BaseState = {
  loading: boolean;
  error: Error | null;
};

type CodeState = BaseState & {
  data: Code | null;
};

type DetailsState = BaseState & {
  data: ReferralItem[] | null;
};
type UserReferralsState = BaseState & {
  data: UserReferral[] | null;
};

type EarningsState = BaseState & {
  data: EarningDetails | null;
};

type ReferralsState = {
  code: CodeState;
  details: DetailsState;
  referrals: UserReferralsState;
  earnings: EarningsState;
};

const initialState: ReferralsState = {
  code: {
    data: null,
    loading: false,
    error: null,
  },
  details: {
    data: null,
    loading: false,
    error: null,
  },
  referrals: {
    data: null,
    loading: false,
    error: null,
  },
  earnings: {
    data: null,
    loading: false,
    error: null,
  },
};

const referralsSlice = createSlice({
  name: 'referrals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReferralCode.pending, (state) => {
        state.code.error = null;
        state.code.loading = true;
      })
      .addCase(getReferralCode.fulfilled, (state, action) => {
        state.code.loading = false;
        state.code.data = action.payload;
      })
      .addCase(getReferralCode.rejected, (state, action) => {
        state.code.error = action.payload as Error;
        state.code.loading = false;
        state.code.data = null;
      })
      .addCase(getReferralDetails.pending, (state) => {
        state.details.error = null;
        state.details.loading = true;
      })
      .addCase(getReferralDetails.fulfilled, (state, action) => {
        state.details.loading = false;
        state.details.data =
          action.payload &&
          action.payload.data &&
          Array.isArray(action.payload.data.result)
            ? action.payload.data.result
            : null;
      })
      .addCase(getReferralDetails.rejected, (state, action) => {
        state.details.error = action.payload as Error;
        state.details.loading = false;
        state.details.data = null;
      })
      .addCase(getReferralReferrals.pending, (state) => {
        state.referrals.error = null;
        state.referrals.loading = true;
      })
      .addCase(getReferralReferrals.fulfilled, (state, action) => {
        state.referrals.loading = false;
        state.referrals.data = action.payload;
      })
      .addCase(getReferralReferrals.rejected, (state, action) => {
        state.referrals.error = action.payload as Error;
        state.referrals.loading = false;
        state.referrals.data = null;
      })
      .addCase(getReferralEarnings.pending, (state) => {
        state.earnings.error = null;
        state.earnings.loading = true;
      })
      .addCase(getReferralEarnings.fulfilled, (state, action) => {
        state.earnings.loading = false;
        state.earnings.data = action.payload;
      })
      .addCase(getReferralEarnings.rejected, (state, action) => {
        state.earnings.error = action.payload as Error;
        state.earnings.loading = false;
        state.earnings.data = null;
      });
  },
});

export default referralsSlice.reducer;
