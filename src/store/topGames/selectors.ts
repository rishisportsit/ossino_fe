import { type RootState } from 'store/index';

export const selectTopGames = (state: RootState) => state.topGames.games;
export const selectTopGamesError = (state: RootState) => state.topGames.error;
export const selectTopGamesLoading = (state: RootState) =>
  state.topGames.loading;
