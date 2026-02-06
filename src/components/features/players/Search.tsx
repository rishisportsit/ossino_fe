import { type ChangeEvent, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import setting from '/icons/setting.svg?url';
import SearchInput from 'components/shared/ui/SearchInput';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import FilterDialog from './FilterDialog';

const Search = () => {
  const [_, setValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

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

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="flex gap-1 mb-4 px-4 xl:order-2 xl:px-0 xl:mb-5">
        <div className="flex-1">
          <SearchInput
            onClear={() => setQuery('')}
            containerClassName="flex-1"
            query={query}
            onChange={onChange}
          />
        </div>
        <Button
          className="h-10 flex items-center rounded-lg bg-base-700 p-0 body-txtColor-1 w-10 justify-center xl:w-60 xl:gap-2 xl:justify-start xl:px-3"
          onClick={() => setOpen(true)}
        >
          <Icon id="settingIcon" href={setting} className="w-5 h-5 fill-1" />
          <span className="hidden xl:block text-sm">Filters</span>
        </Button>
      </div>
      <FilterDialog open={open} onOpenChange={onOpenChange} />
    </>
  );
};

export default Search;
