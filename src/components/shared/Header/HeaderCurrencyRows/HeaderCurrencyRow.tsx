import type { WalletCurrency } from 'api/wallet/wallet.types';
import { getFormattedBalance, getFormattedBalanceDisplay } from 'helpers/currencyHelpers';
import { CURRENCY_CODE_MAPPING, CURRENCIES } from 'constants/currencies';
function getCurrencyIconByCode(code: string): string | undefined {
  const mapped = (CURRENCY_CODE_MAPPING as Record<string, string>)[code];
  if (mapped && CURRENCIES[mapped]?.icon) return CURRENCIES[mapped].icon;
  for (const key in CURRENCIES) {
    if (CURRENCIES[key].contraction === code && CURRENCIES[key].icon) {
      return CURRENCIES[key].icon;
    }
  }
  return undefined;
}

type HeaderCurrencyRowProps = {
  currency: WalletCurrency;
};

const HeaderCurrencyRow = ({ currency }: HeaderCurrencyRowProps) => {
  const { currencyCode } = currency;
  const icon = getCurrencyIconByCode(currencyCode);

  return (
    <div className="flex flex-row items-center justify-between w-full min-h-5 min-w-40 py-1.5 px-1.5 gap-5">
      <span className="wrapper flex flex-row gap-1.5">
        <span className="flex items-center">
          {icon && <img src={icon} alt={currencyCode} className="h-4 w-4" />}
        </span>
        <span className="flex items-center font-semibold">
          <span className="flex text-xs">{currencyCode}</span>
        </span>
      </span>
      <span className="flex items-center">
        <span className="font-medium text-xs">
          {getFormattedBalanceDisplay(currency)}
        </span>
      </span>
    </div>
  );
};

export default HeaderCurrencyRow;

