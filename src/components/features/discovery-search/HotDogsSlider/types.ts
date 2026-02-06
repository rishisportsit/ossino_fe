export type HotDogTeamData = {
  id: number;
  image: string;
  name: string;
  win: boolean;
};

export type HotDogData = {
  id: number;
  date: string;
  time: string;
  rate: number;
  teams: HotDogTeamData[];
};
