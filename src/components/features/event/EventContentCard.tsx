import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/index';
import { selectCompetitionDetails } from 'store/SportsHomePage/selectors';
import { getCompetitionDetails } from 'store/SportsHomePage/slice';
import PageHeader from 'components/shared/PageHeader';
import SportEventBanner from './SportEventBanner';
import { getIcons, getTimefromMatch } from 'helpers/common';
import Slider from 'components/shared/Slider';
import { SwiperSlide } from 'swiper/react';
import LockSvg from 'components/shared/ui/LockSvg';
import Icon from 'components/shared/Icon';
import searchIcon from '/icons/searchNormal.svg?url';
import close from '/icons/close.svg?url';
import { cn } from 'helpers/ui';
import styles from './Accordion.module.css';
import LoadingSpinner from 'components/shared/ui/LoadingSpinner';
import BetslipSection from '../sports/BetslipSection';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { handleSelectionsGlobal } from 'helpers/betConfigHelpers';
import { LOCKED_ODDS_THRESHOLD } from 'constants/odds';
import { useFixtureSignalRGroups } from 'hooks/useSignalRGroups';
import { useBetslipValidation } from 'hooks/useBetslipValidation';

interface MarketTab {
  id: string;
  name: string;
}

interface BettingMarket {
  id: string;
  name: string;
  isExpanded: boolean;
  marketStatusName?: string;
  options: {
    id: string;
    name: string;
    odds: number;
    selectionStatus?: string;
    selectionSuspended?: boolean;
  }[];
}

interface EventContentCardProps {
  originalBetHistory?: any[];
  betcount?: number;
}

