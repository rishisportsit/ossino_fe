import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const selectFavoritesData = (state: RootState) => state.favourites.data;
export const selectFavoritesLoading = (state: RootState) => state.favourites.loading;
export const selectFavoritesError = (state: RootState) => state.favourites.error;
export const selectFavoriteActionLoading = (state: RootState) => state.favourites.actionLoading;
export const selectFavoritesCount = (state: RootState) => {
    return state.favourites.data?.length || 0;
};

export const selectIsGameFavorited = (gameCode: string) =>
    createSelector(
        [selectFavoritesData],
        (favorites) => favorites?.some((fav) => fav.gameCode === gameCode) ?? false
    );

export const selectFavoriteGameCodes = createSelector(
    [selectFavoritesData],
    (favorites) => new Set(favorites?.map((fav) => fav.gameCode) ?? [])
);

export const selectIsGameFavoriteLoading = (gameCode: string) =>
    createSelector(
        [selectFavoriteActionLoading],
        (actionLoading) => actionLoading?.[gameCode] ?? false
    );

export const selectFavoriteGameData = (gameCode: string) =>
    createSelector(
        [selectFavoritesData],
        (favorites) => favorites?.find((fav) => fav.gameCode === gameCode) ?? null
    );