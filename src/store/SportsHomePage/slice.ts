import type { ServiceResponse } from 'api/types/ServiceResponse';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SportsHomePageApis } from 'api/SportsHomePage/sportsHomePage.api';
import type { HotMultiItem, HotMultisRequest, HotMultisResponse, LeagueItem, PopularHighlightsRequest, PopularHighlightsResponse, PopularHighlightsResult, TopLeaguesRequest, CompetitionDetailsParams, Fixture, CompetitionDetailsResponse, LiveMatchesCountRequest, LiveMatchesCountResponse, LiveMatchesCountResults, LeagueRequest, BetHistoryResponse, BetHistoryRequest, Bet, CashoutResponse, CashoutRequest, ActualTopLeaguesResponse } from 'api/SportsHomePage/sportsHomePage.types';

// --- All Sports Thunk ---
export const fetchAllSports = createAsyncThunk(
    'sports/fetchAllSports',
    async (_, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getAllSports({
                isAllOutrightsRequired: false,
                'X-Client-Id': import.meta.env.VITE_X_Client_Id,
                'X-Api-Key': import.meta.env.VITE_X_Api_Key,
                'X-Language-Code': 'en',
            });
            return response.data.result.sports;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getTopLeagues = createAsyncThunk<LeagueItem[], TopLeaguesRequest>(
    'sports/getTopLeagues',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getTopLeagues(data);
            const apiResponse = response.data as unknown as ActualTopLeaguesResponse;
            if (apiResponse.error) {
                return rejectWithValue(apiResponse.message || 'Unknown error');
            }
            return apiResponse.result;
        } catch (error) {
            console.error('getTopLeagues error:', error);
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);
export const getHotMultis = createAsyncThunk<
    HotMultisResponse['result'],
    HotMultisRequest
>(
    'sports/getHotMultis',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getHotMultis(data);

            if ('error' in response.data) {
                return rejectWithValue(response.data);
            }

            const result = response.data as unknown as HotMultisResponse;
            return result.result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const getPopularHighlights = createAsyncThunk<PopularHighlightsResponse['result'], PopularHighlightsRequest>(
    'sports/getPopularHighlights',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getPopularHighlights(data);
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
export const getLiveMatches = createAsyncThunk<PopularHighlightsResponse['result'], PopularHighlightsRequest>(
    'sports/getLiveMatches',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getLiveMatches(data);
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
export const getUpcomingMatches = createAsyncThunk<PopularHighlightsResponse['result'], PopularHighlightsRequest>(
    'sports/getUpcomingMatches',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getUpcomingMatches(data);
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
export const getLiveCompetitionsCount = createAsyncThunk<LiveMatchesCountResults[], LiveMatchesCountRequest>(
    'sports/getLiveCompetitionsCount',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getLiveCompetitionsCount(data);
            const apiResponse = response.data as unknown as LiveMatchesCountResponse;

            return apiResponse.result.sports;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);


export const getMatchOfTheDay = createAsyncThunk<PopularHighlightsResponse['result'], PopularHighlightsRequest>(
    'sports/matchOfTheDay',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getMatchOfTheDay(data);
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
export const getCompetitionDetails = createAsyncThunk<
    Fixture | null,
    CompetitionDetailsParams
>(
    'sports/competitionDetails',
    async (params, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getCompetitionDetails(params);
            const apiResponse = response.data as ServiceResponse<CompetitionDetailsResponse>;
            if ('error' in apiResponse && apiResponse.error === true) {
                return rejectWithValue(apiResponse.message || 'Unknown error');
            }
            const competitionDetails = (apiResponse as ServiceResponse<CompetitionDetailsResponse>).result;
            if (
                competitionDetails &&
                typeof competitionDetails === 'object' &&
                'fixtures' in competitionDetails &&
                Array.isArray((competitionDetails as unknown as { fixtures?: unknown }).fixtures)
            ) {
                return (competitionDetails as { fixtures: Fixture[] }).fixtures[0] || null;
            }
            return null;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);
export const getLeagues = createAsyncThunk<PopularHighlightsResponse['result'], LeagueRequest>(
    'sports/getLeagues',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getLeagues(data);
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

export const getPopularMatchesForInnerPage = createAsyncThunk<PopularHighlightsResponse['result'], PopularHighlightsRequest>(
    'sports/getPopularMatchesForInnerPage',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getPopularMatchesForInnerPage(data);
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

export const getLiveSportsInnerPage = createAsyncThunk<PopularHighlightsResponse['result'], PopularHighlightsRequest>(
    'sports/getLiveSportsInnerPage',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getLiveMatches(data);
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

export const getUpComingSportsInnerPage = createAsyncThunk<PopularHighlightsResponse['result'], PopularHighlightsRequest>(
    'sports/getUpComingSportsInnerPage',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getUpcomingMatches(data);
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

export const getUpcomingCompetitionsCount = createAsyncThunk<LiveMatchesCountResults[], LiveMatchesCountRequest>(
    'sports/getUpcomingCompetitionsCount',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getUpcomingCompetitionsCount(data);
            const apiResponse = response.data as unknown as LiveMatchesCountResponse;

            return apiResponse.result.sports;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);

export const getInnerTabLiveMatches = createAsyncThunk<PopularHighlightsResponse['result'], PopularHighlightsRequest>(
    'sports/getInnerTabLiveMatches',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getLiveMatches(data);
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

export const getBetHistoryInSportsBook = createAsyncThunk<BetHistoryResponse['result']['bets'], BetHistoryRequest, { rejectValue: { aborted?: boolean; message?: string; skipErrorMiddleware?: boolean } }>(
    'sports/getBetHistoryInSportsBook',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getBetHistoryInSportsBook(data);
            const apiResponse = response.data as unknown as BetHistoryResponse;
            if ('error' in apiResponse && (apiResponse as any).error === true) {
                return rejectWithValue({ message: (apiResponse as any).message || 'Failed to load bet history' });
            }
            return apiResponse.result.bets;
        } catch (error: any) {
            if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
                return rejectWithValue({ aborted: true, skipErrorMiddleware: true });
            }
            return rejectWithValue({
                message: error.message || 'Failed to load bet history',
            });
        }
    }
);

export const getCashoutApi = createAsyncThunk<CashoutResponse, CashoutRequest>(
    'sports/getCashoutApi',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getCashoutApi(data);
            const apiResponse = response.data as unknown as CashoutResponse;
            return apiResponse;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Something went wrong');
        }
    }
);

export const getRebetApi = createAsyncThunk<PopularHighlightsResponse['result'], PopularHighlightsRequest>(
    'sports/getRebetApi',
    async (data, { rejectWithValue }) => {
        try {
            const response = await SportsHomePageApis.getRebetApi(data);
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


type SportsHomePageState = {
    loading: boolean;
    error: Error | null;
    data: {
        topLeagues: {
            result: LeagueItem[];
            loading: boolean;
            error: Error | null;
        };
        hotMultis: {
            data: {
                list: HotMultiItem[];
                totalRecords: number;
                status: number;
                message: string;
            };
            loading: boolean;
            error: Error | null;
        };
        popularHighlights: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
        liveMatches: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
        matchOfTheDay: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
        upcomingMatches: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
        competitionDetails: {
            result: Fixture | null;
            loading: boolean;
            error: Error | null;
        };
        Leagues: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
        liveCompetitionsCount: {
            result: LiveMatchesCountResults[] | null;
            loading: boolean;
            error: Error | null;
        };
        allSports: {
            data: any[];
            loading: boolean;
            error: unknown | null;
        }
        popularMatchesForInnerPage: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
        liveSportsInnerPage: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
        UpComingSportsInnerPage: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
        upcomingCompetitionsCount: {
            result: LiveMatchesCountResults[] | null;
            loading: boolean;
            error: Error | null;
        };
        innerTabLiveMatches: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
        betHistoryInSportsBook: {
            result: Bet[] | null;
            loading: boolean;
            error: Error | null;
        };
        cashoutApi: {
            result: CashoutResponse | null;
            loading: boolean;
            error: Error | null;
        };
        rebetApi: {
            result: PopularHighlightsResult | null;
            loading: boolean;
            error: Error | null;
        };
    };
};

const initialState: SportsHomePageState = {
    loading: false,
    error: null,
    data: {
        topLeagues: {
            result: [],
            loading: false,
            error: null,
        },
        hotMultis: {
            data: {
                list: [],
                totalRecords: 0,
                status: 0,
                message: '',
            },
            loading: false,
            error: null,
        },
        popularHighlights: {
            result: null,
            loading: false,
            error: null
        },
        liveMatches: {
            result: null,
            loading: false,
            error: null
        },
        matchOfTheDay: {
            result: null,
            loading: false,
            error: null
        },
        competitionDetails: {
            result: null,
            loading: false,
            error: null
        },
        Leagues: {
            result: null,
            loading: false,
            error: null
        },
        upcomingMatches: {
            result: null,
            loading: false,
            error: null
        },
        liveCompetitionsCount: {
            result: null,
            loading: false,
            error: null
        },
        allSports: {
            data: [],
            loading: false,
            error: null,
        },
        popularMatchesForInnerPage: {
            result: null,
            loading: false,
            error: null
        },
        liveSportsInnerPage: {
            result: null,
            loading: false,
            error: null
        },
        UpComingSportsInnerPage: {
            result: null,
            loading: false,
            error: null
        },
        upcomingCompetitionsCount: {
            result: null,
            loading: false,
            error: null
        },
        innerTabLiveMatches: {
            result: null,
            loading: false,
            error: null
        },
        betHistoryInSportsBook: {
            result: null,
            loading: false,
            error: null
        },
        cashoutApi: {
            result: null,
            loading: false,
            error: null
        },
        rebetApi: {
            result: null,
            loading: false,
            error: null
        },
    },
};


const SportsHomePageSlice = createSlice({
    name: 'sportsHomePage',
    initialState,
    reducers: {
        setTopLeagues: (state, action: PayloadAction<LeagueItem[]>) => {
            state.data.topLeagues.result = action.payload;
        },
        setHotMultis: (
            state,
            action: PayloadAction<{
                list: HotMultiItem[];
                totalRecords: number;
                status: number;
                message: string;
            }>
        ) => {
            state.data.hotMultis.data = action.payload;
        },
        setMatchOfTheDay: (state, action: PayloadAction<PopularHighlightsResult>) => {
            state.data.matchOfTheDay.result = action.payload;
        },
        setPopularHighlights: (state, action: PayloadAction<PopularHighlightsResult>) => {
            state.data.popularHighlights.result = action.payload;
        },
        setLiveMatches: (state, action: PayloadAction<PopularHighlightsResult>) => {
            state.data.liveMatches.result = action.payload;
        },
        setLeagues: (state, action: PayloadAction<PopularHighlightsResult>) => {
            state.data.Leagues.result = action.payload;
        },
        setBetHistoryInSportsBook: (state, action: PayloadAction<Bet[]>) => {
            state.data.betHistoryInSportsBook.result = action.payload;
        },
        updateSelectionOdds: (state, action: PayloadAction<{
            eventCode: string;
            eventStatus?: string;
            homeScore?: string;
            awayScore?: string;
            currentMinute?: string;
            marketId?: string;
            selectionId?: string;
            decimalOdds?: number;
            selectionStatus?: string;
            marketStatusName?: string;
            selectionSuspended?: boolean;
            eventData?: any;
            section: 'popularHighlights' | 'liveMatches' | 'matchOfTheDay' | 'popularMatchesForInnerPage' | 'liveSportsInnerPage' | 'UpComingSportsInnerPage' | 'Leagues' | 'competitionDetails' | 'upcomingMatches';
        }>) => {
            const {
                eventCode,
                eventStatus,
                homeScore,
                awayScore,
                currentMinute,
                marketId,
                selectionId,
                decimalOdds,
                selectionStatus,
                marketStatusName,
                eventData,
                selectionSuspended,
                section
            } = action.payload;
            const sectionData = state.data[section];

            if ('result' in sectionData && sectionData.result) {
                let existingFixtureIndex = -2;

                if (section === 'competitionDetails') {
                    if (sectionData.result &&
                        ('eventCode' in sectionData.result && sectionData.result.eventCode?.toString() === eventCode) ||
                        ('providerFixtureId' in sectionData.result && sectionData.result.providerFixtureId?.toString() === eventCode)) {
                        existingFixtureIndex = 0;
                    } else {
                        existingFixtureIndex = -1;
                    }
                } else if ('competitions' in sectionData.result && sectionData.result.competitions?.fixtures) {
                    existingFixtureIndex = sectionData.result.competitions.fixtures.findIndex(fixture =>
                        fixture.eventCode?.toString() === eventCode ||
                        fixture.providerFixtureId?.toString() === eventCode
                    );
                }
                if (existingFixtureIndex === -1 && eventData && section !== 'competitionDetails') {
                    const newFixture: any = {
                        providerFixtureId: eventData.eventCode,
                        sptechFixtureId: null,
                        fixtureName: eventData.eventName,
                        awayName: eventData.eventName?.split(/\s+(?:vs|v|@)\s+/i)[0]?.trim(),
                        homeName: eventData.eventName?.split(/\s+(?:vs|v|@)\s+/i)[0]?.trim(),
                        translations: {
                            homeName: eventData.eventName?.split(/\s+(?:vs|v|@)\s+/i)[0]?.trim(),
                            awayName: eventData.eventName?.split(/\s+(?:vs|v|@)\s+/i)[1]?.trim(),
                            fixtureName: eventData.eventName,
                            segmentName: eventData.countryName,
                            sportName: eventData.sportName
                        },
                        homeScore: eventData.homeScore || "0",
                        awayScore: eventData.awayScore || "0",
                        currentMinute: eventData.currentMinute,
                        event_status: eventData.currentPeriod,
                        eventStatus: eventData.currentPeriod,
                        eventDate: eventData.eventDate,
                        fixtureStartDate: eventData.eventDate,
                        fixtureStatusName: eventData.statusName,
                        eventCode: eventData.eventCode,
                        sportId: eventData.sportId,
                        sportName: eventData.sportName,
                        leagueId: eventData.leagueId,
                        leagueName: eventData.leagueName,
                        countryName: eventData.countryName,
                        segmentId: eventData.segmentId || null,
                        scores: eventData.detailedScores || null,
                        marketCount: eventData.marketCount || 0,
                        correlationId: eventData.correlationId || null,
                        sortOrder: eventData.sortOrder || 0,
                        isBetStop: eventData.isBetStop || false,
                        marketTemplateGroups: eventData.marketTemplateGroups || null,
                        markets: eventData.markets || [],
                    };
                    if ('competitions' in sectionData.result && sectionData.result.competitions?.fixtures) {
                        sectionData.result.competitions.fixtures.unshift(newFixture);
                    }
                }
                else if (existingFixtureIndex !== -1 && existingFixtureIndex !== -2) {
                    let fixture;

                    if (section === 'competitionDetails') {
                        fixture = sectionData.result;
                    }
                    else if ('competitions' in sectionData.result && sectionData.result.competitions?.fixtures) {
                        fixture = sectionData.result.competitions.fixtures[existingFixtureIndex];
                    }

                    if (fixture && 'eventStatus' in fixture && eventStatus !== undefined) {
                        fixture.eventStatus = eventStatus;
                    }

                    if (fixture && 'homeScore' in fixture && homeScore !== undefined) {
                        fixture.homeScore = homeScore;
                    }
                    if (fixture && 'awayScore' in fixture && awayScore !== undefined) {
                        fixture.awayScore = awayScore;
                    }
                    if (fixture && 'currentMinute' in fixture && currentMinute !== undefined) {
                        fixture.currentMinute = currentMinute;
                    }
                    if (fixture && marketId && (decimalOdds !== undefined || selectionStatus !== undefined || marketStatusName !== undefined) && 'markets' in fixture) {
                        fixture.markets?.forEach(market => {
                            if (market.marketId === marketId) {
                                if (marketStatusName !== undefined) {
                                    market.marketStatusName = marketStatusName;
                                }
                                if (selectionId && decimalOdds !== undefined) {
                                    market.selections?.forEach(selection => {
                                        if (selection.selectionId === selectionId) {
                                            selection.decimalOdds = decimalOdds.toString();
                                            if (selectionStatus !== undefined || selectionSuspended !== undefined) {
                                                if (!selectionSuspended) {
                                                    selection.selectionStatus = 'active';
                                                }
                                                else if (selectionStatus !== undefined) {
                                                    selection.selectionStatus = selectionStatus;
                                                }
                                            }
                                            if (selectionSuspended !== undefined) {
                                                selection.selectionSuspended = selectionSuspended;
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
        },
        updateHotMultisData: (state, action: PayloadAction<{
            eventCode: string;
            marketId?: string;
            selectionId?: string;
            decimalOdds?: number;
            selectionStatus?: string;
            marketStatusName?: string;
            selectionSuspended?: boolean;
            eventData?: any;
            section: 'hotMultis';
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
            const sectionData = state.data[section];
            if (sectionData.data.list && Array.isArray(sectionData.data.list)) {
                const matchingIndices = sectionData.data.list
                    .map((item, idx) =>
                        item.accumulatorSelections?.some(selection =>
                            selection.eventId?.toString() === eventCode
                        ) ? idx : -1
                    )
                    .filter(idx => idx !== -1);
                if (matchingIndices.length > 0) {
                    matchingIndices.forEach(existingItemIndex => {
                        const hotMultiItem = sectionData.data.list[existingItemIndex];
                        if (hotMultiItem.accumulatorSelections && Array.isArray(hotMultiItem.accumulatorSelections)) {
                            hotMultiItem.accumulatorSelections.forEach(selection => {
                                if (selection.eventId?.toString() === eventCode &&
                                    selection.outComeId === selectionId) {
                                    if (decimalOdds !== undefined) {
                                        selection.odds = decimalOdds;
                                    }
                                    if (selectionStatus !== undefined ) {
                                        selection.selectionStatus = selectionStatus;
                                    }
                                    else if (selectionSuspended !== undefined) {
                                        selection.selectionStatus = selectionSuspended ? 'inactive' : 'active';
                                    }
                                    if (marketStatusName !== undefined) {
                                        selection.marketStatusName = marketStatusName;
                                    }
                                }
                            });
                        }
                    });
                    sectionData.data.list = [...sectionData.data.list];
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopLeagues.pending, (state) => {
                state.data.topLeagues.loading = true;
                state.data.topLeagues.error = null;
            })
            .addCase(getTopLeagues.fulfilled, (state, action) => {
                state.data.topLeagues.loading = false;
                state.data.topLeagues.result = action.payload;
            })
            .addCase(getTopLeagues.rejected, (state, action) => {
                state.data.topLeagues.loading = false;
                state.data.topLeagues.error = action.payload as Error;
            })

        // Hot Multies
        builder
            .addCase(getHotMultis.pending, (state) => {
                state.data.hotMultis.loading = true;
                state.data.hotMultis.error = null;
            })
            .addCase(getHotMultis.fulfilled, (state, action) => {
                state.data.hotMultis.loading = false;
                state.data.hotMultis.data = {
                    list: action.payload.data,
                    totalRecords: action.payload.totalRecords,
                    status: action.payload.status,
                    message: action.payload.message,
                };
            })
            .addCase(getHotMultis.rejected, (state, action) => {
                state.data.hotMultis.loading = false;
                state.data.hotMultis.error = action.payload as Error;
            });

        // Popular Highlights
        builder
            .addCase(getPopularHighlights.pending, (state) => {
                state.data.popularHighlights.loading = true;
                state.data.popularHighlights.error = null;
            })
            .addCase(getPopularHighlights.fulfilled, (state, action) => {
                state.data.popularHighlights.loading = false;
                state.data.popularHighlights.result = action.payload;
            })
            .addCase(getPopularHighlights.rejected, (state, action) => {
                state.data.popularHighlights.loading = false;
                state.data.popularHighlights.error = action.payload as Error;
            });

        // Live Matches
        builder
            .addCase(getLiveMatches.pending, (state) => {
                state.data.liveMatches.loading = true;
                state.data.liveMatches.error = null;
            })
            .addCase(getLiveMatches.fulfilled, (state, action) => {
                state.data.liveMatches.loading = false;
                state.data.liveMatches.result = action.payload;
            })
            .addCase(getLiveMatches.rejected, (state, action) => {
                state.data.liveMatches.loading = false;
                state.data.liveMatches.error = action.payload as Error;
            });

        // Match of the day
        builder
            .addCase(getMatchOfTheDay.pending, (state) => {
                state.data.matchOfTheDay.loading = true;
                state.data.matchOfTheDay.error = null;
            })
            .addCase(getMatchOfTheDay.fulfilled, (state, action) => {
                state.data.matchOfTheDay.loading = false;
                state.data.matchOfTheDay.result = action.payload;
            })
            .addCase(getMatchOfTheDay.rejected, (state, action) => {
                state.data.matchOfTheDay.loading = false;
                state.data.matchOfTheDay.error = action.payload as Error;
            });

        builder
            .addCase(getCompetitionDetails.pending, (state) => {
                state.data.competitionDetails.loading = true;
                state.data.competitionDetails.error = null;
            })
            .addCase(getCompetitionDetails.fulfilled, (state, action) => {
                state.data.competitionDetails.loading = false;
                state.data.competitionDetails.result = action.payload;
            })
            .addCase(getCompetitionDetails.rejected, (state, action) => {
                state.data.competitionDetails.loading = false;
                state.data.competitionDetails.error = action.payload as Error;
            });
        // Leagues
        builder
            .addCase(getLeagues.pending, (state) => {
                state.data.Leagues.loading = true;
                state.data.Leagues.error = null;
            })
            .addCase(getLeagues.fulfilled, (state, action) => {
                state.data.Leagues.loading = false;
                state.data.Leagues.result = action.payload;
            })
            .addCase(getLeagues.rejected, (state, action) => {
                state.data.Leagues.loading = false;
                state.data.Leagues.error = action.payload as Error;
            });
        // Upcoming Matches
        builder
            .addCase(getUpcomingMatches.pending, (state) => {
                state.data.upcomingMatches.loading = true;
                state.data.upcomingMatches.error = null;
            })
            .addCase(getUpcomingMatches.fulfilled, (state, action) => {
                state.data.upcomingMatches.loading = false;
                state.data.upcomingMatches.result = action.payload;
            })
            .addCase(getUpcomingMatches.rejected, (state, action) => {
                state.data.upcomingMatches.loading = false;
                state.data.upcomingMatches.error = action.payload as Error;
            });

        // Live Competitions Count
        builder
            .addCase(getLiveCompetitionsCount.pending, (state) => {
                state.data.liveCompetitionsCount.loading = true;
                state.data.liveCompetitionsCount.error = null;
            })
            .addCase(getLiveCompetitionsCount.fulfilled, (state, action) => {
                state.data.liveCompetitionsCount.loading = false;
                state.data.liveCompetitionsCount.result = action.payload;
            })
            .addCase(getLiveCompetitionsCount.rejected, (state, action) => {
                state.data.liveCompetitionsCount.loading = false;
                state.data.liveCompetitionsCount.error = action.payload as Error;
            });

        // All Sports
        builder
            .addCase(fetchAllSports.pending, (state) => {
                state.data.allSports.loading = true;
                state.data.allSports.error = null;
            })
            .addCase(fetchAllSports.fulfilled, (state, action) => {
                state.data.allSports.loading = false;
                state.data.allSports.data = action.payload;
            })
            .addCase(fetchAllSports.rejected, (state, action) => {
                state.data.allSports.loading = false;
                state.data.allSports.error = action.payload as unknown;
            });

        // Live Matches for Sports Inner Page
        builder
            .addCase(getLiveSportsInnerPage.pending, (state) => {
                state.data.liveSportsInnerPage.loading = true;
                state.data.liveSportsInnerPage.error = null;
            })
            .addCase(getLiveSportsInnerPage.fulfilled, (state, action) => {
                state.data.liveSportsInnerPage.loading = false;
                state.data.liveSportsInnerPage.result = action.payload;
            })
            .addCase(getLiveSportsInnerPage.rejected, (state, action) => {
                state.data.liveSportsInnerPage.loading = false;
                state.data.liveSportsInnerPage.error = action.payload as Error;
            });

        // Upcoming Matches for sports inner page
        builder
            .addCase(getPopularMatchesForInnerPage.pending, (state) => {
                state.data.popularMatchesForInnerPage.loading = true;
                state.data.popularMatchesForInnerPage.error = null;
            })
            .addCase(getPopularMatchesForInnerPage.fulfilled, (state, action) => {
                state.data.popularMatchesForInnerPage.loading = false;
                state.data.popularMatchesForInnerPage.result = action.payload;
            })
            .addCase(getPopularMatchesForInnerPage.rejected, (state, action) => {
                state.data.popularMatchesForInnerPage.loading = false;
                state.data.popularMatchesForInnerPage.error = action.payload as Error;
            });

        // Live Matches for Sports Inner Page
        builder
            .addCase(getUpComingSportsInnerPage.pending, (state) => {
                state.data.UpComingSportsInnerPage.loading = true;
                state.data.UpComingSportsInnerPage.error = null;
            })
            .addCase(getUpComingSportsInnerPage.fulfilled, (state, action) => {
                state.data.UpComingSportsInnerPage.loading = false;
                state.data.UpComingSportsInnerPage.result = action.payload;
            })
            .addCase(getUpComingSportsInnerPage.rejected, (state, action) => {
                state.data.UpComingSportsInnerPage.loading = false;
                state.data.UpComingSportsInnerPage.error = action.payload as Error;
            });

        // Upcoming Competitions Count
        builder
            .addCase(getUpcomingCompetitionsCount.pending, (state) => {
                state.data.upcomingCompetitionsCount.loading = true;
                state.data.upcomingCompetitionsCount.error = null;
            })
            .addCase(getUpcomingCompetitionsCount.fulfilled, (state, action) => {
                state.data.upcomingCompetitionsCount.loading = false;
                state.data.upcomingCompetitionsCount.result = action.payload;
            })
            .addCase(getUpcomingCompetitionsCount.rejected, (state, action) => {
                state.data.upcomingCompetitionsCount.loading = false;
                state.data.upcomingCompetitionsCount.error = action.payload as Error;
            });

        // Inner Tab Live Matches
        builder
            .addCase(getInnerTabLiveMatches.pending, (state) => {
                state.data.innerTabLiveMatches.loading = true;
                state.data.innerTabLiveMatches.error = null;
            })
            .addCase(getInnerTabLiveMatches.fulfilled, (state, action) => {
                state.data.innerTabLiveMatches.loading = false;
                state.data.innerTabLiveMatches.result = action.payload;
            })
            .addCase(getInnerTabLiveMatches.rejected, (state, action) => {
                state.data.innerTabLiveMatches.loading = false;
                state.data.innerTabLiveMatches.error = action.payload as Error;
            });

        // Bet History in Sports Book
        builder
            .addCase(getBetHistoryInSportsBook.pending, (state) => {
                state.data.betHistoryInSportsBook.loading = true;
                state.data.betHistoryInSportsBook.error = null;
            })
            .addCase(getBetHistoryInSportsBook.fulfilled, (state, action) => {
                state.data.betHistoryInSportsBook.loading = false;
                state.data.betHistoryInSportsBook.result = action.payload;
            })
            .addCase(getBetHistoryInSportsBook.rejected, (state, action) => {
                if (action.payload && typeof action.payload === 'object' && 'aborted' in action.payload && action.payload.aborted) {
                    state.data.betHistoryInSportsBook.error = action.payload as Error;
                } else {
                    state.data.betHistoryInSportsBook.loading = false;
                    state.data.betHistoryInSportsBook.error = action.payload as Error;
                }
            });

        // Cashout API
        builder
            .addCase(getCashoutApi.pending, (state) => {
                state.data.cashoutApi.loading = true;
                state.data.cashoutApi.error = null;
            })
            .addCase(getCashoutApi.fulfilled, (state, action) => {
                state.data.cashoutApi.loading = false;
                state.data.cashoutApi.result = action.payload;
            })
            .addCase(getCashoutApi.rejected, (state, action) => {
                state.data.cashoutApi.loading = false;
                state.data.cashoutApi.error = action.payload as Error;
            });

        // Rebet API
        builder
            .addCase(getRebetApi.pending, (state) => {
                state.data.rebetApi.loading = true;
                state.data.rebetApi.error = null;
            })
            .addCase(getRebetApi.fulfilled, (state, action) => {
                state.data.rebetApi.loading = false;
                state.data.rebetApi.result = action.payload;
            })
            .addCase(getRebetApi.rejected, (state, action) => {
                state.data.rebetApi.loading = false;
                state.data.rebetApi.error = action.payload as Error;
            });

    },
});

export const {
    setTopLeagues,
    setHotMultis,
    setMatchOfTheDay,
    setPopularHighlights,
    setLiveMatches,
    updateSelectionOdds,
    setLeagues,
    setBetHistoryInSportsBook,
    updateHotMultisData,
} = SportsHomePageSlice.actions;
export default SportsHomePageSlice.reducer;