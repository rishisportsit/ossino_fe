import { RootState } from '../index';

export const selectAllStandings = (state: RootState) => state.standings.standings;
export const selectStandingsLoading = (state: RootState) => state.standings.loading;
export const selectStandingsLeague = (state: RootState) => state.standings.league;
