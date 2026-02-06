// import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { Button } from 'components/shared/ui/Button';
import { HotMultiItem } from 'api/SportsHomePage/sportsHomePage.types';
import { calculateActualStake, placeBet, type PlaceBetRequest } from 'api/betting/placeBet';
import { getCurrencyIconByCode } from '../../BetslipSection/BetslipControlsCard';
import {
  calculateBetValues,
  useValidation,
  useApiError,
  useBetStatusSignalR,
  useStakeInput,
  BetErrorDisplay,
  BetButton
} from 'components/shared/betting';
import { getIcons } from 'helpers/common';
import Icon from 'components/shared/Icon';
import crown from '/icons/crown.svg?url';
import { selectCurrencyData } from 'store/currency/selectors';
import { useAppSelector } from 'store/index';
import { getConversionRate } from 'helpers/usdConversion';
import { Link } from 'react-router-dom';
import { getBetErrorMessage } from 'helpers/betErrorMessages';


type Screen = 'front' | 'back' | 'success' | 'failed';

interface MultiCardProps extends HotMultiItem {
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

const MultiCard = ({
  accumulatorSelections,
  isLoggedIn = false,
  usdToggleEnabled = false,
  selectedCurrency,
  convertedStakeLimits,
  bonusPercentage = 0,
  oddsthreshold = 0,
  whattax = 0
}: MultiCardProps) => {
  const getChannel = (): 'Mobile' | 'Internet' => 'Internet';
  const getBetType = (selectionCount: number): 'single' | 'multi' => selectionCount > 1 ? 'multi' : 'single';
  const conversionData = useAppSelector(selectCurrencyData);
  const [screen, setScreen] = useState<Screen>('front');
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const shouldShowCurrencySymbol = !isLoggedIn || (isLoggedIn && usdToggleEnabled);
  const { apiError, setApiError, clearApiError } = useApiError();
  const { validationError, validateStake, clearValidationError } = useValidation({
    stakeLimits: convertedStakeLimits,
    shouldShowCurrencySymbol,
    currency: selectedCurrency
  });
  const { betStatus, statusMessage, startMonitoring, reset } = useBetStatusSignalR();
  const { stake, inputValue, handleIncrement, handleDecrement, handleInputChange, handleInputBlur, handleQuickStake, resetStake } = useStakeInput({
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

  const { totalOdds, bonusAmount, whtTaxAmount, totalPayout, isValidBet } = betCalculation;
  useEffect(() => {
    validateStake(stake, totalPayout, apiError);
  }, [stake, totalPayout, apiError, validateStake]);



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
        accessToken: '',
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
      setApiError(error instanceof Error ? error.message : 'Failed to place bet');
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

  useEffect(() => {
    if (screen === 'back' && convertedStakeLimits?.minStake) {
      clearValidationError();
      handleInputChange(convertedStakeLimits.minStake.toString());
    }
  }, [screen, convertedStakeLimits?.minStake, handleInputChange, clearValidationError]);

  return (
    <div className="w-[326px] h-[280px] md:w-[384px] relative flip-container">
      {isFlippable && (
        <div className={`flip-inner ${isFlipped ? 'is-flipped' : ''}`}>

          {/* FRONT SCREEN FACE */}
          <div className="flip-face flip-front">
            <div className="p-4 w-full h-full flex flex-col bg-base-750 rounded-[12px]">
              {/* Header with Total Odds and Add Button */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-row items-baseline gap-2">
                  <span className="body-txtColor-1 text-sm font-medium">Total Odds:</span>
                  <span className="text-secondary-light-3 text-sm font-medium">
                    {totalOdds.toFixed(2)}
                  </span>
                </div>
                <Button className='btn-textColor'
                  onClick={() => {
                    setScreen('back');
                  }}
                >
                  Add selection
                </Button>
              </div>

              {/* Selections */}
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-600 scrollbar-track-transparent">
                <div className="flex flex-col gap-3">
                  {accumulatorSelections?.map((selection, index) => {
                    const EventName = selection?.translations?.eventName
                      ? selection.translations.eventName.split(' v ')
                      : ['', ''];

                    return (
                      <div key={index} className="flex flex-col gap-2">
                        {/* Bet Type */}
                        <span className="body-txtColor-1 text-sm font-medium">
                          {selection?.marketName}
                        </span>

                        {/* Match Info */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 text-base-400 text-sm [&_span]:text-base-400 min-w-0 flex-1">
                            <div className={getIcons('homeName', EventName[0] || '', "w-4 h-4")} style={{ width: '22px', height: '22px', minWidth: '22px', minHeight: '22px' }} />
                            <span className="text-xs truncate min-w-0">{EventName[0]}</span>
                            <span className="shrink-0">-</span>
                            <div className={getIcons('awayName', EventName[1] || '', "w-4 h-4")} style={{ width: '22px', height: '22px', minWidth: '22px', minHeight: '22px' }} />
                            <span className="text-xs truncate min-w-0">{EventName[1]}</span>
                          </div>

                          <span className="body-txtColor-1 text-sm font-bold shrink-0">
                            {Number(selection.odds).toFixed(2)}
                          </span>
                        </div>

                        {/* Divider line (except for last item) */}
                        {index < accumulatorSelections.length - 1 && (
                          <div className="border-t border-base-600 mt-2" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>


          {/* BACK SCREEN FACE */}
          <div className="flip-face flip-back">
            <div className="p-4 w-full h-full flex flex-col bg-base-750 rounded-[12px]">
              {/* Header with Total Odds */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-row items-baseline gap-2">
                  <span className="body-txtColor-1 text-sm font-medium">Total Odds:</span>
                  <span className="text-secondary-light-3 text-sm font-medium">
                    {totalOdds.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Stake / payout / actions */}
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-600 scrollbar-track-transparent">
                <div className="flex flex-col">
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm test">
                      <span className="text-base-300">Total Odds</span>
                      <span className="text-sm font-medium text-secondary-light-1">
                        {totalOdds.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-base-300">Total Stake</span>
                      <div className="flex items-center gap-1">
                        {shouldShowCurrencySymbol && isLoggedIn ? (
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
                          {formatValue(stake)}
                        </span>
                      </div>
                    </div>
                    {bonusPercentage > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-base-300">{bonusPercentage}% Bonus</span>
                        <div className="flex items-center gap-1">
                          {shouldShowCurrencySymbol && isLoggedIn ? (
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
                            src={getCurrencyIconByCode(selectedCurrency ?? '') || '/icons/currencies/dollarUsd.svg'}
                            alt={selectedCurrency}
                            className="w-4 h-4 mr-1"
                          />
                          <span className="text-sm font-medium text-secondary-light-1">
                            {shouldShowCurrencySymbol ? '$' : ''}{formatValue(whtTaxAmount)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-base-300">Est. Payout</span>
                      <div className="flex items-center gap-1">
                        {shouldShowCurrencySymbol && isLoggedIn ? (
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
                          className="bg-transparent text-special-2 text-xs rounded hover:body-txtColor-1"
                        >
                          +{v}
                        </button>
                      ))}
                      <div className="flex w-full items-center gap-2 rounded-lg p-0.5 h-7 bg-base-700">
                        {shouldShowCurrencySymbol && (
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium focus-visible:outline-none disabled:pointer-events-none background-1 text-base-900 h-full w-auto aspect-square p-0 text-xl hover:bg-base-200 transition-colors"
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
                          className="h-full bg-transparent body-txtColor-1 text-center outline-none border-0 flex-1 text-xs font-medium w-16"
                          value={inputValue}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onBlur={handleInputBlur}
                        />
                        {shouldShowCurrencySymbol && (
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium focus-visible:outline-none disabled:pointer-events-none background-1 text-base-900 h-full w-auto aspect-square p-0 text-xl hover:bg-base-200 transition-colors"
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

      {/* SUCCESS SCREEN (Outside the flip container, remains visible when isFlippable is false) */}
      {screen === 'success' && (
        <div className="absolute inset-0 p-8 w-full h-full flex flex-col bg-base-750 rounded-[12px] items-center text-center">
          <div className="relative w-[220px] h-[80px] mx-auto flex items-center justify-center mb-4">
            <img
              src="/images/success-gif.gif"
              alt="success"
              className="z-10 absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 w-20 h-20 rounded-full bg-background-1/20 flex items-center justify-center">
              {/* <img src="/icons/crown.svg" alt="Success" width={40} height={40} /> */}
              <Icon
                id="crownIcon"
                href={crown}
                className="w-10 h-10 fill-current text-primary-1"
              />
            </div>
          </div>

          <h2 className="body-txtColor-1 text-lg font-semibold">
            Bet Placed Successfully!
          </h2>
          <p className='text-base-400 text-sm mb-3'>Track your bet in the <Link to='/transactions?category=bets' className='text-primary-1'>My Bets</Link></p>

          {/* SignalR Status */}
          {/* {betStatus === 'success' && (
            <div className="flex flex-col items-center gap-1 p-3 bg-base-725 rounded-lg border border-base-700 mb-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg className="w-5 h-5 fill-green-500">
                  <use href="/sprite-other-icons.svg#icon-check"></use>
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs font-semibold body-txtColor-1">Accepted</p>
                <p className="text-xs text-base-400">{statusMessage || 'Bet accepted successfully'}</p>
              </div>
            </div>
          )} */}

          {/* {betStatus === 'pending' && (
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
                <p className="text-xs font-semibold body-txtColor-1">Waiting</p>
                <p className="text-xs text-base-400">{statusMessage || 'Processing your bet'}</p>
              </div>
            </div>
          )} */}

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
        <div className="absolute inset-0 p-8 w-full h-full flex flex-col bg-base-750 rounded-[12px] items-center text-center">
          <div className="relative w-[220px] h-[80px] mx-auto flex items-center justify-center mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full animate-pulse" />
            <div className="relative z-20 w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg width={40} height={40} viewBox="0 0 24 24" fill="none" className="text-red-400">
                <path d="M15 9l-6 6m0-6l6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <h2 className="body-txtColor-1 text-lg font-semibold mb-1">
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
                <p className="text-xs font-semibold body-txtColor-1">Failed</p>
                <p className="text-xs text-base-400">{statusMessage || 'Bet placement failed'}</p>
              </div>
            </div>
          )}

          <BetErrorDisplay apiError={apiError} validationError={validationError} />

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

export default MultiCard;