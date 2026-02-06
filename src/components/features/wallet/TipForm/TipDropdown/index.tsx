import type { WalletCurrency } from 'api/wallet/wallet.types';
import { formatCurrencyNumber } from 'helpers/numbers';
import { getFormattedBalance } from 'helpers/currencyHelpers';
import { cn } from 'helpers/ui';
import { getCurrencyIconByCode } from 'components/shared/Header/CurrencyDropdown';

type TipDropdownProps = {
  onSelectCurrency: (currency: {
    icon: string;
    name: string;
    contraction?: string;
    balance: number;
  }) => void;
  selectedCurrency: {
    icon: string;
    name: string;
    contraction?: string;
    balance: number;
  };
  walletCurrencies: WalletCurrency[];
};

const TipDropdown = ({
  walletCurrencies,
  onSelectCurrency,
  selectedCurrency,
}: TipDropdownProps) => {
  const options = walletCurrencies.map((currency) => ({
    icon:
      getCurrencyIconByCode(currency.currencyCode) ||
      '/icons/currencies/etheriumLogo.svg',
    name: currency.currencyName,
    balance: getFormattedBalance(currency),
    contraction: currency.currencyCode,
  }));

  return (
    <div className="flex flex-col px-4 py-1 w-full">
      {options.map((currency, index) => (
        <div
          key={index}
          className="w-full py-3 flex flex-row justify-between border-b border-borderdefault last:border-none cursor-pointer"
          onClick={() => onSelectCurrency(currency)}
        >
          <div className="flex justify-start items-center flex-row gap-1.5">
            <img src={currency.icon} alt={currency.name} className="h-4 w-4" />
            <span
              className={cn('text-xs leading-4', {
                'text-special-2': selectedCurrency?.name === currency.name,
              })}
            >{`${currency.name} (${currency.contraction})`}</span>
          </div>
          <span
            className={cn('text-xs leading-4', {
              'text-special-2': selectedCurrency?.name === currency.name,
            })}
          >
            {formatCurrencyNumber(+(currency.balance ?? 0), currency.currencyCode)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TipDropdown;
