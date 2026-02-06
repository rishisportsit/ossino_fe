import { Fixture } from "api/SportsHomePage/sportsHomePage.types";

export interface OverClubsRequest {
  accessToken?: string;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  'X-Language-Code'?: string;
  sportIds: number;
  matchStatus: string;
  dataFilterOrder: string;
}
export interface TrendingGamesRequest {
  accessToken?: string;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  'X-Language-Code'?: string;
  isLiveRequired: boolean;
  offset: number;
}

export interface DiscoverySearchRequest {
  accessToken?: string;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  'X-Language-Code'?: string;
  searchString?: string;
  userId?: string;
  signal?: AbortSignal;
}

export interface DiscoverySearchResponse {
  code: string;
  error?: boolean;
  message: string;
  targetSystem: string;
  result: DiscoverySearchResult;
}

export interface DiscoverySearchResult {
  all_competitions: {
    fixtures: Fixture[];
    count?: number;
  };
}

export interface RecentSearchRequest {
  accessToken?: string;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  'X-Language-Code'?: string;
  userId?: string;
}

export interface RecentSearchResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: string[];
}

// PopularParlays
export interface PopularParlaysRequest {
  accessToken?: string;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
}

export interface PopularParlaysResponse {
  totalRecords: number;
  status: number;
  data: ParlayConfig[];
  message: string;
}

export interface ParlayConfig {
  client: string;
  title: string;
  minStake: number;
  maxStake: number;
  createdDate: string;
  updatedDate: string;
  status: string;
  accumulatorSelections: AccumulatorSelection[];
  allUsers: boolean;
}

export interface AccumulatorSelection {
  sportId: number;
  sportName: string;
  countryId: number;
  countryName: string;
  leagueId: number;
  leagueName: string;
  eventId: number;
  eventName: string;
  marketId: number;
  marketName: string;
  subMarketName: string;
  outComeId: string;
  outComeName: string;
  odds: number;
  eventStartDate: string;
  selectionStatus?: string;
  marketStatus?: string;
  selectionSuspended?: boolean;
}

