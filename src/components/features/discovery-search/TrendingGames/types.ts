export type TrendingGameTeamData = {
  id: number;
  name: string;
  image: string;
};

export type TrendingGameData = {
  id: number;
  teams: TrendingGameTeamData[];
};
