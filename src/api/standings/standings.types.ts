export interface Standing {
  rank: number;
  clubName: string | null;
  logoUrl: string | null;
  goals: number;
  points: number;
  wins: number;
}

export interface StandingsResponse {
  sportId: string;
  country: string;
  league: string;
  season: string;
  updatedAt: string;
  standings: Standing[];
}
