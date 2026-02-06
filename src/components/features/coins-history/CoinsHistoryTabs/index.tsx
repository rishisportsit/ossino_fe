import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { openDialog, closeDialog, DIALOG_TYPE } from 'store/dialog/slice';
import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';
import {
  selectCoinsHistoryError,
  selectCoinsHistoryLoading,
  selectFilteredCoinsHistory,
} from 'store/coinsHistory/selectors';
import { getCoinsHistory } from 'store/coinsHistory/slice';
import CoinsHistoryList from '../CoinsHistoryList';
import CoinsSearch from '../CoinsSearch';
import CoinsHistoryItemSkeleton from '../CoinsHistoryItemSkeleton';
import CoinsHistoryPaginationBlock from '../CoinsHistoryItem/CoinsHistoryPagination';

export interface CoinsHistoryFilters {
  transactionType?: 'all' | 'credit' | 'debit';
  loyaltyType?: string;
  dateFrom?: string;
  dateTo?: string;
  gameName?: string;
}

enum TabValue {
  All = 'all',
  Earns = 'earns',
  Burns = 'burns',
}

type Tab = {
  label: string;
  value: TabValue;
};

const options: Tab[] = [
  {
    label: 'All',
    value: TabValue.All,
  },
  {
    label: 'Earns',
    value: TabValue.Earns,
  },
  {
    label: 'Burns',
    value: TabValue.Burns,
  },
];

const ITEMS_PER_PAGE = 10;

const CoinsHistoryTabs = () => {
  const dispatch = useAppDispatch();

  const coinsHistoryError = useAppSelector(selectCoinsHistoryError);
  const coinsHistoryLoading = useAppSelector(selectCoinsHistoryLoading);
  const filteredCoinsHistory = useAppSelector(selectFilteredCoinsHistory);
  const [currentTab, setCurrentTab] = useState<TabValue>(options[0].value);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeFilters, setActiveFilters] = useState<CoinsHistoryFilters>({
    transactionType: 'all',
    loyaltyType: 'all',
    dateFrom: '',
    dateTo: '',
    gameName: '',
  });

  useEffect(() => {
    dispatch(getCoinsHistory());
  }, [dispatch]);

  useEffect(() => {
    const handleFilterApply = (event: CustomEvent) => {
      setActiveFilters(event.detail);
    };

    window.addEventListener('coinsFilterApply', handleFilterApply as EventListener);
    
    return () => {
      window.removeEventListener('coinsFilterApply', handleFilterApply as EventListener);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab, searchQuery]);

  if (coinsHistoryError) {
    const { message } = coinsHistoryError;

    return (
      <div className="flex flex-col justify-center h-[300px]">
        <ErrorMessage message={message} />
      </div>
    );
  }

  const sortByDateDescending = (items: any[]) => {
    return [...items].sort((a, b) => {
      const dateA = a.createdAt || a.timestamp || a.date || a.transactionDate;
      const dateB = b.createdAt || b.timestamp || b.date || b.transactionDate;

      if (!dateA || !dateB) return 0;

      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  };

  const filterBySearch = (items: any[]) => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery?.toLowerCase();
    return items.filter((item) => {
      const gameName = (item.gameName || '').toLowerCase();
      const loyaltyType = (item.loyaltyType || '').toLowerCase();
      const betId = (item.betId || '').toLowerCase();
      const missionId = (item.missionId || '').toLowerCase();
      const id = (item.id || '').toLowerCase();

      return (
        gameName.includes(query) ||
        loyaltyType.includes(query) ||
        betId.includes(query) ||
        missionId.includes(query) ||
        id.includes(query)
      );
    });
  };

  const filterByAdvancedFilters = (items: any[]) => {
    return items.filter((item) => {
      if (activeFilters.transactionType && activeFilters.transactionType !== 'all') {
        if (item.transactionType !== activeFilters.transactionType) {
          return false;
        }
      }

      if (activeFilters.loyaltyType && activeFilters.loyaltyType !== 'all') {
        if (item.loyaltyType !== activeFilters.loyaltyType) {
          return false;
        }
      }

      if (activeFilters.gameName && activeFilters.gameName.trim()) {
        const gameName = (item.gameName || '').toLowerCase();
        const filterGame = activeFilters.gameName?.toLowerCase();
        if (!gameName.includes(filterGame)) {
          return false;
        }
      }

      if (activeFilters.dateFrom || activeFilters.dateTo) {
        const itemDate = new Date(item.created_date);
        
        if (activeFilters.dateFrom) {
          const fromDate = new Date(activeFilters.dateFrom);
          if (itemDate < fromDate) return false;
        }
        
        if (activeFilters.dateTo) {
          const toDate = new Date(activeFilters.dateTo);
          toDate.setHours(23, 59, 59, 999);
          if (itemDate > toDate) return false;
        }
      }

      return true;
    });
  };

  const hasActiveFilters = (): boolean => {
    return Boolean(
      activeFilters.transactionType !== 'all' ||
      activeFilters.loyaltyType !== 'all' ||
      (activeFilters.gameName && activeFilters.gameName.trim() !== '') ||
      (activeFilters.dateFrom && activeFilters.dateFrom !== '') ||
      (activeFilters.dateTo && activeFilters.dateTo !== '')
    );
  };

  const paginateItems = (items: any[]) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  };

  const renderTab = (value: TabValue) => {
    if (coinsHistoryLoading) {
      return (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <CoinsHistoryItemSkeleton key={index} />
          ))}
        </div>
      );
    }

    const coinsHistory = filteredCoinsHistory?.[value] || [];

    if (!coinsHistory || coinsHistory.length === 0) {
      return (
        <div className="flex justify-center items-center h-[200px]">
          <NoItemsMessage message="No history found" />
        </div>
      );
    }

    const sortedItems = sortByDateDescending(coinsHistory);
    const advancedFilteredItems = filterByAdvancedFilters(sortedItems);
    const filteredItems = filterBySearch(advancedFilteredItems);

    if (filteredItems.length === 0) {
      return (
        <div className="flex justify-center items-center h-[200px]">
          <NoItemsMessage message="No results match your search" />
        </div>
      );
    }

    const paginatedItems = paginateItems(filteredItems);
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

    return (
      <div className="flex flex-col gap-4">
        <CoinsHistoryList coinsHistory={paginatedItems} currentTab={value} />
        {totalPages > 1 && (
          <CoinsHistoryPaginationBlock
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    );
  };

  return (
    <Tabs
      defaultValue={currentTab}
      onValueChange={(value) => {
        setCurrentTab(value as TabValue);
      }}
    >
      <TabsList>
        {options.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className="font-medium w-32">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <CoinsSearch 
        value={searchQuery} 
        onChange={setSearchQuery}
        onFilterClick={() => dispatch(openDialog({ id: DIALOG_TYPE.coinsFilter }))}
        hasActiveFilters={hasActiveFilters()}
      />
      {options.map(({ value }) => (
        <TabsContent key={value} className="mt-4 xl:mt-3" value={value}>
          {renderTab(value)}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CoinsHistoryTabs;
