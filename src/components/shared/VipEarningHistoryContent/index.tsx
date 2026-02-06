import { useEffect, useState, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from 'store/index';
import { getPlayerDetailsByBtag } from 'store/affiliatePlayerDetails/slice';
import { type PlayerDetail } from 'api/affiliate/affiliate.types';

import Icon from 'components/shared/Icon';
import Input from 'components/shared/ui/Input';
import { Button } from 'components/shared/ui/Button';
import AffiliatePlayerDetailsItem from '../AffiliatePlayerDetailsItem';
import FilterModal, { type FilterOptions } from '../FilterModal';
import searchNormal from '/icons/searchNormal.svg?url';
import setting from '/icons/setting.svg?url';

const VipEarningHistoryContent = () => {
  const dispatch = useAppDispatch();
  const affiliatePlayerDetails = useAppSelector(
    (state) => state.affiliatePlayerDetails.data,
  );
  const affiliateLoading = useAppSelector(
    (state) => state.affiliatePlayerDetails.loading,
  );
  const user = useAppSelector((state) => state.user.data);

  const [search, setSearch] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    dateRange: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    },
    earningsRange: { min: null, max: null },
    gamesPlayedRange: { min: null, max: null },
    showOnlyWithEarnings: false,
  });
  const [activeFilters, setActiveFilters] =
    useState<FilterOptions>(currentFilters);

  useEffect(() => {
    if (user?.affliateBtag) {
      dispatch(
        getPlayerDetailsByBtag({
          bTag: user.affliateBtag,
          channel: 'Internet',
          endDate: activeFilters.dateRange.endDate,
          itemsPerPage: 50,
          pageNumber: 0,
          startDate: activeFilters.dateRange.startDate,
        }),
      );
    }
  }, [dispatch, user?.affliateBtag, activeFilters.dateRange]);

  const filteredAffiliateData = useMemo(() => {
    if (!affiliatePlayerDetails?.data) return [];

    let filtered = affiliatePlayerDetails.data.filter(
      (player: PlayerDetail) => {
        // Search filter
        const matchesSearch =
          !search.trim() ||
          player.name?.toLowerCase().includes(search?.toLowerCase());

        // Date range filter
        const playerDate = new Date(player.registeredDate);
        const matchesDateRange =
          playerDate >= new Date(activeFilters.dateRange.startDate) &&
          playerDate <= new Date(activeFilters.dateRange.endDate);

        // Earnings range filter
        const matchesEarningsMin =
          activeFilters.earningsRange.min === null ||
          player.totalEarnings >= activeFilters.earningsRange.min;
        const matchesEarningsMax =
          activeFilters.earningsRange.max === null ||
          player.totalEarnings <= activeFilters.earningsRange.max;

        // Games played range filter
        const matchesGamesMin =
          activeFilters.gamesPlayedRange.min === null ||
          player.gamesPlayed >= activeFilters.gamesPlayedRange.min;
        const matchesGamesMax =
          activeFilters.gamesPlayedRange.max === null ||
          player.gamesPlayed <= activeFilters.gamesPlayedRange.max;

        // Show only with earnings filter
        const matchesEarningsFilter =
          !activeFilters.showOnlyWithEarnings || player.totalEarnings > 0;

        return (
          matchesSearch &&
          matchesDateRange &&
          matchesEarningsMin &&
          matchesEarningsMax &&
          matchesGamesMin &&
          matchesGamesMax &&
          matchesEarningsFilter
        );
      },
    );

    return filtered;
  }, [affiliatePlayerDetails?.data, search, activeFilters]);

  const hasAffiliateData =
    filteredAffiliateData && filteredAffiliateData.length > 0;
  const hasAnyData = hasAffiliateData;
  const isLoading = affiliateLoading;

  const handleApplyFilters = () => {
    setActiveFilters(currentFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters: FilterOptions = {
      dateRange: {
        startDate: new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        endDate: new Date().toISOString(),
      },
      earningsRange: { min: null, max: null },
      gamesPlayedRange: { min: null, max: null },
      showOnlyWithEarnings: false,
    };
    setCurrentFilters(defaultFilters);
    setActiveFilters(defaultFilters);
  };

  const hasActiveFilters =
    activeFilters.earningsRange.min !== null ||
    activeFilters.earningsRange.max !== null ||
    activeFilters.gamesPlayedRange.min !== null ||
    activeFilters.gamesPlayedRange.max !== null ||
    activeFilters.showOnlyWithEarnings;

  return (
    <>
      <div className="flex mb-4 gap-2">
        <div className="relative flex-1">
          <Input
            className="pl-[42px]"
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            placeholder="Search"
          />
          <Icon
            id="searchNormalIcon"
            href={searchNormal}
            className="w-5 h-5 fill-base-500 absolute left-3 top-[10px]"
          />
        </div>
        <Button
          onClick={() => setIsFilterModalOpen(true)}
          className={`h-10 w-10 flex items-center justify-center rounded-lg p-0 relative ${
            hasActiveFilters ? 'bg-primary-1 body-txtColor-2' : 'bg-base-700'
          }`}
        >
          <Icon id="settingIcon" href={setting} className="w-5 h-5 fill-1" />
          {hasActiveFilters && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-primary-1 border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-base-400 text-sm">Loading referral details...</p>
          </div>
        ) : !hasAnyData ? (
          <div className="text-center py-8">
            <div className="bg-base-800 rounded-xl p-6">
              <Icon
                id="searchIcon"
                href={searchNormal}
                className="w-12 h-12 stroke-base-500 mx-auto mb-3"
              />
              <h3 className="text-base-300 font-medium mb-2">
                No Referral Details
              </h3>
              <p className="text-base-500 text-sm">
                {search.trim()
                  ? 'No results found for your search.'
                  : 'No referral activity found. Start referring friends to earn rewards!'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {filteredAffiliateData?.map(
              (playerDetail: PlayerDetail, index: number) => (
                <AffiliatePlayerDetailsItem
                  playerDetail={playerDetail}
                  key={`affiliate-${index}`}
                />
              ),
            )}
          </>
        )}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={currentFilters}
        onFiltersChange={setCurrentFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </>
  );
};

export default VipEarningHistoryContent;
