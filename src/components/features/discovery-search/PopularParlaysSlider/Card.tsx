import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from 'helpers/numbers';
import { Button } from 'components/shared/ui/Button';
import { AccumulatorSelection, ParlayConfig } from 'api/discoverySearchSports/discoverySearchSports.types';
import { getIcons } from 'helpers/common';
import { calculateActualStake, placeBet, type PlaceBetRequest } from 'api/betting/placeBet';
import {
  calculateBetValues,
  useValidation,
  useApiError,
  useBetStatusSignalR,
  useStakeInput,
  BetErrorDisplay,
  BetButton
} from 'components/shared/betting';
import { getCurrencyIconByCode } from '../../../../components/features/sports/BetslipSection/BetslipControlsCard';
import crown from '/icons/crown.svg?url';
import Icon from 'components/shared/Icon';
import { getConversionRate } from 'helpers/usdConversion';
import { selectCurrencyData } from 'store/currency/selectors';
import { useAppSelector } from 'store/index';
import { getBetErrorMessage } from 'helpers/betErrorMessages';

type Screen = 'front' | 'back' | 'success' | 'failed';

interface CardProps extends ParlayConfig {
  isLoggedIn?: boolean;
  usdToggleEnabled?: boolean;
  selectedCurrency?: string;
  convertedStakeLimits?: {
    minStake: number;
    maxStake: number;
    maxPayout: number;
  };
  bonusPercentage?: number;
  oddsthreshold?: number;
  whattax?: number;
}

const Details = ({ data }: { data: AccumulatorSelection }) => {
  return (
      <div className="flex items-center py-3 last:border-none">
        <span className={`${getIcons("leagueName", data?.leagueName, "SB-img__md")} mr-2`} />
        <div className='w-full'>
          <div className='flex justify-between'>
            <span className="body-txtColor-1 font-medium text-sm">
              {data?.outComeName}
            </span>
            <span className="text-base-400 text-xs">{data?.marketName}</span>
          </div>
          <div>
            <Link to={`/sports/event/${data?.eventId}`} className="text-base-400 text-xs hover:body-txtColor-1 ">{data?.eventName}</Link>
          </div>
        </div>
      </div>
  );
};

