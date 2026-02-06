import { FILTERS } from 'constants/filters.ts';
import { ROUTES } from 'constants/routes.ts';
import { useEffect, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectFilter } from 'store/games/selectors';
import { useQueryParams } from 'helpers/useCustomQueryParams/useQueryParams';
import { refreshFilters, type SortMethod } from 'store/games/slice';
import { type ProviderCode as Provider } from 'api/content/content.types';

type FilterKey = keyof typeof FILTERS;

export const useCustomQueryParams = () => {
  const dispatch = useAppDispatch();
  const { categoryId, providerId } = useParams();
  const { pathname } = useLocation();
  const { sort, search, providers, categories } = useAppSelector(selectFilter);

  const {
    getSortParam,
    getSearchParam,
    getProviderParams,
    getCategoryParams,
    updateQueryParams,
    clearQueryParams,
    searchParams,
  } = useQueryParams();

  const isFavoritePage = pathname === ROUTES.favorites;
  const categoryFromUrl = categoryId ? categoryId.toLowerCase() : null;
  const providerFromUrl = providerId ? providerId.toLowerCase() : null;

  useEffect(() => {
    const sortParam = getSortParam();
    const searchParam = getSearchParam();
    const providerParams = providerFromUrl
      ? [providerFromUrl]
      : getProviderParams();
    const categoryParams = categoryFromUrl
      ? [categoryFromUrl]
      : getCategoryParams();

    dispatch(
      refreshFilters({
        sort: sortParam as SortMethod,
        search: searchParam,
        providers: providerParams as Provider[],
        categories: categoryParams as string[],
        favorite: isFavoritePage,
      }),
    );
  }, [
    dispatch,
    categoryFromUrl,
    providerFromUrl,
    getSortParam,
    getProviderParams,
    getCategoryParams,
    getSearchParam,
    isFavoritePage,
  ]);

  const applyFilter = useCallback(
    (filter: FilterKey, value: string) => {
      const currentValues = searchParams.getAll(filter);

      let newValues: string[] = [];

      if (filter === FILTERS.provider || filter === FILTERS.category) {
        newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];

        const updatedFilters = { [filter]: newValues };
        dispatch(refreshFilters(updatedFilters));
        updateQueryParams(filter, newValues);
      } else {
        dispatch(refreshFilters({ [filter]: value }));
        updateQueryParams(filter, value);
      }
    },
    [searchParams, dispatch, updateQueryParams],
  );

  const setSingleFilter = useCallback(
    (filter: FilterKey, value: string) => {
      // Always set only the current value, removing all others
      dispatch(refreshFilters({ [filter]: [value] }));
      updateQueryParams(filter, [value]);
    },
    [dispatch, updateQueryParams]
  );

  const clearFilter = useCallback(
    (type: FilterKey) => {
      clearQueryParams(type);
      if (type === FILTERS.search) {
        dispatch(refreshFilters({ search: '' }));
        return;
      }
      dispatch(refreshFilters({ [type]: [] }));
    },
    [dispatch, clearQueryParams],
  );

  const setCategories = useCallback(
    (newCategories: string[]) => {
      dispatch(refreshFilters({ categories: newCategories }));
      updateQueryParams(FILTERS.category, newCategories);
    },
    [dispatch, updateQueryParams]
  );

  return {
    sort,
    search,
    providers,
    categories,
    applyFilter,
    clearFilter,
    setSingleFilter,
    setCategories,
  };
};
