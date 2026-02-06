import BetHeader from './BetHeader';
import { cn } from 'helpers/ui';
import styles from './Accordion.module.css';
import BetSelectionCard from './BetSelectionCard';
import FinancialSummary from './FinancialSummary';
import { Bet } from 'api/SportsHomePage/sportsHomePage.types';
import { formatPlacedDateTime } from 'helpers/common';
import { useAppSelector } from 'store/index';
import { selectCashoutApi } from 'store/SportsHomePage/selectors';
import { BetErrorDisplay } from 'components/shared/betting';
import { useState, useEffect } from 'react';
import type { CurrencyConversionItem } from 'api/currency/currency.types';
import type { WalletCurrency } from 'api/wallet/wallet.types';
import { getConversionValue } from 'helpers/usdConversion';
import { Button } from 'components/shared/ui/Button';

interface BetAccordionProps {
  bet: Bet;
  isExpanded: boolean;
  onToggle: (betId: string) => void;
  onCopyBetId: (betId: string) => void;
  handleCashOutButton: (cashoutStake: number, betId?: number) => void;
  currentTab?: string;
  conversionData?: CurrencyConversionItem[];
  currencies?: WalletCurrency[];
  selectedCurrency?: WalletCurrency | null;
  usdToggleEnabled?: boolean;
  showCancelButton?: boolean;
  setShowCancelButton?: (value: boolean) => void;
  isLoading?: boolean;
}

const BetAccordion = ({
  bet,
  isExpanded,
  onToggle,
  onCopyBetId,
  handleCashOutButton,
  currentTab,
  conversionData,
  selectedCurrency,
  usdToggleEnabled,
  showCancelButton,
  setShowCancelButton,
  isLoading
}: BetAccordionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'accepted':
        return 'text-secondary-light-2';
      case 'won':
      case 'cashedout':
        return 'text-secondary-light-2';
      case 'lost':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-base-400';
    }
  };

  const betId = bet?.tId?.toString() || bet?.ticketId;
  const isMultiple = bet?.betParts && bet?.betParts?.length > 1;
  const { date: placedDate, time: placedTime } = formatPlacedDateTime(bet?.createdDate || '');
  const cashOutResponse = useAppSelector(selectCashoutApi);
  const message = cashOutResponse?.result?.message?.toLowerCase();
  const statusCode = cashOutResponse?.result?.statusCode;
  const reason = cashOutResponse?.result?.result?.reason;

  const shouldShowMessage = showCancelButton && (cashOutResponse?.result?.result?.tId === bet?.tId) && (
    (statusCode === 200 && reason) || message
  );

  const variant = statusCode === 200 ? 'success' : 'error';
  const displayMessage = statusCode === 200 ? reason : cashOutResponse?.result?.message;
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

  const shouldShowUSD = Boolean(localUsdToggle && conversionData);
  const currencyCodeFromBet = bet?.currency || selectedCurrency?.currencyCode;
  let displayStake = parseFloat(bet?.stake);
  let displayPayout = parseFloat(bet?.payout);
  let displayCashoutAmount = Number(bet?.cashOutAmount ?? 0);

  if (shouldShowUSD && currencyCodeFromBet) {
    const convertedStake = getConversionValue(currencyCodeFromBet, displayStake, selectedCurrency?.multiplier || null, conversionData || []);
    const convertedPayout = getConversionValue(currencyCodeFromBet, displayPayout, selectedCurrency?.multiplier || null, conversionData || []);
    const convertedCashout = getConversionValue(currencyCodeFromBet, displayCashoutAmount, selectedCurrency?.multiplier || null, conversionData || []);

    if (convertedStake !== null) displayStake = convertedStake;
    if (convertedPayout !== null) displayPayout = convertedPayout;
    if (convertedCashout !== null) displayCashoutAmount = convertedCashout;
  }

  return (
    <div className="bg-base-725 rounded-xl overflow-hidden">
      {/* Bet Header - Accordion Trigger */}
      <button
        onClick={() => onToggle(betId)}
        className="w-full px-2 py-3 flex items-center justify-between text-left transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(styles.chevron, !isExpanded && styles.chevronExpanded)}
          />
          <span className="body-txtColor-1 text-xs font-normal"> {isMultiple ? `Multiple (${bet.betParts.length})` : 'Single'}</span>
        </div>
        <span className={`text-xs font-normal ${getStatusColor(bet?.status?.toLowerCase() || '')}`}>
          {bet?.status?.toUpperCase()}
        </span>
      </button>

      {/* Bet Content - Accordion Content */}
      <div
        className={`${cn(styles.content, isExpanded && styles.contentExpanded)} overflow-auto`}
      >
        <div className="px-2 pb-4">
          {/* Bet Header */}
          <BetHeader
            betParts={bet?.betParts}
            betId={bet?.shortBetId || " "}
            cashoutPercentage={bet?.bonusPercentage}
            placedDate={placedDate}
            placedTime={placedTime}
            onCopyBetId={onCopyBetId}
            currentTab={currentTab}
          />

          {/* Bet Selections */}
          <div className="space-y-3 mb-4">
            {bet?.betParts?.map((selection, index) => (
              <BetSelectionCard key={selection?.selectionId || index} selection={selection} />
            ))}
          </div>

          <FinancialSummary
            totalStake={displayStake}
            estimatedPayout={displayPayout}
            currency={bet?.currency}
            shouldShowUSD={shouldShowUSD}
            selectedCurrency={selectedCurrency?.currencyCode}
          />

          {shouldShowMessage && (
            <BetErrorDisplay
              apiError={displayMessage}
              variant={variant}
              defaultMargin='mb-0'
              className="animate-in fade-in slide-in-from-top-2 duration-300"
            />
          )}

          {bet?.cashoutStatus?.toLowerCase() === "available" && !shouldShowMessage && (
            <button
              onClick={() => handleCashOutButton(Number(bet?.cashOutAmount), bet?.tId)}
              disabled={isLoading}
              className="w-full h-8 bg-button-gradient btn-textColor text-xs font-medium rounded-lg hover:opacity-90 transition-opacity">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 ">
                  <span className='btn-textColor'>{showCancelButton ? "Confirm " : "Cashout"}</span>
                  {/* {shouldShowUSD && (
                    <img src="/icons/currencies/dollarUsd.svg" alt="USD" className="w-3 h-3" />
                  )} */}
                  <span className='btn-textColor'>
                    {displayCashoutAmount.toFixed(shouldShowUSD || currencyCodeFromBet === 'USDT' ? 2 : 10)}
                  </span>
                </div>
              )}
            </button>
          )}
          {bet?.cashoutStatus?.toLowerCase() === "available" && showCancelButton && !isLoading && !shouldShowMessage && (
            <Button
              className='w-full h-8 text-xs font-medium mt-1 animate-in fade-in slide-in-from-bottom-2 duration-300'
              variant='destructive'
              onClick={() => { if (setShowCancelButton) setShowCancelButton(false) }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BetAccordion;