const EventContentCard = ({ originalBetHistory, betcount }: EventContentCardProps) => {
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMarkets, setExpandedMarkets] = useState<Record<string, boolean>>({});
  const [addingSelections, setAddingSelections] = useState<any[]>(() => {
    const storedSelections = localStorage.getItem("betSlipData");
    return storedSelections ? JSON.parse(storedSelections) : [];
  });

  useEffect(() => {
    localStorage.setItem("betSlipData", JSON.stringify(addingSelections));
    window.dispatchEvent(new CustomEvent("betSlip_updated"));

    const handleBetSlipRemoveUpdate = () => {
      const storedSelections = localStorage.getItem("betSlipData");
      setAddingSelections(storedSelections ? JSON.parse(storedSelections) : []);
    };

    const handleBetSlipUpdate = () => {
      const storedSelections = localStorage.getItem("betSlipData");
      setAddingSelections(storedSelections ? JSON.parse(storedSelections) : []);
    };

    window.addEventListener("betSlip_removing_updated", handleBetSlipRemoveUpdate);
    window.addEventListener("betSlip_updated", handleBetSlipUpdate);
    return () => {
      window.removeEventListener("betSlip_removing_updated", handleBetSlipRemoveUpdate);
      window.removeEventListener("betSlip_updated", handleBetSlipUpdate);
    };
  }, [addingSelections]);

  const { screenWidth } = useBreakpoint();
  const isDesktop = screenWidth >= BREAKPOINTS.xl;
  const dispatch = useAppDispatch();
  const competitionDetails = useSelector(selectCompetitionDetails);
  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;
  const { eventId } = useParams<{ eventId: string }>();
  useFixtureSignalRGroups(eventId);

  useEffect(() => {
    if (!eventId) return;
    let loadedId = undefined;
    if (competitionDetails?.result) {
      const keys = Object.keys(competitionDetails.result);
      const idKey = keys.find(k => k?.toLowerCase().includes('id'));
      loadedId = idKey ? (competitionDetails.result as any)[idKey] : undefined;
    }
    if (!competitionDetails?.result || String(loadedId) !== String(eventId)) {
      dispatch(getCompetitionDetails({
        competitionId: eventId,
        xClientId: xClientId,
        xApiKey: xApiKey,
      }));
    }
  }, [eventId, xClientId, xApiKey]);

  const fixture = competitionDetails?.result;
  const isLoading = competitionDetails?.loading;

  let MatchGroup = [];
  if (fixture?.fixtureStatusName.toLocaleLowerCase() == 'live') {
    MatchGroup = fixture?.marketTemplateGroups?.live || [];
  } else {
    MatchGroup = fixture?.marketTemplateGroups?.prematch || [];
  }

  const LabelValue = (fixture?.leagueName)
    ? `${fixture.leagueName} / ${fixture.homeName} vs ${fixture.awayName}`
    : 'Back';
  const leagueLogo = getIcons('leagueName', fixture?.leagueName ?? '');
  const leftTeamIcon = getIcons('homeName', fixture?.homeName ?? '');
  const rightTeamIcon = getIcons('awayName', fixture?.awayName ?? '');
  const matchDate = getTimefromMatch(fixture?.fixtureStatusName ?? '', fixture?.fixtureStartDate ?? '',);

  const marketTabs: MarketTab[] = [
    ...MatchGroup.filter((group: any) => {
      const groupMarketTemplateIds = group.marketTemplateIds || [];
      const hasMarketWithSelections = (fixture?.markets || []).some((market: any) =>
        groupMarketTemplateIds.includes(String(market.marketTemplateId)) &&
        Array.isArray(market.selections) &&
        market.selections.length > 0
      );
      return hasMarketWithSelections;
    }).map((group: any) => ({
      id: String(group.marketTemplateGroupId),
      name: group.marketTemplateGroupName,
    })),
  ];

  useEffect(() => {
    if (marketTabs.length > 0 && (!selectedTab || !marketTabs.some(tab => tab.id === selectedTab))) {
      setSelectedTab(marketTabs[0].id);
    }
  }, [marketTabs]);

  const selectedGroup = MatchGroup.find((group: any) => String(group.marketTemplateGroupId) === selectedTab);
  const allowedMarketTemplateIds = selectedGroup ? selectedGroup.marketTemplateIds : null;

  const groupedMarkets: Record<string, { marketName: string; marketTemplateId: string; markets: BettingMarket[] }> = {};
  (fixture?.markets || [])
    .filter((market: any) =>
      !allowedMarketTemplateIds || allowedMarketTemplateIds.includes(String(market.marketTemplateId))
    )
    .forEach((market: any) => {
      const groupKey = `${market.marketName}__${market.marketTemplateId}`;
      if (!groupedMarkets[groupKey]) {
        groupedMarkets[groupKey] = {
          marketName: market.marketName,
          marketTemplateId: String(market.marketTemplateId),
          markets: [],
        };
      }
      groupedMarkets[groupKey].markets.push({
        id: market.marketId,
        name: market.marketName,
        isExpanded: false,
        marketStatusName: market.marketStatusName,
        options: (market.selections || []).map((sel: any) => ({
          id: sel.selectionId,
          name: sel.selectionName,
          odds: sel.decimalOdds,
          selectionStatus: sel.selectionStatus,
          selectionSuspended: sel.selectionSuspended,
        })),
      });
    });

  const matchMarket = (fixture?.markets || []).find((market: any) => {
    const name = market.marketName?.toLowerCase() || '';
    return name.includes('match winner') || name.includes('match result') || name.includes('fight winner');
  });



  let mainMarket;
  if (matchMarket && Array.isArray(matchMarket.selections)) {
    const homeWin = matchMarket.selections.find((s: any) => s.selectionName === fixture?.homeName);
    const draw = matchMarket.selections.find((s: any) => s.selectionName?.toLowerCase().includes('draw'));
    const awayWin = matchMarket.selections.find((s: any) => s.selectionName === fixture?.awayName);
    if (homeWin && awayWin) {
      mainMarket = {
        marketStatus: matchMarket.marketStatusName?.toLowerCase(),
        homeWin: homeWin ? {
          name: homeWin.selectionName,
          odds: homeWin.decimalOdds,
          marketId: matchMarket.marketId,
          selectionId: homeWin.selectionId,
          selectionStatus: homeWin.selectionStatus?.toLowerCase(),
          selectionSuspended: homeWin.selectionSuspended
        } : undefined,
        draw: draw ? {
          name: draw.selectionName,
          odds: draw.decimalOdds,
          marketId: matchMarket.marketId,
          selectionId: draw.selectionId,
          selectionStatus: draw.selectionStatus?.toLowerCase(),
          selectionSuspended: draw.selectionSuspended
        } : undefined,
        awayWin: awayWin ? {
          name: awayWin.selectionName,
          odds: awayWin.decimalOdds,
          marketId: matchMarket.marketId,
          selectionId: awayWin.selectionId,
          selectionStatus: awayWin.selectionStatus?.toLowerCase(),
          selectionSuspended: awayWin.selectionSuspended
        } : undefined,
      };
    }

  }

  const bettingMarketsGrouped = Object.values(groupedMarkets);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const filteredMarketsGrouped = bettingMarketsGrouped.filter(({ marketName, markets }) => {
    const query = searchQuery?.toLowerCase();
    if (marketName?.toLowerCase().includes(query)) return true;
    return markets.some(market =>
      market.options.some(option => option.name?.toLowerCase().includes(query))
    );
  });

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleMarket = (marketId: string) => {
    setExpandedMarkets(prev => ({
      ...prev,
      [marketId]: prev[marketId] !== undefined ? !prev[marketId] : false
    }));
  };

  const handleBetSelection = (selection: any, marketId: string) => {
    const mockMatch = {
      ...fixture,
    };

    handleSelectionsGlobal(setAddingSelections, selection, mockMatch, marketId);
  };

  const isSelectionSelected = (marketId: string, selectionId: string) => {
    return addingSelections.some((match: any) =>
      (match.providerFixtureId === fixture?.providerFixtureId || match.providerFixtureId === eventId) &&
      match.markets?.some((market: any) =>
        String(market.marketId) === String(marketId) &&
        market.selections?.some((sel: any) => sel.selectionId === selectionId)
      )
    );
  };

  useBetslipValidation({
    match: fixture!,
    addingSelections,
    setAddingSelections
  });

  const allMarketsInactive = fixture?.markets?.every((market: any) =>
    market.marketStatusName?.toLowerCase() === 'inactive'
  );
  if ((!fixture || fixture.markets.length === 0 || allMarketsInactive) && !isLoading) {
    return (
      <div className="xl:px-5">
        <PageHeader
          label={LabelValue}
          className="px-4 xl:px-0"
        />
        <div style={{ height: "55vh" }} className="flex flex-col justify-center">
          <NoItemsMessage message="No Markets Available" />
        </div>
      </div>
    )
  }

  return (
    <>{isLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="xl:px-5">
        <PageHeader
          label={LabelValue}
          className="px-4 xl:px-0"
        />
        <div className="px-4 mb-8 xl:px-0">
          <SportEventBanner
            fixtureStatusName={fixture?.fixtureStatusName ?? ''}
            leagueName={fixture?.leagueName ?? ''}
            countryName={fixture?.segmentName ?? ''}
            startTime={matchDate}
            islive={fixture?.fixtureStatusName?.toLowerCase() === 'live'}
            marketCount={fixture?.marketCount ?? 0}
            scores={fixture?.scores ?? ''}
            minutes={fixture?.currentMinute ?? ''}
            leagueLogo={leagueLogo}
            sportId={fixture?.sportId}
            homeScore={fixture?.homeScore}
            awayScore={fixture?.awayScore}
            homeTeam={{
              name: fixture?.homeName ?? '',
              logo: leftTeamIcon,
            }}
            awayTeam={{
              name: fixture?.awayName ?? '',
              logo: rightTeamIcon,
            }}
            mainMarket={mainMarket}
            handleBetSelection={handleBetSelection}
            isSelectionSelected={isSelectionSelected}
            fixture={fixture}
          />
        </div>
        <div>
          <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:flex xl:h-full">
            <div className="xl:flex-1 min-w-0">
              <Slider spaceBetween={12} className="mb-6 pl-4 xl:pl-0">
                {marketTabs.map((tab) => (
                  <SwiperSlide key={tab.id} className="!w-auto">
                    <button
                      type="button"
                      className={`h-10 bg-base-700 rounded-xl px-3 text-xs box-border ${selectedTab === tab.id ? 'border border-primary-2 text-primary-2 font-medium' : 'body-txtColor-1'}`}
                      onClick={() => setSelectedTab(tab.id)}
                    >
                      {tab.name}
                    </button>
                  </SwiperSlide>
                ))}
              </Slider>
              <div className='xl:flex-1 px-4 xl:px-0'>
                <div className="relative w-full mb-3">
                  <span className="absolute transform translate-y-1/2 w-5 h-5 left-3.5">
                    <Icon
                      id="searchNormalIcon"
                      href={searchIcon}
                      className="fill-base-500"
                    />
                  </span>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute transform translate-y-1/2 w-5 h-5 right-3.5 bg-base-620 rounded-full"
                    >
                      <Icon
                        id="closeIcon"
                        href={close}
                        className="fill-1"
                      />
                    </button>
                  )}
                  <input
                    placeholder="Filter Markets"
                    className="h-10 rounded-lg bg-base-700 z-0 outline-0 w-full px-10 body-txtColor-1 placeholder-base-400"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className='flex flex-col gap-3'>
                  {filteredMarketsGrouped.length > 0 ? (
                    filteredMarketsGrouped.map(({ marketName, marketTemplateId, markets }) => (
                      <div key={marketName + '__' + marketTemplateId} className="bg-base-750 px-5 rounded-xl border border-base-700">
                        <h3 className='flex'>
                          <button
                            onClick={() => toggleMarket(marketName + '__' + marketTemplateId)}
                            className="flex flex-1 items-center justify-between py-4 transition-all text-sm font-medium gap-4"
                          >
                            <span className="body-txtColor-1 font-medium text-left">{marketName}</span>
                            <svg
                              className={`transition-transform duration-200 w-4 h-4 min-w-4 ${expandedMarkets[marketName + '__' + marketTemplateId] !== false ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </h3>
                        <div
                          className={cn(styles.content, (expandedMarkets[marketName + '__' + marketTemplateId] !== false) && styles.contentExpandedSmall)}
                        >
                          <div className="pb-4">
                            {markets.map((market) => {
                              const options = market.options;
                              if (options.length <= 3) {
                                const isMarketInactive = market.marketStatusName?.toLowerCase() === 'inactive';
                                return (
                                  <div key={market.id} className="flex gap-2 mb-2">
                                    {options.map((option) => {
                                      const isSelected = isSelectionSelected(market.id, option.id);
                                      const isSelectionInactive = option.selectionStatus?.toLowerCase() === 'inactive';
                                      const showLock = isMarketInactive || isSelectionInactive || option?.odds <= LOCKED_ODDS_THRESHOLD;
                                      const isSuspended = option?.selectionSuspended;
                                      const isDisabled = showLock || isSuspended;
                                      const selectionObj = {
                                        selectionId: option.id,
                                        selectionName: option.name,
                                        decimalOdds: option.odds,
                                        selectionStatus: option.selectionStatus,
                                      };

                                      return (
                                        <button
                                          key={option.id}
                                          onClick={() => handleBetSelection(selectionObj, market.id)}
                                          className={`flex items-center justify-between p-3 rounded-lg transition-colors min-w-0 flex-1 gap-2 ${isSelected
                                            ? 'bg-button-gradient hover:bg-secondary-light-7'
                                            : `bg-base-800 md:hover:bg-base-700 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`
                                            }`}
                                          disabled={isDisabled}
                                        >
                                          <span className={` truncate text-sm ${isSelected ? 'body-txtColor-2' : 'text-base-400'}`}>{option.name}</span>
                                          {showLock ? (
                                            <span className="ml-2"><LockSvg /></span>
                                          ) : (
                                            <span className={`font-medium ${isSelected ? 'body-txtColor-2' : 'body-txtColor-1'}`}>{Number(option.odds).toFixed(2)}</span>
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                );
                              }
                              const rows = [];
                              for (let i = 0; i < options.length; i += 2) {
                                rows.push(options.slice(i, i + 2));
                              }
                              const isMarketInactive = market.marketStatusName?.toLowerCase() === 'inactive';
                              return rows.map((row, idx) => (
                                <div key={market.id + '-row-' + idx} className="flex gap-2 mb-2">
                                  {row.map((option) => {
                                    const isSelected = isSelectionSelected(market.id, option.id);
                                    const isSelectionInactive = option.selectionStatus?.toLowerCase() === 'inactive';
                                    const showLock = isMarketInactive || isSelectionInactive;
                                    const isSuspended = option?.selectionSuspended;
                                    const isDisabled = showLock || isSuspended;
                                    const selectionObj = {
                                      selectionId: option.id,
                                      selectionName: option.name,
                                      decimalOdds: option.odds,
                                      selectionStatus: option.selectionStatus,
                                    };
                                    return (
                                      <button
                                        key={option.id}
                                        onClick={() => handleBetSelection(selectionObj, market.id)}
                                        className={`flex items-center justify-between p-3 rounded-lg transition-colors min-w-0 flex-1 gap-2 ${isSelected
                                          ? 'bg-button-gradient hover:bg-secondary-light-7'
                                          : 'bg-base-800 md:hover:bg-base-700'
                                          }`}
                                        disabled={isDisabled}
                                      >
                                        <span className={` truncate text-sm ${isSelected ? 'body-txtColor-2' : 'text-base-400'}`}>{option.name}</span>
                                        {showLock ? (
                                          <span className="ml-2"><LockSvg /></span>
                                        ) : (
                                          <span className={`font-medium ${isSelected ? 'body-txtColor-2' : 'body-txtColor-1'}`}>{Number(option.odds).toFixed(2)}</span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              ));
                            })}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-base-400 text-sm">No markets found</div>
                      <div className="text-base-500 text-xs mt-1">Try a different search term</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden xl:flex xl:mx-5 xl:bg-borderdefault xl:min-h-full xl:w-px" />
            {isDesktop ? <BetslipSection betcount={betcount} myBetsCount={originalBetHistory?.length} /> : null}
          </div>
        </div>
      </div>)}
    </>
  );
};

export default EventContentCard;