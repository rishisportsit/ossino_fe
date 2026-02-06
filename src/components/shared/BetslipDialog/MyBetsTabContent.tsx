import { useEffect, useState, useRef, useCallback } from 'react';
import BetAccordion from 'components/features/sports/BetslipSection/BetAccordion';
import BetFilters from 'components/features/sports/BetslipSection/BetFilters';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '../ui/Tabs';
import { STORAGE_KEYS } from 'constants/storage';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getBetHistoryInSportsBook, getCashoutApi, setBetHistoryInSportsBook } from 'store/SportsHomePage/slice';
import { selectBetHistoryInSportsBook, selectCashoutApi } from 'store/SportsHomePage/selectors';
import { selectCurrencyData } from 'store/currency/selectors';
import { selectWalletState } from 'store/wallet/selectors';
import { cn } from 'helpers/ui';
import styles from '../../features/sports/MatchesSection/LeagueAccordion/LeagueAccordion.module.css';
import { selectIsLoggedIn } from 'store/user/selectors';
import { getChannelType, getDateRange } from 'helpers/common';
import EmptyBetslipState from 'components/features/sports/BetslipSection/EmptyBetslipState';

interface BetHistoryItem {
  tId?: number;
  shortBetId?: string;
  cashoutStatus?: string;
}

