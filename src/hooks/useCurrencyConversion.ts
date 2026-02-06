import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/index';
import { currencyApi } from 'api/currency/currency.api';
import type { 
  CurrencyConversionRequest, 
  CurrencyConversionItem 
} from 'api/currency/currency.types';

const currencyConversionKeys = {
  all: ['currency-conversion'] as const,
  conversion: (params: CurrencyConversionRequest) => 
    [...currencyConversionKeys.all, params] as const,
};

interface UseCurrencyConversionOptions {
  fromCurrencies?: string[];
  toCurrency?: string;
  enabled?: boolean;
}

interface UseCurrencyConversionReturn {
  data: CurrencyConversionItem[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  refetch: () => void;
}

const POLLING_INTERVAL = 15 * 60 * 1000;
const STALE_TIME = 25 * 1000;
export const useCurrencyConversion = (
  options: UseCurrencyConversionOptions = {}
): UseCurrencyConversionReturn => {
  const {
    fromCurrencies = ['USDT', 'ETH', 'BTC'],
    toCurrency = 'USD',
    enabled = true,
  } = options;
  const dispatch = useAppDispatch();

  const requestPayload: CurrencyConversionRequest = {
    fromCurrency: fromCurrencies.join(','),
    toCurrency,
  };

  const fetchCurrencyConversion = async (): Promise<CurrencyConversionItem[]> => {
    try {
      const response = await currencyApi.convertCurrency(requestPayload);
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from currency API');
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Currency API Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to reach currency conversion API');
      } else {
        throw new Error(error.message || 'Unknown error occurred during currency conversion');
      }
    }
  };

  const query: UseQueryResult<CurrencyConversionItem[], Error> = useQuery({
    queryKey: currencyConversionKeys.conversion(requestPayload),
    queryFn: fetchCurrencyConversion,
    enabled,
    refetchInterval: POLLING_INTERVAL,
    refetchIntervalInBackground: true, 
    staleTime: STALE_TIME,
    gcTime: 60 * 1000, 
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: (failureCount, error) => {
      if (error.message.includes('4')) {
        return false;
      }
      return failureCount < 3;
    },
    
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {

      dispatch({
        type: 'currency/fetchConversion/fulfilled',
        payload: {
          data: query.data,
          fromCurrencies,
          toCurrency,
        },
      });
    }
  }, [query.isSuccess, query.data, dispatch, fromCurrencies, toCurrency]);


  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  };
};