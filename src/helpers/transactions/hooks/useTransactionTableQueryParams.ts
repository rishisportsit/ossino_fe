import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const CATEGORY = 'category';

export const useTransactionTableQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getCategoryParam = useCallback(() => {
    return searchParams.get(CATEGORY) || null;
  }, [searchParams]);

  const updateCategoryParam = useCallback(
    (category: string) => {
      const editedCategoryParam = new URLSearchParams(searchParams);
      editedCategoryParam.set(CATEGORY, category);
      setSearchParams(editedCategoryParam);
    },
    [searchParams, setSearchParams],
  );

  const clearCategoryParam = useCallback(() => {
    const clearedCategoryParam = new URLSearchParams(searchParams);
    clearedCategoryParam.delete(CATEGORY);
    setSearchParams();
  }, [searchParams, setSearchParams]);

  return {
    getCategoryParam,
    updateCategoryParam,
    clearCategoryParam,
    searchParams,
  };
};
