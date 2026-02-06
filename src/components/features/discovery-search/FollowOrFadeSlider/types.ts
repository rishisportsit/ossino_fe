export type FollowOrFateTeamData = {
  id: number;
  image: string;
  rate: number;
  name: string;
};

export type FollowOrFadeData = {
  id: number;
  date: string;
  time: string;
  teams: FollowOrFateTeamData[];
};
