export interface BetConfigRequest {
  'X-Client-Id': string;
  'X-Currency-Code': string;
}

export interface DefaultSportConfig {
  clientName: string;
  apiKey: string;
  country: string;
  currency: string;
  minStake: number;
  maxStake: number;
  maxPayout: number;
  maxWinningsAmount: number | null;
  defaultMintUnits: number | null;
}

export interface ParlayConfig {
  id: number;
  eventCount: number;
  bonusPercentage: number;
  brand: string;
  createdDate: string;
  updatedDate: string;
}

export interface ParlayData {
  bonusStatus: string;
  oddsThreshold: number;
  configs: ParlayConfig[];
  stakeTaxPercentage: number;
  winningsTaxPercentage: number;
}

export interface ParlayConfigResponse {
  code: string;
  message: string;
  targetSystem: string;
  result: {
    status: number;
    data: ParlayData;
    message: string;
  };
}
export interface CurrencyConfig {
  name?: string;
  symbol?: string;
  multiplier?: number;
  multiplier_power?: number;
}
export interface BetConfigResponse {
  code: string;
  message: string;
  statusCode: number;
  result: {
    defaultSportConfig: DefaultSportConfig;
  };
  targetSystem: string;
  currency_data?: CurrencyConfig;
  parlayconfig: ParlayConfigResponse;
}

// Processed/stored config types
export interface ProcessedBetConfig {
  minStake: number;
  maxStake: number;
  maxPayout: number;
  oddsThreshold: number;
  configs: Array<{
    eventCount: number;
    bonusPercentage: number;
  }>;
  currency_data?: CurrencyConfig;
  satkeTaxPercentage?: number;
  winningsTaxPercentage?: number;
}

export interface BetConfigState {
  data: ProcessedBetConfig | null;
  loading: boolean;
  error: string | null;
  lastFetchedCurrency: string | null;
}