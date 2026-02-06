import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sleep } from 'helpers/common';
import { vipDetails, vipEarningHistory } from './mockData';
import { type VipEarningHistoryType } from './types';
import { VipApi } from 'api/vip/vip.api';
import type {
  AffiliateApprovalRequestData,
  VipGame
} from 'api/vip/vip.api';
import { handleError } from 'store/helpers/handleError';
import { LocalStorageHelper } from 'helpers/storage';
import type { RootState } from 'store/index';

const getVipAffiliateCacheFromStorage = (userId: string): any => {
  const VIP_AFFILIATE_CACHE_KEY = 'vip_affiliate_cache';
  const cache = LocalStorageHelper.getItem(VIP_AFFILIATE_CACHE_KEY);
  if (!cache) return null;

  try {
    const parsedCache: Record<string, any> = JSON.parse(cache as string);
    return parsedCache[userId] || null;
  } catch {
    return null;
  }
};

export const getVipGames = createAsyncThunk(
  'vip/games/get',
  async (
    { userId, affiliateId }: {
      userId: string;
      affiliateId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        operatorId: 'ossino',
        platformId: 2,
        brand: 'ossino',
        userId,
        affiliateId,
      };

      const response = await VipApi.getVipGames(payload);

      if (response?.data?.data?.games) {
        return response.data.data.games.map((game: any, index: number) => ({
          id: index + 1,
          title: game.gameName,
          image: game.image?.url || '/images/default-game.png',
          link: '#',
          game_code: game.game_code,
          provider: game.provider,
          aggregator_type: game.aggregator_type,
        }));
      }

      return [];
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getVipDetails = createAsyncThunk('vip/details/get', async () => {
  await sleep(1);
  return vipDetails;
});

export const getVipEarningHistory = createAsyncThunk(
  'vip/earning/get',
  async () => {
    await sleep(1);
    return vipEarningHistory;
  },
);



export const generateVipAffiliate = createAsyncThunk(
  'vip/affiliate/generate',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const user = state.user.data;

      if (!user) {
        throw new Error('User data not found');
      }



      const payload: AffiliateApprovalRequestData = {
        firstName: user.firstName || user.userName,
        lastName: user.lastName || user.userName,
        commissionPercentage: 20,
        affiliatePin: '78334',
        userName: user.email,
        setupCost: 50,
        role: 'PLAYER',
        password: '1234',
        payoutCycle: 0,
        channel: 'Internet',
        applyDefaultCommissionPercentage: true,
        updatedBy: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };

      const response = await VipApi.generateAffiliate(payload);
      return response.data;
    } catch (error: any) {
      console.error('VIP Affiliate Generation Error:', error);

      if (error?.response?.data?.result?.message === 'USER_NAME_ALREADY_EXIST') {


        const state = getState() as RootState;
        const user = state.user.data;

        if (user) {
          const cachedAffiliateData = getVipAffiliateCacheFromStorage(user.id.toString());

          if (cachedAffiliateData && cachedAffiliateData.btag) {

            return {
              result: {
                data: {
                  btag: cachedAffiliateData.btag,
                  userName: cachedAffiliateData.userName || user.email,
                  firstName: cachedAffiliateData.firstName || user.firstName,
                  lastName: cachedAffiliateData.lastName || user.lastName,
                  id: cachedAffiliateData.id
                },
                message: 'CACHED_AFFILIATE_DATA'
              }
            };
          }

          if (user.affliateBtag) {
            const affiliateData: VipAffiliateData = {
              btag: user.affliateBtag,
              userName: user.email,
              firstName: user.firstName || undefined,
              lastName: user.lastName || undefined
            };

            return {
              result: {
                data: affiliateData,
                message: 'EXISTING_AFFILIATE_DATA'
              }
            };
          }
        }
      }

      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getVipGamesData = createAsyncThunk(
  'vip/gamesData/get',
  async (
    { userId, affiliateId }: {
      userId: string;
      affiliateId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        operatorId: 'ossino',
        platformId: 2,
        brand: 'ossino',
        userId,
        affiliateId,
      };

      const response = await VipApi.getVipGames(payload);
      return response;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const checkVipData = createAsyncThunk(
  'vip/checkData',
  async (
    { userId, affiliateId }: {
      userId: string;
      affiliateId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        operatorId: 'ossino',
        platformId: 2,
        brand: 'ossino',
        userId,
        affiliateId,
      };

      const response = await VipApi.getVipGames(payload);

      const hasExistingData = response?.data?.data?.games && response.data.data.games.length > 0;

      return {
        ...response,
        hasExistingData,
        needsVipSetup: !hasExistingData
      };
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const updateVipGames = createAsyncThunk(
  'vip/games/update',
  async (
    { userId, affiliateId, games, userName }: {
      userId: string;
      affiliateId: string;
      games: VipGame[];
      userName: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const selectedGameDetails = games.map((game) => ({
        gameName: game.name || game.gameName,
        aggregator_type: game.aggregator || game.aggregator_type || '',
        provider: game.provider,
        game_code: game.game_code || game.gameCode,
        image: game.image || {
          url: '',
          configurl: ''
        },
        gametype: game.active === false ? 'remove' : '',
      }));

      const payload = {
        operatorId: 'ossino',
        platformId: 2,
        brand: 'ossino',
        userId,
        affiliateId,
        games: selectedGameDetails,
        userName,
      };

      const response = await VipApi.updateVipGamesReal(payload);
      return response;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const generateVipReport = createAsyncThunk(
  'vip/report/generate',
  async (
    { accessToken, bTag }: { accessToken: string; bTag: string },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        accessToken,
        bTag,
        channel: 'Internet',
      };

      const response = await VipApi.generateVipReport(payload);
      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getAffiliateEarnings = createAsyncThunk(
  'vip/earnings/get',
  async (
    {
      bTag,
      startDate,
      endDate,
      pageNumber = 0,
      itemsPerPage = 10,
    }: {
      bTag: string;
      startDate: string;
      endDate: string;
      pageNumber?: number;
      itemsPerPage?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const payload = {
        bTag,
        channel: 'Internet',
        endDate,
        itemsPerPage,
        pageNumber,
        startDate,
      };

      const response = await VipApi.getAffiliateEarnings(payload);
      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getAffiliateData = createAsyncThunk(
  'vip/affiliateData/get',
  async ({ bTag }: { bTag: string }, { rejectWithValue }) => {
    try {
      const payload = {
        bTag,
        channel: 'Internet',
      };

      const response = await VipApi.getAffiliateData(payload);
      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getAffiliateSummary = createAsyncThunk(
  'vip/affiliateSummary/get',
  async ({ bTag }: { bTag: string }, { rejectWithValue }) => {
    try {
      const payload = {
        bTag,
        channel: 'Internet',
      };

      const response = await VipApi.getAffiliateSummary(payload);
      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getCoinsHistory = createAsyncThunk(
  'vip/coinsHistory/get',
  async (
    { userId, transactionType }: { userId: string; transactionType?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await VipApi.getCoinsHistory(userId, transactionType);
      return response;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);



export type Game = {
  id: number;
  title: string;
  image: string;
  link: string;
};

export type VipDetailsOverview = {
  totalEarningCoins: number;
  numOfSignups: number;
  availableEarnings: number;
};

export type VipDetailsData = {
  name: string;
  url: string;
  games: number[];
  overview: VipDetailsOverview;
};

export type VipEarningHistory = {
  id: number;
  name: string;
  value: number;
  date: string;
  type: VipEarningHistoryType;
};

export type VipAffiliateData = {
  id?: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  affiliatePin?: string;
  phoneNumber?: string;
  url?: string;
  commissionPercentage?: number;
  setupCost?: number;
  payoutCycle?: number;
  btag?: string;
};

export type VipSelectedGame = {
  gameName?: string;
  name?: string;
  aggregator_type?: string;
  aggregator?: string;
  provider?: string;
  game_code?: string;
  gameCode?: string;
  image?: {
    url?: string;
    configurl?: string;
  };
  active?: boolean;
  gametype?: string;
};

type VipState = {
  games: {
    data: Game[] | null;
    loading: boolean;
    error: Error | null;
    lastFetch: number | null;
  };
  details: {
    data: VipDetailsData | null;
    loading: boolean;
    error: Error | null;
  };
  earningHistory: {
    data: VipEarningHistory[] | null;
    loading: boolean;
    error: Error | null;
  };
  affiliate: {
    data: VipAffiliateData | null;
    loading: boolean;
    error: Error | null;
    requestAttempted: boolean;
    lastRequestTimestamp: number | null;
  };
  selectedGames: {
    data: VipSelectedGame[] | null;
    loading: boolean;
    error: Error | null;
    lastFetch: number | null;
  };
  vipName: string;
  isVipNameUpdated: boolean;
  vipReport: {
    data: any | null;
    loading: boolean;
    error: Error | null;
  };
  earnings: {
    data: any | null;
    loading: boolean;
    error: Error | null;
  };
  affiliateData: {
    data: any | null;
    loading: boolean;
    error: Error | null;
  };
  coinsHistory: {
    data: any | null;
    loading: boolean;
    error: Error | null;
  };
  affiliateSummary: {
    data: any | null;
    loading: boolean;
    error: Error | null;
  };
  successMessage: string | null;
  errorMessage: string | null;
  hasExistingVipData: boolean;
  needsVipSetup: boolean;
  vipDataLoading: boolean;
};

const initialState: VipState = {
  games: {
    data: null,
    loading: false,
    error: null,
    lastFetch: null,
  },
  details: {
    data: null,
    loading: false,
    error: null,
  },
  earningHistory: {
    data: null,
    loading: false,
    error: null,
  },
  affiliate: {
    data: null,
    loading: false,
    error: null,
    requestAttempted: false,
    lastRequestTimestamp: null,
  },
  selectedGames: {
    data: null,
    loading: false,
    error: null,
    lastFetch: null,
  },
  vipName: '',
  isVipNameUpdated: false,
  vipReport: {
    data: null,
    loading: false,
    error: null,
  },
  earnings: {
    data: null,
    loading: false,
    error: null,
  },
  affiliateData: {
    data: null,
    loading: false,
    error: null,
  },
  coinsHistory: {
    data: null,
    loading: false,
    error: null,
  },
  affiliateSummary: {
    data: null,
    loading: false,
    error: null,
  },
  successMessage: null,
  errorMessage: null,
  hasExistingVipData: false,
  needsVipSetup: false,
  vipDataLoading: false,
};

const vipSlice = createSlice({
  name: 'vip',
  initialState,
  reducers: {
    setVipName: (state, action) => {
      state.vipName = action.payload;
    },
    setVipNameUpdated: (state, action) => {
      state.isVipNameUpdated = action.payload;
    },
    setSelectedGames: (state, action) => {
      state.selectedGames.data = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
    setExistingAffiliate: (state, action) => {
      state.affiliate.data = {
        btag: action.payload.btag,
      };
      state.hasExistingVipData = true;
      state.needsVipSetup = false;
      state.vipDataLoading = false;
    },
    resetVipState: (state) => {
      state.affiliate.data = null;
      state.selectedGames.data = null;
      state.selectedGames.lastFetch = null;
      state.games.data = null;
      state.games.lastFetch = null;
      state.vipName = '';
      state.isVipNameUpdated = false;
      state.successMessage = null;
      state.errorMessage = null;
    },
    clearVipCache: (state) => {
      state.games.lastFetch = null;
      state.selectedGames.lastFetch = null;
    },
    clearAffiliateCache: (state) => {
      state.affiliate.data = null;
      state.affiliate.requestAttempted = false;
      state.affiliate.lastRequestTimestamp = null;
      state.affiliate.error = null;
    },
    setVipNeedsSetup: (state, action) => {
      state.needsVipSetup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVipGames.pending, (state) => {
        state.games.error = null;
        state.games.loading = true;
      })
      .addCase(getVipGames.fulfilled, (state, action) => {
        state.games.loading = false;
        state.games.data = action.payload;
        state.games.lastFetch = Date.now();
      })
      .addCase(getVipGames.rejected, (state, action) => {
        state.games.error = action.payload as Error;
        state.games.loading = false;
        state.games.data = null;
        state.games.lastFetch = null;
      })
      .addCase(getVipDetails.pending, (state) => {
        state.details.error = null;
        state.details.loading = true;
      })
      .addCase(getVipDetails.fulfilled, (state, action) => {
        state.details.loading = false;
        state.details.data = action.payload;
      })
      .addCase(getVipDetails.rejected, (state, action) => {
        state.details.error = action.payload as Error;
        state.details.loading = false;
        state.details.data = null;
      })
      .addCase(getVipEarningHistory.pending, (state) => {
        state.earningHistory.error = null;
        state.earningHistory.loading = true;
      })
      .addCase(getVipEarningHistory.fulfilled, (state, action) => {
        state.earningHistory.loading = false;
        state.earningHistory.data = action.payload;
      })
      .addCase(getVipEarningHistory.rejected, (state, action) => {
        state.earningHistory.error = action.payload as Error;
        state.earningHistory.loading = false;
        state.earningHistory.data = null;
      })
      // VIP Affiliate Generation
      .addCase(generateVipAffiliate.pending, (state) => {
        state.affiliate.error = null;
        state.affiliate.loading = true;
        state.errorMessage = null;
        state.affiliate.requestAttempted = true;
        state.affiliate.lastRequestTimestamp = Date.now();
      })
      .addCase(generateVipAffiliate.fulfilled, (state, action) => {
        state.affiliate.loading = false;

        // Handle different response types
        const responseData = action.payload?.result?.data;
        const responseMessage = action.payload?.result?.message;

        if (responseData) {
          state.affiliate.data = responseData;

          // Set appropriate success message based on response type
          switch (responseMessage) {
            case 'EXISTING_AFFILIATE_DATA':
              state.successMessage = 'VIP status activated with existing affiliate data';
              break;
            case 'CACHED_AFFILIATE_DATA':
              state.successMessage = 'VIP status activated with cached data';
              break;
            case 'EXISTING_USER_AFFILIATE_DATA':
              state.successMessage = 'VIP status activated - user already has affiliate account';
              break;
            case 'REQUEST_IN_PROGRESS':
            case 'GLOBAL_LOCK_ACTIVE':
            case 'LOCK_ACQUIRED_BY_ANOTHER_PROCESS':
              state.successMessage = null;
              break;
            default:
              state.successMessage = 'VIP affiliate created successfully';
              break;
          }

          if (responseMessage !== 'REQUEST_IN_PROGRESS' &&
            responseMessage !== 'GLOBAL_LOCK_ACTIVE' &&
            responseMessage !== 'LOCK_ACQUIRED_BY_ANOTHER_PROCESS') {
            state.needsVipSetup = true;
          }
        } else {
          state.errorMessage = 'Invalid response from affiliate service';
        }
      })
      .addCase(generateVipAffiliate.rejected, (state, action) => {
        state.affiliate.error = action.payload as Error;
        state.affiliate.loading = false;

        const errorMessage = (action.payload as any)?.message || 'Failed to create VIP affiliate';

        if (errorMessage.includes('REQUEST_IN_PROGRESS_WAIT')) {
          state.errorMessage = null;
          state.needsVipSetup = true;
          state.affiliate.error = null;
        } else if (!errorMessage.includes('already in progress') && !errorMessage.includes('already completed')) {
          state.affiliate.data = null;
          state.errorMessage = errorMessage;
        } else {
          state.errorMessage = null;
        }
      })
      // VIP Games Data
      .addCase(getVipGamesData.pending, (state) => {
        state.selectedGames.error = null;
        state.selectedGames.loading = true;
      })
      .addCase(getVipGamesData.fulfilled, (state, action) => {
        state.selectedGames.loading = false;
        // Store the games data from API response
        if (action.payload?.data?.data?.games) {
          state.selectedGames.data = action.payload.data.data.games;
          state.selectedGames.lastFetch = Date.now();
          state.vipName = action.payload.data.data.userName || '';
          state.isVipNameUpdated = !!action.payload.data.data.userName;
        }
      })
      .addCase(getVipGamesData.rejected, (state, action) => {
        state.selectedGames.error = action.payload as Error;
        state.selectedGames.loading = false;
        state.selectedGames.lastFetch = null;
      })
      .addCase(updateVipGames.pending, (state) => {
        state.selectedGames.loading = true;
        state.errorMessage = null;
      })
      .addCase(updateVipGames.fulfilled, (state, action) => {
        state.selectedGames.loading = false;
        if (action.payload?.data?.code === 500) {
          state.errorMessage = action.payload?.data?.message || 'Update failed';
        }
      })
      .addCase(updateVipGames.rejected, (state, action) => {
        state.selectedGames.error = action.payload as Error;
        state.selectedGames.loading = false;
        state.errorMessage = 'Failed to update games';
      })
      .addCase(generateVipReport.pending, (state) => {
        state.vipReport.loading = true;
        state.vipReport.error = null;
      })
      .addCase(generateVipReport.fulfilled, (state, action) => {
        state.vipReport.loading = false;
        state.vipReport.data = action.payload?.result?.data || null;
      })
      .addCase(generateVipReport.rejected, (state, action) => {
        state.vipReport.error = action.payload as Error;
        state.vipReport.loading = false;
      })
      // Affiliate Earnings
      .addCase(getAffiliateEarnings.pending, (state) => {
        state.earnings.loading = true;
        state.earnings.error = null;
      })
      .addCase(getAffiliateEarnings.fulfilled, (state, action) => {
        state.earnings.loading = false;
        state.earnings.data = action.payload?.result?.data || null;
      })
      .addCase(getAffiliateEarnings.rejected, (state, action) => {
        state.earnings.error = action.payload as Error;
        state.earnings.loading = false;
      })
      // Affiliate Data
      .addCase(getAffiliateData.pending, (state) => {
        state.affiliateData.loading = true;
        state.affiliateData.error = null;
      })
      .addCase(getAffiliateData.fulfilled, (state, action) => {
        state.affiliateData.loading = false;
        state.affiliateData.data = action.payload?.result?.data || null;
      })
      .addCase(getAffiliateData.rejected, (state, action) => {
        state.affiliateData.error = action.payload as Error;
        state.affiliateData.loading = false;
      })
      // Coins History
      .addCase(getCoinsHistory.pending, (state) => {
        state.coinsHistory.loading = true;
        state.coinsHistory.error = null;
      })
      .addCase(getCoinsHistory.fulfilled, (state, action) => {
        state.coinsHistory.loading = false;
        state.coinsHistory.data = action.payload;
      })
      .addCase(getCoinsHistory.rejected, (state, action) => {
        state.coinsHistory.error = action.payload as Error;
        state.coinsHistory.loading = false;
      })
      // Affiliate Summary
      .addCase(getAffiliateSummary.pending, (state) => {
        if (!state.affiliateSummary) {
          state.affiliateSummary = { data: null, loading: false, error: null };
        }
        state.affiliateSummary.loading = true;
        state.affiliateSummary.error = null;
      })
      .addCase(getAffiliateSummary.fulfilled, (state, action) => {
        if (!state.affiliateSummary) {
          state.affiliateSummary = { data: null, loading: false, error: null };
        }
        state.affiliateSummary.loading = false;
        state.affiliateSummary.data = action.payload?.result?.data || null;
      })
      .addCase(getAffiliateSummary.rejected, (state, action) => {
        if (!state.affiliateSummary) {
          state.affiliateSummary = { data: null, loading: false, error: null };
        }
        state.affiliateSummary.error = action.payload as Error;
        state.affiliateSummary.loading = false;
      })

      // Check VIP Data
      .addCase(checkVipData.pending, (state) => {
        state.vipDataLoading = true;
        state.errorMessage = null;
      })
      .addCase(checkVipData.fulfilled, (state, action) => {
        state.vipDataLoading = false;

        const isUserNotFound = action.payload?.data?.data?.code === "404" ||
          action.payload?.data?.data?.message === "User not found";

        if (isUserNotFound) {
          state.hasExistingVipData = false;
          state.needsVipSetup = true;
        } else {
          state.hasExistingVipData = action.payload?.hasExistingData || false;
          state.needsVipSetup = action.payload?.needsVipSetup || false;

          if (action.payload?.hasExistingData && action.payload?.data?.data) {
            state.selectedGames.data = action.payload.data.data.games || [];
            state.selectedGames.lastFetch = Date.now();
            state.vipName = action.payload.data.data.userName || '';
            state.isVipNameUpdated = !!action.payload.data.data.userName;
          }
        }
      })
      .addCase(checkVipData.rejected, (state) => {
        state.vipDataLoading = false;
        state.errorMessage = 'Failed to check VIP data';
        state.hasExistingVipData = false;
        state.needsVipSetup = true;
        state.selectedGames.lastFetch = null;
      });
  },
});

export const {
  setVipName,
  setVipNameUpdated,
  setSelectedGames,
  clearSuccessMessage,
  clearErrorMessage,
  resetVipState,
  setExistingAffiliate,
  clearVipCache,
  clearAffiliateCache,
  setVipNeedsSetup,
} = vipSlice.actions;

const CACHE_DURATION = 5 * 60 * 1000;
const isDataFresh = (lastFetch: number | null): boolean => {
  if (!lastFetch) return false;
  return Date.now() - lastFetch < CACHE_DURATION;
};





export const selectVipNeedsSetup = (state: { vip: VipState }) => state.vip.needsVipSetup;
export const selectHasExistingVipData = (state: { vip: VipState }) => state.vip.hasExistingVipData;
export const selectVipDataLoading = (state: { vip: VipState }) => state.vip.vipDataLoading;
export const selectVipGamesAreFresh = (state: { vip: VipState }) =>
  isDataFresh(state.vip.games.lastFetch);
export const selectVipSelectedGamesAreFresh = (state: { vip: VipState }) =>
  isDataFresh(state.vip.selectedGames.lastFetch);
export const selectAffiliateRequestAttempted = (state: { vip: VipState }) =>
  state.vip.affiliate.requestAttempted;
export const selectAffiliateData = (state: { vip: VipState }) =>
  state.vip.affiliate.data;
export const selectAffiliateLoading = (state: { vip: VipState }) =>
  state.vip.affiliate.loading;


export default vipSlice.reducer;
