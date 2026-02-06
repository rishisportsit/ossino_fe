import type { RootState } from '..';

export const selectTopLeaguesData = (state: RootState) => state.sportsBook?.data?.topLeagues;
export const selectHotMultisData = (state: RootState) => state.sportsBook?.data.hotMultis;
export const selectPopularHighlightsData = (state: RootState) => state.sportsBook?.data?.popularHighlights;
export const selectLiveMatchesData = (state: RootState) => state.sportsBook?.data?.liveMatches;
export const selectMatchOfTheDay = (state: RootState) => state.sportsBook?.data?.matchOfTheDay;
export const selectCompetitionDetails = (state: RootState) => state.sportsBook?.data?.competitionDetails;
export const selectUpcomingMatchesData = (state: RootState) => state.sportsBook?.data?.upcomingMatches;
export const selectLeaguesData = (state: RootState) => state.sportsBook?.data?.Leagues;
export const selectPopularMatchesForInnerPage = (state: RootState) => state.sportsBook?.data?.popularMatchesForInnerPage;
export const selectliveSportsInnerPage = (state: RootState) => state.sportsBook?.data?.liveSportsInnerPage;
export const selectUpComingSportsInnerPage = (state: RootState) => state.sportsBook?.data?.UpComingSportsInnerPage;
export const selectUpcomingCompetitionsCount = (state: RootState) => state.sportsBook?.data?.upcomingCompetitionsCount?.result;
export const selectInnerTabLiveMatches = (state: RootState) => state.sportsBook?.data?.innerTabLiveMatches;
export const selectBetHistoryInSportsBook = (state: RootState) => state.sportsBook?.data?.betHistoryInSportsBook?.result;
export const selectCashoutApi = (state: RootState) => state.sportsBook?.data?.cashoutApi;
export const selectRebetApi = (state: RootState) => state.sportsBook?.data?.rebetApi;