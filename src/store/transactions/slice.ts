import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PlayerApi } from 'api/player/player.api';
import { TipApi } from 'api/wallet/tip.api';
import type { CreateTipPayload, TipApiResponse } from 'api/wallet/tip.api';
import type { ClientType } from '../../constants/clientType';
import type {
  DepositTransaction,
  TipTransaction,
  SportBet,
  CasinoBet,
  ApiDepositTransaction,
  ApiWithdrawTransaction,
  TransactionType,
  CasinoBetRounds,
  SportsBetData,
} from './types';
import { CURRENCIES } from 'constants/currencies';
import { SportsBetHistoryRequest } from 'api/player/player.types';
import { parseUTCTimestamp } from 'helpers/transactions/formatDate';

export const getAccountHistory = createAsyncThunk(
  'transactions/getAccountHistory',
  async (
    { clientType, transactionType }: { clientType: ClientType; transactionType: TransactionType; },
    { rejectWithValue }
  ) => {
    try {
      const response = await PlayerApi.getAccountHistory({
        clientType,
        transactionType,
      });

      if ('error' in response.data) {
        return rejectWithValue(response.data);
      }

      return {
        data: response.data.result as unknown as ApiDepositTransaction[],
        transactionType,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCasinoBetHistory = createAsyncThunk(
  'transactions/getCasinoBetHistory',
  async (
    { itemPerPage, pageNumber }: { itemPerPage: number; pageNumber: number; },
    { rejectWithValue }
  ) => {
    try {
      const response = await PlayerApi.getCasinoBetHistoryWithRound({
        itemPerPage,
        pageNumber,
      });

      if ('error' in response.data) {
        return rejectWithValue(response.data);
      }
      return response.data.result as unknown as CasinoBet[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCasinoBetHistoryRounds = createAsyncThunk(
  'transactions/getCasinoBetHistoryRounds',
  async (
    { roundId }: { roundId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await PlayerApi.getCasinoBetHistoryWithRoundIdData({
        roundId
      });

      if ('error' in response.data) {
        return rejectWithValue(response.data);
      }
      return response.data.result as unknown as CasinoBetRounds[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTipThunk = createAsyncThunk(
  'transactions/createTip',
  async (payload: CreateTipPayload, { rejectWithValue }) => {
    try {
      const response = await TipApi.createTip(payload);

      // Check if the response indicates success
      if (response.statuscode !== '200' || response.result.status !== 200) {
        return rejectWithValue({
          message: response.result.message || response.message || 'Tip transfer failed',
          statusCode: response.result.status || response.statuscode,
        });
      }

      return response;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message || 'Network error occurred',
        statusCode: error.response?.status || 500,
      });
    }
  }
);

export const getSportsBetHistoryApiData = createAsyncThunk(
  'transactions/getSportsBetHistory',
  async (
    { channel, fromDate, limit, offset, settled, toDate }: SportsBetHistoryRequest,
    { rejectWithValue }
  ) => {
    try {
      const response = await PlayerApi.getSportsBetHistory({
        channel, fromDate, limit, offset, settled, toDate
      });

      if ('error' in response.data) {
        return rejectWithValue(response.data);
      }
      return response.data.result as unknown as SportsBetData[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


type TransactionsState = {
  loading: boolean;
  error: Error | null;
  data: {
    deposits: ApiDepositTransaction[];
    withdrawals: ApiWithdrawTransaction[];
    sportsBets: SportBet[];
    tips: TipTransaction[];
    casinoBets: CasinoBet[];
    casinoBetRounds: CasinoBetRounds[];
    sportsBetsData: SportsBetData[];
  };
};

const initialState: TransactionsState = {
  loading: false,
  error: null,
  data: {
    deposits: [],
    withdrawals: [],
    sportsBets: [],
    tips: [],
    casinoBets: [],
    casinoBetRounds: [],
    sportsBetsData: []
  },
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addDeposit: (state, action: PayloadAction<DepositTransaction>) => {
      state.data.deposits.unshift(action.payload as unknown as ApiDepositTransaction);
    },
    addWithdrawal: (state, action: PayloadAction<ApiWithdrawTransaction>) => {
      state.data.withdrawals.unshift(action.payload);
    },
    addTip: (state, action: PayloadAction<TipTransaction>) => {
      state.data.tips.unshift({
        ...action.payload,
        amount: -action.payload.amount,
      });
    },
    addSportBet: (state, action: PayloadAction<SportBet>) => {
      state.data.sportsBets.unshift(action.payload);
    },
    addCasinoBet: (state, action: PayloadAction<CasinoBet>) => {
      state.data.casinoBets.unshift(action.payload);
    },
    addSportBetData: (state, action: PayloadAction<SportsBetData>) => {
      state.data.sportsBetsData.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Account history
      .addCase(getAccountHistory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAccountHistory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.transactionType === 'DEPOSIT') {
          state.data.deposits = action.payload.data;
        } else if (action.payload.transactionType === 'WITHDRAW') {
          state.data.withdrawals = action.payload.data as ApiWithdrawTransaction[];
        } else if (
          action.payload.transactionType === 'TRANSFER_WITHDRAW'
        ) {
          // Map API response to TipTransaction shape
          state.data.tips = (action.payload.data as any[]).map((tip) => {
            const localDate = parseUTCTimestamp(tip.createdDate);
            return {
              senderId: tip.senderId ?? tip.userId,
              receiverId: tip.receiverId ?? null,
              userId: tip.userId,
              isPublic: tip.isPublic ?? false,
              date: {
                day: localDate.toLocaleDateString('en-GB', {
                  day: '2-digit', month: 'short', year: 'numeric'
                }),
                time: localDate.toLocaleTimeString('en-GB', {
                  hour: '2-digit', minute: '2-digit'
                })
              },
              amount: tip.amount,
              currency: tip.currencyCode ? (CURRENCIES[tip.currencyCode] ?? CURRENCIES.Tether) : CURRENCIES.Tether,
              status: tip.status ?? 'Success',
              userName: tip.userName,
              counterPartyUserName: tip.counterPartyUserName,
            };
          });
        }
      })
      .addCase(getAccountHistory.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
      })
      // Casino bet history
      .addCase(getCasinoBetHistory.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getCasinoBetHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data.casinoBets = action.payload
      })
      .addCase(getCasinoBetHistory.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
      })
      // Casino bet history rounds
      .addCase(getCasinoBetHistoryRounds.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getCasinoBetHistoryRounds.fulfilled, (state, action) => {
        state.loading = false;
        state.data.casinoBetRounds = action.payload.data?.data;
      })
      .addCase(getCasinoBetHistoryRounds.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
      })
      // Sports bet history
      .addCase(getSportsBetHistoryApiData.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getSportsBetHistoryApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.sportsBetsData = action.payload
      })
      .addCase(getSportsBetHistoryApiData.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
      })
  },
});

export const { addDeposit, addWithdrawal, addTip, addSportBet, addCasinoBet } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;