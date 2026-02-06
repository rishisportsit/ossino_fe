import type { RootState } from '..';

export const selectCategoriesLoading = (state: RootState) =>
  state.categories.loading;

export const selectCategories = (state: RootState) => state.categories.data;
