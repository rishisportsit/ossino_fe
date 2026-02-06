
/*
 * Currency formatting helpers for Ossino FE
 * 
 * IMPORTANT: This file has been updated to fix crypto currency precision issues.
 * The API returns actual crypto values (e.g., 0.00065 BTC), NOT values that need 
 * multiplier application. Previous implementation incorrectly applied multiplier.
 * 
 * Changes made:
 * 1. Removed multiplier logic from getPreciseBalance() - API returns actual values
 * 2. Updated formatCurrencyAmount to use higher default precision for crypto (8 decimals)
 * 3. Created formatSmartCurrency() for automatic crypto/fiat detection
 * 4. Fixed getFormattedBalanceDisplay() to use proper crypto precision
 * 5. Removed multiplier logic from getFormattedBalanceFromRaw()
 * 
 * All components updated to use these new helpers for proper crypto precision display.
 */

import type { WalletCurrency } from 'api/wallet/wallet.types';
import Decimal from 'decimal.js';

interface CurrencyConfig {
    code: string;
    decimals: number;
    isCrypto: boolean;
    locale: string; // Locale for number formatting (determines comma/period separators)
    symbol?: string;
}

const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
    USD: { code: 'USD', decimals: 2, isCrypto: false, locale: 'en-US', symbol: '$' }, // US: 1,234.56
    EUR: { code: 'EUR', decimals: 2, isCrypto: false, locale: 'de-DE', symbol: '€' }, // Europe: 1.234,56
    GBP: { code: 'GBP', decimals: 2, isCrypto: false, locale: 'en-GB', symbol: '£' }, // UK: 1,234.56
    INR: { code: 'INR', decimals: 2, isCrypto: false, locale: 'en-IN', symbol: '₹' }, // India: 1,23,456.78
    JPY: { code: 'JPY', decimals: 0, isCrypto: false, locale: 'ja-JP', symbol: '¥' }, // Japan: 1,234
    BTC: { code: 'BTC', decimals: 8, isCrypto: true, locale: 'en-US', symbol: '₿' },
    ETH: { code: 'ETH', decimals: 8, isCrypto: true, locale: 'en-US', symbol: 'Ξ' },
    USDT: { code: 'USDT', decimals: 6, isCrypto: true, locale: 'en-US' },
    BTC_TEST: { code: 'BTC_TEST', decimals: 8, isCrypto: true, locale: 'en-US' },
    ETH_TEST5: { code: 'ETH_TEST5', decimals: 8, isCrypto: true, locale: 'en-US' },
    ETH_TESTS: { code: 'ETH_TESTS', decimals: 8, isCrypto: true, locale: 'en-US' },
};

/**
 * Get the properly formatted balance for a currency as a Decimal for high precision
 */
export function getPreciseBalance(currency: WalletCurrency): Decimal {
    // API already returns actual crypto values, no multiplier needed
    return new Decimal(currency.totalBalance);
}

/**
 * Get the properly formatted balance for a currency, applying multiplier for crypto
 * Returns number (may lose precision for very small/large values)
 */
export function getFormattedBalance(currency: WalletCurrency): number {
    return getPreciseBalance(currency).toNumber();
}

/**
 * Format a currency amount with flexible options
 */
