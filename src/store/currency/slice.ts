import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { currencyApi } from 'api/currency/currency.api';
import type { 
  CurrencyConversionRequest, 
  CurrencyConversionItem 
} from 'api/currency/currency.types';

// State interface
export interface CurrencyState {
  data: CurrencyConversionItem[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  fromCurrencies: string[];
  toCurrency: string;
}

// Initial state
const initialState: CurrencyState = {
  data: [],
  loading: false,
  error: null,
  lastUpdated: null,
  fromCurrencies: ['USDT', 'ETH', 'BTC'],
  toCurrency: 'USD',
};

export const fetchCurrencyConversion = createAsyncThunk(
  'currency/fetchConversion',
  async (
    params: {
      fromCurrencies?: string[];
      toCurrency?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const { fromCurrencies = ['USDT', 'ETH', 'BTC'], toCurrency = 'USD' } = params;
      
      const requestPayload: CurrencyConversionRequest = {
        fromCurrency: fromCurrencies.join(','),
        toCurrency,
      };
       
      const response = await currencyApi.convertCurrency(requestPayload);

      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from currency API');
      }

      return {
        data: response.data,
        fromCurrencies,
        toCurrency,
      };
    } catch (error: any) {
      let errorMessage = 'Unknown error occurred during currency conversion';
      
      if (error.response) {
        errorMessage = `Currency API Error: ${error.response.status} - ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'Network error: Unable to reach currency conversion API';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Currency slice
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set currencies configuration
    setCurrencyConfig: (
      state,
      action: PayloadAction<{ fromCurrencies: string[]; toCurrency: string }>
    ) => {
      state.fromCurrencies = action.payload.fromCurrencies;
      state.toCurrency = action.payload.toCurrency;
    },
    
    // Reset currency state
    resetCurrencyState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyConversion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      // Fetch currency conversion - fulfilled
      .addCase(fetchCurrencyConversion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.data;
        state.fromCurrencies = action.payload.fromCurrencies;
        state.toCurrency = action.payload.toCurrency;
        state.lastUpdated = new Date().toISOString();
      })
      
      // Fetch currency conversion - rejected
      .addCase(fetchCurrencyConversion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Actions
export const { clearError, setCurrencyConfig, resetCurrencyState } = currencySlice.actions;

// Reducer
export default currencySlice.reducer;