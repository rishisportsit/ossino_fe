import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { WalletApi } from 'api/wallet/wallet.api';
import type {
  WalletCurrency,
  WalletCurrencyRequestData,
  WalletListResponse,
  WalletAddress,
  WalletAddressListResponse,
} from 'api/wallet/wallet.types';
import { handleResponse } from 'store/helpers/handleResponse';
import { handleError } from 'store/helpers/handleError';
import { CryptoWithdrawRequestData } from 'api/crypto/crypto.types';
import { CryptoApi } from 'api/crypto/crypto.api';
import { toast } from 'sonner';

interface WalletState {
  currencies: WalletCurrency[];
  addresses: WalletAddress[];
  currenciesLoading: boolean;
  addressesLoading: boolean;
  currenciesError: Error | null;
  addressesError: Error | null;
  selectedCurrency: WalletCurrency | null;
  usdToggleEnabled: boolean;
}

const initialState: WalletState = {
  currencies: [],
  addresses: [],
  currenciesLoading: false,
  addressesLoading: false,
  currenciesError: null,
  addressesError: null,
  selectedCurrency: null,
  usdToggleEnabled: false,
};

// Thunk for fetching wallet currencies
export const getWalletCurrencies = createAppAsyncThunk(
  'wallet/getWalletCurrencies',
  async ({
    currencyCode = '',
    currencyType = '',
  }: WalletCurrencyRequestData) => {
    try {
      const response = await WalletApi.getWalletList({
        currencyCode,
        currencyType,
      });
      const result: WalletListResponse = handleResponse(response);
      return result;
    } catch (error) {
      console.error('Wallet error:', error);
      toast.error('Could not fetch wallet currencies', {
        description: error instanceof Error ? error.message : undefined,
      });
      return null;
    }
  },
);

// Thunk for fetching wallet addresses
export const getWalletAddressList = createAppAsyncThunk(
  'wallet/getWalletAddresses',
  async (arg: { currencyCode?: string }, { rejectWithValue }) => {
    const { currencyCode = '' } = arg;
    try {
      const response = await WalletApi.getAddressList({ currencyCode });
      const result: WalletAddressListResponse = handleResponse(response);
      return result;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const withdraw = createAppAsyncThunk(
  'wallet/crypto-withdraw',
  async (arg: CryptoWithdrawRequestData, { rejectWithValue }) => {
    try {
      const response = await CryptoApi.withdraw(arg);
      handleResponse(response);
      return null;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletCurrencies: (state, action: PayloadAction<WalletCurrency[]>) => {
      state.currencies = action.payload;
    },
    setWalletAddresses: (state, action: PayloadAction<WalletAddress[]>) => {
      state.addresses = action.payload;
    },
    setSelectedCurrency: (state, action: PayloadAction<WalletCurrency>) => {
      state.selectedCurrency = action.payload;
    },
    toggleUsdDisplay: (state, action: PayloadAction<boolean>) => {
      state.usdToggleEnabled = action.payload;
    },
    updateWalletBalance: (state, action: PayloadAction<any>) => {
      const { currencyCode, deposit, withdrawls, balance } = action.payload;
      const currencyIndex = state.currencies.findIndex(
        (c) => c.currencyCode === currencyCode,
      );

      if (currencyIndex !== -1) {
        const updatedCurrency = {
          ...state.currencies[currencyIndex],
          deposit: deposit,
          withdrawals: withdrawls,
          totalBalance: balance,
        };
        state.currencies[currencyIndex] = updatedCurrency;

        // Also update selectedCurrency if it matches
        if (
          state.selectedCurrency &&
          state.selectedCurrency.currencyCode === currencyCode
        ) {
          state.selectedCurrency = updatedCurrency;
        }
      }
    },
    resetWalletState: (state) => {
      state.currencies = [];
      state.addresses = [];
      state.currenciesLoading = false;
      state.addressesLoading = false;
      state.currenciesError = null;
      state.addressesError = null;
      state.selectedCurrency = null;
      state.usdToggleEnabled = false;
    },
  },
  extraReducers: (builder) => {
    // Handle getWalletCurrencies actions
    builder
      .addCase(getWalletCurrencies.pending, (state) => {
        state.currenciesLoading = true;
        state.currenciesError = null;
      })
      .addCase(
        getWalletCurrencies.fulfilled,
        (state, action) => {
          state.currenciesLoading = false;
          if (action.payload) {
            state.currencies = action.payload.data;
          }
        },
      )
      .addCase(getWalletCurrencies.rejected, (state, action) => {
        state.currenciesLoading = false;
        state.currenciesError = action.payload as Error;
      });

    // Handle getWalletAddressList actions
    builder
      .addCase(getWalletAddressList.pending, (state) => {
        state.addressesLoading = true;
        state.addressesError = null;
      })
      .addCase(
        getWalletAddressList.fulfilled,
        (state, action: PayloadAction<WalletAddressListResponse>) => {
          state.addressesLoading = false;
          state.addresses = action.payload.data;
        },
      )
      .addCase(getWalletAddressList.rejected, (state, action) => {
        state.addressesLoading = false;
        state.addressesError = action.payload as Error;
      });
  },
});

export const {
  setWalletCurrencies,
  setWalletAddresses,
  resetWalletState,
  setSelectedCurrency,
  toggleUsdDisplay,
  updateWalletBalance,
} = walletSlice.actions;
export default walletSlice.reducer;
