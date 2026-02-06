import { Switch } from 'components/shared/ui/Switch';
import StakeControlCard from './StakeControlCard';
import CouponSheet from './CouponSheet';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { cn } from 'helpers/ui';
import type { CurrencyConversionItem } from 'api/currency/currency.types';
import { CURRENCY_CODE_MAPPING, CURRENCIES } from 'constants/currencies';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';

interface BetType {
  id: string;
  name: string;
  combinations: number;
  stake: number;
}

interface BetslipControlsProps {
  stake: number;
  onStakeChange?: (value: number) => void;
  onPlaceBet?: (stake: number, oddsChangeEnabled: boolean) => Promise<{ success: boolean; error?: string }>;
  onClearBetslip?: () => void;
  variant?: 'standard' | 'system';
  betTypes?: BetType[];
  totalOdds?: number;
  bonusPercentage?: number;
  betslipValues?: any[];
  oddsthreshold?: number;
  minstake?: number;
  maxstake?: number;
  isLoggedIn?: boolean;
  usdToggleEnabled?: boolean;
  conversionData?: CurrencyConversionItem[];
  selectedCurrency?: string;
  convertedStakeLimits?: {
    minStake: number;
    maxStake: number;
    maxPayout: number;
  };
  whattax?: number;
  placebetdisabled?: boolean;
}

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

