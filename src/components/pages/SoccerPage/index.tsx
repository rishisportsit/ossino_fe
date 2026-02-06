import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cn } from 'helpers/ui';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import PageHeader from 'components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger } from 'components/shared/ui/Tabs';
import MobileBetslip from 'components/features/sports/BetslipSection/MobileBetslip';
import BetslipSection from 'components/features/sports/BetslipSection';
import styles from './index.module.css';
import { getLiveSportsInnerPage, getPopularMatchesForInnerPage, getUpComingSportsInnerPage } from 'store/SportsHomePage/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import LeagueAccordion from 'components/features/sports/MatchesSection/LeagueAccordion';
import { selectBetHistoryInSportsBook, selectliveSportsInnerPage, selectPopularMatchesForInnerPage, selectUpComingSportsInnerPage } from 'store/SportsHomePage/selectors';
import { SportWiseMultiMarkets } from 'helpers/SportWiseMultiMarkets';
import Select from 'components/shared/Select';
import { useBetSlipData } from 'hooks/useBetSlipData';
import { useSoccerPageSignalR } from 'hooks/useSignalRGroups';

const tabsListData = [
  { title: 'Popular', value: 'popular', show: true },
  { title: 'Live', value: 'live', show: true },
  { title: 'Upcoming', value: 'upcoming', show: true },
  { title: 'Top Leagues', value: 'top_leagues', show: false },
  { title: 'Matches Daily', value: 'matches_daily', show: false },
  { title: 'All Competitions', value: 'all_competitions', show: false },
]

