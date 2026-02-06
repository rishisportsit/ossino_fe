import type { WalletCurrency } from 'api/wallet/wallet.types';
import { formatCurrencyNumber } from 'helpers/numbers';
import { getFormattedBalance } from 'helpers/currencyHelpers';
import { cn } from 'helpers/ui';
import type { CurrencySpan } from '..';
import { getCurrencyIconByCode } from 'components/shared/Header/CurrencyDropdown';

type DepositDropdownProps = {
  onSelectCurrency: (currency: CurrencySpan) => void;
  selectedCurrency: CurrencySpan;
  walletCurrencies: WalletCurrency[];
};

const DepositDropdown = ({
  walletCurrencies,
  onSelectCurrency,
  selectedCurrency,
}: DepositDropdownProps) => {
  const options = walletCurrencies.map((currency) => ({
    icon: (
      <img
        src={getCurrencyIconByCode(currency.currencyCode) || '/icons/currencies/etheriumLogo.svg'}
        alt={currency.currencyName}
        className="h-4 w-4"
      />
    ),
    name: currency.currencyName,
    balance: getFormattedBalance(currency),
    contraction: currency.currencyCode,
    code: currency.currencyCode,
    currencyType: currency.currencyType,
  }));

  return (
    <div className="flex flex-col px-4 py-1 w-full">
      {options.map((currency) => (
        <div
          className="w-full py-3 flex flex-row justify-between border-b border-borderdefault last:border-none"
          onClick={() => onSelectCurrency(currency)}
          key={currency.name}
        >
          <div className="flex justify-start items-center flex-row gap-1.5">
            <span className="h-4 w-4">{currency.icon}</span>
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
            {formatCurrencyNumber(+(currency.balance ?? 0), currency.contraction, currency.currencyType)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DepositDropdown;
