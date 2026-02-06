/* eslint-disable no-nested-ternary */
import { CLIENT_TYPE } from 'constants/clientType';
import SortingColumn from 'components/shared/SortingColumnWithArrows';
import useScrollShadows from 'helpers/hooks';
import { sortRawTransactions } from 'helpers/transactions/sorting/sortRawTransactions';
import { cn } from 'helpers/ui';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/index';
import { selectUserDeposits } from 'store/transactions/selectors';
import type {
  DepositTransaction,
  SortConfig,
  SortField,
} from 'store/transactions/types';
import { useSortQueryParams } from 'helpers/transactions/hooks/useSortQueryParams';
import { SORT_FIELD, SORT_STATE } from 'store/transactions/constants';
import { getAccountHistory } from 'store/transactions/slice';
import styles from '../../TransactionsContent/transactionsContent.module.css';
import NoTransactionsPlaceholder from '../NoTransactionsPlaceholder';
import DepositItem from './DepositItem';

const DepositTable = () => {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { getSortParams, updateSortParams } = useSortQueryParams();
  const { showBefore, showAfter } = useScrollShadows(containerRef);
  const depositsFromServer = useAppSelector(selectUserDeposits);

  const initialSortConfig = getSortParams();

  const [sortedDeposits, setSortedDeposits] =
    useState<DepositTransaction[]>(depositsFromServer);
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialSortConfig.length
      ? initialSortConfig
      : [{ field: SORT_FIELD.DATE, order: SORT_STATE.NONE }],
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getAccountHistory({
        clientType: CLIENT_TYPE,
        transactionType: 'DEPOSIT',
      }),
    ).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    let result = [...depositsFromServer];
    sortConfig.forEach(({ field, order }) => {
      if (order !== SORT_STATE.NONE) {
        result = sortRawTransactions(
          result,
          field,
          order,
        ) as DepositTransaction[];
      }
    });
    setSortedDeposits(result);
  }, [sortConfig, depositsFromServer]);

  const handleSortDeposits = (sortType: SortField) => {
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

  const tableHeaderClasses = cn(
    'table-header flex flex-row justify-start gap-0 ',
    {
      'md:border-b md:border-b-base-700':
        !depositsFromServer.length && !isLoading,
    },
  );

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
      <p className="mt-4 text-base-400 text-sm">Loading transactions...</p>
    </div>
  );

  return (
    <div className="shadow-wrapper relative">
      <div
        className={cn(styles.buttons_wrapper, 'no-scrollbar overflow-x-auto', {
          [styles.show_before]: showBefore,
          [styles.show_after]: showAfter,
        })}
        ref={containerRef}
      >
        <div className={tableHeaderClasses}>
          <div className="flex flex-row text-xs items-center text-base-300 h-11 w-[140px] xl:w-[320px] font-medium leading-4">
            <SortingColumn
              label="Date"
              handleSort={() => handleSortDeposits(SORT_FIELD.DATE)}
              state={
                sortConfig.find((config) => config.field === SORT_FIELD.DATE)
                  ?.order || SORT_STATE.NONE
              }
            />
          </div>
          <div className="flex text-xs items-center text-base-300 h-11 font-medium leading-4">
            <SortingColumn
              label="Amount"
              handleSort={() => handleSortDeposits(SORT_FIELD.AMOUNT)}
              state={
                sortConfig.find((config) => config.field === SORT_FIELD.AMOUNT)
                  ?.order || SORT_STATE.NONE
              }
            />
          </div>
          <div className="flex text-xs items-center justify-center text-base-300 h-11 font-medium w-[48px] xl:w-[100px] text-center leading-4 ml-auto">
            Status
          </div>
        </div>
        <div className="table-content flex flex-col gap-2">
          {isLoading ? (
            <LoadingSpinner />
          ) : !depositsFromServer.length ? (
            <NoTransactionsPlaceholder />
          ) : (
            sortedDeposits.map((dep) => (
              <DepositItem
                key={`${dep.date.day}-${dep.date.time}-${dep.amount}`}
                depositItem={dep}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositTable;
