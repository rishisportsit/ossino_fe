import { RootState } from '../index';

export const selectAllNews = (state: RootState) => state.news.allNews;
export const selectTopNews = (state: RootState) => state.news.topNews;
export const selectAllNewsLoading = (state: RootState) => state.news.allNewsLoading;
export const selectTopNewsLoading = (state: RootState) => state.news.topNewsLoading;

export const selectNewsLoading = (state: RootState) =>
    state.news.allNewsLoading || state.news.topNewsLoading;
