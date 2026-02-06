import { type ChangeEvent, useEffect, useState } from 'react';
import SearchInput from 'components/shared/ui/SearchInput';
import debounce from 'lodash.debounce';
import SearchRecentSearch from './SearchRecentSearch';
import Categories from './Categories';
import OurSuggestions from './OurSuggestions';
import SearchResults from './SearchResults';
import SearchNoResult from './SearchNoResult';

const SportsSearchContent = () => {
  const [_, setValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  useEffect(() => {
    const debouncedDispatch = debounce(() => {
      setValue(query);
    }, 1000);

    debouncedDispatch();

    return () => {
      debouncedDispatch.cancel();
    };
  }, [query]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };
  return (
    <>
      <div className="px-4 mb-4">
        <SearchInput
          onClear={() => setQuery('')}
          containerClassName="w-full"
          query={query}
          onChange={onChange}
        />
      </div>
      {query.length ? (
        <>
          <Categories />
          {query.length <= 5 ? (
            <SearchResults />
          ) : (
            <div className="px-4 pt-3">
              <SearchNoResult />
            </div>
          )}
        </>
      ) : null}
      {!query.length ? (
        <>
          <div className="flex flex-col gap-3 pl-4 pt-4 mb-8">
            <p className="font-bold body-txtColor-1">Recent search</p>
            <div className="flex flex-col gap-2">
              <SearchRecentSearch className="bg-base-700 text-base-400" />
              <SearchRecentSearch className="bg-base-700 text-base-400" />
            </div>
          </div>
          <OurSuggestions />
        </>
      ) : null}
    </>
  );
};

export default SportsSearchContent;
