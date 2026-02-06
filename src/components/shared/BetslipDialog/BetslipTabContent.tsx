import { getBonusInfo } from 'helpers/bonus/bonus';
import BonusMessage from 'components/features/sports/BetslipSection/BonusMessage';
import { useEffect, useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import BetItemCard from 'components/features/sports/BetslipSection/BetItemCard';
import EmptyBetslipState from 'components/features/sports/BetslipSection/EmptyBetslipState';
import BetslipControlsCard from 'components/features/sports/BetslipSection/BetslipControlsCard';
import BetReceipt from 'components/features/sports/BetslipSection/BetReceipt';
import { useAppSelector } from '../../../store/index';
import { selectIsLoggedIn } from 'store/user/selectors';
import { selectWalletState } from 'store/wallet/selectors';
import { ConvertCurrenciesToUSD } from 'helpers/usdConversion';
import { selectCurrencyData } from 'store/currency/selectors';
import { placeBet, getChannel, calculateActualStake, getBetType, type PlaceBetRequest } from '../../../api/betting/placeBet';
import { getBetErrorMessage } from 'helpers/betErrorMessages';
import { useBetStatus } from '../../../hooks/useBetStatus';
import { getConversionRate } from 'helpers/usdConversion';
import { calculateBetValues } from 'helpers/betCalculations';
import { useBetConfig } from 'hooks/useBetConfig';

interface BetReceiptWithStatusProps {
  betReceipt: {
    ticketId: string;
    shortBetId: string;
    stake: number;
    totalOdds: number;
    potentialPayout: number;
    accessToken: string;
    selections: any[];
  };
  selectedCurrency?: string;
  usdToggleEnabled?: boolean;
  conversionData?: any;
  onClearBetslip: () => void;
}

const BetReceiptWithStatus = ({ betReceipt, selectedCurrency, usdToggleEnabled, conversionData, onClearBetslip }: BetReceiptWithStatusProps) => {
  const { status, message, shortBetId: statusShortBetId, details } = useBetStatus(betReceipt.ticketId, betReceipt.accessToken);
  const [hasReceivedBetHistory, setHasReceivedBetHistory] = useState(false);
  const displayShortBetId = statusShortBetId || betReceipt.shortBetId;
  let receiptStatus: 'pending' | 'success' | 'failed' = 'pending';
  if (status === 'success') receiptStatus = 'success';
  else if (status === 'rejected' || status === 'cancelled' || status === 'error') receiptStatus = 'failed';
  let displayData = {
    selections: betReceipt.selections,
    totalOdds: betReceipt.totalOdds,
    totalStake: betReceipt.stake,
    estimatedPayout: betReceipt.potentialPayout
  };
  useEffect(() => {
    if (details && !hasReceivedBetHistory) {
      setHasReceivedBetHistory(true);
    }
  }, [details, hasReceivedBetHistory]);

  if (details && hasReceivedBetHistory) {
    if (details.selections && Array.isArray(details.selections)) {
      displayData.selections = details.selections.map((sel: any) => ({
        id: sel.selectionId || sel.id,
        market: sel.marketName || sel.market,
        selection: sel.selectionName || sel.selection,
        odds: sel.odds || sel.decimalOdds,
        eventName: sel.eventName || sel.fixtureName,
        eventId: sel.eventId || sel.providerFixtureId
      }));
    }

    if (details.totalOdds) displayData.totalOdds = details.totalOdds;
    if (details.stake) displayData.totalStake = details.stake;
    if (details.potentialPayout) displayData.estimatedPayout = details.potentialPayout;
  }
  return (
    <div className="space-y-4">
      <BetReceipt
        betId={displayShortBetId}
        totalOdds={displayData.totalOdds}
        totalStake={displayData.totalStake}
        estimatedPayout={displayData.estimatedPayout}
        selections={displayData.selections}
        status={receiptStatus}
        message={message}
        selectedCurrency={selectedCurrency}
        usdToggleEnabled={usdToggleEnabled}
        conversionData={conversionData}
        onClearBetslip={onClearBetslip}
      />
    </div>
  );
};

const BetslipTabContent = () => {

  const [betSplipDataLocal, setBetSlipDataLocal] = useState<any[]>([]);
  const [prevUsdToggle, setPrevUsdToggle] = useState<boolean | null>(null);
  const [prevSelectedCurrency, setPrevSelectedCurrency] = useState<string | null>(null);
  const [betReceipt, setBetReceipt] = useState<{
    ticketId: string;
    shortBetId: string;
    stake: number;
    totalOdds: number;
    potentialPayout: number;
    accessToken: string;
    selections: any[];
  } | null>(null);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { usdToggleEnabled, selectedCurrency } = useAppSelector(selectWalletState);
  const conversionData = useAppSelector(selectCurrencyData);
  const { getBonusPercentage, getOddsThreshold, getWhattaxPercentages } = useBetConfig();
  const loadSlip = () => {
    const storedSlip = localStorage.getItem("betSlipData");
    setBetSlipDataLocal(storedSlip ? JSON.parse(storedSlip) : []);
  }
  useEffect(() => {
    loadSlip()
    function handleBetSlipUpdate() {
      const newSlipData = localStorage.getItem("betSlipData");
      const newParsedSlip = newSlipData ? JSON.parse(newSlipData) : [];
      if (betReceipt && newParsedSlip.length > 0) {

        setBetReceipt(null);
      }
      setBetSlipDataLocal(newParsedSlip);
    }

    window.addEventListener("betSlip_updated", handleBetSlipUpdate);
    return () => {
      window.removeEventListener("betSlip_updated", handleBetSlipUpdate);
    };
  }, [betReceipt])

  const [currentTab, setCurrentTab] = useState<'single' | 'multiple' | 'system'>('single');

  useEffect(() => {
    if (betSplipDataLocal.length === 1 && currentTab !== 'single') {
      setCurrentTab('single');
    } else if (betSplipDataLocal.length > 1 && currentTab !== 'multiple') {
      setCurrentTab('multiple');
    } else if (betSplipDataLocal.length === 0 && currentTab !== 'single') {
      setCurrentTab('single');
    }
  }, [betSplipDataLocal.length, currentTab]);

  // Detect currency toggle changes
  useEffect(() => {
    const currentCurrencyCode = selectedCurrency?.currencyCode || null;
    const currencyChanged = prevUsdToggle !== null && prevUsdToggle !== usdToggleEnabled;
    const selectedCurrencyChanged = prevSelectedCurrency !== null && prevSelectedCurrency !== currentCurrencyCode;

    if (currencyChanged || selectedCurrencyChanged) {

      if (typeof window !== 'undefined') {
        const event = new CustomEvent('currencyToggleChanged', {
          detail: {
            previousUsdToggle: prevUsdToggle,
            currentUsdToggle: usdToggleEnabled,
            previousCurrency: prevSelectedCurrency,
            currentCurrency: currentCurrencyCode,
            isLoggedIn: isLoggedIn,
            shouldResetStake: true
          }
        });
        window.dispatchEvent(event);
      }
    }

    setPrevUsdToggle(usdToggleEnabled);
    setPrevSelectedCurrency(currentCurrencyCode);
  }, [usdToggleEnabled, selectedCurrency?.currencyCode, isLoggedIn, prevUsdToggle, prevSelectedCurrency]);

  const removeFixtureFromLocalStorage = (eventId: number) => {
    const removeFixture = betSplipDataLocal?.filter((bet) => Number(bet?.providerFixtureId) !== eventId);
    setBetSlipDataLocal(removeFixture);
    localStorage.setItem("betSlipData", JSON.stringify(removeFixture));

    window.dispatchEvent(new Event("betSlip_removing_updated"));
  };

  const clearBetslip = () => {
    setBetSlipDataLocal([]);
    localStorage.removeItem("betSlipData");
    window.dispatchEvent(new Event("betSlip_removing_updated"));
  };

  const handlePlaceBet = async (stake: number, oddsChangeEnabled: boolean = true) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found. Please login again.');
      }

      const odds = betSplipDataLocal?.map(
        bet => Number(bet?.markets[0]?.selections[0]?.decimalOdds)
      ) || [];
      let conversionRate: number | undefined;
      if (usdToggleEnabled && conversionData && selectedCurrency) {
        conversionRate = getConversionRate(selectedCurrency.currencyCode, conversionData) || undefined;
      }
      const actualStake = calculateActualStake(stake, usdToggleEnabled, conversionRate,selectedCurrency?.currencyCode);
      const placeBetRequest: PlaceBetRequest = {
        accessToken,
        channel: getChannel(),
        currencyCode: selectedCurrency?.currencyCode || 'USDT',
        oddsChangeType: oddsChangeEnabled ? 'any' : 'none',
        selections: betSplipDataLocal.map(bet => ({
          odds: Number(bet.markets[0].selections[0].decimalOdds),
          selectionId: bet.markets[0].selections[0].selectionId,
          stake: actualStake
        })),
        betType: getBetType(betSplipDataLocal.length),
        stake: actualStake
      };
      const response = await placeBet(placeBetRequest);
      if (response.code === '1000' && response.result?.result) {
        const oddsthreshold = getOddsThreshold();
        const bonusPercentage = getBonusPercentage(odds.length, odds);
        const whattaxPercentages = getWhattaxPercentages();

        const { totalOdds, totalPayout } = calculateBetValues({
          stake,
          odds,
          bonusPercentage,
          oddsThreshold: oddsthreshold,
          whtTaxPercentage: whattaxPercentages.winningsTaxPercentage,
          // stakeLimits: convertedStakeLimits
        });
        let potentialPayoutValue = selectedCurrency?.currencyCode === 'USDT' ? Number(totalPayout.toFixed(2)) : totalPayout;
        setBetReceipt({
          ticketId: response.result.result.ticketId,
          shortBetId: response.result.result.shortBetId,
          stake,
          totalOdds,
          potentialPayout: potentialPayoutValue,
          accessToken,
          selections: betSplipDataLocal.map(bet => ({
            id: bet.markets[0].selections[0].selectionId,
            market: bet.markets[0].marketName,
            selection: bet.markets[0].selections[0].selectionName,
            odds: Number(bet.markets[0].selections[0].decimalOdds),
            eventName: bet.fixtureName,
            eventId: bet.providerFixtureId.toString()
          }))
        });
        clearBetslip();

        return { success: true };
      } else {
        const errorMessage = getBetErrorMessage(response.result?.message,  'Failed to place bet');
        return {
          success: false,
          error: errorMessage
        };
      }
    } catch (error) {
      console.error('Place bet error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to place bet'
      };
    }
  };

  const betconfig = JSON.parse(localStorage.getItem("betconfig") || '{}');

  const minstake = betconfig?.data?.minStake || 0;
  const maxstake = betconfig?.data?.maxStake || 0;
  const bonusConfig = betconfig?.data?.configs || [];
  const oddsthreshold = betconfig?.data?.oddsThreshold || 0;
  const maxPayout = betconfig?.data?.maxPayout || 0;
  const whtTax = betconfig?.data?.winningsTaxPercentage || 0;

  let bonusInfo = {
    bonusPercentage: 0,
    nextBonusPercentage: 0,
    nextItemCount: 0,
    progress: 0
  };
  if (betSplipDataLocal.length > 0) {
    bonusInfo = getBonusInfo(bonusConfig, betSplipDataLocal, oddsthreshold);
  }
  const convertedStakeLimits = useMemo(() => {
    let minStakeLimit = minstake;
    let maxStakeLimit = maxstake;
    let maxPayout = betconfig?.data?.maxPayout || 0;
    if (isLoggedIn && !usdToggleEnabled && conversionData && selectedCurrency) {
      const convertedMin = ConvertCurrenciesToUSD(
        selectedCurrency.currencyCode,
        conversionData,
        minstake
      );
      const convertedMax = ConvertCurrenciesToUSD(
        selectedCurrency.currencyCode,
        conversionData,
        maxstake
      );
      const convertedMaxpoay = ConvertCurrenciesToUSD(
        selectedCurrency.currencyCode,
        conversionData,
        betconfig?.data?.maxPayout || 0
      );
      minStakeLimit = convertedMin || minstake;
      maxStakeLimit = convertedMax || maxstake;
      maxPayout = convertedMaxpoay || maxPayout;
    }

    return {
      minStake: minStakeLimit,
      maxStake: maxStakeLimit,
      maxPayout: maxPayout
    };
  }, [isLoggedIn, usdToggleEnabled, conversionData, selectedCurrency, minstake, maxstake, maxPayout]);
  return (
    <>
      <div className="flex-1 flex flex-col gap-3">
        {betReceipt ? (
          <div className="space-y-4">
            <BetReceiptWithStatus
              betReceipt={betReceipt}
              selectedCurrency={selectedCurrency?.currencyCode}
              usdToggleEnabled={usdToggleEnabled}
              conversionData={conversionData}
              onClearBetslip={() => setBetReceipt(null)}
            />
          </div>
        ) : betSplipDataLocal.length > 0 ? (
          <>
            <Tabs
              value={currentTab}
              onValueChange={(val) =>
                setCurrentTab(val as 'single' | 'multiple' | 'system')
              }
            >
              <TabsList className="bg-base-700 rounded-lg border-none h-8">
                <TabsTrigger
                  value="single"
                  variant="filled"
                  disabled={betSplipDataLocal.length !== 1}
                >
                  Single
                </TabsTrigger>
                <TabsTrigger
                  value="multiple"
                  variant="filled"
                  disabled={betSplipDataLocal.length <= 1}
                >
                  Multiple
                </TabsTrigger>
              </TabsList>

              <TabsContent value={betSplipDataLocal.length <= 1 ? "single" : "multiple"}>
                {betSplipDataLocal.length > 0 && (
                  <BonusMessage
                    number={bonusInfo.nextItemCount}
                    progress={bonusInfo.progress}
                    bonusPercentage={bonusInfo.nextBonusPercentage}
                    betcount={betSplipDataLocal.length}
                  />
                )}

                {betSplipDataLocal.length === 1 ? (
                  <div key={betSplipDataLocal[0]?.providerFixtureId}>
                    <BetItemCard
                      marketName={betSplipDataLocal[0]?.markets[0]?.marketName}
                      selectionName={betSplipDataLocal[0]?.markets[0]?.selections[0]?.selectionName}
                      eventName={betSplipDataLocal[0]?.fixtureName}
                      odds={Number(betSplipDataLocal[0]?.markets[0]?.selections[0]?.decimalOdds)}
                      isLive={betSplipDataLocal[0]?.fixtureStatusName === 'Live' ? true : false}
                      sportId={betSplipDataLocal[0]?.sportId}
                      eventId={betSplipDataLocal[0]?.providerFixtureId}
                      isClosed={betSplipDataLocal[0]?.markets[0]?.selections[0]?.selectionSuspended}
                      onRemove={(eventId) => removeFixtureFromLocalStorage(eventId)}
                    />
                  </div>
                ) : (
                  <div className='space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-base-600 scrollbar-track-transparent'>
                    {betSplipDataLocal.map((bet,index) => (
                      <div key={bet?.providerFixtureId}>
                        <BetItemCard
                          marketName={bet?.markets[0]?.marketName}
                          selectionName={bet.markets[0]?.selections[0]?.selectionName}
                          eventName={bet?.fixtureName}
                          odds={Number(bet.markets[0]?.selections[0]?.decimalOdds)}
                          isLive={bet?.fixtureStatusName === 'Live' ? true : false}
                          sportId={bet?.sportId}
                          eventId={bet?.providerFixtureId}
                           isClosed={betSplipDataLocal[index]?.markets[0]?.selections[0]?.selectionSuspended}
                          onRemove={(eventId) => removeFixtureFromLocalStorage(eventId)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <EmptyBetslipState
            text=" Your betslip is empty. Click on odds to add a bet to the betslip"
          />
        )}
      </div>

      {/* {withControl ? (
        <div className="mt-4 md:mt-0">
          <BetslipControls
            stake={minstake}
            
            variant={currentTab === 'system' ? 'system' : 'standard'}
          />
        </div>
      ) : null} */}

      {betSplipDataLocal.length > 0 && !betReceipt ? (
        <div className="mt-4 md:mt-0">
          <BetslipControlsCard
            stake={minstake}
            onPlaceBet={handlePlaceBet}
            onClearBetslip={clearBetslip}
            betslipValues={betSplipDataLocal}
            oddsthreshold={oddsthreshold}
            bonusPercentage={bonusInfo.bonusPercentage}
            minstake={minstake}
            maxstake={maxstake}
            isLoggedIn={isLoggedIn}
            usdToggleEnabled={usdToggleEnabled}
            conversionData={conversionData}
            selectedCurrency={selectedCurrency?.currencyCode ?? ''}
            convertedStakeLimits={convertedStakeLimits}
            whattax={whtTax}
            placebetdisabled={betSplipDataLocal.some(bet => bet.markets[0]?.selections[0]?.selectionSuspended)}
          />
        </div>
      ) : null}
    </>
  );
};

export default BetslipTabContent;
