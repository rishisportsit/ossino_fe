import { formatSmartCurrency } from './currencyHelpers';

export const formatNumber = (
  val: number,
  digit: number = 2,
  locale: string = 'en-US',
  options: Intl.NumberFormatOptions = {},
) => {
  let opts: Intl.NumberFormatOptions = { useGrouping: true, ...options };
  if (
    typeof opts.minimumFractionDigits === 'number' &&
    typeof opts.maximumFractionDigits === 'number'
  ) {
    if (opts.maximumFractionDigits < opts.minimumFractionDigits) {
      opts.maximumFractionDigits = opts.minimumFractionDigits;
    }
    return val.toLocaleString(locale, opts);
  }
  const formattedDigit = digit ?? 2;
  opts.minimumFractionDigits = formattedDigit;
  opts.maximumFractionDigits = formattedDigit;
  return val.toLocaleString(locale, opts);
};

export const formatCurrencyNumber = (
  amount: number,
  currencyCode?: string,
  currencyType?: string
): string => {
  if (currencyCode) {
    return formatSmartCurrency(amount, currencyCode, currencyType);
  }
  return formatNumber(amount, 2);
};
