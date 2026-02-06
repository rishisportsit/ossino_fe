import type {
  GetRewardHistoryResponseData,
  ApiRewardsSummary,
} from 'api/loyalty/loyalty.types';
import { createSlice } from '@reduxjs/toolkit';
import { LoyaltyApi } from 'api/loyalty/loyalty.api';
import type { BurnCoinsRequestData } from 'api/loyalty/loyalty.types';
import { ERROR_CODES, ERROR_DISPLAY } from 'store/const/errors';
import { closeDialog, DIALOG_TYPE } from 'store/dialog/slice';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { getBurnCoinsData, handleRewardsSummaryResponse } from './helpers';
// import { coinsOverview } from './mockData';
import { type CoinsOverview } from './types';
import { getLoyaltyData } from 'store/helpers/getLoyaltyData';
import { type RootState } from '..';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';

const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);
export const getCoinsOverview = createAppAsyncThunk(
  'coinsOverview/get',
  async (_, { rejectWithValue, getState }) => {
    try {
      const loyaltyData = getLoyaltyData(getState() as RootState);
      const response = await LoyaltyApi.getRewardsSummary({
        ...loyaltyData,
        platformId: 2,
        operatorId: 'ossino',
      });

      const result = handleRewardsSummaryResponse(response);
      return result;

      // return coinsOverview;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

interface CoinsAggregates {
  burns: number;
  cashback: number;
}

export const getCoinsOverviewFromHistory = createAppAsyncThunk<
  CoinsAggregates,
  void,
  { rejectValue: ErrorState }
>('coinsOverview/getFromHistory', async (_, { rejectWithValue, getState }) => {
  try {
    const loyaltyData = getLoyaltyData(getState() as RootState);
    // ...existing code...
    const response = await LoyaltyApi.getRewardsSummary({
      ...loyaltyData,
      platformId: 2,
      operatorId: 'ossino',
    });
    // Accept both ApiRewardsSummary and a transaction array for compatibility
    type RewardsSummaryOrTxs = ApiRewardsSummary & { data?: any[] };
    const data = response.data as RewardsSummaryOrTxs;
    let burns = 0;
    let cashback = 0;
    const txs = Array.isArray(data.data) ? data.data : [];
    txs.forEach((tx: any) => {
      if (tx.loyaltyType === 'burn') {
        burns += tx.coinsDebit || 0;
        cashback += tx.amount || 0;
      }
    });
    return {
      burns,
      cashback,
    };
  } catch (error) {
    const errorState: ErrorState = handleError(error);
    return rejectWithValue(errorState);
  }
});

export const burnCoins = createAppAsyncThunk(
  'coinsHistory/burn',
  async (
    data: Pick<BurnCoinsRequestData, 'coins'>,
    { rejectWithValue, getState, dispatch },
  ) => {
    try {
      let burnCoinsData;
      try {
        burnCoinsData = getBurnCoinsData(getState());
      } catch (getBurnCoinsDataError) {
        throw getBurnCoinsDataError;
      }

      const requestPayload = {
        ...data,
        ...burnCoinsData,
        platformId: 2,
        operatorId: 'ossino',
        loyaltyType: 'burn',
        token:
          LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) || accessToken,
        exchangeCurrency: 'ETH_TEST5',
      };
      let response;
      try {
        response = await LoyaltyApi.burnCoins(requestPayload);
      } catch (apiError) {
        throw apiError;
      }

      return response;
    } catch (error) {
      let errorState;
      try {
        errorState = handleError(error);
      } catch (handleErrorException) {
        console.error('handleError itself failed:', handleErrorException);
        errorState = {
          message: 'Something went wrong',
          status: undefined,
        };
      }

      if (errorState.status === ERROR_CODES.UNAUTHORIZED) {
        dispatch(closeDialog({ id: DIALOG_TYPE.burnCoins }));
      }

      const rejectionValue = {
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      };

      return rejectWithValue(rejectionValue);
    }
  },
);

type CoinsHistoryState = {
  data: CoinsOverview | null;
  loading: boolean;
  error: ErrorState | null;
  historyAggregates?: {
    burns: number;
    cashback: number;
  };
};

const initialState: CoinsHistoryState = {
  data: null,
  loading: false,
  error: null,
};

const coinsHistorySlice = createSlice({
  name: 'coinsHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoinsOverview.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getCoinsOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCoinsOverview.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.loading = false;
        state.data = null;
      })
      .addCase(getCoinsOverviewFromHistory.fulfilled, (state, action) => {
        state.historyAggregates = action.payload;
      });
  },
});

export default coinsHistorySlice.reducer;
