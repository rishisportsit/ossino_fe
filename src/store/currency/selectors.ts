import { RootState } from 'store/index';

// Base selectors
export const selectCurrencyState = (state: RootState) => state.currency;

export const selectCurrencyData = (state: RootState) => state.currency.data;

export const selectCurrencyLoading = (state: RootState) => state.currency.loading;

export const selectCurrencyError = (state: RootState) => state.currency.error;

export const selectCurrencyLastUpdated = (state: RootState) => state.currency.lastUpdated;

export const selectFromCurrencies = (state: RootState) => state.currency.fromCurrencies;

export const selectToCurrency = (state: RootState) => state.currency.toCurrency;

// Derived selectors
export const selectCurrencySuccess = (state: RootState) => 
  !state.currency.loading && !state.currency.error && state.currency.data.length > 0;

export const selectConversionRate = (fromCurrency: string) => (state: RootState) => {
  const conversion = state.currency.data.find(
    item => item.from_currency.includes(fromCurrency)
  );
  return conversion ? conversion.conversion_value : null;
};

export const selectConversionValue = (fromCurrency: string, amount: number) => (state: RootState) => {
  const rate = selectConversionRate(fromCurrency)(state);
  return rate !== null ? amount * rate : null;
};

// Selector to get all conversion rates as an object
export const selectConversionRates = (state: RootState) => {
  return state.currency.data.reduce((acc, item) => {
    acc[item.from_currency] = item.conversion_value;
    return acc;
  }, {} as Record<string, number>);
};

export const selectIsDataStale = (staleMinutes: number = 30) => (state: RootState) => {
  if (!state.currency.lastUpdated) return true;
  
  const lastUpdated = new Date(state.currency.lastUpdated);
  const now = new Date();
  const diffMinutes = (now.getTime() - lastUpdated.getTime()) / (1000 * 60);
  
  return diffMinutes > staleMinutes;
};