export const formatCurrencyAmount = (
    amount: number | string | Decimal,
    currencyCode: string,
    options?: {
        showSymbol?: boolean;
        minDecimals?: number;
        maxDecimals?: number;
        removeTrailingZeros?: boolean;
    },
): string => {
    let dAmount: Decimal;

    try {
        if (amount instanceof Decimal) {
            dAmount = amount;
        } else {
            // Handle scientific notation strings or dirty strings by cleaning first?
            // Decimal.js handles scientific notation like "1.2e-5" correctly natively.
            dAmount = new Decimal(amount);
        }
    } catch (e) {
        console.warn("Invalid amount passed to formatCurrencyAmount", amount);
        return '0';
    }

    if (dAmount.isNaN()) return '0';

    const config = CURRENCY_CONFIGS[currencyCode] || {
        code: currencyCode,
        decimals: 2,
        isCrypto: false,
        locale: 'en-US' // Default to US format
    };
    const defaultDecimals = config.decimals;
    const isCrypto = config.isCrypto;
    const locale = config.locale;

    // Determine precision - for crypto, use higher default precision
    let decimals = options?.maxDecimals ?? (isCrypto ? 8 : defaultDecimals);

    // Auto-expand precision for very small numbers if they are non-zero
    if (!dAmount.isZero() && dAmount.abs().lt(0.000001)) {
        // e.g. 1e-7. Needed decimals = 7 + constant?
        // Decimal.js doesn't have a direct "decimalPlaces needed" without toDP, but we can check exponent
        const exp = dAmount.e; // exponent
        if (exp < 0) {
            const needed = Math.abs(exp) + (isCrypto ? 2 : 0);
            decimals = Math.max(decimals, needed);
        }
    }

    // Format with locale-aware formatting (comma/period separators based on currency)
    const minDecimals = options?.minDecimals ?? (isCrypto ? 0 : 2);

    // Convert to number and use toLocaleString with currency-specific locale
    const numValue = dAmount.toNumber();

    let formatted = numValue.toLocaleString(locale, {
        minimumFractionDigits: minDecimals,
        maximumFractionDigits: decimals,
        useGrouping: true, // Enables separators (comma, period, or space based on locale)
    });

    // For crypto, remove trailing zeros if requested
    if (isCrypto && options?.removeTrailingZeros !== false) {
        // Remove trailing zeros while keeping comma separators
        if (formatted.includes('.')) {
            formatted = formatted.replace(/(\.\d*?[1-9])0+$/, '$1'); // Remove zeros after last non-zero digit
            formatted = formatted.replace(/\.0+$/, ''); // Remove zeros if all decimal part is zero

            // Re-pad if minDecimals requirement exists
            if (minDecimals > 0) {
                const parts = formatted.split('.');
                if (parts.length === 1) {
                    // Integer case
                    formatted += '.' + '0'.repeat(minDecimals);
                } else {
                    // Decimal case
                    if (parts[1].length < minDecimals) {
                        formatted = parts[0] + '.' + parts[1].padEnd(minDecimals, '0');
                    }
                }
            } else {
                // if minDecimals is 0, we might have stripped the dot. All good.
            }
        } else {
            // Integer. Pad if minDecimals > 0
            if (minDecimals > 0) {
                formatted += '.' + '0'.repeat(minDecimals);
            }
        }
    }

    // Add symbol if requested
    if (options?.showSymbol && config.symbol) {
        return `${config.symbol}${formatted}`;
    }

    return formatted;
};

// Specific formatting utilities - updated to accept Decimal
export const formatCryptoAmount = (
    amount: number | string | Decimal,
    currency: string,
): string => {
    return formatCurrencyAmount(amount, currency, {
        removeTrailingZeros: true,
        minDecimals: 0,
        maxDecimals: 8
    });
};

export const formatFiatAmount = (
    amount: number | string | Decimal,
    currency: string,
): string => {
    return formatCurrencyAmount(amount, currency, {
        showSymbol: true,
        removeTrailingZeros: false,
    });
};

/**
 * Get a formatted display string for a currency balance
 */
export function getFormattedBalanceDisplay(currency: WalletCurrency): string {
    const preciseBalance = getPreciseBalance(currency);
    const config = CURRENCY_CONFIGS[currency.currencyCode] || CURRENCY_CONFIGS.USD;

    if (config.isCrypto) {
        return formatCurrencyAmount(preciseBalance, currency.currencyCode, {
            removeTrailingZeros: true,
            minDecimals: 0,
            maxDecimals: 8
        });
    } else {
        return formatCurrencyAmount(preciseBalance, currency.currencyCode, {
            removeTrailingZeros: false,
            minDecimals: 2,
            maxDecimals: 2
        });
    }
}

/**
 * Get formatted balance from raw values (for cases where we don't have WalletCurrency object)
 */
export function getFormattedBalanceFromRaw(
    totalBalance: number,
    multiplier: number | null,
    currencyType: string
): number {
    if (currencyType === 'CRYPTO' && multiplier) {
        return totalBalance;
    }
    return totalBalance;
}

/**
 * Smart currency formatter that detects currency type and applies appropriate formatting
 */
export function formatSmartCurrency(
    amount: number | string | Decimal,
    currencyCode: string,
    currencyType?: string
): string {
    const config = CURRENCY_CONFIGS[currencyCode];
    const isCrypto = config?.isCrypto || currencyType === 'CRYPTO';

    if (isCrypto) {
        return formatCryptoAmount(amount, currencyCode);
    } else {
        return formatFiatAmount(amount, currencyCode);
    }
}

/**
 * Get formatted display string from raw values
 */
export function getFormattedBalanceDisplayFromRaw(
    totalBalance: number,
    multiplier: number | null,
    currencyType: string,
    currencyCode?: string
): string {
    const balance = getFormattedBalanceFromRaw(totalBalance, multiplier, currencyType);

    if (currencyType === 'CRYPTO') {
        return formatCryptoAmount(balance, currencyCode || 'BTC');
    } else {
        return balance.toFixed(2);
    }
}
