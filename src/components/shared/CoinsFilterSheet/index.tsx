import { useState } from 'react';
import { closeDialog, DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import ArrowRight2Icon from 'assets/icons/ArrowRight2';
import { Button } from 'components/shared/ui/Button';
import Input from 'components/shared/ui/Input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from 'components/shared/ui/Sheet';

export interface CoinsHistoryFilters {
  transactionType?: 'all' | 'credit' | 'debit';
  loyaltyType?: string;
  dateFrom?: string;
  dateTo?: string;
  gameName?: string;
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

const CoinsFilterSheet = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialog.coinsFilter.open);

  const [localFilters, setLocalFilters] = useState<CoinsHistoryFilters>({
    transactionType: 'all',
    loyaltyType: 'all',
    dateFrom: '',
    dateTo: '',
    gameName: '',
  });

  const onChangeStatus = (open: boolean) => {
    if (open) {
      dispatch(openDialog({ id: DIALOG_TYPE.coinsFilter }));
    } else {
      dispatch(closeDialog({ id: DIALOG_TYPE.coinsFilter }));
    }
  };

  const handleApply = () => {
    // Trigger a custom event that the CoinsHistoryTabs component can listen to
    window.dispatchEvent(new CustomEvent('coinsFilterApply', { 
      detail: localFilters 
    }));
    dispatch(closeDialog({ id: DIALOG_TYPE.coinsFilter }));
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
    window.dispatchEvent(new CustomEvent('coinsFilterApply', { 
      detail: resetFilters 
    }));
    dispatch(closeDialog({ id: DIALOG_TYPE.coinsFilter }));
  };

  return (
    <Sheet open={open} onOpenChange={onChangeStatus}>
      <SheetContent className="z-[999] !max-w-[600px] w-full">
        <SheetTitle hidden />
        <SheetDescription hidden />
        <div className="mb-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
              <span className="sr-only">Close</span>
              <ArrowRight2Icon />
            </SheetClose>
            <div className="bg-base-800 px-4 h-8 flex items-center justify-center rounded-lg">
              <span className="font-medium text-primary-2 text-sm">
                Filter Coins History
              </span>
            </div>
          </div>
        </div>
        
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

export default CoinsFilterSheet;