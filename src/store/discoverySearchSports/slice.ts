import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { discoverySearchSportsApis } from 'api/discoverySearchSports/discoverySearchSports.api';
import { DiscoverySearchRequest, DiscoverySearchResponse, OverClubsRequest, RecentSearchRequest, RecentSearchResponse, TrendingGamesRequest, PopularParlaysRequest, PopularParlaysResponse, } from 'api/discoverySearchSports/discoverySearchSports.types';
import { PopularHighlightsResponse, PopularHighlightsResult } from 'api/SportsHomePage/sportsHomePage.types';
import axios from 'axios';
import type { ServiceResponse } from 'api/types/ServiceResponse';


export const getOverClubs = createAsyncThunk<PopularHighlightsResponse['result'], OverClubsRequest>(
    'sports/getOverClubs',
    async (data, { rejectWithValue }) => {
        try {
            const response = await discoverySearchSportsApis.getOverClubs(data);
            const apiResponse = response.data as unknown as PopularHighlightsResponse;

            if (apiResponse.error === true) {
                return rejectWithValue(apiResponse.message || 'Unknown error');
            }

            return apiResponse.result;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);
export const getFollowOrFade = createAsyncThunk<PopularHighlightsResponse['result'], OverClubsRequest>(
    'sports/getFollowOrFade',
    async (data, { rejectWithValue }) => {
        try {
            const response = await discoverySearchSportsApis.getFollowOrFade(data);
            const apiResponse = response.data as unknown as PopularHighlightsResponse;

            if (apiResponse.error === true) {
                return rejectWithValue(apiResponse.message || 'Unknown error');
            }

            return apiResponse.result;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);
export const getHotDogs = createAsyncThunk<PopularHighlightsResponse['result'], OverClubsRequest>(
    'sports/getHotDogs',
    async (data, { rejectWithValue }) => {
        try {
            const response = await discoverySearchSportsApis.getHotDogs(data);
            const apiResponse = response.data as unknown as PopularHighlightsResponse;

            if (apiResponse.error === true) {
                return rejectWithValue(apiResponse.message || 'Unknown error');
            }

            return apiResponse.result;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);
export const getTrendingGames = createAsyncThunk<PopularHighlightsResponse['result'], TrendingGamesRequest>(
    'sports/getTrendingGames',
    async (data, { rejectWithValue }) => {
        try {
            const response = await discoverySearchSportsApis.getTrendingGames(data);
            const apiResponse = response.data as unknown as PopularHighlightsResponse;

            if (apiResponse.error === true) {
                return rejectWithValue(apiResponse.message || 'Unknown error');
            }

            return apiResponse.result;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);
export const getPopularParlays = createAsyncThunk<PopularParlaysResponse, PopularParlaysRequest>(
    'sports/getPopularParlays',
    async (data, { rejectWithValue }) => {
        try {
            const response = await discoverySearchSportsApis.getPopularParlays(data);
            const apiResponse = response.data as unknown as PopularParlaysResponse;
            return apiResponse;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);

export const getDiscoverySearch = createAsyncThunk<DiscoverySearchResponse['result'], DiscoverySearchRequest, { rejectValue: { aborted?: boolean; message?: string } }>(
    'sports/getDiscoverySearch',
    async (data, { rejectWithValue }) => {
        try {
            const response = await discoverySearchSportsApis.getDiscoverySearch(data);
            const apiResponse = response.data as unknown as DiscoverySearchResponse;

            if (apiResponse.error === true) {
                return rejectWithValue({ message: apiResponse.message });
            }

            return apiResponse.result;
        } catch (error: any) {
            if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
                return rejectWithValue({ aborted: true });
            }

            return rejectWithValue({
                message: error.message || 'Something went wrong',
            });
        }
    }
);

export const getRecentSearchDiscoveryPage = createAsyncThunk<RecentSearchResponse, RecentSearchRequest>(
    'sports/getRecentSearchDiscoveryPage',
    async (data, { rejectWithValue }) => {
        try {
            const response = await discoverySearchSportsApis.getRecentSearchDiscoveryPage(data);
            const apiResponse = response.data as ServiceResponse<RecentSearchResponse>;

            if ('error' in apiResponse && apiResponse.error === true) {
                return rejectWithValue(apiResponse.message || 'Unknown error');
            }

            return apiResponse.result as RecentSearchResponse;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);


type DiscoverySearchSportsState = {
    oversClub: {
        result: PopularHighlightsResult | null;
        loading: boolean;
        error: Error | null;
    },
    followOrFade: {
        result: PopularHighlightsResult | null;
        loading: boolean;
        error: Error | null;
    },
    hotDogs: {
        result: PopularHighlightsResult | null;
        loading: boolean;
        error: Error | null;
    },
    trendingGames: {
        result: PopularHighlightsResult | null;
        loading: boolean;
        error: Error | null;
    },
    discoverySearch: {
        result: DiscoverySearchResponse['result'] | null;
        loading: boolean;
        error: Error | null;
    },
    recentSearchDiscoveryPage: {
        result: RecentSearchResponse | null;
        loading: boolean;
        error: Error | null;
    },
    popularParlays: {
        result: PopularParlaysResponse | null;
        loading: boolean;
        error: Error | null;
    },
};

const initialState: DiscoverySearchSportsState = {
    oversClub: {
        result: null,
        loading: false,
        error: null
    },
    followOrFade: {
        result: null,
        loading: false,
        error: null
    },
    hotDogs: {
        result: null,
        loading: false,
        error: null
    },
    trendingGames: {
        result: null,
        loading: false,
        error: null
    },
    discoverySearch: {
        result: null,
        loading: false,
        error: null
    },
    recentSearchDiscoveryPage: {
        result: null,
        loading: false,
        error: null
    },
    popularParlays: {
        result: null,
        loading: false,
        error: null
    },
};

const DiscoverySearchSportsSlice = createSlice({
    name: 'discoverySearchSports',
    initialState,
    reducers: {
        updateParlaySelectionOdds: (state, action: PayloadAction<{
            eventCode: string;
            marketId?: string;
            selectionId?: string;
            decimalOdds?: number;
            selectionStatus?: string;
            marketStatusName?: string;
            selectionSuspended?: boolean;
            eventData?: any;
        }>) => {
            const {
                eventCode,
                selectionId,
                decimalOdds,
                selectionStatus,
                marketStatusName,
                selectionSuspended,
            } = action.payload;
            const sectionData = state.popularParlays.result;
            if (sectionData?.data && Array.isArray(sectionData.data)) {
                const existingItemIndex = sectionData.data.findIndex(item =>
                    item.accumulatorSelections?.some(selection =>
                        selection.eventId?.toString() === eventCode
                    )
                );
                if (existingItemIndex !== -1) {
                    const hotMultiItem = sectionData.data[existingItemIndex];
                    if (hotMultiItem.accumulatorSelections && Array.isArray(hotMultiItem.accumulatorSelections)) {
                        hotMultiItem.accumulatorSelections.forEach(selection => {
                            if (selection.eventId?.toString() === eventCode &&
                                selection.outComeId === selectionId) {
                                if (decimalOdds !== undefined) {
                                    selection.odds = decimalOdds;
                                }
                                if (selectionStatus !== undefined || selectionSuspended !== undefined) {
                                    if (!selectionSuspended) {
                                        selection.selectionStatus = 'active';
                                    }
                                    else if (selectionStatus !== undefined) {
                                        selection.selectionStatus = selectionStatus;
                                    }
                                }
                                else if (selectionSuspended !== undefined) {
                                    selection.selectionStatus = selectionSuspended ? 'inactive' : 'active';
                                }
                                if (marketStatusName !== undefined) {
                                    selection.marketStatus = marketStatusName;
                                }
                            }
                        });
                    }
                }
            }
        },
        updateDiscoverySelectionOdds: (state, action: PayloadAction<{
            eventCode: string;
            marketId?: string;
            selectionId?: string;
            decimalOdds?: number;
            selectionStatus?: string;
            marketStatusName?: string;
            selectionSuspended?: boolean;
            eventData?: any;
            section: 'oversClub' | 'followOrFade' | 'hotDogs';
        }>) => {
            const {
                eventCode,
                selectionId,
                decimalOdds,
                selectionStatus,
                marketStatusName,
                selectionSuspended,
                section
            } = action.payload;

            const sectionData = state[section].result;
            if (sectionData?.competitions?.fixtures && Array.isArray(sectionData.competitions.fixtures)) {
                const existingFixtureIndex = sectionData.competitions.fixtures.findIndex(fixture =>
                    fixture.providerFixtureId?.toString() === eventCode
                );
                if (existingFixtureIndex !== -1) {
                    const fixture = sectionData.competitions.fixtures[existingFixtureIndex];
                    if (fixture.markets && Array.isArray(fixture.markets)) {
                        fixture.markets.forEach(market => {
                            if (market.selections && Array.isArray(market.selections)) {
                                market.selections.forEach(selection => {
                                    if (selection.selectionId === selectionId) {
                                        if (decimalOdds !== undefined) {
                                            selection.decimalOdds = decimalOdds.toString();
                                        }
                                        if (selectionStatus !== undefined) {
                                            selection.selectionStatus = selectionStatus;
                                        }
                                        if (selectionSuspended !== undefined) {
                                            selection.selectionSuspended = selectionSuspended;
                                        }
                                    }
                                });
                            }
                            if (marketStatusName !== undefined) {
                                market.marketStatusName = marketStatusName;
                            }
                        });
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {

        // Over Clubs
        builder
            .addCase(getOverClubs.pending, (state) => {
                state.oversClub.loading = true;
                state.oversClub.error = null;
            })
            .addCase(getOverClubs.fulfilled, (state, action) => {
                state.oversClub.loading = false;
                state.oversClub.result = action.payload;
            })
            .addCase(getOverClubs.rejected, (state, action) => {
                state.oversClub.loading = false;
                state.oversClub.error = action.payload as Error;
            });
        
        // follow Or Fade
        builder
            .addCase(getFollowOrFade.pending, (state) => {
                state.followOrFade.loading = true;
                state.followOrFade.error = null;
            })
            .addCase(getFollowOrFade.fulfilled, (state, action) => {
                state.followOrFade.loading = false;
                state.followOrFade.result = action.payload;
            })
            .addCase(getFollowOrFade.rejected, (state, action) => {
                state.followOrFade.loading = false;
                state.followOrFade.error = action.payload as Error;
            });

        // Hot Dogs
        builder
            .addCase(getHotDogs.pending, (state) => {
                state.hotDogs.loading = true;
                state.hotDogs.error = null;
            })
            .addCase(getHotDogs.fulfilled, (state, action) => {
                state.hotDogs.loading = false;
                state.hotDogs.result = action.payload;
            })
            .addCase(getHotDogs.rejected, (state, action) => {
                state.hotDogs.loading = false;
                state.hotDogs.error = action.payload as Error;
            });

        // Trending Games
        builder
            .addCase(getTrendingGames.pending, (state) => {
                state.trendingGames.loading = true;
                state.trendingGames.error = null;
            })
            .addCase(getTrendingGames.fulfilled, (state, action) => {
                state.trendingGames.loading = false;
                state.trendingGames.result = action.payload;
            })
            .addCase(getTrendingGames.rejected, (state, action) => {
                state.trendingGames.loading = false;
                state.trendingGames.error = action.payload as Error;
            });

        // Discovery Search
        builder
            .addCase(getDiscoverySearch.pending, (state) => {
                state.discoverySearch.loading = true;
                state.discoverySearch.error = null;
            })
            .addCase(getDiscoverySearch.fulfilled, (state, action) => {
                state.discoverySearch.loading = false;
                state.discoverySearch.result = action.payload;
            })
            .addCase(getDiscoverySearch.rejected, (state, action: any) => {
                if (action.payload?.aborted) return;
                state.discoverySearch.loading = false;
                state.discoverySearch.error = action.payload as Error;
            })

        // Recent Search Discovery Page
        builder
            .addCase(getRecentSearchDiscoveryPage.pending, (state) => {
                state.recentSearchDiscoveryPage.loading = true;
                state.recentSearchDiscoveryPage.error = null;
            })
            .addCase(getRecentSearchDiscoveryPage.fulfilled, (state, action) => {
                state.recentSearchDiscoveryPage.loading = false;
                state.recentSearchDiscoveryPage.result = action.payload;
            })
            .addCase(getRecentSearchDiscoveryPage.rejected, (state, action) => {
                state.recentSearchDiscoveryPage.loading = false;
                state.recentSearchDiscoveryPage.error = action.payload as Error;
            });

        // Popular Parlays
        builder
            .addCase(getPopularParlays.pending, (state) => {
                state.popularParlays.loading = true;
                state.popularParlays.error = null;
            })
            .addCase(getPopularParlays.fulfilled, (state, action) => {
                state.popularParlays.loading = false;
                state.popularParlays.result = action.payload;
            })
            .addCase(getPopularParlays.rejected, (state, action) => {
                state.popularParlays.loading = false;
                state.popularParlays.error = action.payload as Error;
            });
    },
});

export const {
    updateParlaySelectionOdds,
    updateDiscoverySelectionOdds
 } = DiscoverySearchSportsSlice.actions;
export default DiscoverySearchSportsSlice.reducer;