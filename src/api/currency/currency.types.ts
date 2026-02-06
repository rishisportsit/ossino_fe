export interface CurrencyConversionRequest {
  fromCurrency: string;
  toCurrency: string;
}

export interface CurrencyConversionItem {
  from_currency: string;
  to_currency: string;
  conversion_value: number;
  conversion_time: string;
}

export interface CurrencyConversionResponse extends Array<CurrencyConversionItem> {}

export interface ServiceResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}