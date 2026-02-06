import { Fixture } from "api/SportsHomePage/sportsHomePage.types";

export interface Team {
  name: string;
  logo: string;
}

export interface Sport {
  id: string;
  name: string;
  icon: string | null;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  score: string;
  time: string;
  isLive: boolean;
  league: string;
  leagueIcon: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  goals: {
    over: number;
    under: number;
    value: string;
  };
  change: string;
}

export interface League {
  id: number;
  name: string;
  isExpanded: boolean;
  matches: Fixture[];
  sportid?: string;
  segmentid?: string;
  leagueId?: string;
}

export interface MatchesSectionProps {
  activeTab?: 'popular' | 'live' | 'upcoming';
  selectedSport?: string;
}
