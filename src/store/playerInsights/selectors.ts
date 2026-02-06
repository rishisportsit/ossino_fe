import { type RootState } from 'store/index';

export const selectPlayerInsights = (state: RootState) =>
    state.playerInsights.playerInsights;

export const selectPlayerInsightsLoading = (state: RootState) =>
    state.playerInsights.playerInsightsLoading;

export const selectPlayerInsightsError = (state: RootState) =>
    state.playerInsights.playerInsightsError;

export const selectHighestBets = (state: RootState) =>
    state.playerInsights.playerInsights?.highestBets || [];

export const selectTopGames = (state: RootState) =>
    state.playerInsights.topGames;

export const selectTopGamesLoading = (state: RootState) =>
    state.playerInsights.topGamesLoading;

export const selectTopGamesError = (state: RootState) =>
    state.playerInsights.topGamesError;

export const selectTopWinnings = (state: RootState) =>
    state.playerInsights.topWinnings;

export const selectTopWinningsLoading = (state: RootState) =>
    state.playerInsights.topWinningsLoading;

export const selectTopWinningsError = (state: RootState) =>
    state.playerInsights.topWinningsError;