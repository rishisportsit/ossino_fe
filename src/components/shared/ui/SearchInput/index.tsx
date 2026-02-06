import type { ChangeEvent } from 'react';

import Icon from 'components/shared/Icon';
import searchIcon from '/icons/searchNormal.svg?url';
import close from '/icons/close.svg?url';
import { cn } from 'helpers/ui';

type SearchInputProps = {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  className?: string;
  autoFocus?: boolean;
  containerClassName?: string;
};

const SearchInput = ({
  query,
  onChange,
  onClear,
  className,
  autoFocus,
  containerClassName,
}: SearchInputProps) => {
  return (
    <div className={cn('relative w-full', containerClassName)}>
      <span className="absolute transform translate-y-1/2 w-5 h-5 left-3.5 ">
        <Icon
          id="searchNormalIcon"
          href={searchIcon}
          className="fill-base-500"
        />
      </span>
      {query && (
        <button
          type="button"
          onClick={onClear}
          className="absolute transform translate-y-1/2 w-5 h-5 right-3.5 bg-base-620 rounded-full"
        >
          <Icon id="closeIcon" href={close} className="fill-1" />
        </button>
      )}
      <input
        placeholder="Search"
        className={cn(
          'h-10 rounded-lg bg-base-700 z-0 outline-0 w-full px-10 placeholder:text-base-500 !body-txtColor-1',
          className,
        )}
        value={query}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default SearchInput;
