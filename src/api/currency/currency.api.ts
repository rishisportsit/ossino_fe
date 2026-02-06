import axios, { type AxiosResponse } from 'axios';
import type { 
  CurrencyConversionRequest, 
  CurrencyConversionResponse 
} from './currency.types';
import { config } from 'config/index';
const { javaWrapperServiceUrl } = config;

class CurrencyApi {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async convertCurrency(
    data: CurrencyConversionRequest
  ): Promise<AxiosResponse<CurrencyConversionResponse>> {
    const response = await axios.post(`${this.baseURL}/currency/convert/public`, data, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}

export const currencyApi = new CurrencyApi(javaWrapperServiceUrl);