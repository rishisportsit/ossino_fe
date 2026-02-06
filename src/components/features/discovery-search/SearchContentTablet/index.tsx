import { type ChangeEvent } from 'react';

import SearchInput from 'components/shared/ui/SearchInput';
import SearchRecentSearch from '../SeachRecentSearch';
import SearchExpandedResult from '../SearchExpandedResult';
import SearchNoResult from '../SearchNoResult';
import TopLeaguesSection from 'components/features/sports/TopLeaguesSection';
import { Fixture } from 'api/SportsHomePage/sportsHomePage.types';
import SportSelector from 'components/features/sports/MatchesSection/SportSelector';
import { RecentSearchResponse } from 'api/discoverySearchSports/discoverySearchSports.types';
import { useAppSelector } from 'store/index';
import { selectIsLoggedIn } from 'store/user/selectors';

type SearchContentTabletProps = {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  searchResutlsData: Fixture[];
  sports: { sportId: string; sportName: string }[];
  selectedSport: string;
  onSportChange: (sportId: string) => void;
  searchLoading?: boolean;
  recentSearchData?: RecentSearchResponse | null
  recentSearchDataLoading?: boolean;
  onRecentSearchClick?: (searchTerm: string) => void;
};

const SearchContentTablet = ({
  query,
  onChange,
  onClear,
  searchResutlsData,
  sports: sportNames,
  selectedSport,
  onSportChange: setSelectedSport,
  searchLoading,
  recentSearchData,
  onRecentSearchClick,
  recentSearchDataLoading
}: SearchContentTabletProps) => {
  const groupFixturesByLeague = (fixtures: any[]) => {
    const leaguesMap: { [key: string]: any } = {};

    fixtures.forEach((fixture) => {
      const leagueName = fixture?.leagueName || 'Unknown League';
      if (!leaguesMap[leagueName]) {
        leaguesMap[leagueName] = {
          id: fixture?.providerFixtureId,
          name: leagueName,
          sportid: fixture?.sportId,
          segmentid: fixture?.segmentId,
          leagueId: fixture?.leagueId,
          matches: [],
        };
      }
      leaguesMap[leagueName].matches.push(fixture);
    });
    return Object.values(leaguesMap);
  };

  const fixturesByGroup = groupFixturesByLeague(searchResutlsData);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
      <p className="mt-4 text-base-400 text-sm">Loading ...</p>
    </div>
  );

  return (
    <>
      <div className="px-4 w-full xl:px-0">
        <SearchInput
          query={query}
          onChange={onChange}
          onClear={onClear}
          className="text-sm text-base-500"
        />
      </div>
      <div className="flex flex-col gap-5 pl-4 xl:pl-0">
        {/* search imitation */}
        {!query.length ? (
          <div className="flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <SearchRecentSearch
                  recentSearchData={recentSearchData ?? null}
                  recentSearchDataLoading={recentSearchDataLoading}
                  onRecentSearchClick={onRecentSearchClick}
                  className="xl:bg-base-700" />
              </>
            ) : (
              <TopLeaguesSection />
            )}
          </div>
        ) : null}

        {searchLoading && (
          <LoadingSpinner />
        )}
        {!searchLoading && query.length > 0 && fixturesByGroup.length === 0 && (
          <div className="pr-4">
            <SearchNoResult query={query} />
          </div>
        )}
        {!searchLoading && query.length > 0 && fixturesByGroup.length > 0 && (
          <>
            <p className="font-bold body-txtColor-1 mt-4">Results</p>
            <div>
              <SportSelector
                sports={sportNames}
                selectedSport={selectedSport}
                onSportChange={setSelectedSport}
              />
            </div>
            <SearchExpandedResult fixturesByGroup={fixturesByGroup} />
          </>
        )}
      </div>
    </>
  );
};

export default SearchContentTablet;