const SoccerPage = () => {
  const params = useParams()
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const { screenWidth } = useBreakpoint();
  const isDesktop = screenWidth >= BREAKPOINTS.xl;
  const isDesktopScreen = screenWidth >= BREAKPOINTS.lg;

  const originalBetHistory = useAppSelector(selectBetHistoryInSportsBook);
  const { betSlipCount } = useBetSlipData();

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) {
      return;
    }
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) {
      return;
    }
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const [SPORT_ID, setSPORT_ID] = useState<string | undefined>(params?.sportId);
  const [activeTab, setActiveTab] = useState<'popular' | 'live' | 'upcoming'>('popular');
  useSoccerPageSignalR(SPORT_ID, activeTab);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(true);

  const [selectedSport, setSelectedSport] = useState<string>(SPORT_ID || "");
  const [selectedSportUpcoming, setSelectedSportUpcoming] = useState<string>(SPORT_ID || "");

  const prevSelectedSport = useRef<string>(selectedSport);
  const prevSelectedSportUpcoming = useRef<string>(selectedSportUpcoming);

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

    window.addEventListener("betSlip_removing_updated", handleBetSlipRemoveUpdate);
    return () => {
      window.removeEventListener("betSlip_removing_updated", handleBetSlipRemoveUpdate);
    };
  }, [addingSelections]);

  const uiSupportedMarkets = useMemo(() => {
    return SportWiseMultiMarkets?.find((sports: any) => sports?.sportId === Number(selectedSport))?.markets?.marketsSupported?.map((m: any) => {
      const uiSupportedMarketsDataList = {
        UIMarketName: m?.UIMarketName,
        marketTemplateId: m?.marketTemplateId
      }
      return uiSupportedMarketsDataList;
    });
  }, [selectedSport]);

  const uiSupportedMarketsUpcoming = useMemo(() => {
    return SportWiseMultiMarkets?.find((sports: any) => sports?.sportId === Number(selectedSportUpcoming))?.markets?.marketsSupported?.map((m: any) => {
      const uiSupportedMarketsDataList = {
        UIMarketName: m?.UIMarketName,
        marketTemplateId: m?.marketTemplateId
      }
      return uiSupportedMarketsDataList;
    });
  }, [selectedSportUpcoming]);

  const getDefaultMarketPopular = () => {
    if (!uiSupportedMarkets || uiSupportedMarkets.length === 0) return '1';

    if (isDesktopScreen) {
      return uiSupportedMarkets[1]?.marketTemplateId || uiSupportedMarkets[0]?.marketTemplateId || '1';
    } else {
      return uiSupportedMarkets[0]?.marketTemplateId || '1';
    }
  };

  const getDefaultMarket = () => {
    if (!uiSupportedMarkets || uiSupportedMarkets.length === 0) return '1';

    if (isDesktopScreen) {
      return uiSupportedMarkets[1]?.marketTemplateId || uiSupportedMarkets[0]?.marketTemplateId || '1';
    } else {
      return uiSupportedMarkets[0]?.marketTemplateId || '1';
    }
  };

  const getDefaultMarketUpcoming = () => {
    if (!uiSupportedMarketsUpcoming || uiSupportedMarketsUpcoming.length === 0) return '1';

    if (isDesktopScreen) {
      return uiSupportedMarketsUpcoming[1]?.marketTemplateId || uiSupportedMarketsUpcoming[0]?.marketTemplateId || '1';
    } else {
      return uiSupportedMarketsUpcoming[0]?.marketTemplateId || '1';
    }
  };

  const [selectedOverUnderPopular, setSelectedOverUnderPopular] = useState(() => getDefaultMarketPopular());
  const [selectedOverUnderLive, setSelectedOverUnderLive] = useState(() => getDefaultMarket());
  const [selectedOverUnderUpcoming, setSelectedOverUnderUpcoming] = useState(() => getDefaultMarketUpcoming());

  useEffect(() => {
    if (params?.sportId && params.sportId !== SPORT_ID) {
      const newMarkets = SportWiseMultiMarkets?.find((sports: any) => sports?.sportId === Number(params.sportId))?.markets?.marketsSupported?.map((m: any) => ({
        UIMarketName: m?.UIMarketName,
        marketTemplateId: m?.marketTemplateId
      }));

      const newDefaultMarket = (() => {
        if (!newMarkets || newMarkets.length === 0) return '1';
        if (isDesktopScreen) {
          return newMarkets[1]?.marketTemplateId || newMarkets[0]?.marketTemplateId || '1';
        } else {
          return newMarkets[0]?.marketTemplateId || '1';
        }
      })();

      setSPORT_ID(params.sportId);
      setSelectedSport(params.sportId);
      setSelectedSportUpcoming(params.sportId);
      setSelectedOverUnderPopular(newDefaultMarket);
      setSelectedOverUnderLive(newDefaultMarket);
      setSelectedOverUnderUpcoming(newDefaultMarket);
      prevSelectedSport.current = params.sportId;
      prevSelectedSportUpcoming.current = params.sportId;
      setActiveTab('popular');
      setIsLoading(true);
      setIsLoadingLive(true);
      setIsLoadingUpcoming(true);
    }
  }, [params?.sportId, SPORT_ID, isDesktopScreen]);

  useEffect(() => {
    if (prevSelectedSport.current !== selectedSport || !uiSupportedMarkets) {
      const defaultMarketPopular = getDefaultMarketPopular();
      const defaultMarketLive = getDefaultMarket();
      setSelectedOverUnderPopular(defaultMarketPopular);
      setSelectedOverUnderLive(defaultMarketLive);
      prevSelectedSport.current = selectedSport;
    }
  }, [selectedSport, uiSupportedMarkets, isDesktopScreen]);

  useEffect(() => {
    if (prevSelectedSportUpcoming.current !== selectedSportUpcoming || !uiSupportedMarketsUpcoming) {
      const defaultMarket = getDefaultMarketUpcoming();
      setSelectedOverUnderUpcoming(defaultMarket);
      prevSelectedSportUpcoming.current = selectedSportUpcoming;
    }
  }, [selectedSportUpcoming, uiSupportedMarketsUpcoming, isDesktopScreen]);

  const dispatch = useAppDispatch();
  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;

  useEffect(() => {
    if (!SPORT_ID) return;
    const firstMarketpopular = uiSupportedMarkets?.[0]?.marketTemplateId || '1';
    dispatch(getPopularMatchesForInnerPage({
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      sportId: Number(SPORT_ID),
      markets: [firstMarketpopular, Number(selectedOverUnderPopular)],
      isNextBetRequired: false,
    })).finally(() => setIsLoading(false));

  }, [dispatch, selectedOverUnderPopular, SPORT_ID, xApiKey, xClientId]);

  useEffect(() => {
    if (!SPORT_ID) return;
    const firstMarket = uiSupportedMarkets?.[0]?.marketTemplateId || '1';
    dispatch(getLiveSportsInnerPage({
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      isNextBetRequired: false,
      isSelectedFromHeader: false,
      sportId: Number(SPORT_ID),
      isPrematchBookedReq: false,
      markets: `${firstMarket},${selectedOverUnderLive}`,
    })).finally(() => setIsLoadingLive(false));

  }, [dispatch, SPORT_ID, selectedOverUnderLive, xApiKey, xClientId]);

  useEffect(() => {
    if (!SPORT_ID) return;
    const firstMarketUpComing = uiSupportedMarketsUpcoming?.[0]?.marketTemplateId || '1';
    dispatch(getUpComingSportsInnerPage({
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      sportsid: Number(SPORT_ID),
      isNextBetRequired: false,
      markets: [firstMarketUpComing, Number(selectedOverUnderUpcoming)],
    })).finally(() => setIsLoadingUpcoming(false));

  }, [dispatch, SPORT_ID, selectedOverUnderUpcoming, xApiKey, xClientId]);

  const liveMatchesData = useAppSelector(selectliveSportsInnerPage) || [];
  const upcomingMatchesData = useAppSelector(selectUpComingSportsInnerPage) || [];
  const popularHighlights = useAppSelector(selectPopularMatchesForInnerPage) || [];

  const liveMatchesLoading = useAppSelector((state) => state?.sportsBook?.data?.liveSportsInnerPage?.loading);
  const upcomingMatchesLoading = useAppSelector((state) => state?.sportsBook?.data?.UpComingSportsInnerPage?.loading);
  const popularHighlightsLoading = useAppSelector((state) => state?.sportsBook?.data?.popularMatchesForInnerPage?.loading);

  const getLeaguesForTabAndSport = (tab: string) => {
    switch (tab) {
      case 'live':
        return groupFixturesByLeague(liveMatchesData?.result?.competitions?.fixtures || []);
      case 'popular':
        return groupFixturesByLeague(popularHighlights?.result?.competitions?.fixtures || []);
      case 'upcoming':
        return groupFixturesByLeague(upcomingMatchesData?.result?.competitions?.fixtures || []);
      default:
        return [];
    }
  };

  const groupFixturesByLeague = (fixtures: any[]) => {
    const leaguesMap: { [key: string]: any } = {};
    fixtures?.forEach((fixture) => {
      const leagueName = fixture.leagueName || 'Unknown League';
      if (!leaguesMap[leagueName]) {
        leaguesMap[leagueName] = {
          id: fixture.providerFixtureId,
          name: leagueName,
          sportid: fixture.sportId,
          segmentid: fixture.segmentId,
          leagueId: fixture.leagueId,
          matches: [],
        };
      }
      leaguesMap[leagueName].matches.push(fixture);
    });
    return Object.values(leaguesMap);
  }

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12 min-h-[50vh] w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
      <p className="mt-4 text-base-400 text-sm">Loading ...</p>
    </div>
  );

  return (
    <>
      <div className="px-4 pt-[75px] pb-4 md:pt-0 xl:px-5">
        <PageHeader pathNameFromComponent={params?.sport} />
        <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:flex xl:h-full">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'popular' | 'live' | 'upcoming')} className="xl:flex-1">
            <TabsList
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              ref={scrollRef}
              className={cn(
                'border-b-base-600 overflow-x-auto h-[31px]',
                styles.scrollbar,
              )}
            >
              {tabsListData?.map((tab) => {
                if (!tab.show) return null;
                return (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.title}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {(() => {
              const renderOverUnderDropdown = (isLoadingState: boolean, selectedValue: string, setSelectedValue: (v: string) => void, markets = uiSupportedMarkets) => {
                if (isLoadingState || !markets || markets.length === 0) return null;

                const currentDefaultMarket = (() => {
                  if (isDesktopScreen) {
                    return markets[1]?.marketTemplateId || markets[0]?.marketTemplateId || '1';
                  } else {
                    return markets[0]?.marketTemplateId || '1';
                  }
                })();

                const displayValue = markets.find((m: any) => m.marketTemplateId === selectedValue)?.UIMarketName
                  || markets.find((m: any) => m.marketTemplateId === currentDefaultMarket)?.UIMarketName
                  || markets[0]?.UIMarketName;

                return (
                  <div className="mt-5 w-full" onClick={(e) => e.stopPropagation()}>
                    <Select
                      className="bg-base-650 !text-base-200 text-sm px-3 py-2 rounded-lg border-0 h-[38px] flex items-center w-full"
                      dropDownClassName="bg-base-650 text-base-200 w-full overflow-auto"
                      withChevron
                      chevronClassName="!bg-inherit !w-4 !h-4 !ml-2"
                      closeOnClick
                      list={
                        <div className="p-2 space-y-1">
                          {markets
                            ?.filter((market: any, index: number) => {
                              if (isDesktopScreen && index === 0) return false;
                              return true;
                            })
                            .map((market: any, index: number) => (
                              <div
                                key={index}
                                className="px-2 py-1 hover:bg-base-690 rounded cursor-pointer text-base-200 whitespace-nowrap"
                                onClick={() => setSelectedValue(market?.marketTemplateId)}
                              >
                                {market?.UIMarketName}
                              </div>
                            ))}
                        </div>
                      }
                    >
                      <span className="text-base-200">
                        {displayValue}
                      </span>
                    </Select>
                  </div>
                );
              };

              if (activeTab === "popular") {
                return renderOverUnderDropdown(
                  isLoading,
                  selectedOverUnderPopular,
                  setSelectedOverUnderPopular
                );
              } else if (activeTab === "live") {
                return renderOverUnderDropdown(
                  isLoadingLive,
                  selectedOverUnderLive,
                  setSelectedOverUnderLive
                );
              } else if (activeTab === "upcoming") {
                return renderOverUnderDropdown(
                  isLoadingUpcoming,
                  selectedOverUnderUpcoming,
                  setSelectedOverUnderUpcoming,
                  uiSupportedMarketsUpcoming
                );
              }
              return null;
            })()}

            <div className="mt-2 gap-4 flex flex-col">
              {((activeTab === 'popular' && isLoading) || (activeTab === 'live' && isLoadingLive) || (activeTab === 'upcoming' && isLoadingUpcoming)) ? (
                <LoadingSpinner />
              ) : getLeaguesForTabAndSport(activeTab).length > 0 ? (
                getLeaguesForTabAndSport(activeTab).map((league, index) => (
                  <LeagueAccordion
                    key={`${activeTab}-${league?.id}`}
                    league={league}
                    selectedOverUnder={
                      activeTab === 'popular'
                        ? selectedOverUnderPopular
                        : activeTab === 'live'
                          ? selectedOverUnderLive
                          : activeTab === 'upcoming'
                            ? selectedOverUnderUpcoming
                            : ''
                    }
                    liveMatchesLoading={liveMatchesLoading}
                    popularHighlightsLoading={popularHighlightsLoading}
                    upcomingMatchesLoading={upcomingMatchesLoading}
                    index={index}
                    addingSelections={addingSelections}
                    setAddingSelections={setAddingSelections}
                    activeTab={activeTab}
                    SportsIdForDesktop={
                      activeTab === 'popular'
                        ? SPORT_ID
                        : activeTab === 'live'
                          ? selectedSport
                          : activeTab === 'upcoming'
                            ? selectedSportUpcoming
                            : ''
                    }
                    defaultMarketsForSport={
                      activeTab === 'popular'
                        ? uiSupportedMarkets?.[0]?.marketTemplateId || '1'
                        : activeTab === 'live'
                          ? uiSupportedMarkets?.[0]?.marketTemplateId || '1'
                          : activeTab === 'upcoming'
                            ? uiSupportedMarketsUpcoming?.[0]?.marketTemplateId || '1'
                            : ""
                    }
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-base-400 text-lg mb-2">No matches available</div>
                  <div className="text-base-500 text-sm">Select a different sport or check back later</div>
                </div>
              )}
            </div>
          </Tabs>
          <div className="hidden xl:flex xl:mx-5 xl:bg-borderdefault xl:min-h-full xl:w-px" />
          {isDesktop ? <BetslipSection betcount={betSlipCount} myBetsCount={originalBetHistory?.length} /> : null}
        </div>
      </div>
      {/* Mobile Betslip Button and Panels */}
      <MobileBetslip betCount={betSlipCount} />
    </>
  );
};

export default SoccerPage;
