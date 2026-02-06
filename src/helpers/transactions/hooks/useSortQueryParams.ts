import { useSearchParams } from 'react-router-dom';
import { SORT_FIELD, SORT_STATE } from 'store/transactions/constants';
import type {
  SortConfig,
  SortField,
  SortState,
} from 'store/transactions/types';

export function useSortQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSortParams = (): SortConfig => {
    const sortConfig: SortConfig = [];

    searchParams.forEach((value, key) => {
      if (Object.values(SORT_FIELD).includes(key as SortField)) {
        sortConfig.push({ field: key as SortField, order: value as SortState });
      }
    });

    return sortConfig;
  };

  const updateSortParams = (sortConfig: SortConfig) => {
    const updatedParams = new URLSearchParams(searchParams);

    Object.values(SORT_FIELD).forEach((field) => updatedParams.delete(field));

    sortConfig.forEach(({ field, order }) => {
      if (order !== SORT_STATE.NONE) {
        updatedParams.set(field, order);
      }
    });

    setSearchParams(updatedParams);
  };

  return { getSortParams, updateSortParams };
}
