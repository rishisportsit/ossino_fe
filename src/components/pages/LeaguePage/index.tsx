import PageHeader from 'components/shared/PageHeader';
import Select from 'components/shared/Select';
import { useEffect, useState } from 'react';
import { SportWiseMultiMarkets } from 'helpers/SportWiseMultiMarkets';
import { SPORTS_ID } from 'constants/storage';
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import MatchItem from 'components/features/sports/MatchesSection/MatchItem';
import BetslipSection from 'components/features/sports/BetslipSection';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getLeagues } from 'store/SportsHomePage/slice';
import { selectBetHistoryInSportsBook, selectLeaguesData } from 'store/SportsHomePage/selectors';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MobileBetslip from 'components/features/sports/BetslipSection/MobileBetslip';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import LoadingSpinner from 'components/shared/ui/LoadingSpinner';
import { useBetSlipData } from 'hooks/useBetSlipData';
import { useLeagueSignalRGroups } from 'hooks/useSignalRGroups';

const groupFixturesByLeague = (fixtures: any[]) => {
  const leaguesMap: { [key: string]: any } = {};
  fixtures.forEach((fixture) => {
    const leagueName = fixture.leagueName || 'Unknown League';
    if (!leaguesMap[leagueName]) {
      leaguesMap[leagueName] = {
        id: fixture.providerFixtureId,
        name: leagueName,
        matches: [],
      };
    }
    leaguesMap[leagueName].matches.push(fixture);
  });
  return Object.values(leaguesMap);
};

const LeaguePage = () => {
  const { sportsId, segmentId, leagueIds } = useParams<{ sportsId: string, segmentId: string, leagueIds: string }>();
  const leagueIdArray = leagueIds ? leagueIds.split(',').map(id => parseInt(id)) : [];
  useLeagueSignalRGroups(leagueIdArray);

  const originalBetHistory = useAppSelector(selectBetHistoryInSportsBook);
  const { betSlipCount } = useBetSlipData();

  const uiSupportedMarkets = SportWiseMultiMarkets?.find((sports: any) => sports?.sportId === (sportsId ? parseInt(sportsId) : SPORTS_ID.sportId))?.markets?.marketsSupported?.map((m: any) => ({
    UIMarketName: m?.UIMarketName,
    marketTemplateId: m?.marketTemplateId
  }));
  const getDefaultMarket = () => {
    if (!uiSupportedMarkets || uiSupportedMarkets.length === 0) return '1';

    if (isDesktopScreen) {
      return uiSupportedMarkets[1]?.marketTemplateId || uiSupportedMarkets[0]?.marketTemplateId || '1';
    } else {
      return uiSupportedMarkets[0]?.marketTemplateId || '1';
    }
  };
  const [expandedLeagues, setExpandedLeagues] = useState<{ [key: string]: boolean }>({});
  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;
  const [selectedOverUnderPopular, setSelectedOverUnderPopular] = useState(getDefaultMarket());

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

  const dispatch = useAppDispatch();
  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;
  useEffect(() => {
    dispatch(getLeagues({
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      isNextBetRequired: false,
      categoryId: segmentId ? parseInt(segmentId) : 0,
      tournamentIds: leagueIds ? leagueIds.split(',').map(id => parseInt(id)) : [],
      sportId: sportsId ? parseInt(sportsId) : SPORTS_ID.sportId,
      markets: isDesktopScreen ? [uiSupportedMarkets?.[0]?.marketTemplateId || '1', Number(selectedOverUnderPopular)] : [Number(selectedOverUnderPopular)],
      minutes: 43200,
    }));
  }, [dispatch, selectedOverUnderPopular, sportsId, segmentId, leagueIds, xApiKey, xClientId]);
  const LeaguesData = useSelector(selectLeaguesData);
  const isLoading = LeaguesData.loading;
  const fixtures = LeaguesData?.result?.competitions?.fixtures;
  const lebaname = LeaguesData?.result?.competitions?.fixtures[0]?.leagueName;

  if (isLoading && (!fixtures || fixtures?.length === 0)) {
    return (<LoadingSpinner />)
  }

  if ((!fixtures || fixtures?.length === 0) && !isLoading) {
    return (
      <div className="px-4 pt-[75px] pb-4 md:pt-0 xl:px-5">
        <PageHeader label='Back' />
        <div style={{ height: "55vh" }} className="flex flex-col justify-center">
          <NoItemsMessage message="No data found" />
        </div>
      </div>
    )
  }
  const renderOverUnderDropdown = (selectedValue: string, setSelectedValue: (v: string) => void, markets = uiSupportedMarkets) => {
    if (!markets || markets.length === 0) return null;

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
    <>

      <div className="px-4 pt-[75px] pb-4 md:pt-0 xl:px-5">
        <PageHeader label={lebaname} />
        <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:flex xl:h-full">
          <div className="xl:flex-1">
            <div className='flex gap-2 mb-3'>
              <div className="flex-1">
                {renderOverUnderDropdown(selectedOverUnderPopular, setSelectedOverUnderPopular, uiSupportedMarkets)}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {groupFixturesByLeague(fixtures || []).map((league: any) => {
                const showAllEvents = expandedLeagues[league.id];
                const eventsToShow = showAllEvents ? league.matches : league.matches.slice(0, 20);
                return (
                  <div key={league.id} className='p-4 rounded-xl bg-base-735 shadow-elevation'>
                    <div className='pt-0 flex flex-col items-center pb-2'>
                      <div className="flex flex-col gap-3 mb-2 w-full">
                        {eventsToShow.map((fixture: any) => (
                          <MatchItem
                            key={fixture.providerFixtureId}
                            match={fixture}
                            selectedOverUnder={selectedOverUnderPopular}
                            isLoading={isLoading}
                            addingSelections={addingSelections}
                            setAddingSelections={setAddingSelections}
                            SportsIdForDesktop={sportsId ? sportsId : SPORTS_ID.sportId.toString()}
                            defaultMarketsForSport={uiSupportedMarkets?.[0]?.marketTemplateId || '1'}
                          />
                        ))}
                      </div>
                      {league.matches.length > 20 && !showAllEvents && (
                        <Button
                          variant="text"
                          className="flex items-center w-fit gap-2 mx-auto"
                          onClick={() => setExpandedLeagues(prev => ({ ...prev, [league.id]: true }))}
                        >
                          Load more
                          <Icon
                            id="arrowDownIcon"
                            href="/icons/arrowDown.svg"
                            className="w-4 h-4 text-primary-1 rotate-0 transition-transform duration-200 origin-center mt-1"
                          />
                        </Button>
                      )}
                      {league.matches.length > 20 && showAllEvents && (
                        <Button
                          variant="text"
                          className="flex items-center w-fit gap-2 mx-auto"
                          onClick={() => setExpandedLeagues(prev => ({ ...prev, [league.id]: false }))}
                        >
                          Show less
                          <Icon
                            id="arrowDownIcon"
                            href="/icons/arrowDown.svg"
                            className="w-4 h-4 text-primary-1 rotate-90 transition-transform duration-200 origin-center mt-1"
                          />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hidden xl:flex xl:mx-5 xl:bg-borderdefault xl:min-h-full xl:w-px" />
          {isDesktopScreen ? <BetslipSection betcount={betSlipCount} myBetsCount={originalBetHistory?.length} /> : null}
          {/* Mobile Betslip Button and Panels */}
          <MobileBetslip betCount={betSlipCount} />
        </div>
      </div>
    </>
  );

}

export default LeaguePage;