const BetslipControlsCard = ({
  stake: initialStake = 0,
  onStakeChange,
  onPlaceBet,
  onClearBetslip,
  betslipValues,
  oddsthreshold,
  bonusPercentage,
  isLoggedIn = false,
  usdToggleEnabled = false,
  selectedCurrency,
  convertedStakeLimits,
  whattax,
  placebetdisabled
}: BetslipControlsProps) => {
  const [stake, setStake] = useState(initialStake);
  const [validationError, setValidationError] = useState<React.ReactNode | null>(null);
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const [oddsChangeEnabled, setOddsChangeEnabled] = useState(true);
  const [isCouponSheetOpen, setIsCouponSheetOpen] = useState(false);
  const [appliedCouponId, setAppliedCouponId] = useState<string | null>(null);
  const shouldShowCurrencySymbol = isLoggedIn && usdToggleEnabled;
  const { openDialog } = useDialog();

  // Mock coupon data - replace with actual API data
  const availableCoupons = useMemo(() => [
    {
      id: 'FREEBET100',
      code: 'FREEBET100',
      expiryDate: '03 August 2024',
      minDeposit: 1000,
      numberOfLegs: 8,
      terms: [
        'Valid for sports betting only',
        'Minimum odds requirement 1.5 per selection',
        'Cannot be combined with other offers',
        'Valid for 7 days from activation'
      ]
    },
    {
      id: 'WELCOMEBONUS100',
      code: 'WELCOMEBONUS100',
      expiryDate: '03 August 2024',
      minDeposit: 500,
      numberOfLegs: 8,
      terms: [
        'First deposit bonus only',
        'Wagering requirement 5x',
        'Valid for new users only'
      ]
    },
    {
      id: 'DEPOSITBONUS100',
      code: 'DEPOSITBONUS100',
      expiryDate: '03 August 2024',
      minDeposit: 1000,
      numberOfLegs: 8,
      terms: [
        'Valid for all sports',
        'Maximum bonus amount TZS 10,000',
        'Minimum 3 selections required'
      ]
    }
  ], []);

  const handleApplyCoupon = useCallback((couponId: string) => {
    setAppliedCouponId(couponId);
    // Add your coupon application logic here
    console.log('Applied coupon:', couponId);
  }, []);

  const handleRemoveCoupon = useCallback(() => {
    setAppliedCouponId(null);
    // Add your coupon removal logic here
    console.log('Removed coupon');
  }, []);

  const appliedCoupon = useMemo(() => {
    if (!appliedCouponId) return null;
    return availableCoupons.find(c => c.id === appliedCouponId);
  }, [appliedCouponId, availableCoupons]);

  const handlePlaceBet = async () => {
    if (!onPlaceBet || !isLoggedIn || isBetBlocked) return;

    try {
      setIsPlacingBet(true);
      setValidationError(null);

      const result = await onPlaceBet(stake, oddsChangeEnabled);

      if (!result.success && result.error) {
        setValidationError(
          <div className="text-red-400">
            {result.error}
          </div>
        );
      }
    } catch (error) {
      setValidationError(
        <div className="text-red-400">
          {error instanceof Error ? error.message : 'Failed to place bet'}
        </div>
      );
    } finally {
      setIsPlacingBet(false);
    }
  };

  useEffect(() => {
    const handleToggleChange = (event: CustomEvent) => {
      if (event.detail?.shouldResetStake) {
        const minStake = convertedStakeLimits?.minStake || 0;
        setValidationError(null);
        setStake(minStake);
        if (onStakeChange) onStakeChange(minStake);
      }
    };

    window.addEventListener('currencyToggleChanged', handleToggleChange as EventListener);
    return () => {
      window.removeEventListener('currencyToggleChanged', handleToggleChange as EventListener);
    };
  }, [onStakeChange, convertedStakeLimits?.minStake]);

  const {
    displayValues
  } = useMemo(() => {
    const odds = betslipValues?.map(
      bet => Number(bet?.markets[0]?.selections[0]?.decimalOdds)
    ) || [];

    const totaloddsvalue = odds.reduce((acc, val) => acc * val, 1);

    let bonusodds: number[] = [];
    let oddsamonut = 0;
    let bonusamount = 0;
    let whtTaxamount = 0;

    if (bonusPercentage && bonusPercentage > 0) {
      bonusodds = odds.filter(odd => odd > (oddsthreshold ?? 0));
      oddsamonut = bonusodds.reduce((acc, val) => acc * val, 1);
      bonusamount = (oddsamonut * stake - stake) * bonusPercentage / 100;
    }

    if (whattax && whattax > 0) {
      whtTaxamount = ((totaloddsvalue * stake) - stake + bonusamount) * whattax / 100;
    }
    const totalpotentialwiings = totaloddsvalue * stake + bonusamount - whtTaxamount;
    const displayValues = {
      stake: stake,
      bonus: bonusamount,
      payout: totalpotentialwiings,
      totalOdds: totaloddsvalue,
      whtTax: whtTaxamount
    };

    return {
      totaloddsvalue,
      bonusamount,
      totalpotentialwiings,
      displayValues
    };
  }, [betslipValues, stake, oddsthreshold, bonusPercentage]);

  const validateBetslip = useCallback(() => {
    if (betslipValues && betslipValues.length > 45) {
      setValidationError('You cannot add more selections. The maximum allowed selections is 45.');
      return false;
    }

    if (convertedStakeLimits && displayValues.payout > convertedStakeLimits.maxPayout) {
      const payoutValue = !isLoggedIn || shouldShowCurrencySymbol || selectedCurrency === 'USDT' ? convertedStakeLimits.maxPayout.toFixed(2) : convertedStakeLimits.maxPayout.toFixed(10);
      setValidationError(
        <div className="flex items-center justify-center gap-1.5 flex-wrap text-center">
          <span>Max payout limit reached</span>
          {shouldShowCurrencySymbol ? (
            <div className="flex items-center gap-1">
              <img
                src="/icons/currencies/dollarUsd.svg"
                alt="USD"
                className="h-3 w-3"
              />
              <span className="text-green-400 font-semibold">({payoutValue})</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <img
                src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                alt={selectedCurrency}
                className="h-4 w-4"
              />
              <span>({payoutValue})</span>
            </div>
          )}
          <span>You cannot add more selections.</span>
        </div>
      );
      return false;
    }

    if (convertedStakeLimits) {
      const decimalPlaces = shouldShowCurrencySymbol || selectedCurrency === 'USDT' ? 2 : 10;
      const normalizeValue = (value: number) => parseFloat(value.toFixed(decimalPlaces));

      const stakeNormalized = normalizeValue(stake);
      const minStakeNormalized = normalizeValue(convertedStakeLimits.minStake);
      const maxStakeNormalized = normalizeValue(convertedStakeLimits.maxStake);

      if (stakeNormalized < minStakeNormalized) {
        const minStakeValue = convertedStakeLimits.minStake.toFixed(decimalPlaces);
        setValidationError(
          <div className="flex items-center justify-center gap-1.5 flex-wrap text-center">
            Stake must be greater than or equal to {' '}
            {shouldShowCurrencySymbol ? (
              <div className='flex items-center gap-1'>
                <img
                  src="/icons/currencies/dollarUsd.svg"
                  alt="USD"
                  className="h-3 w-3"
                />
              </div>
            ) : (
              <div className='flex items-center gap-1'>
                <img
                  src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                  alt={selectedCurrency}
                  className="h-4 w-4"
                />
              </div>
            )}
            {minStakeValue}
          </div>
        );
        return false;
      }

      if (stakeNormalized > maxStakeNormalized) {
        const maxStakeValue = convertedStakeLimits.maxStake.toFixed(decimalPlaces);
        setValidationError(
          <div className="flex items-center justify-center gap-1.5 flex-wrap text-center">
            Stake must be lower than or equal to {' '}
            {shouldShowCurrencySymbol ? (
              <div className='flex items-center gap-1'>
                <img
                  src="/icons/currencies/dollarUsd.svg"
                  alt="USD"
                  className="h-3 w-3"
                />
              </div>
            ) : (
              <img
                src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                alt={selectedCurrency}
                className="h-4 w-4 mx-1"
              />
            )}
            {maxStakeValue}
          </div>
        );
        return false;
      }
    }

    setValidationError(null);
    return true;
  }, [betslipValues, displayValues.payout, stake, convertedStakeLimits, selectedCurrency, shouldShowCurrencySymbol]);

  useEffect(() => {
    validateBetslip();
  }, [validateBetslip]);

  useEffect(() => {
    if (convertedStakeLimits?.minStake) {
      setValidationError(null);
      setStake(convertedStakeLimits.minStake);
      if (onStakeChange) onStakeChange(convertedStakeLimits.minStake);
    }
  }, [convertedStakeLimits?.minStake, onStakeChange]);

  const handleStakeChange = (next: number) => {
    setStake(next);
    if (onStakeChange) onStakeChange(next);
  };

  const shouldShowQuickAdd = useMemo(() => {
    if (!isLoggedIn) return true;
    if (isLoggedIn && usdToggleEnabled) return true;
    if (isLoggedIn && !usdToggleEnabled) return false;
    return false;
  }, [isLoggedIn, usdToggleEnabled]);

  const isBetBlocked = useMemo(() => {
    if (!betslipValues || betslipValues.length === 0) return true;
    if (betslipValues.length > 45) return true;

    if (convertedStakeLimits && displayValues.payout > convertedStakeLimits.maxPayout) return true;

    if (convertedStakeLimits) {
      const decimalPlaces = shouldShowCurrencySymbol || selectedCurrency === 'USDT' ? 2 : 10;
      const normalizeValue = (value: number) => parseFloat(value.toFixed(decimalPlaces));

      const stakeNormalized = normalizeValue(stake);
      const minStakeNormalized = normalizeValue(convertedStakeLimits.minStake);
      const maxStakeNormalized = normalizeValue(convertedStakeLimits.maxStake);

      if (stake === 0 || stakeNormalized < minStakeNormalized || stakeNormalized > maxStakeNormalized) {
        return true;
      }
    }
    return false;
  }, [betslipValues, displayValues.payout, stake, convertedStakeLimits]);

  function formatZero(value: number | string): string {
    const num = Number(value);
    if (!Number.isFinite(num) || num === 0) {
      return '0.00';
    }
    return num.toString();
  }
  function truncateOdds(odds: number): string {
    if (odds === null || odds === undefined || isNaN(odds)) {
      return "0.00";
    }
    const truncated = Math.trunc(odds * 100) / 100;
    return truncated.toFixed(2);
  }


  return (
    <>
      <CouponSheet
        open={isCouponSheetOpen}
        onOpenChange={setIsCouponSheetOpen}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        appliedCouponId={appliedCouponId}
        coupons={availableCoupons}
      />

      <div className="bg-base-725 rounded-lg p-4 lg:-mx-4 lg:-mb-4 lg:mt-4 shadow-[0_-6px_12px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Switch
              checked={oddsChangeEnabled}
              onCheckedChange={setOddsChangeEnabled}
              aria-label="Odds Change"
            />
            <span className="text-xs font-regular body-txtColor-1 ml-2">Odds Change</span>
          </div>
          
          {/* Coupons Button - Only show when logged in */}
          {isLoggedIn && (
            <button
              onClick={() => availableCoupons.length > 0 && setIsCouponSheetOpen(true)}
              disabled={availableCoupons.length === 0}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-xs font-medium",
                availableCoupons.length === 0
                  ? "bg-base-900 border border-base-800 text-base-500 cursor-not-allowed opacity-50"
                  : appliedCoupon
                  ? "bg-primary-1/10 border border-primary-1/30 text-primary-1 hover:bg-primary-1/20"
                  : "bg-base-800 border border-base-700 body-txtColor-1 hover:bg-base-750"
              )}
            >
              {appliedCoupon ? (
                <>
                  <span className="font-semibold truncate max-w-[70px]">{appliedCoupon.code}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCoupon();
                    }}
                    className="ml-0.5 hover:opacity-70 transition-opacity"
                    aria-label="Remove coupon"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </>
              ) : (
                <span>Coupons</span>
              )}
            </button>
          )}
        </div>

        <div className="border-t border-base-600 my-4"></div>
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-base-300">Total Odds</span>
            <span className="text-sm font-medium text-secondary-light-1">
              {truncateOdds(displayValues.totalOdds)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-base-300">Total Stake</span>
            <div className="flex items-center gap-1">
              {shouldShowCurrencySymbol ? (
                <>
                  <img
                    src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                    alt={selectedCurrency}
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
                  src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                  alt={selectedCurrency}
                  className="w-4 h-4"
                />
              )}
              <span className="text-sm font-medium text-secondary-light-1">
                {shouldShowCurrencySymbol || selectedCurrency === 'USDT' ? displayValues.stake?.toFixed(2) : formatZero(displayValues.stake.toFixed(10))}
              </span>
            </div>
          </div>

          {(typeof bonusPercentage === 'number' && bonusPercentage > 0) && (
            <div className="flex justify-between text-sm">
              <span className="text-base-300">Bonus ({bonusPercentage}%)</span>
              <div className="flex items-center gap-1">
                {shouldShowCurrencySymbol ? (
                  <>
                    <img
                      src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                      alt={selectedCurrency}
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
                    src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                    alt={selectedCurrency}
                    className="w-4 h-4"
                  />
                )}
                <span className="text-sm font-medium text-secondary-light-1">
                  {displayValues.bonus !== 0 ? (shouldShowCurrencySymbol || selectedCurrency === 'USDT' || !isLoggedIn ? truncateOdds(displayValues.bonus) : formatZero(displayValues.bonus.toFixed(10))) : '0.00'}
                </span>
              </div>
            </div>
          )}

          {(typeof whattax === 'number' && whattax > 0) && (
            <div className="flex justify-between text-sm">
              <span className="text-base-300">WHT  ({whattax}%)</span>
              <div className="flex items-center gap-1">
                {shouldShowCurrencySymbol ? (
                  <>
                    <img
                      src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                      alt={selectedCurrency}
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
                    src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                    alt={selectedCurrency}
                    className="w-4 h-4"
                  />
                )}
                <span className="text-sm font-medium text-secondary-light-1">
                  {displayValues.whtTax !== 0 ? (shouldShowCurrencySymbol || selectedCurrency === 'USDT' ? displayValues.whtTax?.toFixed(2) : formatZero(displayValues.whtTax.toFixed(10))) : '0.00'}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-base-300">Est. Payout</span>
            <div className="flex items-center gap-1">
              {shouldShowCurrencySymbol ? (
                <>
                  <img
                    src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                    alt={selectedCurrency}
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
                  src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                  alt={selectedCurrency}
                  className="w-4 h-4"
                />
              )}
              <span className="text-sm font-medium text-secondary-light-1">
                {shouldShowCurrencySymbol || selectedCurrency === 'USDT' || !isLoggedIn ? truncateOdds(displayValues.payout) : formatZero(displayValues.payout.toFixed(10))}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <StakeControlCard
            value={stake || convertedStakeLimits?.minStake || 0}
            onChange={handleStakeChange}
            showQuickAdd={shouldShowQuickAdd}
            isLoggedIn={isLoggedIn}
            usdToggleEnabled={usdToggleEnabled}
            selectedCurrency={selectedCurrency}
          />
        </div>

        {validationError && (
          <div className="mb-2 text-xs text-red-400 px-2 bg-red-900/20 rounded border border-red-900/30 py-2 gap-2">
            {validationError}
          </div>
        )}
        <div className="flex gap-3">
          <button
            className="w-[38px] h-[38px] bg-base-640 rounded-lg flex items-center justify-center hover:bg-base-630 transition-colors"
            onClick={onClearBetslip}
            title="Clear betslip"
          >
            <img src="/icons/trash.svg" alt="trash" className="w-5 h-5" />
          </button>
          <button
            className={cn(
              "flex-1 h-[38px] rounded-lg text-sm font-medium transition-opacity flex items-center justify-center gap-2",
              !isLoggedIn && !placebetdisabled
                ? "bg-button-gradient btn-textColor hover:opacity-90"
                : isBetBlocked || isPlacingBet || placebetdisabled
                  ? "bg-base-600 text-base-400 cursor-not-allowed"
                  : "bg-button-gradient btn-textColor hover:opacity-90"
            )}
            disabled={(isLoggedIn && isBetBlocked) || placebetdisabled || isPlacingBet}
            onClick={!isLoggedIn ? () => openDialog(DIALOG_TYPE.login, { tab: 'login' }) : handlePlaceBet}
          >
            {isPlacingBet && (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            )}
            {!isLoggedIn ? 'Login to Place Bet' : isPlacingBet ? 'Placing Bet...' : 'Place bet'}
          </button>
        </div>
      </div>
    </>
  );
};

export default BetslipControlsCard;


