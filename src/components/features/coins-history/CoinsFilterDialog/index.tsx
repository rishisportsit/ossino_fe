import { useState } from 'react';
import { Button } from 'components/shared/ui/Button';
import Input from 'components/shared/ui/Input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from 'components/shared/ui/Sheet';

export interface CoinsHistoryFilters {
  transactionType?: 'all' | 'credit' | 'debit';
  loyaltyType?: string;
  dateFrom?: string;
  dateTo?: string;
  gameName?: string;
}

interface CoinsFilterDialogProps {
  open: boolean;
  onClose: () => void;
  filters: CoinsHistoryFilters;
  onApplyFilters: (filters: CoinsHistoryFilters) => void;
}

const transactionTypeOptions = [
  { value: 'all', label: 'All Transactions' },
  { value: 'credit', label: 'Credits Only' },
  { value: 'debit', label: 'Debits Only' },
];

const loyaltyTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'betlost', label: 'Bet Lost' },
  { value: 'signup', label: 'Signup Bonus' },
  { value: 'missionCompleted', label: 'Mission Completed' },
  { value: 'mission', label: 'Mission' },
  { value: 'friendDeposit', label: 'Friend Deposit' },
  { value: 'burn', label: 'Coins Burn' },
  { value: 'bonus', label: 'Bonus Redemption' },
  { value: 'cashback', label: 'Cashback' },
];

const CoinsFilterDialog = ({ 
  open, 
  onClose, 
  filters, 
  onApplyFilters 
}: CoinsFilterDialogProps) => {
  const [localFilters, setLocalFilters] = useState<CoinsHistoryFilters>(filters);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: CoinsHistoryFilters = {
      transactionType: 'all',
      loyaltyType: 'all',
      dateFrom: '',
      dateTo: '',
      gameName: '',
    };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle>Filter Coins History</SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Transaction Type
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-base-700 bg-base-800 px-3 py-2 text-sm text-base-200"
              value={localFilters.transactionType || 'all'}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  transactionType: e.target.value as 'all' | 'credit' | 'debit',
                })
              }
            >
              {transactionTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Loyalty Type
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-base-700 bg-base-800 px-3 py-2 text-sm text-base-200"
              value={localFilters.loyaltyType || 'all'}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  loyaltyType: e.target.value,
                })
              }
            >
              {loyaltyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="gameName" className="text-sm font-medium">
              Game Name
            </label>
            <Input
              id="gameName"
              placeholder="Enter game name..."
              value={localFilters.gameName || ''}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  gameName: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <label htmlFor="dateFrom" className="text-sm font-medium">
                From Date
              </label>
              <Input
                id="dateFrom"
                type="date"
                value={localFilters.dateFrom || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    dateFrom: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="dateTo" className="text-sm font-medium">
                To Date
              </label>
              <Input
                id="dateTo"
                type="date"
                value={localFilters.dateTo || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    dateTo: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CoinsFilterDialog;