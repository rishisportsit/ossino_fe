import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'store/helpers/createAppAsyncThunk';
import { handleError } from 'store/helpers/handleError';
import type { ErrorState } from 'store/types/Error';
import newsApi from 'api/news/news.api';
import type { articles as NewsArticle } from 'api/news/news.types';

export const getAllNews = createAppAsyncThunk(
  'news/getAllNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await newsApi.getArticles('all');
      return response.articles || [];
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const getTopNews = createAppAsyncThunk(
  'news/getTopNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await newsApi.getArticles('top');
      return response.articles || [];
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

interface NewsState {
  allNews: NewsArticle[];
  topNews: NewsArticle[];
  allNewsLoading: boolean;
  topNewsLoading: boolean;
  allNewsError: ErrorState | null;
  topNewsError: ErrorState | null;
}

const initialState: NewsState = {
  allNews: [],
  topNews: [],
  allNewsLoading: false,
  topNewsLoading: false,
  allNewsError: null,
  topNewsError: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNews(state) {
      state.allNews = [];
      state.topNews = [];
      state.allNewsError = null;
      state.topNewsError = null;
      state.allNewsLoading = false;
      state.topNewsLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // All News
      .addCase(getAllNews.pending, (state) => {
        state.allNewsLoading = true;
        state.allNewsError = null;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.allNewsLoading = false;
        state.allNews = action.payload;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.allNewsLoading = false;
        state.allNewsError = action.payload ?? null;
        state.allNews = [];
      })
      // Top News
      .addCase(getTopNews.pending, (state) => {
        state.topNewsLoading = true;
        state.topNewsError = null;
      })
      .addCase(getTopNews.fulfilled, (state, action) => {
        state.topNewsLoading = false;
        state.topNews = action.payload;
      })
      .addCase(getTopNews.rejected, (state, action) => {
        state.topNewsLoading = false;
        state.topNewsError = action.payload ?? null;
        state.topNews = [];
      });
  },
});

export const { clearNews } = newsSlice.actions;
export default newsSlice.reducer;
