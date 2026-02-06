import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { ContentApi } from 'api/content/content.api';
import { gamesApi } from 'api/games/games.api';
import type {
  LaunchDemoGameRequest,
  LaunchRealGameRequest,
} from 'api/games/games.types';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import { ERROR_DISPLAY } from 'store/const/errors';
import { type ProviderCode, type Game } from 'api/content/content.types';
import { SORT_METHOD } from './constants';
import { handleResponse } from './helpers';

export const fetchGames = createAsyncThunk(
  'games',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ContentApi.getGames();
      const result = handleResponse(response);
      const data: Game[] = result.map((game) => {
        let image = '';

        if (game.imageConfigUrl && game.imageConfigUrl !== 'NoIcon') {
          image = game.imageConfigUrl;
        } else if (game.imageUrl) {
          image = game.imageUrl;
        } else {
          image = '/default-game-placeholder.png';
        }

        return {
          ...game,
          image,
        };
      });
      return data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);
export type SortMethod = keyof typeof SORT_METHOD;

type Filters = {
  search: string | null;
  sort: SortMethod;
  categories: string[];
  providers: ProviderCode[];
  favorite: boolean | null;
};

type GamesState = {
  filters: Filters;
  loading: boolean;
  error: ErrorState | null;
  data: Game[] | null;
  currentGameId: string | null;
  selectedGameUrl: string | null;
};

const initialState: GamesState = {
  filters: {
    search: '',
    sort: SORT_METHOD.asc,
    categories: [],
    providers: [],
    favorite: null,
  },
  data: null,
  loading: false,
  error: null,
  currentGameId: null,
  selectedGameUrl: null,
};

export const launchDemoGame = createAsyncThunk(
  'games/launchDemoGame',
  async (payload: LaunchDemoGameRequest, { rejectWithValue }) => {
    try {
      const response = await gamesApi.launchDemoGame(payload);

      if (response.data.message && response.data.launchUrl === null) {
        return rejectWithValue({
          message: response.data.message,
          status: 400,
          errorDisplay: ERROR_DISPLAY.DIALOG,
        });
      }

      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);

export const launchRealGame = createAsyncThunk(
  'games/launchRealGame',
  async (payload: LaunchRealGameRequest, { rejectWithValue }) => {
    try {
      const response = await gamesApi.launchRealGame(payload);
      if (response.data.accessToken && response.data.launchUrl === null) {
        return rejectWithValue({
          message: response.data.accessToken,
          status: 400,
          errorDisplay: ERROR_DISPLAY.DIALOG,
        });
      }
      return response.data;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue({
        ...errorState,
        errorDisplay: ERROR_DISPLAY.DIALOG,
      });
    }
  },
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    refreshFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setFavoriteAction: (state, action: PayloadAction<{ id: string }>) => {
      if (state.data) {
        state.data = state.data.map((game) => {
          if (game.id === action.payload.id) {
            return { ...game, favorite: !game.favorite };
          }
          return game;
        });
      }
    },
    setCurrentGameId: (state, action: PayloadAction<{ id: string }>) => {
      state.currentGameId = action.payload.id;
    },
    resetCurrentGameId: (state) => {
      state.currentGameId = null;
    },
    setSelectedGameUrl: (
      state,
      action: PayloadAction<{ url: string | null }>,
    ) => {
      state.selectedGameUrl = action.payload.url;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.error = action.payload as ErrorState;
        state.loading = false;
      });
  },
});

export const {
  refreshFilters,
  setFavoriteAction,
  resetCurrentGameId,
  setCurrentGameId,
  setSelectedGameUrl,
} = gamesSlice.actions;

export default gamesSlice.reducer;
