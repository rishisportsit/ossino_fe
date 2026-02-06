import { type ChangeEvent } from 'react';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import { useDialog } from 'helpers/hooks';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, } from 'components/shared/ui/Drawer';
import SInput from 'components/shared/ui/SearchInput';
import SearchRecentSearch from '../SeachRecentSearch';
import PopularParlaysSlider from '../PopularParlaysSlider';
import HotDogsSlider from '../HotDogsSlider';
import SearchResult from '../SearchResult';
import SearchNoResult from '../SearchNoResult';
import { Fixture } from 'api/SportsHomePage/sportsHomePage.types';
import SportSelector from 'components/features/sports/MatchesSection/SportSelector';
import TopLeaguesSection from 'components/features/sports/TopLeaguesSection';
import { RecentSearchResponse } from 'api/discoverySearchSports/discoverySearchSports.types';
import { selectIsLoggedIn } from 'store/user/selectors';

type SearchDialogProps = {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  searchResutlsData: Fixture[];
  sports: { sportId: string; sportName: string }[];
  selectedSport: string;
  onSportChange: (sportId: string) => void;
  searchLoading?: boolean;
  recentSearchData?: RecentSearchResponse | null;
  recentSearchDataLoading?: boolean;
  onRecentSearchClick?: (searchTerm: string) => void;
};

const SearchDialog = ({ query, onChange, onClear, searchResutlsData, sports: sportNames, selectedSport, onSportChange: setSelectedSport, searchLoading, recentSearchData, recentSearchDataLoading, onRecentSearchClick }: SearchDialogProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

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

  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.search));
  const { closeDialog } = useDialog();
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.search);
    }
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
      <p className="mt-4 text-base-400 text-sm">Loading ...</p>
    </div>
  );

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="pr-0 pb-0">
        <DrawerDescription className="hidden" />
        <DrawerTitle className="hidden" />
        <div className="flex flex-col gap-8">
          <div className="pr-4">
            <SInput
              query={query}
              onChange={onChange}
              onClear={onClear}
              className="text-sm text-base-500"
              autoFocus
            />
          </div>
          {/* search imitation */}
          {!query.length ? (
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <p className="font-bold body-txtColor-1">Recent search</p>
                  <div className="flex flex-col gap-2">
                    <SearchRecentSearch
                      recentSearchData={recentSearchData ?? null}
                      recentSearchDataLoading={recentSearchDataLoading}
                      onRecentSearchClick={onRecentSearchClick}
                      className="bg-base-700 text-base-400" />
                  </div>
                </div>
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
              <SportSelector
                sports={sportNames}
                selectedSport={selectedSport}
                onSportChange={setSelectedSport}
              />
              <SearchResult fixturesByGroup={fixturesByGroup} />
            </>
          )}
          {!query.length ? (
            <>
              <PopularParlaysSlider />
              <HotDogsSlider />
            </>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDialog;