const Card = ({
  accumulatorSelections,
  isLoggedIn = false,
  usdToggleEnabled = false,
  selectedCurrency,
  convertedStakeLimits,
  bonusPercentage = 0,
  oddsthreshold = 0,
  whattax = 0
}: CardProps) => {
  const getChannel = (): 'Mobile' | 'Internet' => 'Internet';
  const getBetType = (selectionCount: number): 'single' | 'multi' => selectionCount > 1 ? 'multi' : 'single';
  const conversionData = useAppSelector(selectCurrencyData);
  const [screen, setScreen] = useState<Screen>('front');
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const shouldShowCurrencySymbol = !isLoggedIn || (isLoggedIn && usdToggleEnabled);
  const prevScreenRef = useRef<Screen>('front');
  const prevMinStakeRef = useRef<number | undefined>(undefined);

  const { apiError, setApiError, clearApiError } = useApiError();
  const { validationError, validateStake, clearValidationError } = useValidation({
    stakeLimits: convertedStakeLimits,
    shouldShowCurrencySymbol,
    currency: selectedCurrency
  });
  const { betStatus, statusMessage, startMonitoring, reset } = useBetStatusSignalR();
  const {
    stake,
    inputValue,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleInputBlur,
    handleQuickStake,
    resetStake
  } = useStakeInput({
    shouldShowCurrencySymbol,
    onErrorsClear: clearApiError
  });

  const odds = accumulatorSelections?.map(selection => Number(selection.odds)) || [];
  const betCalculation = useMemo(() => calculateBetValues({
    stake,
    odds,
    bonusPercentage,
    oddsThreshold: oddsthreshold,
    whtTaxPercentage: whattax,
    stakeLimits: convertedStakeLimits
  }), [stake, odds, bonusPercentage, oddsthreshold, whattax, convertedStakeLimits]);

  const { totalOdds, bonusAmount,  totalPayout, isValidBet } = betCalculation;
  const frontScreenPayout = useMemo(() => {
    const minStake = convertedStakeLimits?.minStake || 0;
    if (minStake === 0 || totalOdds === 0) return 0;
    const truncatedOdds = Math.floor(totalOdds * 100) / 100;
    let basicPayout = (minStake * truncatedOdds) - minStake;
    let bonusAmount = 0;
    if (bonusPercentage > 0) {
      const bonusOdds = odds.filter(odd => odd > oddsthreshold);
      const bonusOddsProduct = bonusOdds.reduce((acc, val) => acc * val, 1);
      const truncatedOddsbonus = Math.floor(bonusOddsProduct * 100) / 100;
      bonusAmount = (truncatedOddsbonus * minStake - minStake) * bonusPercentage / 100;
    }
    const payoutWithBonus = basicPayout + bonusAmount;
    const whtTaxAmount = (whattax / 100) * payoutWithBonus;
    const finalPayout = payoutWithBonus - whtTaxAmount + minStake;
    return finalPayout;
  }, [convertedStakeLimits?.minStake, totalOdds, bonusPercentage, whattax]);

  useEffect(() => {
    validateStake(stake, totalPayout, apiError);
  }, [stake, totalPayout, apiError, validateStake]);

  useEffect(() => {
    const isTransitionToBack = screen === 'back' && prevScreenRef.current !== 'back';
    const isMinStakeChanged = screen === 'back' && convertedStakeLimits?.minStake !== prevMinStakeRef.current;
    
    if ((isTransitionToBack || isMinStakeChanged) && convertedStakeLimits?.minStake) {
      clearValidationError();
      handleInputChange(convertedStakeLimits.minStake.toString());
    }
    
    prevScreenRef.current = screen;
    prevMinStakeRef.current = convertedStakeLimits?.minStake;
  }, [screen, convertedStakeLimits?.minStake, handleInputChange, clearValidationError]);

  const handlePlaceBet = async () => {
    if (!isLoggedIn || !isValidBet || !accumulatorSelections) {
      setApiError('Invalid bet parameters');
      return;
    }
       let conversionRate: number | undefined;
        if (usdToggleEnabled && conversionData && selectedCurrency) {
          conversionRate = getConversionRate(selectedCurrency, conversionData) || undefined;
        }
        const actualStake = calculateActualStake(stake, usdToggleEnabled, conversionRate, selectedCurrency);
    clearApiError();
    try {
      setIsPlacingBet(true);
      const selections = accumulatorSelections.map(selection => ({
        odds: selection.odds,
        selectionId: selection.outComeId || '',
        stake: actualStake
      }));

      const betRequest: PlaceBetRequest = {
        accessToken: localStorage.getItem('accessToken') || '',
        channel: getChannel(),
        currencyCode: selectedCurrency || 'USD',
        oddsChangeType: 'any',
        selections,
        betType: getBetType(selections.length),
        stake: actualStake
      };

      const result = await placeBet(betRequest);
      if (result.code === '1000') {
        const ticketId = result.result?.result?.ticketId;
        if (ticketId) {
          startMonitoring(ticketId);
          setScreen('success');
        } else {
          setScreen('success');
        }
      } else {
         const errorMessage = getBetErrorMessage(result.result?.message,  'Failed to place bet');
        setApiError(errorMessage);
        if (screen !== 'back') {
          setScreen('back');
        }
      }
    } catch (error) {
      const errorMessage = getBetErrorMessage(error instanceof Error ? error.message : undefined, 'Failed to place bet');
      setApiError(errorMessage);
      if (screen !== 'back') {
        setScreen('back');
      }
    } finally {
      setIsPlacingBet(false);
    }
  };

  useEffect(() => {
    if (betStatus === 'success' || betStatus === 'failed') {
      setScreen(betStatus);
    }
  }, [betStatus]);

  const formatValue = (value: number): string => {
    if (!shouldShowCurrencySymbol && selectedCurrency !== 'USDT') {
      return value.toFixed(10);
    }
    return value.toFixed(2);
  };

  const isFlippable = screen === 'front' || screen === 'back';
  const isFlipped = screen === 'back';

  return (
    <div className="w-[326px] h-[280px] md:w-[384px] relative flip-container">
      {isFlippable && (
        <div className={`flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
          {/* FRONT SCREEN FACE */}
          <div className="flip-face flip-front">
            <div className="p-4 w-full h-full flex flex-col bg-base-735 rounded-[12px]">
              <div className="flex items-center justify-between mb-4">
                <div className="px-2 h-5 flex items-center rounded-full text-base-900 background-1 text-xs font-semibold">
                  {accumulatorSelections?.length}-Bet Parlay
                </div>
                <span className="text-secondary-light-2 text-sm font-medium">{totalOdds?.toFixed(2)}</span>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-600 scrollbar-track-transparent touch-action-pan-y will-change-transform">
                <div className="*:border-b *:border-b-[var(--borderdefault-1)]">
                  {accumulatorSelections?.map((selection) => {
                    return <Details key={selection.outComeId} data={selection} />;
                  })}
                </div>
              </div>
              <div className="flex justify-between items-center gap-3 pt-3 mt-auto">
                <div className="flex items-center gap-1 text-xs flex-wrap">
                  <img
                    src={shouldShowCurrencySymbol && isLoggedIn ? '/icons/currencies/dollarUsd.svg' : (getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg')}
                    alt={shouldShowCurrencySymbol && isLoggedIn ? 'USD' : selectedCurrency}
                    className="w-3 h-3"
                  />
                  <span>{formatValue(convertedStakeLimits?.minStake || 0)}</span>
                  <span>pays:</span>
                  <img
                    src={shouldShowCurrencySymbol && isLoggedIn ? '/icons/currencies/dollarUsd.svg' : (getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg')}
                    alt={shouldShowCurrencySymbol && isLoggedIn ? 'USD' : selectedCurrency}
                    className="w-3 h-3"
                  />
                  <span className="font-medium text-secondary-light-1">{formatValue(frontScreenPayout)}</span>
                </div>
                <Button onClick={() => setScreen('back')} className="shrink-0">Bet now</Button>
              </div>
            </div>
          </div>

          {/* BACK SCREEN FACE */}
          <div className="flip-face flip-back">
            <div className="p-4 w-full h-full flex flex-col bg-base-735 rounded-[12px]">
              <div className="flex items-center justify-between mb-4">
                <div className="px-2 h-5 flex items-center rounded-full text-base-900 background-1 text-xs font-semibold">
                  Betting Form
                </div>
                <span className="text-secondary-light-2 text-sm font-medium">{totalOdds?.toFixed(2)}</span>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-600 scrollbar-track-transparent touch-action-pan-y will-change-transform">
                <div className="flex flex-col">
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-base-300">Total Odds</span>
                      <span className="text-sm font-medium text-secondary-light-1">
                        {totalOdds.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-base-300">Total Stake</span>
                      <div className="flex items-center gap-1">
                        <img
                          src={shouldShowCurrencySymbol && isLoggedIn ? '/icons/currencies/dollarUsd.svg' : (getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg')}
                          alt={shouldShowCurrencySymbol && isLoggedIn ? 'USD' : selectedCurrency}
                          className="w-3 h-3"
                        />
                        <span className="text-sm font-medium text-secondary-light-1">
                          {formatValue(stake)}
                        </span>
                      </div>
                    </div>
                    {bonusPercentage > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-base-300">{bonusPercentage}% Bonus</span>
                        <div className="flex items-center gap-1">
                          <img
                            src={shouldShowCurrencySymbol && isLoggedIn ? '/icons/currencies/dollarUsd.svg' : (getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg')}
                            alt={shouldShowCurrencySymbol && isLoggedIn ? 'USD' : selectedCurrency}
                            className="w-3 h-3"
                          />
                          <span className="text-sm font-medium text-secondary-light-1">
                            {formatValue(bonusAmount)}
                          </span>
                        </div>
                      </div>
                    )}
                    {whattax > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-base-300">WHT ({whattax}%)</span>
                        <div className="flex items-center gap-1">
                          <img
                            src={shouldShowCurrencySymbol && isLoggedIn ? '/icons/currencies/dollarUsd.svg' : (getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg')}
                            alt={shouldShowCurrencySymbol && isLoggedIn ? 'USD' : selectedCurrency}
                            className="w-3 h-3"
                          />
                          <span className="text-sm font-medium text-secondary-light-1">
                            {formatValue(stake)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-base-300">Est. Payout</span>
                      <div className="flex items-center gap-1">
                        <img
                          src={shouldShowCurrencySymbol && isLoggedIn ? '/icons/currencies/dollarUsd.svg' : (getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg')}
                          alt={shouldShowCurrencySymbol && isLoggedIn ? 'USD' : selectedCurrency}
                          className="w-3 h-3"
                        />
                        <span className="text-sm font-medium text-secondary-light-1">
                          {formatValue(totalPayout)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <BetErrorDisplay apiError={apiError} validationError={validationError} />

                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      {shouldShowCurrencySymbol && [25, 50, 75, 100].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => handleQuickStake(v)}
                          className="bg-transparent text-special-2 text-xs rounded hover:text-white"
                        >
                          +{v}
                        </button>
                      ))}
                      <div className="flex w-full items-center gap-2 rounded-lg p-0.5 h-7 bg-base-700">
                        {shouldShowCurrencySymbol && (
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium focus-visible:outline-none disabled:pointer-events-none bg-white text-base-900 h-full w-auto aspect-square p-0 text-xl hover:bg-base-200 transition-colors"
                            type="button"
                            onClick={() => handleDecrement()}
                            disabled={stake <= 0}
                          >
                            -
                          </button>
                        )}
                        <input
                          type="text"
                          inputMode={shouldShowCurrencySymbol ? "numeric" : "decimal"}
                          className="h-full bg-transparent text-white text-center outline-none border-0 flex-1 text-xs font-medium w-16"
                          value={inputValue}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onBlur={handleInputBlur}
                        />
                        {shouldShowCurrencySymbol && (
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium focus-visible:outline-none disabled:pointer-events-none bg-white text-base-900 h-full w-auto aspect-square p-0 text-xl hover:bg-base-200 transition-colors"
                            type="button"
                            onClick={() => handleIncrement()}
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className='px-4 h-[38px] flex-1'
                      variant='outline'
                      onClick={() => setScreen('front')}
                    >
                      Back
                    </Button>
                    <BetButton
                      isLoggedIn={isLoggedIn}
                      isValidBet={isValidBet}
                      isPlacing={isPlacingBet}
                      onClick={handlePlaceBet}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* SUCCESS SCREEN */}
      {screen === 'success' && (
        <div className="absolute inset-0 p-8 w-full h-full flex flex-col bg-base-735 rounded-[12px] items-center text-center">
          <div className="relative w-[220px] h-[80px] mx-auto flex items-center justify-center mb-4">
            <img
              src="/images/success-gif.gif"
              alt="success"
              className="z-10 absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <Icon
                id="copyIcon"
                href={crown}
                className="w-10 h-10 fill-current text-primary-1"
              />
            </div>
          </div>

          <h2 className="text-white text-lg font-semibold">
            Bet Placed Successfully!
          </h2>
          <p className='text-base-400 text-sm mb-3'>Track your bet in the <span className='text-primary-1'>My Bets</span></p>

          {betStatus === 'pending' && (
            <div className="flex flex-col items-center gap-1 p-3 bg-base-725 rounded-lg border border-base-700 mb-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  className="w-6 h-6 fill-yellow-400"
                  viewBox="0 0 50 50"
                >
                  <path
                    d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068
                      c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 25 25"
                      to="360 25 25"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold text-white">Waiting</p>
                <p className="text-xs text-base-400">{statusMessage || 'Processing your bet'}</p>
              </div>
            </div>
          )}

          <Button
            className='w-full'
            variant='outline'
            size="default"
            onClick={() => {
              setScreen('front');
              resetStake();
              reset();
            }}
          >
            Close
          </Button>
        </div>
      )}

      {/* FAILED SCREEN */}
      {screen === 'failed' && (
        <div className="absolute inset-0 p-8 w-full h-full flex flex-col bg-base-735 rounded-[12px] items-center text-center">
          <div className="relative w-[220px] h-[80px] mx-auto flex items-center justify-center mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full animate-pulse" />
            <div className="relative z-20 w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg width={40} height={40} viewBox="0 0 24 24" fill="none" className="text-red-400">
                <path d="M15 9l-6 6m0-6l6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <h2 className="text-white text-lg font-semibold mb-1">
            Bet Failed
          </h2>
          {(betStatus === 'failed' || betStatus === 'rejected') && (
            <div className="flex flex-col items-center gap-1 p-3 bg-base-725 rounded-lg border border-base-700 mb-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <svg className="w-4 h-4 fill-red-500">
                  <use href="/sprite-other-icons.svg#icon-close"></use>
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold text-white">Failed</p>
                <p className="text-xs text-base-400">{statusMessage || 'Bet placement failed'}</p>
              </div>
            </div>
          )}

          {!betStatus && (
            <p className="text-sm text-red-300 mb-6">
              {typeof validationError === 'string' ? validationError : 'Something went wrong. Please try again.'}
            </p>
          )}

          <div className="flex gap-2 w-full">
            <Button
              className='flex-1'
              variant='outline'
              size="default"
              onClick={() => {
                setScreen('back');
                reset();
              }}
            >
              Try Again
            </Button>
            <Button
              className='flex-1'
              variant='outline'
              size="default"
              onClick={() => {
                setScreen('front');
                resetStake();
                reset();
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
