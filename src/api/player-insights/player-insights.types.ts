export interface PlayerInsightsGameItem {
    gameName: string;
    betId: string;
    gameId: string;
    amount: number;
    currency: string;
    timestamp: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    userName?: string | null;
}

export interface PlayerInsightsData {
    highestWins: PlayerInsightsGameItem[];
    lastWins: PlayerInsightsGameItem[];
    highestBets: PlayerInsightsGameItem[];
}

export interface PlayerInsightsResponse {
    status: number;
    data: PlayerInsightsData;
    message: string;
}

export interface TopLossesGameItem {
    aggregatorName: string;
    gameName: string;
    gameCode: string;
    providerName: string;
}

export interface TopLossesData {
    topTwentyGamesLoose: TopLossesGameItem[];
}

export interface TopLossesResponse {
    status: number;
    data: TopLossesData;
    message: string;
}