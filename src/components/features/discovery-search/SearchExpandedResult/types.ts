export type ResultTeamData = {
  id: number;
  image: string;
  name: string;
};

export type ResultData = {
  id: number;
  name: string;
  bets: number;
  result: string;
  live: boolean;
  teams: ResultTeamData[];
};
