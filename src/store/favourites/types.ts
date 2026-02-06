export interface FavoriteGame {
  userId: string;
  gameCode: string;
  gameName: string;
  categoryName: string;
  aggregator: string;
  providerName: string;
  operatorId: string;
  brandId: string;
}

export interface SetFavoriteRequest {
  accessToken: string;
  action: 'set' | 'remove';
  aggregator: any;
  brandId: string;
  categoryName: string;
  gameId: string;
  gameName: string;
  operatorId: string;
  providerName: string;
  userId: string;
}

export interface SetFavoriteResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: {
    statusCode: number;
    message: string;
  };
}

export interface GetFavoritesResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: {
    status: number;
    data: FavoriteGame[];
    message: string;
  };
}