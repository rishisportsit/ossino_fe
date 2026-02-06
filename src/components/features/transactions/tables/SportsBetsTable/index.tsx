/* eslint-disable no-nested-ternary */
import SortingColumn from "components/shared/SortingColumnWithArrows";
import useScrollShadows, { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { sortRawTransactions } from "helpers/transactions/sorting/sortRawTransactions";
import { cn } from "helpers/ui";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/index";
import { selectUserSportsBetHistory } from "store/transactions/selectors";
import { selectCurrencyData } from "store/currency/selectors";
import { selectWalletState } from "store/wallet/selectors";
import type { SortConfig, SortField, SportsBetData } from "store/transactions/types";
import { useSortQueryParams } from "helpers/transactions/hooks/useSortQueryParams";
import { SORT_FIELD, SORT_STATE } from "store/transactions/constants";
import styles from '../../TransactionsContent/transactionsContent.module.css';
import NoTransactionsPlaceholder from "../NoTransactionsPlaceholder";

import SportsBetItem from "./SportsBetItem";
import Pagination from "components/shared/ui/Pagination";
import { getSportsBetHistoryApiData } from "store/transactions/slice";

const SportsBetsTable = () => {
  const { screenWidth } = useBreakpoint();
  const { getSortParams, updateSortParams } = useSortQueryParams();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { showBefore, showAfter } = useScrollShadows(containerRef);
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;

  const initialSortConfig = getSortParams();
  const dispatch = useAppDispatch();
  const conversionData = useAppSelector(selectCurrencyData);
  const { currencies, selectedCurrency, usdToggleEnabled } = useAppSelector(selectWalletState);

  type ServerSportBets =
    | SportsBetData[]
    | { bets?: SportsBetData[]; pageInfo?: { total?: number } };

  const sportBetsRaw = useAppSelector(selectUserSportsBetHistory) as ServerSportBets | undefined;
  const sportBetsFromServer = Array.isArray(sportBetsRaw)
    ? sportBetsRaw
    : sportBetsRaw?.bets ?? [];
  const sportsBetsFromServerTotalCount = Array.isArray(sportBetsRaw)
    ? sportBetsRaw.length
    : sportBetsRaw?.pageInfo?.total ?? 0;

  const [sortedBets, setSortedBets] = useState<SportsBetData[]>(sportBetsFromServer);
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialSortConfig?.length
      ? initialSortConfig
      : [{ field: SORT_FIELD.DATE, order: SORT_STATE.NONE }]
  );

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState({ itemPerPage: 10, pageNumber: 0 })

  useEffect(() => {
    setIsLoading(true);
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(userAgent);
    const clientType = isMobile ? 'Mobile' : 'Internet';
    dispatch(getSportsBetHistoryApiData({
      channel: clientType,
      limit: 10,
      offset: page?.pageNumber,
    }))
      .finally(() => setIsLoading(false));
  }, [dispatch, page.pageNumber]);

  useEffect(() => {
    if (!sportBetsFromServer) return
    let result = [...sportBetsFromServer];
    sortConfig.forEach(({ field, order }) => {
      if (order !== SORT_STATE.NONE) {
        const numericFields: SortField[] = [
          SORT_FIELD.TOTALODDS as SortField,
          SORT_FIELD.STAKE as SortField,
          SORT_FIELD.PAYOUT as SortField
        ];
        if (numericFields.includes(field as SortField)) {
          result.sort((a: any, b: any) => {
            const aVal = parseFloat(a[field]) || 0;
            const bVal = parseFloat(b[field]) || 0;
            return order === 'asc' ? aVal - bVal : bVal - aVal;
          });
        } else {
          result = sortRawTransactions(result, field, order) as typeof result;
        }
      }
    });
    setSortedBets(result);
  }, [sortConfig, sportBetsFromServer]);

  const handleSortBets = (sortType: SortField) => {
    setSortConfig((prevConfig) => {
      const existingIndex = prevConfig.findIndex((config) => config.field === sortType);
      const newConfig = [...prevConfig];

      if (existingIndex >= 0) {
        const currentOrder = newConfig[existingIndex].order;
        newConfig[existingIndex].order =
          currentOrder === SORT_STATE.NONE ? SORT_STATE.DESC :
            currentOrder === SORT_STATE.DESC ? SORT_STATE.ASC :
              SORT_STATE.NONE;

      } else {
        newConfig.push({ field: sortType, order: SORT_STATE.ASC });
      }

      updateSortParams(newConfig);
      return newConfig;
    });
  };

  const onPageChange = (pageNumber: number) => {
    setPage((prev) => ({
      ...prev,
      pageNumber,
    }));
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
      <p className="mt-4 text-gray-400 text-sm">Loading transactions...</p>
    </div>
  );

  return (
    <div className="shadow-wrapper relative">
      <div
        className={cn(styles.buttons_wrapper, 'overflow-x-auto p-0 scrollbar-hide', {
          [styles.show_before]: showBefore,
          [styles.show_after]: showAfter
        })}
        ref={containerRef}
      >
        <div className="min-w-max">
          <div className={cn("table-header flex flex-row justify-start gap-0", { "md:border-b md:border-b-base-700": !sortedBets?.length })}>
          <div className="flex text-xs items-center text-base-300 h-11 min-w-[110px] lg:w-[200px] font-medium leading-4 pl-3">
            <span className="inline-block text-base-300">{isDesktopScreen ? 'Date Placed' : 'Date'}</span>
          </div>
          <div className="flex text-xs items-center min-w-[200px] w-[200px] lg:min-w-[250px] lg:w-[250px] text-base-300 h-11 font-medium leading-4">
            <span className="inline-block text-base-300">Event</span>
          </div>
          <div className="flex text-xs items-center min-w-[80px] xl:w-[130px] text-base-300 h-11 font-medium leading-4">
            <SortingColumn
              label="Odds"
              handleSort={() => { handleSortBets(SORT_FIELD.TOTALODDS) }}
              state={sortConfig.find((config) => config.field === SORT_FIELD.TOTALODDS)?.order || SORT_STATE.NONE}
            />
          </div>
          <div className="flex text-xs items-center min-w-[200px] xl:w-[240px] text-base-300 h-11 font-medium leading-4">
            <SortingColumn
              label="Stake"
              handleSort={() => { handleSortBets(SORT_FIELD.STAKE) }}
              state={sortConfig.find((config) => config.field === SORT_FIELD.STAKE)?.order || SORT_STATE.NONE}
            />
          </div>
          <div className="flex text-xs items-center min-w-[200px] xl:w-[240px] text-base-300 h-11 font-medium leading-4">
            <SortingColumn
              label="Payout"
              handleSort={() => { handleSortBets(SORT_FIELD.PAYOUT) }}
              state={sortConfig.find((config) => config.field === SORT_FIELD.PAYOUT)?.order || SORT_STATE.NONE}
            />
          </div>
          <div className="flex text-xs items-center min-w-[100px] lg:w-[220px] text-base-300 h-11 font-medium leading-4">
            <span className="inline-block text-base-300">Bet ID</span>
          </div>
          <div className="flex text-xs items-center justify-center text-base-300 h-11 font-medium min-w-[70px] xl:w-[100px] text-center leading-4 pr-3">Status</div>
        </div >
        <div className="table-content flex flex-col gap-2 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-base-600 scrollbar-track-transparent">
          {isLoading ? (
            <LoadingSpinner />
          ) : !sportBetsFromServer?.length ? (
            <NoTransactionsPlaceholder />
          ) : sortedBets?.map((bet) => (
            <SportsBetItem
              key={bet.ticketId}
              sportBet={bet}
              conversionData={conversionData}
              currencies={currencies}
              selectedCurrency={selectedCurrency}
              usdToggleEnabled={usdToggleEnabled}
            />
          )
          )}
        </div>
        </div>
      </div >
      {
        sportBetsFromServer?.length > 0 && (
          <Pagination
            currentPage={page.pageNumber + 1}
            totalPages={Math.ceil(sportsBetsFromServerTotalCount / page.itemPerPage)}
            onPageChange={(p: number) => onPageChange(p - 1)}
            totalCount={sportsBetsFromServerTotalCount}
          />
        )
      }
    </div >
  )
}

export default SportsBetsTable