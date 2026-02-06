import { getCurrencyIconByCode } from 'components/shared/Header/CurrencyDropdown';
import { cn } from 'helpers/ui';
import { useAppSelector } from 'store/index';

// Helper to guarantee a string for src
function getValidCurrencyIcon(code: string): string {
  const icon = getCurrencyIconByCode(code);
  return typeof icon === 'string' && icon.length > 0 ? icon : '/icons/currencies/etheriumLogo.svg';
}

type DepositDropdownProps = {
  onSelectCurrency: (currency: {
    icon: React.ReactNode;
    contraction?: string;
    name: string;
  }) => void;
  selectedCurrency: {
    icon: React.ReactNode;
    contraction?: string;
    name: string;
  }
}

const BuyCryptoDropdown = ({ onSelectCurrency, selectedCurrency }: DepositDropdownProps) => {
  const userBalances = useAppSelector((state) => state.user.data?.balances);

  return (
    <div className='flex flex-col px-4 py-1 w-full'>
      {userBalances && Object.values(userBalances).map((currency) => (
        <div
          className='w-full py-3 flex flex-row justify-between border-b border-borderdefault last:border-none'
          onClick={() => onSelectCurrency(currency)}
        >
          <div className='flex justify-start items-center flex-row gap-1.5'>
            <span className='h-4 w-4'>
              <img src={getValidCurrencyIcon(currency.contraction ?? '')} alt={currency.name} className='h-4 w-4' />
            </span>
            <span className={cn('text-xs leading-4', { 'text-special-2': selectedCurrency?.name === currency.name })}>{`${currency.name} (${currency.contraction})`}</span>
          </div>
        </div>
      ))}
    </div>
  )

}

export default BuyCryptoDropdown