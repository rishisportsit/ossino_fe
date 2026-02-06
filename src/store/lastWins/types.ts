export interface ApiLastWin {
  gameName: string;
  betId: string;
  gameId: string;
  amount: number;
  currency: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

export interface LastWinsType {
  id: string;
  winnerName: string;
  win: number;
  winTime: string;
  game: {
    src: string;
    alt: string;
  };
  gameId: string;
  gameName: string;
  currency: string;
}