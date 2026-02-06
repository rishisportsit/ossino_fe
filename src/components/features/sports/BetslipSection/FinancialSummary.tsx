import { CURRENCIES, CURRENCY_CODE_MAPPING } from 'constants/currencies';

interface FinancialSummaryProps {
  totalStake: number;
  estimatedPayout: number;
  currency?: string;
  currencyCode?: string;
  shouldShowUSD?: boolean;
  selectedCurrency?: string;
}

const FinancialSummary = ({ 
  totalStake, 
  estimatedPayout, 
  currency, 
  currencyCode,
  shouldShowUSD,
  selectedCurrency
}: FinancialSummaryProps) => {
  const currencyCodeFromApi = currency || currencyCode || selectedCurrency;
  const currencyName = CURRENCIES[
    CURRENCY_CODE_MAPPING[currencyCodeFromApi as keyof typeof CURRENCY_CODE_MAPPING]
  ];

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="body-txtColor-1 text-xs font-normal">Total Stake:</span>
        <div className="flex items-center gap-1">
          {shouldShowUSD ? (
            <div className="flex items-center gap-1">
              {currencyName?.icon && <img src={currencyName.icon} alt={currencyName.contraction} className="w-4 h-4" />}
              <img src="/icons/currencies/dollarUsd.svg" alt="USD" className="w-4 h-4" />
            </div>
          ) : (
            currencyName?.icon && <img src={currencyName.icon} alt={currencyName.contraction} className="w-4 h-4" />
          )}
          <span className="text-secondary-light-1 text-xs font-medium">
            {shouldShowUSD || currencyCodeFromApi === 'USDT' ? totalStake.toFixed(2) : totalStake.toFixed(10)}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="body-txtColor-1 text-xs font-normal">Est. Payout:</span>
        <div className="flex items-center gap-1">
          {shouldShowUSD ? (
            <div className="flex items-center gap-1">
              {currencyName?.icon && <img src={currencyName.icon} alt={currencyName.contraction} className="w-4 h-4" />}
              <img src="/icons/currencies/dollarUsd.svg" alt="USD" className="w-4 h-4" />
            </div>
          ) : (
            currencyName?.icon && <img src={currencyName.icon} alt={currencyName.contraction} className="w-4 h-4" />
          )}
          <span className="text-secondary-light-1 text-xs font-medium">
            {shouldShowUSD || currencyCodeFromApi === 'USDT' ? estimatedPayout.toFixed(2) : estimatedPayout.toFixed(10)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;

