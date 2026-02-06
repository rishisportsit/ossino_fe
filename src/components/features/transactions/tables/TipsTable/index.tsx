/* eslint-disable no-nested-ternary */
import SortingColumn from "components/shared/SortingColumnWithArrows"
import useScrollShadows, { BREAKPOINTS, useBreakpoint } from "helpers/hooks"
import { sortRawTransactions } from "helpers/transactions/sorting/sortRawTransactions"
import { cn } from "helpers/ui"
import { useEffect, useRef, useState } from "react"
import { useAppSelector, useAppDispatch } from "store/index"
import { selectUserTips } from "store/transactions/selectors"
import { getAccountHistory } from "store/transactions/slice"
import { CLIENT_TYPE } from "constants/clientType"
import type { SortConfig, SortField, TipTransaction } from "store/transactions/types"
import { useSortQueryParams } from "helpers/transactions/hooks/useSortQueryParams"
import { SORT_FIELD, SORT_STATE } from "store/transactions/constants"
import styles from '../../TransactionsContent/transactionsContent.module.css'
import NoTransactionsPlaceholder from "../NoTransactionsPlaceholder"
import TipItem from "./TipItem"

const TipsTable = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { getSortParams, updateSortParams } = useSortQueryParams();
  const { showBefore, showAfter } = useScrollShadows(containerRef);
  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;

  const initialSortConfig = getSortParams();

  const tipTransactionsFromServer = useAppSelector(selectUserTips); 
  const dispatch = useAppDispatch();
  
  const [sortedTips, setSortedTips] = useState<TipTransaction[]>(tipTransactionsFromServer);
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialSortConfig.length 
      ? initialSortConfig
      : [{ field: SORT_FIELD.DATE, order: SORT_STATE.NONE }]
  );

  useEffect(() => {
    dispatch(
      getAccountHistory({
        clientType: CLIENT_TYPE,
        transactionType: 'TRANSFER_WITHDRAW',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    let result = [...tipTransactionsFromServer];
    sortConfig.forEach(({ field, order }) => {
      if (order !== SORT_STATE.NONE) {
        result = sortRawTransactions(result, field, order) as TipTransaction[];
      }
    });
    setSortedTips(result);
  }, [sortConfig, tipTransactionsFromServer]);

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

  return (
    <div className="shadow-wrapper relative">
      <div
        className={cn(styles.buttons_wrapper, 'no-scrollbar overflow-x-auto', {
          [styles.show_before]: showBefore,
          [styles.show_after]: showAfter
        })}
        ref={containerRef}
      >
        <div className={cn("table-header flex flex-row justify-start", { "border-b border-b-base-700": !sortedTips.length })}>
          <div className="flex text-xs items-center text-base-300 h-11 w-[140px] xl:w-[300px] font-medium leading-4">
            <SortingColumn 
              label='Date' 
              handleSort={() => {handleSortBets(SORT_FIELD.DATE)}}
              state={sortConfig.find((config) => config.field === SORT_FIELD.DATE)?.order || SORT_STATE.NONE}
            />
          </div>
          <div className="flex flex-row md:w-2/3 lg:w-full gap-0">
            <div className="flex items-center text-base-300 h-11 font-medium leading-4 w-[135px] md:w-1/2 gap-1.5">
              <SortingColumn 
                label={<span className="flex items-center gap-1"><span>Amount</span></span>} 
                handleSort={() => handleSortBets(SORT_FIELD.AMOUNT)}
                state={sortConfig.find((config) => config.field === SORT_FIELD.AMOUNT)?.order || SORT_STATE.NONE}
              />
            </div>
            <div className="flex text-xs items-center min-w-[140px] md:w-1/2 text-base-300 h-11 font-medium leading-5">
              <span className="text-base-300 inline-block xl:hidden">User</span>
              {isDesktopScreen && (
                <SortingColumn 
                  label='User' 
                  handleSort={() => {handleSortBets(SORT_FIELD.USER)}}
                  state={sortConfig.find((config) => config.field === SORT_FIELD.USER)?.order || SORT_STATE.NONE}
                />
              )}
            </div>
          </div>
          <div className="flex text-xs items-center justify-center text-base-300 h-11 font-medium min-w-[48px] xl:min-w-[100px] text-center leading-4 ml-auto">Status</div>
        </div><div className="table-content flex flex-col gap-2">
          {!sortedTips.length 
            ? (<NoTransactionsPlaceholder />)
            : 
            (sortedTips.map((tip) => (
              <TipItem tipItem={tip} />
            )))}
        </div>
      </div>
    </div>
  )
}

export default TipsTable