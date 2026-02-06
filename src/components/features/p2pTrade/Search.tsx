import { type ChangeEvent, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { DIALOG_TYPE } from 'store/dialog/slice';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import setting from '/icons/setting.svg?url';
import sorting from '/icons/sorting.svg?url';
import { Button } from 'components/shared/ui/Button';
import SearchInput from 'components/shared/ui/SearchInput';
import Icon from 'components/shared/Icon';
import Select from 'components/shared/Select';

const options = [
  'Selected Option',
  'Most traded',
  'Newly added',
  'Low price',
  'Hight price',
  'Hight returns',
];

const Search = ({ isPage }: { isPage: boolean }) => {
  const { screenWidth } = useBreakpoint();
  const { openDialog, closeDialog } = useDialog();
  const [sort, setSort] = useState<string>('Most traded');
  const [_, setValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const isTablet =
    screenWidth >= BREAKPOINTS.md && screenWidth < BREAKPOINTS.xl;

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

  const onClick = () => {
    if (isTablet) {
      closeDialog(DIALOG_TYPE.betslip);
    }
    openDialog(DIALOG_TYPE.p2pTradeFilter);
  };

  return (
    <div className="flex gap-1">
      <div className="flex-1">
        <SearchInput
          onClear={() => setQuery('')}
          containerClassName="flex-1"
          query={query}
          onChange={onChange}
        />
      </div>
      <Button
        className={cn(
          'h-10 flex items-center rounded-lg bg-base-700 p-0 body-txtColor-1',
          isPage ? 'w-64 justify-start px-3 gap-2.5' : 'w-10 justify-center',
        )}
        onClick={onClick}
      >
        <Icon id="settingIcon" href={setting} className="w-5 h-5 fill-1" />
        {isPage ? 'Filters' : null}
      </Button>
      <Select
        className="size-10 flex items-center justify-center p-0 xl:w-64 xl:max-w-64 xl:px-3"
        childrenClassName="w-fit xl:w-full"
        dropDownClassName="w-[180px] xl:w-64"
        withChevron
        chevronClassName="hidden xl:flex xl:bg-base-700"
        closeOnClick
        list={
          <div className="px-4 py-0">
            {options.map((label) => {
              return (
                <div
                  key={label}
                  className="border-b border-b-borderdefault py-3 text-sm last:border-none hover:text-primary-1"
                  onClick={() => setSort(label)}
                >
                  {label}
                </div>
              );
            })}
          </div>
        }
      >
        <div className="flex gap-2.5 items-center text-sm">
          <Icon id="sortingIcon" href={sorting} className="w-5 h-5 fill-iconprimary" />
          {isPage ? sort : null}
        </div>
      </Select>
    </div>
  );
};

export default Search;
