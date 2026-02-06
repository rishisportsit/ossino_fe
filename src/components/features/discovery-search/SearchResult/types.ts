export type ResultTeamData = {
  id: number;
  image: string;
  name: string;
};

export type ResultLeagueData = {
  id: number;
  name: string;
  teams: ResultTeamData[];
};

export type ResultData = {
  id: number;
  name: string;
  bets: number;
  leagues: ResultLeagueData[];
};
