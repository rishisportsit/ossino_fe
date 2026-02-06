import { FILTERS } from 'constants/filters.ts';
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { SORT_METHOD } from 'store/games/constants';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSortParam = useCallback(() => searchParams.get(FILTERS.sort) || SORT_METHOD.asc, [searchParams]);
  const getSearchParam = useCallback(() => searchParams.get(FILTERS.search) , [searchParams]);

  const getProviderParams = useCallback(() => {
    return searchParams.getAll(FILTERS.provider) || []
  }, [searchParams]);

  const getCategoryParams = useCallback(() => {
    return searchParams.getAll(FILTERS.category) || [];
  }, [searchParams]);

  const updateQueryParams = useCallback(
    (key: string, value: string | string[]) => {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete(key);

      if (Array.isArray(value)) {
        value.forEach((val) => updatedParams.append(key, String(val)));
      } else {
        updatedParams.set(key, String(value));
      }

      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams]
  );

  const clearQueryParams = useCallback(
    (key: string) => {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete(key);
      setSearchParams(updatedParams);
    },
    [searchParams, setSearchParams]
  );

  return {
    getSortParam,
    getSearchParam,
    getProviderParams,
    getCategoryParams,
    updateQueryParams,
    clearQueryParams,
    searchParams
  };
};