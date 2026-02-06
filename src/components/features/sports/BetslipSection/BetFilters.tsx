import { getDateRange } from 'helpers/common';
import Icon from 'components/shared/Icon';
import searchIcon from '/icons/searchNormal.svg?url';
import close from '/icons/close.svg?url';
import { Switch } from 'components/shared/ui/Switch';
import Select from 'components/shared/Select';

interface BetFiltersProps {
  activeBetType: 'open' | 'history';
  showOnlyCashout: boolean;
  onShowOnlyCashoutChange: (checked: boolean) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  openBetsHistoryCount?: number;
  betHistoryFilteredCount?: number;
  onDateRangeChange?: (range: { fromDate: string; toDate: string }) => void;
  selectedTimeFilter?: string;
  onTimeFilterChange?: (filter: string) => void;
}

const BetFilters = ({ activeBetType, showOnlyCashout, onShowOnlyCashoutChange, searchQuery = '', setSearchQuery, openBetsHistoryCount, betHistoryFilteredCount, onDateRangeChange, selectedTimeFilter = 'Today', onTimeFilterChange }: BetFiltersProps) => {

  const handleTimeFilterChange = (filter: string) => {
    if (onTimeFilterChange) {
      onTimeFilterChange(filter);
    }
    const range = getDateRange(filter);
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery?.(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery?.('');
  };

  return (
    <>
      {/* Cashout Toggle for Open Bets */}
      {activeBetType === 'open' && (
        <div className="flex items-center gap-3 mb-6">
          <Switch
            checked={showOnlyCashout}
            onCheckedChange={onShowOnlyCashoutChange}
            aria-label="Show only cash out bets"
          />
          <span className="text-xs font-regular body-txtColor-1">Show only cash out bets</span>
        </div>
      )}

      {/* Search and Filter for Bet History */}
      {activeBetType === 'history' && (
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <span className="absolute transform translate-y-1/2 w-5 h-5 left-3.5">
              <Icon
                id="searchNormalIcon"
                href={searchIcon}
                className="fill-base-500"
              />
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute transform translate-y-1/2 w-5 h-5 right-3.5 bg-base-620 rounded-full"
              >
                <Icon
                  id="closeIcon"
                  href={close}
                  className="fill-1"
                />
              </button>
            )}
            <input
              placeholder="Bet ID"
              className="h-10 rounded-lg bg-base-700 z-0 outline-0 w-full px-10 body-txtColor-1 placeholder-base-400 text-xs font-normal"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Select
            className="bg-third !text-base-200 text-xs font-normal px-3 py-2 rounded border-0 h-[38px] flex items-center"
            dropDownClassName="bg-third text-base-200 min-w-[200px]"
            withChevron
            chevronClassName="!bg-inherit !w-4 !h-4 !ml-2"
            closeOnClick
            list={
              <div className="p-2 space-y-1">
                <div
                  className="px-2 py-1 hover:bg-base-690 rounded cursor-pointer text-base-200 whitespace-nowrap"
                  onClick={() => handleTimeFilterChange('Today')}
                >
                  Today
                </div>
                <div
                  className="px-2 py-1 hover:bg-base-690 rounded cursor-pointer text-base-200 whitespace-nowrap"
                  onClick={() => handleTimeFilterChange('Yesterday')}
                >
                  Yesterday
                </div>
                <div
                  className="px-2 py-1 hover:bg-base-690 rounded cursor-pointer text-base-200 whitespace-nowrap"
                  onClick={() => handleTimeFilterChange('This Week')}
                >
                  This Week
                </div>
                <div
                  className="px-2 py-1 hover:bg-base-690 rounded cursor-pointer text-base-200 whitespace-nowrap"
                  onClick={() => handleTimeFilterChange('This Month')}
                >
                  This Month
                </div>
              </div>
            }
          >
            <span className="text-base-200">{selectedTimeFilter}</span>
          </Select>
        </div>
      )}
    </>
  );
};

export default BetFilters;
