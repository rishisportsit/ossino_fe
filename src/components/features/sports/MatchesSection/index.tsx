import { useEffect, useState, useRef } from 'react';
import SportsTabs from './SportsTabs';
import SportSelector from './SportSelector';
import LeagueAccordion from './LeagueAccordion';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getLiveCompetitionsCount, getLiveMatches, getPopularHighlights, getUpcomingCompetitionsCount, getUpcomingMatches } from 'store/SportsHomePage/slice';
import { SPORTS_ID, STORAGE_KEYS } from 'constants/storage';
import { selectLiveMatchesData, selectPopularHighlightsData, selectUpcomingCompetitionsCount } from 'store/SportsHomePage/selectors';
import { SportWiseMultiMarkets } from 'helpers/SportWiseMultiMarkets';
import Select from 'components/shared/Select';
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { useSportSignalRGroups } from 'hooks/useSignalRGroups';

const MatchesSection = () => {

  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS.lg;

  const [activeTab, setActiveTab] = useState<'popular' | 'live' | 'upcoming'>('popular');
 

  const liveCompetitionsCountdata = useAppSelector((state) => state?.sportsBook?.data?.liveCompetitionsCount?.result) || [];
  const upcomingCompetitionsCountdata = useAppSelector(selectUpcomingCompetitionsCount) || [];

  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedSportUpcoming, setSelectedSportUpcoming] = useState<string>('');

  const prevSelectedSport = useRef<string>(selectedSport);
  const prevSelectedSportUpcoming = useRef<string>(selectedSportUpcoming);

  const uiSupportedMarkets = SportWiseMultiMarkets?.find((sports: any) => sports?.sportId === Number(selectedSport))?.markets?.marketsSupported?.map((m: any) => {
    const uiSupportedMarketsDataList = {
      UIMarketName: m?.UIMarketName,
      marketTemplateId: m?.marketTemplateId
    }
    return uiSupportedMarketsDataList;
  });

  const uiSupportedMarketsPopular = SportWiseMultiMarkets?.find((sports: any) => sports?.sportId === 1)?.markets?.marketsSupported?.map((m: any) => {
    const uiSupportedMarketsDataList = {
      UIMarketName: m?.UIMarketName,
      marketTemplateId: m?.marketTemplateId
    }
    return uiSupportedMarketsDataList;
  });

  const uiSupportedMarketsUpcoming = SportWiseMultiMarkets?.find((sports: any) => sports?.sportId === Number(selectedSportUpcoming))?.markets?.marketsSupported?.map((m: any) => {
    const uiSupportedMarketsDataList = {
      UIMarketName: m?.UIMarketName,
      marketTemplateId: m?.marketTemplateId
    }
    return uiSupportedMarketsDataList;
  });

  const getDefaultMarketPopular = () => {
    if (!uiSupportedMarketsPopular || uiSupportedMarketsPopular.length === 0) return '1';

    if (isDesktopScreen) {
      return uiSupportedMarketsPopular[1]?.marketTemplateId || uiSupportedMarketsPopular[0]?.marketTemplateId || '1';
    } else {
      return uiSupportedMarketsPopular[0]?.marketTemplateId || '1';
    }
  };

  const getDefaultMarketLive = () => {
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
  const [selectedOverUnderLive, setSelectedOverUnderLive] = useState(() => getDefaultMarketLive());
  const [selectedOverUnderUpcoming, setSelectedOverUnderUpcoming] = useState(() => getDefaultMarketUpcoming());

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(true);

  useEffect(() => {
    if (prevSelectedSport.current !== selectedSport || !uiSupportedMarkets) {
      const defaultMarket = getDefaultMarketLive();
      setSelectedOverUnderLive(defaultMarket);
      prevSelectedSport.current = selectedSport;
    }
  }, [selectedSport, uiSupportedMarkets]);

  useEffect(() => {
    if (prevSelectedSportUpcoming.current !== selectedSportUpcoming || !uiSupportedMarketsUpcoming) {
      const defaultMarket = getDefaultMarketUpcoming();
      setSelectedOverUnderUpcoming(defaultMarket);
      prevSelectedSportUpcoming.current = selectedSportUpcoming;
    }
  }, [selectedSportUpcoming, uiSupportedMarketsUpcoming]);

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

  useEffect(() => {
    const handleBetSlipUpdate = () => {
      const storedSelections = localStorage.getItem("betSlipData");
      const currentSelections = storedSelections ? JSON.parse(storedSelections) : [];

      if (JSON.stringify(currentSelections) !== JSON.stringify(addingSelections)) {
        setAddingSelections(currentSelections);
      }
    };

    window.addEventListener("betSlip_updated", handleBetSlipUpdate);
    return () => {
      window.removeEventListener("betSlip_updated", handleBetSlipUpdate);
    };
  }, [addingSelections]);

  const dispatch = useAppDispatch();
  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;

  useEffect(() => {
    dispatch(getPopularHighlights({
      accessToken: localStorage.getItem(STORAGE_KEYS?.accessToken) || '',
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      isNextBetRequired: false,
      isSelectedFromHeader: false,
      sports: [
        {
          markets: `1,${selectedOverUnderPopular}`,
          sportId: SPORTS_ID.sportId,
        },
      ],
    })).finally(() => setIsLoading(false));
  }, [dispatch, selectedOverUnderPopular, xApiKey, xClientId]);

  useEffect(() => {
    if (selectedSport) {
      const firstMarket = uiSupportedMarkets?.[0]?.marketTemplateId || '1';
      dispatch(getLiveMatches({
        'X-Client-Id': xClientId,
        'X-Api-Key': xApiKey,
        'X-Language-Code': 'en',
        isNextBetRequired: false,
        isSelectedFromHeader: false,
        sportId: Number(selectedSport),
        isPrematchBookedReq: false,
        markets: `${firstMarket},${selectedOverUnderLive}`,
      })).finally(() => setIsLoadingLive(false));
    }
  }, [dispatch, selectedSport, selectedOverUnderLive, xApiKey, xClientId]);

  useEffect(() => {
    if (selectedSportUpcoming) {
      const firstMarketUpComing = uiSupportedMarketsUpcoming?.[0]?.marketTemplateId || '1';
      dispatch(getUpcomingMatches({
        'X-Client-Id': xClientId,
        'X-Api-Key': xApiKey,
        'X-Language-Code': 'en',
        sportsid: Number(selectedSportUpcoming),
        markets: [firstMarketUpComing, Number(selectedOverUnderUpcoming)],
        isNextBetRequired: false,
        minutes: 43200,
      })).finally(() => setIsLoadingUpcoming(false));
    }
  }, [dispatch, selectedOverUnderUpcoming, selectedSportUpcoming, xApiKey, xClientId]);

  useEffect(() => {
    if ((liveCompetitionsCountdata?.length ?? 0) > 0) return;
    dispatch(getLiveCompetitionsCount({
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      isPrematchBookedReq: false,
    }))
  }, [dispatch, xApiKey, xClientId, liveCompetitionsCountdata?.length]);

  useEffect(() => {
    if ((upcomingCompetitionsCountdata?.length ?? 0) > 0) return;
    dispatch(getUpcomingCompetitionsCount({
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      minutes: 43200,
    }))
  }, [dispatch, xApiKey, xClientId, upcomingCompetitionsCountdata?.length]);

  useEffect(() => {
    if (liveCompetitionsCountdata && liveCompetitionsCountdata.length > 0) {
      const firstSportId = liveCompetitionsCountdata[0]?.sportId;
      if (firstSportId && !selectedSport) {
        setSelectedSport(firstSportId);
      }
    }
  }, [liveCompetitionsCountdata]);

  useEffect(() => {
    if (upcomingCompetitionsCountdata && upcomingCompetitionsCountdata.length > 0) {
      const firstSportId = upcomingCompetitionsCountdata[0]?.sportId;
      if (firstSportId && !selectedSportUpcoming) {
        setSelectedSportUpcoming(firstSportId);
      }
    }
  }, [upcomingCompetitionsCountdata]);
  const popularHighlights = useAppSelector(selectPopularHighlightsData) || [];
  const liveMatchesData = useAppSelector(selectLiveMatchesData) || [];
  const upcomingMatchesData = useAppSelector((state) => state?.sportsBook?.data?.upcomingMatches) || [];

  const popularHighlightsLoading = useAppSelector((state) => state?.sportsBook?.data?.popularHighlights?.loading);
  const liveMatchesLoading = useAppSelector((state) => state?.sportsBook?.data?.liveMatches?.loading);
  const upcomingMatchesLoading = useAppSelector((state) => state?.sportsBook?.data?.upcomingMatches?.loading);
   useSportSignalRGroups(
    activeTab === 'live' ? selectedSport : activeTab === 'upcoming' ? selectedSportUpcoming : undefined,
    activeTab === 'live' ? 'live' : activeTab === 'upcoming' ? 'upcoming' : undefined
  );
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
    fixtures.forEach((fixture) => {
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
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
      <p className="mt-4 text-base-400 text-sm">Loading ...</p>
    </div>
  );

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
      <div
        className="flex space-x-2 justify-end mt-5"
        onClick={(e) => e.stopPropagation()}
      >
        <Select
          className="bg-base-650 !text-base-200 text-sm px-3 py-2 rounded-lg border-0 h-[38px] flex items-center"
          dropDownClassName="bg-base-650 text-base-200 min-w-[200px] overflow-auto"
          withChevron
          chevronClassName="!bg-inherit !w-4 !h-4 !ml-2"
          closeOnClick
          list={
            <div className="p-2 space-y-1">
              {markets
                ?.filter((market: any, index: Number) => {
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

  return (
    <div className="mt-0">
      <SportsTabs activeTab={activeTab} onTabChange={setActiveTab}>
        {((activeTab === 'live' && (liveMatchesData?.result?.competitions?.fixtures?.length ?? 0) > 0) ||
          (activeTab === 'upcoming' && (upcomingMatchesData?.result?.competitions?.fixtures?.length ?? 0) > 0) ||
          (activeTab === 'popular' && (popularHighlights?.result?.competitions?.fixtures?.length ?? 0) > 0)) ? (
          <div>
            {/* Sport Selector */}
            {activeTab === "live" && liveCompetitionsCountdata && liveCompetitionsCountdata.length > 0 && (
              <SportSelector
                sports={liveCompetitionsCountdata}
                selectedSport={selectedSport}
                onSportChange={setSelectedSport}
              />
            )}
            {activeTab === "upcoming" && upcomingCompetitionsCountdata && upcomingCompetitionsCountdata.length > 0 && (
              <SportSelector
                sports={upcomingCompetitionsCountdata}
                selectedSport={selectedSportUpcoming}
                onSportChange={setSelectedSportUpcoming}
              />
            )}

            {activeTab === "popular" &&
              renderOverUnderDropdown(
                isLoading,
                selectedOverUnderPopular,
                setSelectedOverUnderPopular,
                uiSupportedMarketsPopular
              )}

            {activeTab === "live" && selectedSport &&
              renderOverUnderDropdown(
                isLoadingLive,
                selectedOverUnderLive,
                setSelectedOverUnderLive
              )}

            {activeTab === "upcoming" && selectedSportUpcoming &&
              renderOverUnderDropdown(
                isLoadingUpcoming,
                selectedOverUnderUpcoming,
                setSelectedOverUnderUpcoming,
                uiSupportedMarketsUpcoming
              )}

            {/* Leagues Accordion */}
            <div className="mt-6 gap-4 flex flex-col">
              {((activeTab === 'popular' && isLoading) || (activeTab === 'live' && isLoadingLive) || (activeTab === 'upcoming' && isLoadingUpcoming)) ? (
                <LoadingSpinner />
              ) : getLeaguesForTabAndSport(activeTab).length > 0 ? (
                getLeaguesForTabAndSport(activeTab).map((league, index) => (
                  <LeagueAccordion
                    key={league?.id}
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
                    popularHighlightsLoading={popularHighlightsLoading}
                    liveMatchesLoading={liveMatchesLoading}
                    upcomingMatchesLoading={upcomingMatchesLoading}
                    index={index}
                    addingSelections={addingSelections}
                    setAddingSelections={setAddingSelections}
                    activeTab={activeTab}
                    SportsIdForDesktop={
                      activeTab === 'popular'
                        ? "1"
                        : activeTab === 'live'
                          ? selectedSport
                          : activeTab === 'upcoming'
                            ? selectedSportUpcoming
                            : ''
                    }
                    defaultMarketsForSport={
                      activeTab === 'popular'
                        ? "1"
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
          </div>
        ) : (
          <div className="text-center py-12">
            {((activeTab === 'live' && isLoadingLive) ||
              (activeTab === 'upcoming' && isLoadingUpcoming) ||
              (activeTab === 'popular' && isLoading)) ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300 mx-auto"></div>
                <p className="mt-4 text-base-400 text-sm">Loading ...</p>
              </>
            ) : (
              <>
                <div className="text-base-400 text-lg mb-2">No matches available</div>
                <div className="text-base-500 text-sm">Select a different sport or check back later</div>
              </>
            )}
          </div>
        )}
      </SportsTabs>
    </div>
  );
};
export default MatchesSection;