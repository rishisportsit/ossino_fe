import { FILTERS } from 'constants/filters.ts';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from 'store/index';
import { refreshFilters } from 'store/games/slice';
import debounce from 'lodash.debounce';
import { useFilters } from 'components/shared/Search/useFilters';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import SearchInput from '../ui/SearchInput';

const Search = () => {
  const [query, setQuery] = useState('');
  const { applyFilter, clearFilter, search } = useCustomQueryParams();
  const dispatch = useAppDispatch();

  const filters = useFilters();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      clearFilter(FILTERS.search);
    }
    setQuery(e.currentTarget.value);
  };

  const clearQueryHandler = () => {
    setQuery('');
    clearFilter(FILTERS.search);
  };

  useEffect(() => {
    const debouncedDispatch = debounce(() => {
      dispatch(refreshFilters({ search: query }));
      if (query) {
        applyFilter(FILTERS.search, query);
      }
    }, 1000);

    debouncedDispatch();

    return () => {
      debouncedDispatch.cancel();
    };
  }, [query, dispatch, applyFilter]);

  useEffect(() => {
    if (search) {
      setQuery(search);
      applyFilter(FILTERS.search, search);
    }
  }, [applyFilter, search]);

  return (
    <div className="flex w-full gap-2 z-[300]">
      <SearchInput
        query={query}
        onChange={onChangeHandler}
        onClear={clearQueryHandler}
      />
      {filters}
    </div>
  );
};

export default Search;
