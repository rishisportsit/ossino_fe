export interface LeagueRequest {
  markets: number[];
  sportId: number;
  categoryId?: number;
  tournamentIds?: number[];
  isliveRequired?: boolean;
  isNextBetRequired?: boolean;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  minutes?: number;
}
// Competition Details API response type
export interface CompetitionDetailsResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: {
    fixtures: Fixture[];
    count: number;
  };
}
export interface MarketTemplateGroups {
  sportId?: number;
  prematch?: MarketTemplateGroup[];
  live?: MarketTemplateGroup[];
}

export interface MarketTemplateGroup {
  marketTemplateGroupId?: number;
  marketTemplateGroupName?: string;
  sortOrder?: number;
  marketTemplateIds?: string[];
}

// Top Leagues
export interface TopLeaguesRequest {
  accessToken?: string;
  sportId?: number;
  minutes?: number;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  isNextBetRequired?: boolean;
}


export interface TopLeaguesResponse {
  code: string;
  message: string;
  targetSystem: string;
  devMessage: string;
  error: boolean;
  result: {
    leagues: LeagueItem[];
    competitions: Fixture[];
    pageInfo: LeaguePageInfo;
  };
}

export interface ActualTopLeaguesResponse {
  code: string;
  message: string;
  targetSystem: string;
  devMessage: string;
  error: boolean;
  result: LeagueItem[];
  pageInfo: {
    offset: number;
    limit: number;
    totalCount: number;
    total_count: number;
  };
}
export type CompetitionDetailsParams = {
  competitionId: string;
  xClientId: string;
  xApiKey: string;
  xLanguageCode?: string;
};

export interface TournamentTranslation {
  leagueName: string;
  segmentName: string;
  languageCode: string;
}

export interface LeagueItem {
  sportId: number;
  segmentId: number;
  segmentName: string;
  sortOrder: number;
  leagueId: number;
  leagueName: string;
  isLive: boolean;
  isDefault: boolean;
  isFavouriteLeague: boolean;
  topTournamentTranslation: TournamentTranslation;
  translations: TournamentTranslation;
  eventCount: number | null;
}

export interface LeaguePageInfo {
  offset: number;
  limit: number;
  totalCount: number;
  total_count: number;
}

// Hot Multis
export interface HotMultisRequest {
  accessToken?: string;
  sportId?: number;
  accumulatorsType?: string;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  'X-Language-Code'?: string;
}

export interface HotMultisResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: {
    totalRecords: number;
    status: number;
    data: HotMultiItem[];
    message: string;
  };
}

export interface HotMultiItem {
  id: number;
  client: string;
  title: string;
  userTags: string[];
  liabilityLimit: number;
  remainingLiability: number;
  minimumOdds: number;
  minStake: number;
  maxStake: number;
  startDate: string;
  endDate: string;
  createdBy: string | null;
  updatedBy: string | null;
  createdDate: string;
  updatedDate: string;
  status: string;
  accumulatorSelections: AccumulatorSelection[];
  isAllUsers: boolean;
}

export interface AccumulatorSelection {
  id: number | null;
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
  subMarketId: number | null;
  subMarketName: string;
  outComeId: string;
  outComeName: string;
  odds: number;
  eventStartDate: string;
  selectionStatus: string;
  marketStatusName: string;
  fixtureStatusName: string;
  translations: Translations;
}

export interface Translations {
  languageCode: string;
  sportName: string;
  countryName: string;
  eventName: string;
  outComeName: string;
  leagueName: string;
}

export interface PopularHighlightsRequest {
  accessToken?: string;
  sportId?: number;
  sportsid?: number | number[];
  markets?: string | number | (string | number)[];
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  'X-Language-Code'?: string;
  isNextBetRequired?: boolean;
  isSelectedFromHeader?: boolean;
  isPrematchBookedReq?: boolean;
  sports?: PopularHighlightSportRequest[];
  minutes?: number;
  selectionId?: string[];
}
export interface HeaderRequest {
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  'X-Language-Code'?: string;
}

export interface PopularHighlightSportRequest {
  sportId: number;
  markets: string;
}

export interface PopularHighlightsResponse {
  code: string;
  error: boolean;
  message: string;
  targetSystem: string;
  result: PopularHighlightsResult;
}

export interface PopularHighlightsResult {
  pageInfo?: PageInfo;
  competitions: {
    fixtures: Fixture[];
    count?: number;
  };
  clientId?: string;
}

export interface PageInfo {
  offset: number;
  limit: number;
  totalCount: number;
  total_count: number;
}

export interface Fixture {
  providerFixtureId: string;
  sptechFixtureId: string;
  eventCode: number;
  fixtureStartDate: string;
  fixtureStatusName: string;
  leagueId: number;
  sportId: number;
  eventStatus?: string;
  event_status?: string;
  bookingStatus: string;
  booking_status: string;
  segmentId: number;
  homeScore?: string;
  awayScore?: string;
  currentMinute?: string;
  matchStopped: boolean;
  match_stopped: boolean;
  marketCount: number;
  marketId: string;
  homeName: string;
  awayName: string;
  leagueName: string;
  segmentName: string;
  sportName: string;
  scores?: string;
  fixtureName: string;
  translations: FixtureTranslations;
  markets: Market[];
  marketTemplateGroups?: MarketTemplateGroups;
  pId: number;
  isTrending: boolean;
  isDefault: boolean;
  isFavouriteFixture: boolean;
  isFavouriteLeague: boolean;
  isBetStop: boolean;
  isBetStopGlobal: boolean;
  isCustomBetAvailable: boolean;
  isCashoutAvailability: boolean;
}

