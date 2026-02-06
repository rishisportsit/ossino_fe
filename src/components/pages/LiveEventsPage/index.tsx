import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getInnerTabLiveMatches, getLiveCompetitionsCount } from 'store/SportsHomePage/slice';
import { selectBetHistoryInSportsBook, selectInnerTabLiveMatches } from 'store/SportsHomePage/selectors';
import { SportWiseMultiMarkets } from 'helpers/SportWiseMultiMarkets';
import Select from 'components/shared/Select';
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import SportSelector from 'components/features/sports/MatchesSection/SportSelector';
import LeagueAccordion from 'components/features/sports/MatchesSection/LeagueAccordion';
import MobileBetslip from 'components/features/sports/BetslipSection/MobileBetslip';
import BetslipSection from 'components/features/sports/BetslipSection';
import PageHeader from 'components/shared/PageHeader';
import { useBetSlipData } from 'hooks/useBetSlipData';
import { useSportSignalRGroups } from 'hooks/useSignalRGroups';

const LiveEventsPage = () => {
  const activeTab = 'live';

  const { screenWidth } = useBreakpoint();
  const isDesktop = screenWidth >= BREAKPOINTS.xl;
  const isDesktopScreen = screenWidth >= BREAKPOINTS.lg;

  const originalBetHistory = useAppSelector(selectBetHistoryInSportsBook);
  const { betSlipCount } = useBetSlipData();

  const liveCompetitionsCountdata = useAppSelector((state) => state?.sportsBook?.data?.liveCompetitionsCount?.result) || [];
  const [selectedSport, setSelectedSport] = useState<string>('');

  useSportSignalRGroups(
    selectedSport,
    'live'
  );
  const prevSelectedSport = useRef<string>(selectedSport);

  const uiSupportedMarkets = SportWiseMultiMarkets?.find((sports: any) => sports?.sportId === Number(selectedSport))?.markets?.marketsSupported?.map((m: any) => {
    const uiSupportedMarketsDataList = {
      UIMarketName: m?.UIMarketName,
      marketTemplateId: m?.marketTemplateId
    }
    return uiSupportedMarketsDataList;
  });

  const getDefaultMarketLive = () => {
    if (!uiSupportedMarkets || uiSupportedMarkets.length === 0) return '1';

    if (isDesktopScreen) {
      return uiSupportedMarkets[1]?.marketTemplateId || uiSupportedMarkets[0]?.marketTemplateId || '1';
    } else {
      return uiSupportedMarkets[0]?.marketTemplateId || '1';
    }
  };

  const [selectedOverUnderLive, setSelectedOverUnderLive] = useState(() => getDefaultMarketLive());
  const [isLoadingLive, setIsLoadingLive] = useState(true);

  useEffect(() => {
    if (prevSelectedSport.current !== selectedSport || !uiSupportedMarkets) {
      const defaultMarket = getDefaultMarketLive();
      setSelectedOverUnderLive(defaultMarket);
      prevSelectedSport.current = selectedSport;
    }
  }, [selectedSport, uiSupportedMarkets]);

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
    if (selectedSport) {
      const firstMarket = uiSupportedMarkets?.[0]?.marketTemplateId || '1';
      dispatch(getInnerTabLiveMatches({
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
    dispatch(getLiveCompetitionsCount({
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      isPrematchBookedReq: false,
    }))
  }, [dispatch, xApiKey, xClientId]);

  useEffect(() => {
    if (liveCompetitionsCountdata && liveCompetitionsCountdata.length > 0) {
      const firstSportId = liveCompetitionsCountdata[0]?.sportId;
      if (firstSportId && !selectedSport) {
        setSelectedSport(firstSportId);
      }
    }
  }, [liveCompetitionsCountdata]);

  const liveMatchesData = useAppSelector(selectInnerTabLiveMatches) || [];
  const liveMatchesLoading = useAppSelector((state) => state?.sportsBook?.data?.innerTabLiveMatches?.loading);
  const getLeaguesForLive = () => {
    return groupFixturesByLeague(liveMatchesData?.result?.competitions?.fixtures || []);
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

  const renderOverUnderDropdown = () => {
    if (isLoadingLive || !uiSupportedMarkets || uiSupportedMarkets.length === 0) return null;

    const currentDefaultMarket = (() => {
      if (isDesktopScreen) {
        return uiSupportedMarkets[1]?.marketTemplateId || uiSupportedMarkets[0]?.marketTemplateId || '1';
      } else {
        return uiSupportedMarkets[0]?.marketTemplateId || '1';
      }
    })();

    const displayValue = uiSupportedMarkets.find((m: any) => m.marketTemplateId === selectedOverUnderLive)?.UIMarketName
      || uiSupportedMarkets.find((m: any) => m.marketTemplateId === currentDefaultMarket)?.UIMarketName
      || uiSupportedMarkets[0]?.UIMarketName;

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
              {uiSupportedMarkets
                ?.filter((market: any, index: number) => {
                  if (isDesktopScreen && index === 0) return false;
                  return true;
                })
                .map((market: any, index: number) => (
                  <div
                    key={index}
                    className="px-2 py-1 hover:bg-base-690 rounded cursor-pointer text-base-200 whitespace-nowrap"
                    onClick={() => setSelectedOverUnderLive(market?.marketTemplateId)}
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
    <>
      <div className="px-4 pt-[75px] pb-4 md:pt-0 xl:px-5 ">
        <PageHeader pathNameFromComponent="Live Events" />
        <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:flex xl:h-full">
          <div className="xl:flex-1 min-w-0">
            {isLoadingLive ? (
              <LoadingSpinner />
            ) : (liveMatchesData?.result?.competitions?.fixtures?.length ?? 0) > 0 ? (
              <div>
                {/* Sport Selector */}
                <SportSelector
                  sports={liveCompetitionsCountdata}
                  selectedSport={selectedSport}
                  onSportChange={setSelectedSport}
                />

                {/* Market Dropdown */}
                {selectedSport && renderOverUnderDropdown()}

                {/* Leagues Accordion */}
                <div className="mt-2 gap-4 flex flex-col">
                  {getLeaguesForLive().length > 0 ? (
                    getLeaguesForLive().map((league, index) => (
                      <LeagueAccordion
                        key={league?.id}
                        league={league}
                        selectedOverUnder={selectedOverUnderLive}
                        popularHighlightsLoading={false}
                        liveMatchesLoading={liveMatchesLoading}
                        upcomingMatchesLoading={false}
                        index={index}
                        addingSelections={addingSelections}
                        setAddingSelections={setAddingSelections}
                        activeTab="live"
                        SportsIdForDesktop={selectedSport}
                        defaultMarketsForSport={uiSupportedMarkets?.[0]?.marketTemplateId || '1'}
                        showAllByDefault={true}
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
                <div className="text-base-400 text-lg mb-2">No matches available</div>
                <div className="text-base-500 text-sm">Select a different sport or check back later</div>
              </div>
            )}
          </div>
          <div className="hidden xl:flex xl:mx-5 xl:bg-borderdefault xl:min-h-full xl:w-px" />
          {isDesktop ? <BetslipSection betcount={betSlipCount} myBetsCount={originalBetHistory?.length} /> : null}
        </div>
      </div>
      {/* Mobile Betslip Button and Panels */}
      <MobileBetslip betCount={betSlipCount} />
    </>
  );
};
export default LiveEventsPage;