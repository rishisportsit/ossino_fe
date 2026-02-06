/* eslint-disable no-nested-ternary */
import { CLIENT_TYPE } from 'constants/clientType';
import SortingColumn from 'components/shared/SortingColumnWithArrows';
import useScrollShadows, { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { sortRawTransactions } from 'helpers/transactions/sorting/sortRawTransactions';
import { cn } from 'helpers/ui';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/index';
import { selectUserWithdrawals } from 'store/transactions/selectors';
import { getAccountHistory } from 'store/transactions/slice';
import type {
  SortConfig,
  SortField,
  WithdrawTransaction,
} from 'store/transactions/types';
import { useSortQueryParams } from 'helpers/transactions/hooks/useSortQueryParams';
import { SORT_FIELD, SORT_STATE } from 'store/transactions/constants';
import styles from '../../TransactionsContent/transactionsContent.module.css';
import NoTransactionsPlaceholder from '../NoTransactionsPlaceholder';
import WithdrawItem from './WithdrawItem';

const WithdrawTable = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { getSortParams, updateSortParams } = useSortQueryParams();
  const { showBefore, showAfter } = useScrollShadows(containerRef);
  const { screenWidth } = useBreakpoint();
  const isMobileScreen = screenWidth < BREAKPOINTS.md;

  const dispatch = useAppDispatch();

  const initialSortConfig = getSortParams();

  const withdrawalsFromServer = useAppSelector(selectUserWithdrawals);

  const [sortedWithdrawals, setSortedWithdrawals] = useState<
    WithdrawTransaction[]
  >(withdrawalsFromServer);
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialSortConfig.length
      ? initialSortConfig
      : [{ field: SORT_FIELD.DATE, order: SORT_STATE.NONE }],
  );

  useEffect(() => {
    dispatch(
      getAccountHistory({
        clientType: CLIENT_TYPE,
        transactionType: 'WITHDRAW',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    let result = [...withdrawalsFromServer];
    sortConfig.forEach(({ field, order }) => {
      if (order !== SORT_STATE.NONE) {
        result = sortRawTransactions(
          result,
          field,
          order,
        ) as WithdrawTransaction[];
      }
    });
    setSortedWithdrawals(result);
  }, [sortConfig, withdrawalsFromServer]);

  const handleSortWithrawals = (sortType: SortField) => {
    setSortConfig((prevConfig) => {
      const existingIndex = prevConfig.findIndex(
        (config) => config.field === sortType,
      );
      const newConfig = [...prevConfig];

      if (existingIndex >= 0) {
        const currentOrder = newConfig[existingIndex].order;
        newConfig[existingIndex].order =
          currentOrder === SORT_STATE.NONE
            ? SORT_STATE.DESC
            : currentOrder === SORT_STATE.DESC
              ? SORT_STATE.ASC
              : SORT_STATE.NONE;
      } else {
        newConfig.push({ field: sortType, order: SORT_STATE.ASC });
      }

      updateSortParams(newConfig);
      return newConfig;
    });
  };

  return (
    <div className="shadow-wrapper relative">
      <div
        className={cn(styles.buttons_wrapper, 'no-scrollbar overflow-x-auto', {
          [styles.show_before]: showBefore,
          [styles.show_after]: showAfter,
        })}
        ref={containerRef}
      >
        <div
          className={cn(
            'table-header flex flex-row justify-start gap-0',
            { 'md:border-b md:border-b-base-700': !withdrawalsFromServer.length },
          )}
        >
          <div className="flex text-xs items-center text-base-300 h-11 min-w-[120px] md:w-1/3 xl:min-w-[320px] font-medium leading-4">
            <SortingColumn
              label="Date"
              handleSort={() => handleSortWithrawals(SORT_FIELD.DATE)}
              state={
                sortConfig.find((config) => config.field === SORT_FIELD.DATE)
                  ?.order || SORT_STATE.NONE
              }
            />
          </div>
          <div className="flex flex-row md:w-2/3 xl:w-full gap-0">
            <div className="flex text-xs items-center min-w-[130px] md:w-1/2 text-base-300 h-11 font-medium leading-4">
              <SortingColumn
                label="Amount"
                handleSort={() => handleSortWithrawals(SORT_FIELD.AMOUNT)}
                state={
                  sortConfig.find(
                    (config) => config.field === SORT_FIELD.AMOUNT,
                  )?.order || SORT_STATE.NONE
                }
              />
            </div>

            <div className="flex text-xs items-center min-w-[100px] md:w-1/2 text-base-300 h-11 font-medium leading-4">
              <span className="md:hidden inline-block text-base-300">
                Transaction ID
              </span>
              {!isMobileScreen && (
                <SortingColumn
                  label="Transaction ID"
                  handleSort={() =>
                    handleSortWithrawals(SORT_FIELD.TRANSACTION_ID)
                  }
                  state={
                    sortConfig.find(
                      (config) => config.field === SORT_FIELD.TRANSACTION_ID,
                    )?.order || SORT_STATE.NONE
                  }
                />
              )}
            </div>
          </div>
          <div className="flex text-xs items-center justify-center text-base-300 h-11 font-medium md:min-w-[48px] xl:min-w-[100px] text-center leading-4 ml-auto">
            Status
          </div>
        </div>
        <div className="no-scrollbar overflow-x-auto w-fit md:w-auto table-content flex flex-col gap-2">
          {!withdrawalsFromServer.length ? (
            <NoTransactionsPlaceholder />
          ) : (
            sortedWithdrawals.map((withdrawn) => (
              <WithdrawItem withdrawItem={withdrawn} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawTable;
