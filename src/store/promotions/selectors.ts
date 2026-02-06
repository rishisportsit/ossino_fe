import type { RootState } from '..';

export const selectPromotionsData = (category?: string) => (state: RootState) => {
  const { data } = state.promotions;

  if (!data) return null;

  if (!category || category === 'all') {
    return data;
  }

  return data.filter((item) => {
    if (!item.categories) return false;
    const categories = item.categories.toLowerCase().split(',').map(cat => cat.trim());
    return categories.includes(category.toLowerCase());
  });
};

export const selectPromotionsLoading = (state: RootState) => state.promotions.loading;
export const selectPromotionsError = (state: RootState) => state.promotions.error;