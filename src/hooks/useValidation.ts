import { useState, useCallback } from 'react';
import { CURRENCIES, CURRENCY_CODE_MAPPING } from 'constants/currencies';

export interface StakeLimits {
  minStake: number;
  maxStake: number;
  maxPayout: number;
}

export interface UseValidationOptions {
  stakeLimits?: StakeLimits;
  shouldShowCurrencySymbol?: boolean;
  currency?: string;
}

export interface ValidationErrorData {
  message: string;
  value: string;
  currencyIcon: string;
  currencyCode: string;
  isUSD: boolean;
}

export const useValidation = (options: UseValidationOptions = {}) => {
  const { stakeLimits, shouldShowCurrencySymbol = true, currency } = options;
  const [validationError, setValidationError] = useState<ValidationErrorData | null>(null);

  const getCurrencyInfo = () => {
    try {
      const betconfig = JSON.parse(localStorage.getItem('betconfig') || '{}');
      const currencyCodeFromApi = betconfig?.currency;
      const currencyName = CURRENCIES[CURRENCY_CODE_MAPPING[currencyCodeFromApi as keyof typeof CURRENCY_CODE_MAPPING]];
      return {
        icon: currencyName?.icon || '/icons/currencies/dollarUsd.svg',
        contraction: currencyName?.contraction || currencyCodeFromApi
      };
    } catch (error) {
      return {
        icon: '/icons/currencies/dollarUsd.svg',
        contraction: 'USD'
      };
    }
  };

  const validateStake = useCallback((stake: number, payout: number, apiError?: string | null) => {
    if (!stakeLimits) return true;

    const decimalPlaces = shouldShowCurrencySymbol || currency === 'USDT' ? 2 : 10;
    const normalizeValue = (value: number) => parseFloat(value.toFixed(decimalPlaces));

    const stakeNormalized = normalizeValue(stake);
    const minStakeNormalized = normalizeValue(stakeLimits.minStake);
    const maxStakeNormalized = normalizeValue(stakeLimits.maxStake);
    const payoutNormalized = normalizeValue(payout);
    const maxPayoutNormalized = normalizeValue(stakeLimits.maxPayout);

    if (payoutNormalized > maxPayoutNormalized) {
      const payoutValue = stakeLimits.maxPayout.toFixed(decimalPlaces);
      const currencyInfo = getCurrencyInfo();

      setValidationError({
        message: 'Max payout limit reached:',
        value: payoutValue,
        currencyIcon: shouldShowCurrencySymbol ? '/icons/currencies/dollarUsd.svg' : currencyInfo.icon,
        currencyCode: shouldShowCurrencySymbol ? 'USD' : currencyInfo.contraction,
        isUSD: shouldShowCurrencySymbol
      });
      return false;
    }

    if (stakeNormalized < minStakeNormalized) {
      const minStakeValue = stakeLimits.minStake.toFixed(decimalPlaces);
      const currencyInfo = getCurrencyInfo();

      setValidationError({
        message: 'Stake must be greater than or equal to',
        value: minStakeValue,
        currencyIcon: shouldShowCurrencySymbol ? '/icons/currencies/dollarUsd.svg' : currencyInfo.icon,
        currencyCode: shouldShowCurrencySymbol ? 'USD' : currencyInfo.contraction,
        isUSD: shouldShowCurrencySymbol
      });
      return false;
    }

    if (stakeNormalized > maxStakeNormalized) {
      const maxStakeValue = stakeLimits.maxStake.toFixed(decimalPlaces);
      const currencyInfo = getCurrencyInfo();

      setValidationError({
        message: 'Stake must be lower than or equal to',
        value: maxStakeValue,
        currencyIcon: shouldShowCurrencySymbol ? '/icons/currencies/dollarUsd.svg' : currencyInfo.icon,
        currencyCode: shouldShowCurrencySymbol ? 'USD' : currencyInfo.contraction,
        isUSD: shouldShowCurrencySymbol
      });
      return false;
    }
    if (!apiError) {
      setValidationError(null);
    }
    return true;
  }, [stakeLimits, shouldShowCurrencySymbol, currency]);

  const clearValidationError = useCallback(() => {
    setValidationError(null);
  }, []);

  return {
    validationError,
    validateStake,
    clearValidationError,
    setValidationError
  };
};