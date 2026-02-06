import type { WalletCurrency } from 'api/wallet/wallet.types';
import type { CurrencyConversionItem } from 'api/currency/currency.types';
import { getFormattedBalanceDisplay, getFormattedBalanceFromRaw } from './currencyHelpers';

export const getConversionRate = (
  fromCurrency: string,
  conversionData: CurrencyConversionItem[]
): number | null => {
  const conversion = conversionData.find(
    item => {
      const itemCurrency = item.from_currency.toLowerCase();
      const searchCurrency = fromCurrency.toLowerCase();
      if (itemCurrency === searchCurrency) return true;
      return searchCurrency.startsWith(itemCurrency) || searchCurrency.replace(/_test\d*$/, '') === itemCurrency;
    }
  );
  return conversion ? conversion.conversion_value : null;
};


export const getConversionValue = (
  fromCurrency: string,
  amount: number,
  multiplier: number | null,
  conversionData: CurrencyConversionItem[]
): number | null => {
  const rate = getConversionRate(fromCurrency, conversionData);

  return rate !== null ? getFormattedBalanceFromRaw(amount, multiplier, 'CRYPTO') * rate : null;
};

export const ConvertCurrenciesToUSD = (
  fromCurrency: string,
  conversionData: CurrencyConversionItem[],
  amounts?: number
): number | null => {
  const rate = getConversionRate(fromCurrency, conversionData);
  if (fromCurrency === 'USDT' && rate !== null && amounts !== undefined) {
     let truncate = Math.floor((amounts / Number(rate)) * 100) / 100;
    return Number(truncate);
  }
  else if (rate !== null && amounts !== undefined) {
    let truncate = Math.floor((amounts / Number(rate)) * 10000000000) /10000000000;
    return Number(truncate);
  }
  return 0.1;
};

export const getFormattedBalanceWithUSD = (
  currency: WalletCurrency,
  balance: number,
  showUSD: boolean,
  conversionData: CurrencyConversionItem[]
): { value: string; symbol: string; iconPath?: string } => {


  if (!showUSD) {
    return {
      value: getFormattedBalanceDisplay(currency),
      symbol: ''
    };
  }

  const usdValue = getConversionValue(currency.currencyCode, balance, currency.multiplier, conversionData);

  if (usdValue === null) {
    return {
      value: String(balance),
      symbol: ''
    };
  }

  const formattedValue = (Math.floor(usdValue * 100) / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return {
    value: formattedValue,
    symbol: '$',
    iconPath: '/icons/currencies/dollarUsd.svg'
  };
};

export const getFormattedBalanceString = (
  currency: WalletCurrency,
  balance: number,
  showUSD: boolean,
  conversionData: CurrencyConversionItem[]
): string => {
  const result = getFormattedBalanceWithUSD(currency, balance, showUSD, conversionData);
  return `${result.symbol}${result.value}`;
};

export const getCleanCurrencyCode = (code: string): string => {
  return code.replace(/_TEST\d*$/, '');
};