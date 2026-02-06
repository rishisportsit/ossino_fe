import { type ChangeEvent, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import SearchInput from 'components/shared/ui/SearchInput';

const Search = () => {
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
    <SearchInput
      onClear={() => setQuery('')}
      containerClassName="w-full mb-3"
      query={query}
      onChange={onChange}
    />
  );
};

export default Search;
