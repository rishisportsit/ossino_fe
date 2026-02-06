export type GetAffiliateGamesRequestData = {
  operatorId: string;
  platformId: string;
  brand: string;
  affiliateId: string;
};

export type AffiliateGame = {
  gameName: string;
  game_code: string;
  aggregator_type: string;
  provider: string;
  icon: string;
  gametype: string;
  image: {
    url: string | null;
    configurl: string;
  };
  _id: string;
};

export type AffiliateGamesData = {
  _id: string;
  operatorId: string;
  platformId: number;
  userId: string;
  brand: string;
  affiliateId: string;
  userName: string;
  gametype: string;
  games: AffiliateGame[];
  created_date: string;
  __v: number;
};

export type GetAffiliateGamesResponseData = {
  message: string;
  code: string;
  data: AffiliateGamesData;
};

export type GetPlayerDetailsByBtagRequestData = {
  bTag: string;
  channel: string;
  endDate: string;
  itemsPerPage: number;
  pageNumber: number;
  startDate: string;
};

export type PlayerDetail = {
  name: string;
  registeredDate: string;
  gamesPlayed: number;
  earnings: number;
  totalEarnings: number;
};

export type PlayerDetailsData = {
  totalRecords: number;
  data: PlayerDetail[];
};

export type GetPlayerDetailsByBtagResponseData = {
  code: string;
  message: string;
  targetSystem: string;
  result: {
    status: number;
    data: PlayerDetailsData;
    message: string;
  };
};