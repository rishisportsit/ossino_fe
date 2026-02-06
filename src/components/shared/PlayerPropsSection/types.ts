export interface Team {
  name: string;
  logo: string;
}

export interface Player {
  name: string;
  avatar: string;
}

export interface PlayerPropCardProps {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  matchTime: string;
  peopleBet: number;
  player: Player;
  betType: {
    type: string; 
    value: number; 
    playerName: string;
    stat: string;
  };
  odds: number;
}

export interface PlayerPropsSectionProps {
  playerProps?: PlayerPropCardProps[];
}
