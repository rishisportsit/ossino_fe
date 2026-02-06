import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sportsBookSignalR } from '../services/signalrService';
import { updateSelectionOdds, updateHotMultisData } from '../store/SportsHomePage/slice';
import { updateParlaySelectionOdds } from '../store/discoverySearchSports/slice';
import {
  selectLiveMatchesData,
  selectPopularHighlightsData,
  selectMatchOfTheDay,
  selectUpcomingMatchesData,
  selectLeaguesData,
  selectPopularMatchesForInnerPage,
  selectliveSportsInnerPage,
  selectUpComingSportsInnerPage,
  selectCompetitionDetails,
  selectHotMultisData
} from '../store/SportsHomePage/selectors';

export const useSignalRUpdates = () => {
  const dispatch = useDispatch();
  const liveMatchesData = useSelector(selectLiveMatchesData);
  const popularHighlightsData = useSelector(selectPopularHighlightsData);
  const matchOfTheDayData = useSelector(selectMatchOfTheDay);
  const upcomingMatchesData = useSelector(selectUpcomingMatchesData);
  const leaguesData = useSelector(selectLeaguesData);
  const popularMatchesForInnerPageData = useSelector(selectPopularMatchesForInnerPage);
  const liveSportsInnerPageData = useSelector(selectliveSportsInnerPage);
  const upComingSportsInnerPageData = useSelector(selectUpComingSportsInnerPage);
  const competitionDetailsData = useSelector(selectCompetitionDetails);
  const hotMultisData = useSelector(selectHotMultisData);
  const popularParlaysData = useSelector((state: any) => state.discoverySearchSports.popularParlays);
  const oversClubData = useSelector((state: any) => state.discoverySearchSports.oversClub);
  const followOrFadeData = useSelector((state: any) => state.discoverySearchSports.followOrFade);
  const hotDogsData = useSelector((state: any) => state.discoverySearchSports.hotDogs);

  const checkIfEventExists = (
    eventCode: string,
    section:
      | 'liveMatches'
      | 'popularHighlights'
      | 'matchOfTheDay'
      | 'popularMatchesForInnerPage'
      | 'liveSportsInnerPage'
      | 'UpComingSportsInnerPage'
      | 'Leagues'
      | 'competitionDetails'
      | 'upcomingMatches'
  ): { exists: boolean; sectionData: any } => {
    let sectionData;
    switch (section) {
      case 'liveMatches':
        sectionData = liveMatchesData?.result?.competitions?.fixtures;
        break;
      case 'popularHighlights':
        sectionData = popularHighlightsData?.result?.competitions?.fixtures;
        break;
      case 'matchOfTheDay':
        sectionData = matchOfTheDayData?.result?.competitions?.fixtures;
        break;
      case 'upcomingMatches':
        sectionData = upcomingMatchesData?.result?.competitions?.fixtures;
        break;
      case 'Leagues':
        sectionData = leaguesData?.result?.competitions?.fixtures;
        break;
      case 'popularMatchesForInnerPage':
        sectionData = popularMatchesForInnerPageData?.result?.competitions?.fixtures;
        break;
      case 'liveSportsInnerPage':
        sectionData = liveSportsInnerPageData?.result?.competitions?.fixtures;
        break;
      case 'UpComingSportsInnerPage':
        sectionData = upComingSportsInnerPageData?.result?.competitions?.fixtures;
        break;
      case 'competitionDetails':
        sectionData = competitionDetailsData?.result ? [competitionDetailsData.result] : null;
        break;
      default:
        sectionData = null;
    }

    if (!sectionData || !Array.isArray(sectionData)) return { exists: false, sectionData };

    const exists = sectionData.some(
      (fixture: any) =>
        fixture.eventCode?.toString() === eventCode ||
        fixture.providerFixtureId?.toString() === eventCode
    );
    return { exists, sectionData };
  };

  useEffect(() => {
    const handleSportFeedUpdate = (data: any, section: 'liveMatches' | 'popularHighlights' | 'upcomingMatches' | 'competitionDetails' | 'Leagues' | 'liveSportsInnerPage' | 'UpComingSportsInnerPage' | 'popularMatchesForInnerPage' | 'matchOfTheDay') => {
      const feedData = data?.arguments?.[0] || data;
      const { eventCode, eventChangeType } = feedData;
      if (!eventCode || !eventChangeType) return;
      switch (eventChangeType) {
        case "OnOddsChange":
          handleCompleteEventUpdate(feedData, section);
          break;
        default:
      }
    };
    const handleCompleteEventUpdate = (feedData: any, section: 'liveMatches' | 'popularHighlights' | 'matchOfTheDay' | 'popularMatchesForInnerPage' | 'liveSportsInnerPage' | 'UpComingSportsInnerPage' | 'Leagues' | 'competitionDetails' | 'upcomingMatches') => {
      const {
        eventCode,
        markets,
        statusName,
        homeScore,
        awayScore,
        currentMinute
      } = feedData;
      if (statusName === "Ended" || statusName === "Cancelled" || statusName === "Abandoned" || statusName === "Postponed") {
        return;
      }
      const { exists: eventExists, sectionData } = checkIfEventExists(eventCode.toString(), section);
      if (!sectionData && section !== 'competitionDetails') {
        return;
      }
      if (sectionData && (section === 'upcomingMatches' || section === 'UpComingSportsInnerPage' || section ==='popularMatchesForInnerPage') && statusName === "Live") {
        return;
      }
      if (section === 'competitionDetails' && !eventExists) {
        const eventExistsInHotMultis = hotMultisData?.data?.list?.some((multi: any) =>
          multi.accumulatorSelections?.some((selection: any) =>
            selection?.eventId?.toString() === eventCode.toString() ||
            selection?.providerFixtureId?.toString() === eventCode.toString()
          )
        );
        const eventExistsInPopularParlays = popularParlaysData?.result?.data?.some((parlay: any) =>
          parlay.accumulatorSelections?.some((selection: any) =>
            selection?.eventId?.toString() === eventCode.toString()
          )
        );
        if (markets && Array.isArray(markets) && markets.length > 0) {
          markets.forEach((market: any) => {
            const { marketId, marketStatusName, selections } = market;
            if (selections && Array.isArray(selections)) {
              selections.forEach((selection: any) => {
                if (eventExistsInHotMultis) {
                  dispatch(updateHotMultisData({
                    eventCode: eventCode.toString(),
                    marketId: marketId,
                    selectionId: selection.selectionId,
                    decimalOdds: selection.decimalOdds,
                    marketStatusName: marketStatusName,
                    selectionStatus: selection.selectionStatus,
                    selectionSuspended: selection.selectionSuspended,
                    section: 'hotMultis'
                  }));
                }
                if (eventExistsInPopularParlays) {
                  dispatch(updateParlaySelectionOdds({
                    eventCode: eventCode.toString(),
                    marketId: marketId,
                    selectionId: selection.selectionId,
                    decimalOdds: selection.decimalOdds,
                    marketStatusName: marketStatusName,
                    selectionStatus: selection.selectionStatus,
                    selectionSuspended: selection.selectionSuspended
                  }));
                }
              });
            }
          });
        }
      }
      if (!eventExists && section !== 'competitionDetails' && section !== 'matchOfTheDay') {
        dispatch(updateSelectionOdds({
          eventCode: eventCode.toString(),
          eventData: feedData,
          section: section
        }));
        return;
      }
      else {
        if (statusName !== undefined || homeScore !== undefined || awayScore !== undefined || currentMinute !== undefined) {
          dispatch(updateSelectionOdds({
            eventCode: eventCode.toString(),
            eventStatus: statusName,
            homeScore: homeScore?.toString(),
            awayScore: awayScore?.toString(),
            currentMinute: currentMinute?.toString(),
            eventData: null,
            section: section
          }));
        }
      }
      if (markets && Array.isArray(markets) && markets.length > 0) {
        markets.forEach((market: any) => {
          const { marketId, marketStatusName, selections } = market;
          if (selections && Array.isArray(selections)) {
            selections.forEach((selection: any) => {
              dispatch(updateSelectionOdds({
                eventCode: eventCode.toString(),
                marketId: marketId,
                selectionId: selection.selectionId,
                decimalOdds: selection.decimalOdds,
                marketStatusName: marketStatusName,
                selectionStatus: selection.selectionStatus,
                selectionSuspended: selection.selectionSuspended,
                section: section
              }));
            });
          }
        });
      }
    };

    const handleLiveSportFeed = (data: any) => {
      handleSportFeedUpdate(data, 'liveMatches');
      handleSportFeedUpdate(data, 'liveSportsInnerPage');
    };

    const handleTopGamesSportFeed = (data: any) => {
      const feedData = data?.arguments?.[0] || data;
      const { eventCode, eventChangeType } = feedData;
      if (!eventCode || !eventChangeType) return;
      if (eventChangeType === "OnOddsChange") {
        handleCompleteEventUpdate(feedData, 'popularHighlights');
      }
    };

    const handleMatchesDailyFeed = (data: any) => {
      handleSportFeedUpdate(data, 'upcomingMatches');
      handleSportFeedUpdate(data, 'UpComingSportsInnerPage');
    }

    const handleFixtureFeed = (data: any) => {
      handleSportFeedUpdate(data, 'competitionDetails');
    }

    const handleLeagueFeed = (data: any) => {
      handleSportFeedUpdate(data, 'Leagues');
    }
    const handleTopLeaguesFeed = (data: any) => {
      handleSportFeedUpdate(data, 'popularMatchesForInnerPage');
    }

    const handleMatchofthedayFeed = (data: any) => {
      handleSportFeedUpdate(data, 'matchOfTheDay');
    }

    sportsBookSignalR.on('receiveLiveSportFeed', handleLiveSportFeed);
    sportsBookSignalR.on('receiveTopGamesSportFeed', handleTopGamesSportFeed);
    sportsBookSignalR.on('receiveMatchesDailyFeed', handleMatchesDailyFeed);
    sportsBookSignalR.on('receiveFixtureFeed', handleFixtureFeed);
    sportsBookSignalR.on('receiveLeagueFeed', handleLeagueFeed);
    sportsBookSignalR.on('receiveTopLeaguesFeed', handleTopLeaguesFeed);
    sportsBookSignalR.on('receiveMatchOfTheDayFeed', handleMatchofthedayFeed);

    return () => {
      sportsBookSignalR.off('receiveLiveSportFeed', handleLiveSportFeed);
      sportsBookSignalR.off('receiveTopGamesSportFeed', handleTopGamesSportFeed);
      sportsBookSignalR.off('receiveMatchesDailyFeed', handleMatchesDailyFeed);
      sportsBookSignalR.off('receiveFixtureFeed', handleFixtureFeed);
      sportsBookSignalR.off('receiveLeagueFeed', handleLeagueFeed);
      sportsBookSignalR.off('receiveTopLeaguesFeed', handleTopLeaguesFeed);
      sportsBookSignalR.off('receiveMatchOfTheDayFeed', handleTopLeaguesFeed);
    };
  }, [dispatch, liveMatchesData, popularHighlightsData, matchOfTheDayData, upcomingMatchesData, leaguesData, popularMatchesForInnerPageData, liveSportsInnerPageData, upComingSportsInnerPageData, competitionDetailsData, hotMultisData, popularParlaysData, oversClubData, followOrFadeData, hotDogsData]);
};