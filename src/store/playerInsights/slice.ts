import { createSlice } from '@reduxjs/toolkit';
import { PlayerInsightsApi } from 'api/player-insights/player-insights.api';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import type {
    PlayerInsightsData,
    PlayerInsightsGameItem,
    TopLossesGameItem
} from 'api/player-insights/player-insights.types';

export const getPlayerInsights = createAppAsyncThunk(
    'playerInsights/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await PlayerInsightsApi.getPlayerInsights();
            return response.data.result.data;
        } catch (error) {
            const errorState = handleError(error);
            return rejectWithValue(errorState);
        }
    },
);

export const getTopLossesGames = createAppAsyncThunk(
    'topGames/getTopLosses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await PlayerInsightsApi.getTopLossesGames();
            return response.data;
        } catch (error) {
            const errorState = handleError(error);
            return rejectWithValue(errorState);
        }
    },
);

export const getTopWinnings = createAppAsyncThunk(
    'playerInsights/getTopWinnings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await PlayerInsightsApi.getPlayerInsightsForTopWinnings();
            return response.data?.result?.data?.highestWins ?? [];
        } catch (error) {
            const errorState = handleError(error);
            return rejectWithValue(errorState);
        }
    },
);

type PlayerInsightsState = {
    playerInsights: PlayerInsightsData | null;
    topGames: TopLossesGameItem[] | null;
    topWinnings: PlayerInsightsGameItem[];
    playerInsightsLoading: boolean;
    topGamesLoading: boolean;
    topWinningsLoading: boolean;
    playerInsightsError: ErrorState | null;
    topGamesError: ErrorState | null;
    topWinningsError: ErrorState | null;
};

const initialState: PlayerInsightsState = {
    playerInsights: null,
    topGames: null,
    topWinnings: [],
    playerInsightsLoading: false,
    topGamesLoading: false,
    topWinningsLoading: false,
    playerInsightsError: null,
    topGamesError: null,
    topWinningsError: null,
};

const playerInsightsSlice = createSlice({
    name: 'playerInsights',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Player insights
            .addCase(getPlayerInsights.pending, (state) => {
                state.playerInsightsError = null;
                state.playerInsightsLoading = true;
            })
            .addCase(getPlayerInsights.fulfilled, (state, action) => {
                state.playerInsightsLoading = false;
                state.playerInsights = action.payload ?? null;
            })
            .addCase(getPlayerInsights.rejected, (state, action) => {
                state.playerInsightsError = action.payload ?? null;
                state.playerInsightsLoading = false;
                state.playerInsights = null;
            })
            // Top losses games
            .addCase(getTopLossesGames.pending, (state) => {
                state.topGamesError = null;
                state.topGamesLoading = true;
            })
            .addCase(getTopLossesGames.fulfilled, (state, action) => {
                state.topGamesLoading = false;
                state.topGames = action.payload?.topTwentyGamesLoose || [];
            })
            .addCase(getTopLossesGames.rejected, (state, action) => {
                state.topGamesError = action.payload ?? null;
                state.topGamesLoading = false;
                state.topGames = null;
            })
            // Top winnings
            .addCase(getTopWinnings.pending, (state) => {
                state.topWinningsError = null;
                state.topWinningsLoading = true;
            })
            .addCase(getTopWinnings.fulfilled, (state, action) => {
                state.topWinningsLoading = false;
                state.topWinnings = Array.isArray(action.payload) ? action.payload.slice(0, 5) : [];
            })
            .addCase(getTopWinnings.rejected, (state, action) => {
                state.topWinningsError = action.payload ?? null;
                state.topWinningsLoading = false;
                state.topWinnings = [];
            });
    },
});

export default playerInsightsSlice.reducer;