const MyBetsTabContent = () => {
  const [currentTab, setCurrentTab] = useState<'open' | 'history'>('open');
  const [showOnlyCashout, setShowOnlyCashout] = useState(false);
  const [expandedBets, setExpandedBets] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loadMoreCount, setLoadMoreCount] = useState({ openBets: 10, betHistory: 10, });
  const [betHistoryDateRange, setBetHistoryDateRange] = useState(() => getDateRange('Today'));
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Today');
  const abortControllerRef = useRef<AbortController | null>(null);
  const [activeCashoutBetIds, setActiveCashoutBetIds] = useState<Set<number>>(new Set());
  const [loadingCashoutBetIds, setLoadingCashoutBetIds] = useState<Set<number>>(new Set());

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const channelType = getChannelType();

  const copyBetId = (betId: string) => {
    navigator.clipboard.writeText(betId);
  };

  const toggleBet = (betId: string) => {
    setExpandedBets((prev) => ({
      ...prev,
      [betId]: !prev[betId],
    }));
  };

  const cashOutResponse = useAppSelector(selectCashoutApi);
  const originalBetHistory = useAppSelector(selectBetHistoryInSportsBook);

  const openBetsHistory = originalBetHistory?.filter((bet: BetHistoryItem) => {
    if (bet?.cashoutStatus?.toLowerCase() !== "available") return false;
    if (showOnlyCashout) return bet?.cashoutStatus?.toLowerCase() === "available";
    return true;
  })?.slice(0, loadMoreCount.openBets);

  const showNoCashoutBets = showOnlyCashout && (!openBetsHistory || openBetsHistory.length === 0);
  const betHistoryFiltered = originalBetHistory?.filter((bet: BetHistoryItem) => {
    const searchFilter = searchQuery ? bet?.shortBetId?.toLowerCase().includes(searchQuery?.toLowerCase()) : true;
    return searchFilter;
  })?.slice(0, loadMoreCount.betHistory);
  const betHistoryLoading = useAppSelector((state) => state.sportsBook?.data?.betHistoryInSportsBook?.loading);

  const openBetsOriginalLength = originalBetHistory?.filter((bet: BetHistoryItem) => {
    if (bet?.cashoutStatus?.toLowerCase() !== "available") return false;
    if (showOnlyCashout) return bet?.cashoutStatus?.toLowerCase() === "available";
    return true;
  })?.length ?? 0;
  const betHistoryOriginalLength = originalBetHistory?.filter((bet: BetHistoryItem) => {
    const searchFilter = searchQuery ? bet?.shortBetId?.toLowerCase().includes(searchQuery?.toLowerCase()) : true;
    return searchFilter;
  })?.length ?? 0;

  const hasMoreMatches = currentTab === 'open'
    ? openBetsOriginalLength > loadMoreCount.openBets
    : betHistoryOriginalLength > loadMoreCount.betHistory;

  useEffect(() => {
    setExpandedBets({});
  }, [showOnlyCashout, searchQuery, selectedTimeFilter]);

  useEffect(() => {
    if (currentTab === 'open' && openBetsHistory && openBetsHistory.length > 0) {
      const firstBetId = openBetsHistory[0]?.tId;
      if (firstBetId && expandedBets[firstBetId] === undefined) {
        setExpandedBets((prev) => ({ ...prev, [firstBetId]: true }));
      }
    } else if (currentTab === 'history' && betHistoryFiltered && betHistoryFiltered.length > 0) {
      const firstBetId = betHistoryFiltered[0]?.tId;
      if (firstBetId && expandedBets[firstBetId] === undefined) {
        setExpandedBets((prev) => ({ ...prev, [firstBetId]: true }));
      }
    }
  }, [currentTab, openBetsHistory, betHistoryFiltered]);

  const accessToken = localStorage.getItem(STORAGE_KEYS?.accessToken) || '';
  const dispatch = useAppDispatch();
  const xClientId = import.meta.env.VITE_X_Client_Id;

  const debouncedFetchBetHistory = useCallback(
    (tab: 'open' | 'history') => {
      if (!isLoggedIn) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      dispatch(
        getBetHistoryInSportsBook({
          'X-Client-Id': xClientId,
          accessToken,
          channel: channelType,
          settled: tab === 'open' ? false : true,
          fromDate: tab === 'history' ? betHistoryDateRange?.fromDate : undefined,
          toDate: tab === 'history' ? betHistoryDateRange?.toDate : undefined,
          signal: abortControllerRef.current.signal,
        })
      );
    },
    [dispatch, xClientId, accessToken, isLoggedIn, betHistoryDateRange]
  );

  useEffect(() => {
    debouncedFetchBetHistory(currentTab);
  }, [debouncedFetchBetHistory, currentTab]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
    </div>
  );

  const handleLoadMore = () => {
    setLoadMoreCount((prev) => ({
      ...prev,
      [currentTab === 'open' ? 'openBets' : 'betHistory']: prev[currentTab === 'open' ? 'openBets' : 'betHistory'] + 10,
    }));
  };

  const handleCashOutButton = async (cashoutStake?: Number, betId?: Number) => {
    const currentBetId = Number(betId);

    if (!activeCashoutBetIds.has(currentBetId)) {
      setActiveCashoutBetIds(prev => new Set(prev).add(currentBetId));
    } else {
      setActiveCashoutBetIds(new Set([currentBetId]));
      setLoadingCashoutBetIds(prev => new Set(prev).add(currentBetId));

      try {
        await dispatch(getCashoutApi({
          'X-Client-Id': xClientId,
          accessToken,
          channel: channelType,
          cashoutStake: Number(cashoutStake) || 0,
          tId: currentBetId,
        })).unwrap();
      } finally {
        setLoadingCashoutBetIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(currentBetId);
          return newSet;
        });
      }
    }
  }

  useEffect(() => {
    const statusCode = cashOutResponse?.result?.statusCode;
    const completedBetId = cashOutResponse?.result?.result?.tId;

    if (statusCode === 200) {
      if (completedBetId) {
        setTimeout(() => {
          dispatch(setBetHistoryInSportsBook(
            (originalBetHistory || [])?.filter((bet: BetHistoryItem) => bet.tId !== completedBetId) as any
          ));
          setActiveCashoutBetIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(completedBetId);
            return newSet;
          });
        }, 1500);
      }
    }
  }, [cashOutResponse, dispatch]);
  const conversionData = useAppSelector(selectCurrencyData);
  const { currencies, selectedCurrency, usdToggleEnabled } = useAppSelector(selectWalletState);

  if (!isLoggedIn) return <p className='text-xs text-center py-5 text-gray-300'>Please Login to See Your Bets</p>

  return (
    <div className="space-y-4">
      {/* Bet Type Tabs */}
      <Tabs
        value={currentTab}
        onValueChange={(val) => setCurrentTab(val as 'open' | 'history')}
      >
        <TabsList className="bg-base-700 rounded-lg border-none h-8">
          <TabsTrigger value="open" variant="filled">
            Open Bets
          </TabsTrigger>
          <TabsTrigger value="history" variant="filled">
            Bet History
          </TabsTrigger>
        </TabsList>
        {betHistoryLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <TabsContent value="open">
              <BetFilters
                activeBetType={currentTab}
                showOnlyCashout={showOnlyCashout}
                onShowOnlyCashoutChange={setShowOnlyCashout}
                openBetsHistoryCount={openBetsHistory?.length}
                betHistoryFilteredCount={betHistoryFiltered?.length}
                onDateRangeChange={setBetHistoryDateRange}
                selectedTimeFilter={selectedTimeFilter}
                onTimeFilterChange={setSelectedTimeFilter}
              />
              <div className="space-y-2">
                {showNoCashoutBets ? (
                  <EmptyBetslipState text="No cashout bets are available." />
                ) : openBetsHistory?.length !== 0 ? (
                  openBetsHistory?.map((bet, index) => (
                    <BetAccordion
                      key={bet?.tId ?? ''}
                      bet={bet}
                      isExpanded={expandedBets[bet?.tId ?? ''] ?? (index === 0)}
                      onToggle={toggleBet}
                      onCopyBetId={copyBetId}
                      handleCashOutButton={handleCashOutButton}
                      currentTab={currentTab}
                      showCancelButton={bet?.tId !== undefined && activeCashoutBetIds.has(bet.tId)}
                      setShowCancelButton={() => {
                        if (bet?.tId !== undefined) {
                          setActiveCashoutBetIds(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(bet.tId!);
                            return newSet;
                          });
                        }
                      }}
                      isLoading={bet?.tId !== undefined && loadingCashoutBetIds.has(bet.tId)}
                      conversionData={conversionData}
                      currencies={currencies}
                      selectedCurrency={selectedCurrency}
                      usdToggleEnabled={usdToggleEnabled}
                    />
                  ))
                ) : (
                  <EmptyBetslipState
                    text="Open bets will appear here once you place them."
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="history">
              <BetFilters
                activeBetType={currentTab}
                showOnlyCashout={showOnlyCashout}
                onShowOnlyCashoutChange={setShowOnlyCashout}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                betHistoryFilteredCount={betHistoryFiltered?.length}
                onDateRangeChange={setBetHistoryDateRange}
                selectedTimeFilter={selectedTimeFilter}
                onTimeFilterChange={setSelectedTimeFilter}
              />
              <div className="space-y-2">
                {betHistoryFiltered?.length !== 0 ? (
                  betHistoryFiltered?.map((bet, index) => (
                    <BetAccordion
                      key={bet?.tId ?? ''}
                      bet={bet}
                      isExpanded={expandedBets[bet?.tId ?? ''] ?? (index === 0)}
                      onToggle={toggleBet}
                      onCopyBetId={copyBetId}
                      handleCashOutButton={handleCashOutButton}
                      showCancelButton={bet?.tId !== undefined && activeCashoutBetIds.has(bet.tId)}
                      setShowCancelButton={() => {
                        if (bet?.tId !== undefined) {
                          setActiveCashoutBetIds(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(bet.tId!);
                            return newSet;
                          });
                        }
                      }}
                      currentTab={currentTab}
                      conversionData={conversionData}
                      currencies={currencies}
                      selectedCurrency={selectedCurrency}
                      usdToggleEnabled={usdToggleEnabled}
                      isLoading={bet?.tId !== undefined && loadingCashoutBetIds.has(bet.tId)}
                    />
                  ))
                ) : (
                  <EmptyBetslipState
                    text="Bet history will appear here once you have."
                  />
                )}
              </div>
            </TabsContent>
            {hasMoreMatches && (
              <div className="flex justify-center mt-3">
                <button
                  onClick={handleLoadMore}
                  className="flex items-center gap-2 text-special-2 transition-colors text-sm"
                >
                  Load more
                  <div className={cn('w-4 h-4', styles.loadMoreIcon)} />
                </button>
              </div>
            )}
          </>
        )}

      </Tabs>
    </div>
  );
};

export default MyBetsTabContent;
