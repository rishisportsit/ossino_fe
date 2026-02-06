import { Button } from 'components/shared/ui/Button';
import Input from 'components/shared/ui/Input';
import Icon from 'components/shared/Icon';
import close from '/icons/close.svg?url';

export type FilterOptions = {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  earningsRange: {
    min: number | null;
    max: number | null;
  };
  gamesPlayedRange: {
    min: number | null;
    max: number | null;
  };
  showOnlyWithEarnings: boolean;
};

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const FilterModal = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
}: FilterModalProps) => {
  if (!isOpen) return null;

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const handleEarningsChange = (field: 'min' | 'max', value: string) => {
    onFiltersChange({
      ...filters,
      earningsRange: {
        ...filters.earningsRange,
        [field]: value ? parseFloat(value) : null,
      },
    });
  };

  const handleGamesPlayedChange = (field: 'min' | 'max', value: string) => {
    onFiltersChange({
      ...filters,
      gamesPlayedRange: {
        ...filters.gamesPlayedRange,
        [field]: value ? parseInt(value) : null,
      },
    });
  };

  return (
    <div className="fixed inset-0 background-2 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-base-200">Filter Referrals</h3>
          <Button
            onClick={onClose}
            className="h-10 w-10 p-0 bg-transparent hover:bg-base-700"
          >
            <Icon id="closeIcon" href={close} className="w-5 h-5 fill-1" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-base-300 mb-2">
              📅 Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-base-400 mb-1">From</label>
                <Input
                  type="date"
                  value={filters.dateRange.startDate.split('T')[0]}
                  onChange={(e) => handleDateChange('startDate', e.target.value + 'T00:00:00.000Z')}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-base-400 mb-1">To</label>
                <Input
                  type="date"
                  value={filters.dateRange.endDate.split('T')[0]}
                  onChange={(e) => handleDateChange('endDate', e.target.value + 'T23:59:59.999Z')}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Earnings Range */}
          <div>
            <label className="block text-sm font-medium text-base-300 mb-2">
              Earnings Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-base-400 mb-1">Min</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={filters.earningsRange.min ?? ''}
                  onChange={(e) => handleEarningsChange('min', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-base-400 mb-1">Max</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="1000.00"
                  value={filters.earningsRange.max ?? ''}
                  onChange={(e) => handleEarningsChange('max', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Games Played Range */}
          <div>
            <label className="block text-sm font-medium text-base-300 mb-2">
              Games Played
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-base-400 mb-1">Min</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.gamesPlayedRange.min ?? ''}
                  onChange={(e) => handleGamesPlayedChange('min', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-base-400 mb-1">Max</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={filters.gamesPlayedRange.max ?? ''}
                  onChange={(e) => handleGamesPlayedChange('max', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Checkbox Filters */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.showOnlyWithEarnings}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  showOnlyWithEarnings: e.target.checked,
                })}
                className="rounded border-base-600 text-primary-1 focus:ring-primary-1"
              />
              <span className="text-sm text-base-300">Show only referrals with earnings</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="flex-1"
          >
            Clear All
          </Button>
          <Button
            onClick={() => {
              onApplyFilters();
              onClose();
            }}
            className="flex-1 bg-primary-1 hover:bg-primary-1/80 body-txtColor-2"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;