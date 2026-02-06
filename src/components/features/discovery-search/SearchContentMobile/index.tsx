import { DIALOG_TYPE } from 'store/dialog/slice';
import { useDialog } from 'helpers/hooks';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import SearchRecentSearch from '../SeachRecentSearch';
import searchIcon from '/icons/searchNormal.svg?url';
import { RecentSearchResponse } from 'api/discoverySearchSports/discoverySearchSports.types';
import TopLeaguesSection from 'components/features/sports/TopLeaguesSection';
import { useAppSelector } from 'store/index';
import { selectIsLoggedIn } from 'store/user/selectors';

interface SearchContentMobileProps {
  recentSearchData?: RecentSearchResponse | null;
  recentSearchDataLoading?: boolean;
  onRecentSearchClick?: (searchTerm: string) => void;
}

const SearchContentMobile = ({ recentSearchData, onRecentSearchClick, recentSearchDataLoading }: SearchContentMobileProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { openDialog } = useDialog();

  return (
    <>
      <div className="px-4 w-full xl:px-0">
        <Button
          variant="filledGray"
          className="justify-start gap-1.5 px-3 w-full"
          onClick={() => openDialog(DIALOG_TYPE.search)}
        >
          <Icon
            id="searchNormalIcon"
            href={searchIcon}
            className="fill-base-500 w-5 h-5"
          />
          Search
        </Button>
      </div>
      <div className="flex flex-col gap-2 pl-4">

        {isLoggedIn ? (
          <>
            <SearchRecentSearch
              recentSearchData={recentSearchData ?? null}
              recentSearchDataLoading={recentSearchDataLoading}
              onRecentSearchClick={onRecentSearchClick}
            />
          </>
        ) : (
          <TopLeaguesSection />
        )}
      </div>
    </>
  );
};

export default SearchContentMobile;
