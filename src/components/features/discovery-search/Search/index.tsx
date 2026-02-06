import { type ChangeEvent, useEffect, useState, useCallback, useRef, } from 'react';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import SearchDialog from '../SearchDialog';
import SearchContentMobile from '../SearchContentMobile';
import SearchContentTablet from '../SearchContentTablet';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getDiscoverySearch, getRecentSearchDiscoveryPage } from 'store/discoverySearchSports/slice';
import { Fixture } from 'api/SportsHomePage/sportsHomePage.types';

const Search = () => {
  const [query, setQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [sportNames, setSportNames] = useState<{ sportId: string; sportName: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const userIdRaw = localStorage.getItem('userId');
  const userId = userIdRaw ? JSON.parse(userIdRaw) : '';

  const dispatch = useAppDispatch();
  const { screenWidth } = useBreakpoint();
  const isMobile = screenWidth < BREAKPOINTS.md;

  const rawFixtures = useAppSelector((state) => state.discoverySearchSports.discoverySearch.result?.all_competitions?.fixtures);
  const searchLoading = useAppSelector((state) => state.discoverySearchSports.discoverySearch.loading);
  const recentSearchData = useAppSelector((state) => state.discoverySearchSports.recentSearchDiscoveryPage);
  const recentSearchDataLoading = useAppSelector((state) => state.discoverySearchSports.recentSearchDiscoveryPage.loading);

  const searchResultsData = rawFixtures ?? [];
  const filteredFixtures = selectedSport ? searchResultsData.filter((fixture) => String(fixture.sportId) === String(selectedSport)) : searchResultsData;

  useEffect(() => {
    const map = new Map<string, { sportId: string; sportName: string }>();
    searchResultsData.forEach((fixture: Fixture) => {
      if (fixture.sportId && fixture.sportName && !map.has(String(fixture.sportId))) {
        map.set(String(fixture.sportId), {
          sportId: String(fixture.sportId),
          sportName: fixture.sportName,
        });
      }
    });

    const nextSports = [
      { sportId: '', sportName: 'All Sports' },
      ...Array.from(map.values()),
    ];

    setSportNames((prev) => {
      if (
        prev.length === nextSports.length &&
        prev.every(
          (p, i) =>
            p.sportId === nextSports[i].sportId &&
            p.sportName === nextSports[i].sportName
        )
      ) {
        return prev;
      }
      return nextSports;
    });
  }, [searchResultsData]);

  useEffect(() => {
    if (sportNames.length > 0) {
      if (!sportNames.some(s => s.sportId === selectedSport)) {
        setSelectedSport(sportNames[0].sportId);
      }
    } else {
      setSelectedSport('');
    }
  }, [sportNames, selectedSport]);

  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;

  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (!searchQuery.trim()) return;

        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        dispatch(
          getDiscoverySearch({
            accessToken: localStorage.getItem('accessToken') || '',
            'X-Client-Id': xClientId,
            'X-Api-Key': xApiKey,
            'X-Language-Code': 'en',
            userId,
            searchString: searchQuery,
            signal: abortControllerRef.current.signal,
          })
        );
      }, 500);
    },
    [dispatch, xApiKey, xClientId, userId]
  );

  useEffect(() => {
    if (!searchLoading) {
      setIsTyping(false);
    }
  }, [searchLoading]);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      setIsTyping(true);
      debouncedSearch(value);
    } else {
      setIsTyping(false);
    }
  };

  const onClear = () => {
    setQuery('');
    setSelectedSport('');

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    dispatch(getRecentSearchDiscoveryPage({
      accessToken: localStorage.getItem('accessToken') || '',
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      userId,
    }));
  }, [dispatch, xApiKey, xClientId, userId]);

  const handleRecentSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
    setIsTyping(true);
    debouncedSearch(searchTerm);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {isMobile ? (
          <SearchContentMobile
            recentSearchData={recentSearchData?.result}
            recentSearchDataLoading={recentSearchDataLoading}
            onRecentSearchClick={handleRecentSearchClick}
          />
        ) : (
          <SearchContentTablet
            query={query}
            onChange={onChange}
            onClear={onClear}
            searchResutlsData={filteredFixtures}
            sports={sportNames}
            selectedSport={selectedSport}
            onSportChange={setSelectedSport}
            searchLoading={searchLoading || isTyping}
            recentSearchData={recentSearchData?.result}
            recentSearchDataLoading={recentSearchDataLoading}
            onRecentSearchClick={handleRecentSearchClick}
          />
        )}
      </div>

      <SearchDialog
        query={query}
        onChange={onChange}
        onClear={onClear}
        searchResutlsData={filteredFixtures}
        sports={sportNames}
        selectedSport={selectedSport}
        onSportChange={setSelectedSport}
        searchLoading={searchLoading || isTyping}
        recentSearchData={recentSearchData?.result}
        recentSearchDataLoading={recentSearchDataLoading}
        onRecentSearchClick={handleRecentSearchClick}
      />
    </>
  );
};

export default Search;