export interface FixtureTranslations {
  fixtureName: string;
  homeName: string;
  awayName: string;
  leagueName: string;
  sportName: string;
  segmentName: string;
  languageCode: string;
}

export interface Market {
  marketTemplateId: string;
  marketId: string;
  marketName: string;
  marketStatusName: string;
  line: string;
  translations: MarketTranslations;
  selections: Selection[];
  fancyMarket: boolean;
  cashoutAvailability: boolean;
}

export interface MarketTranslations {
  marketName: string;
  languageCode: string;
}

export interface Selection {
  selId: string;
  selectionName: string;
  decimalOdds: string;
  selectionStatus: string;
  selectionId: string;
  previousOdds: string;
  oddsChangePercentage: string;
  subMarketName: string;
  probability: string;
  selectionSuspended?: boolean;
  translations: SelectionTranslations;
  betCount: number;
}

export interface SelectionTranslations {
  selectionName: string;
  languageCode: string;
}

export interface LiveMatchesCountRequest {
  accessToken?: string;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  'X-Language-Code'?: string;
  isPrematchBookedReq?: false
  minutes?: number;
}


export interface LiveMatchesCountResponse {
  result: {
    sports: LiveMatchesCountResults[];
  };
  code: string;
  message: string;
  targetSystem: string;
}

export interface LiveMatchesCountResults {
  sportId?: string;
  sportName?: string;
  count?: number;
  translations?: SportTranslation;
}

export interface SportTranslation {
  sportName: string;
  languageCode: string;
}

// Bet History in Sports Home Page
export interface BetHistoryRequest {
  accessToken: string;
  channel: string;
  settled: boolean;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  offset?: number;
  "X-Client-Id"?: string;
  signal?: AbortSignal;
}

export interface BetPart {
  selectionId: string;
  sportId: number;
  sportName: string;
  categoryId: number;
  categoryName: string;
  tournamentId: number;
  tournamentName: string;
  competitionId: number;
  eventCode: number;
  competitionName: string;
  competitionStartDate: string;
  competitionStatus: string;
  marketId: number;
  marketName: string;
  subMarketName: string;
  outcomeId: string;
  outcomeName: string;
  odds: string;
  outcomeResult: string;
  scores: string;
  ticketTimeScore: string;
  settleTimeScore: string;
  isoutrights: boolean;
  matchStatus: string;
  eventStatus: string;
  newScheduledTime: string;
  currentEventStatus: string;
  ticketTimeProbability: number;
  currentTimeProbability: number | string;
  country: string;
  ticketTimeEventStatus: string;
  currentMatchMinutes: string;
  settleTimeMatchMinutes: string;
  ticketTimeMatchMinutes: string;
  settleTimeEventStatus: string;
  providerId: number;
  round: string;
  boostedOdds: string;
  providerOdds: string;
  isBoosted: boolean;
}

export interface Bet {
  ticketId: string;
  channel: string;
  oddsChangeType: string;
  status: string;
  createdDate: string;
  stake: string;
  remainingStake: number;
  isPartialCoBet: boolean;
  currency: string;
  totalOdds: string;
  payout: string;
  potentialPayout: string;
  cashoutStatus: string;
  cashOutAmount: string | null;
  isFreeBet: boolean;
  stakeBonus: number;
  stakeReal: number;
  bonusWinnings: number;
  bonusPercentage: number;
  groupCount: number;
  combinationCount: number;
  minOdds: number;
  maxOdds: number;
  minPayout: number;
  maxPayout: number;
  freeBetId: string | null;
  bonusType: string;
  resultedDate: string | null;
  betType: string;
  maxWinAmount: string;
  maxWinPercentage: string;
  clientMaxPayout: number;
  betParts: BetPart[];
  cashoutHistory?: any[];
  stakeTaxAmount?: number;
  winningTaxAmount?: number;
  stakeTax?: number;
  winningTax?: number;
  stakeAfterTax?: number;
  totalStake?: number;
  isNftHoldingCreated?: boolean;
  isNftTraded?: boolean;
  subBetType?: string;
  betEligibleForOneCutBonus?: boolean;
  betEligibleForTwoCutBonus?: boolean;
  shortBetId?: string;
  maxPayoutCapped?: boolean;
  partialCoBet?: boolean;
  tId?: number;
  isPrinted?: boolean;
}

export interface BetHistoryResponse {
  code: string;
  message: string;
  statusCode: number;
  result: {
    pageInfo: {
      offset: number;
      limit: number;
      total: number;
      totalStake: number;
      totalPayout: number;
    };
    bets: Bet[];
  };
}

export interface CashoutRequest {
  accessToken: string;
  tId: number;
  channel: string;
  cashoutStake?: number;
  'X-Client-Id'?: string;
  'X-Api-Key'?: string;
  'X-Language-Code'?: string;
}

export interface CashoutResponse {
  error: boolean;
  code: string;
  message: string;
  statusCode: number;
  result: CashoutResult;
  targetSystem: string;
}

export interface CashoutResult {
  status: string;
  reason: string;
  shortBetId: string;
  tId: number;
}