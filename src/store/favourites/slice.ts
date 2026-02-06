import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FavoriteGame, GetFavoritesResponse, SetFavoriteRequest, SetFavoriteResponse } from './types';

interface FavoritesState {
    data: FavoriteGame[];
    loading: boolean;
    error: string | null;
    actionLoading: { [gameId: string]: boolean };
}

const initialState: FavoritesState = {
    data: [],
    loading: false,
    error: null,
    actionLoading: {},
};

const API_BASE_URL = import.meta.env.VITE_WRAPPER_SERVICE_URL;

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async ({ playerId, accessToken }: { playerId: string; accessToken: string }) => {
        const response = await fetch(
            `${API_BASE_URL}/api/v1/player/casino/favourites/get?accessToken=${accessToken}&playerId=${playerId}`,
            {
                headers: {
                    'accept': 'application/json',
                },
            }
        );
        if (!response.ok) {
            throw new Error('Failed to fetch favorites');
        }

        const data: GetFavoritesResponse = await response.json();
        
        // Deduplicate favorites by gameCode to prevent duplicates
        const seenGameCodes = new Set();
        const deduplicatedFavorites = data.result.data.filter(favorite => {
            if (seenGameCodes.has(favorite.gameCode)) {
                return false;
            }
            seenGameCodes.add(favorite.gameCode);
            return true;
        });
        
        return deduplicatedFavorites;
    }
);

export const toggleFavorite = createAsyncThunk(
    'favorites/toggleFavorite',
    async (request: SetFavoriteRequest) => {
        const response = await fetch(
            `${API_BASE_URL}/api/v1/player/casino/favourites/action`,
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to toggle favorite');
        }
        const data: SetFavoriteResponse = await response.json();
        return {
            gameCode: request.gameId,
            action: request.action,
            response: data
        };
    }
);
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        clearFavoritesError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch favorites';
            })
            .addCase(toggleFavorite.pending, (state, action) => {
                const gameCode = action.meta.arg.gameId;
                state.actionLoading[gameCode] = true;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                const { gameCode, action: toggleAction } = action.payload;
                state.actionLoading[gameCode] = false;

                if (toggleAction === 'set') {
                    const exists = state.data.some(fav => fav.gameCode === gameCode);
                    if (!exists && action.meta.arg) {
                        state.data.push({
                            userId: action.meta.arg.userId,
                            gameCode: action.meta.arg.gameId,
                            gameName: action.meta.arg.gameName,
                            categoryName: action.meta.arg.categoryName,
                            aggregator: action.meta.arg.aggregator,
                            providerName: action.meta.arg.providerName,
                            operatorId: action.meta.arg.operatorId,
                            brandId: action.meta.arg.brandId,
                        });
                    }
                } else {
                    state.data = state.data.filter(fav => fav.gameCode !== gameCode);
                }
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                const gameCode = action.meta.arg.gameId;
                state.actionLoading[gameCode] = false;
                state.error = action.error.message || 'Failed to toggle favorite';
            });
    },
});

export const { clearFavoritesError } = favoritesSlice.actions;
export default favoritesSlice.reducer;