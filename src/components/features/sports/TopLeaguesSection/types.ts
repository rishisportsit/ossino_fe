import { LeagueItem } from "api/SportsHomePage/sportsHomePage.types";

export interface League {
  id: number;
  name: string;
  logo: string;
}

export interface TopLeaguesSectionProps {
  leagues?: LeagueItem[];
}
