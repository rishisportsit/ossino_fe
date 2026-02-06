import React, { useEffect, useState } from 'react';
import SidebarListSkeleton from 'components/shared/SidebarListSkeleton';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getTopWinnings } from 'store/playerInsights/slice';
import {
  selectTopWinnings,
  selectTopWinningsLoading,
  selectTopWinningsError,
} from 'store/playerInsights/selectors';
import { selectCurrencyData } from 'store/currency/selectors';
import { selectWalletState } from 'store/wallet/selectors';
import { getConversionValue } from 'helpers/usdConversion';

import { CURRENCY_CODE_MAPPING, CURRENCIES } from 'constants/currencies';
import { formatNumber } from 'helpers/numbers';

const DEFAULT_USER_ICON = '/images/users/user.png';

export function getCurrencyIconByCode(code: string): string | undefined {
  const mapped = (CURRENCY_CODE_MAPPING as Record<string, string>)[code];
  if (mapped && CURRENCIES[mapped]?.icon) return CURRENCIES[mapped].icon;
  for (const key in CURRENCIES) {
    if (CURRENCIES[key].contraction === code && CURRENCIES[key].icon) {
      return CURRENCIES[key].icon;
    }
  }
  return undefined;
}

function maskLeaderboardUsername(username?: string | null) {
  if (!username) return '***';
  const [name, domain] = username.split('@');
  if (!domain) return username.slice(0, 4) + '****.com';
  const domainPart = domain.split('.')[0] || '';
  return name.slice(0, 4) + '****.' + domainPart;
}

const TopWinningsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const winners = useAppSelector(selectTopWinnings);
  const loading = useAppSelector(selectTopWinningsLoading);
  const error = useAppSelector(selectTopWinningsError);
  const conversionData = useAppSelector(selectCurrencyData);
  const {  selectedCurrency, usdToggleEnabled } = useAppSelector(selectWalletState);
  const [localUsdToggle, setLocalUsdToggle] = useState(usdToggleEnabled);

  useEffect(() => {
    const handleToggleChange = (event: CustomEvent) => {
      if (event.detail?.currentUsdToggle !== undefined) {
        setLocalUsdToggle(event.detail.currentUsdToggle);
      }
    };
    window.addEventListener('currencyToggleChanged', handleToggleChange as EventListener);
    
    return () => {
      window.removeEventListener('currencyToggleChanged', handleToggleChange as EventListener);
    };
  }, []);

  useEffect(() => {
    setLocalUsdToggle(usdToggleEnabled);
  }, [usdToggleEnabled]);

  useEffect(() => {
    if ((winners?.length ?? 0) > 0) return;
    dispatch(getTopWinnings());
  }, [dispatch, winners.length]);

  if ((loading !== true && error) || (!winners?.length)) return null;

  if (loading) {
    return (
      <SidebarListSkeleton 
        title="Top winnings" 
        columnHeaders={['User', 'Win']} 
        itemCount={5} 
      />
    );
  }

  const shouldShowUSD = Boolean(localUsdToggle && conversionData);

  return (
    <div className="bg-base-725 rounded-xl w-full lg:w-[290px] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-base-850 border-b border-base-800">
        <h3 className="text-[16px] font-regular body-txtColor-1">Top winnings</h3>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm border-b border-base-800">
        <span className="text-base-400">User</span>
        <span className="text-base-400">Win</span>
      </div>
      {error ? (
        <div className="flex justify-center items-center py-6 text-status-error-100 text-sm">
          {error.message || 'Failed to load top winnings'}
        </div>
      ) : (
        <ul className="divide-y divide-base-800">
          {winners.map((w) => {
            const currencyCodeFromWin = w.currency;
            let displayAmount = w.amount;
            if (shouldShowUSD && currencyCodeFromWin) {
              const convertedAmount = getConversionValue(currencyCodeFromWin, displayAmount, selectedCurrency?.multiplier || null, conversionData || []);
              if (convertedAmount !== null) displayAmount = convertedAmount;
            }
            return (
              <li key={w.betId} className="flex items-center justify-between px-4 py-3 gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={DEFAULT_USER_ICON}
                    alt="User"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-sm body-txtColor-1 truncate">{maskLeaderboardUsername(w.userName || w.email || 'User')}</span>
                </div>
                <span className="text-sm font-medium text-primary-1 flex items-center gap-1">
                  {shouldShowUSD ? (
                    <>
                      <img
                        src={getCurrencyIconByCode(w.currency) || '/icons/currencies/dollarUsd.svg'}
                        alt={w.currency}
                        className="w-4 h-4"
                      />
                      <img
                        src="/icons/currencies/dollarUsd.svg"
                        alt="USD"
                        className="h-3 w-3"
                      />
                    </>
                  ) : (
                    <img
                      src={getCurrencyIconByCode(w.currency) || '/icons/currencies/dollarUsd.svg'}
                      alt={w.currency}
                      className="w-4 h-4"
                    />
                  )}
                  {displayAmount >= 1
                    ? formatNumber(displayAmount)
                    : displayAmount > 0
                      ? displayAmount.toLocaleString('en', { minimumFractionDigits: shouldShowUSD || currencyCodeFromWin === 'USDT' ? 2 : 8, maximumFractionDigits: shouldShowUSD || currencyCodeFromWin === 'USDT' ? 2 : 8 })
                      : '0.00'}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TopWinningsSection;