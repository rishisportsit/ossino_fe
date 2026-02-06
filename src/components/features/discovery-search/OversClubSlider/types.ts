export type OversClubTeamData = {
  id: number;
  image: string;
  name: string;
};

export type OversClubData = {
  id: number;
  date: string;
  time: string;
  teams: OversClubTeamData[];
  rate: number;
};
