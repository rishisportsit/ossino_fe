import SortingColumn from "components/shared/SortingColumnWithArrows";
import useScrollShadows, { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { sortRawTransactions } from "helpers/transactions/sorting/sortRawTransactions";
import { cn } from "helpers/ui";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/index";
import { selectUserCasinoBets } from "store/transactions/selectors";
import type { CasinoBet, SortConfig, SortField } from "store/transactions/types";
import { useSortQueryParams } from "helpers/transactions/hooks/useSortQueryParams";
import { SORT_FIELD, SORT_STATE } from "store/transactions/constants";
import styles from '../../TransactionsContent/transactionsContent.module.css';
import NoTransactionsPlaceholder from "../NoTransactionsPlaceholder";
import { getCasinoBetHistory } from "store/transactions/slice";
import CasinoBetItem from "./CasinoBetItem";
import Pagination from "components/shared/ui/Pagination";

const CasinoBetsTable = () => {

    const dispatch = useAppDispatch();

    const casinoBetsFromServer = useAppSelector(selectUserCasinoBets);
    const casinoBetsFromServerTotalCount = useAppSelector(state => state.transactions.data?.casinoBets?.data?.totalRecords)

    const { screenWidth } = useBreakpoint();
    const { getSortParams, updateSortParams } = useSortQueryParams();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const { showBefore, showAfter } = useScrollShadows(containerRef);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState({ itemPerPage: 10, pageNumber: 0 })

    const isDesktopScreen = screenWidth >= BREAKPOINTS.lg;

    const [sortConfig, setSortConfig] = useState<SortConfig>([{ field: SORT_FIELD.DATE, order: SORT_STATE.NONE }]);
    const [sortedBets, setSortedBets] = useState<CasinoBet[]>([]);

    useEffect(() => {
        const initialSort = getSortParams();
        if (initialSort.length) {
            setSortConfig(initialSort);
        }
    }, []);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getCasinoBetHistory({ itemPerPage: page.itemPerPage, pageNumber: page.pageNumber }))
            .finally(() => setIsLoading(false));
    }, [dispatch, page.pageNumber]);

    useEffect(() => {
        if (!casinoBetsFromServer) return
        let result = [...casinoBetsFromServer];
        sortConfig.forEach(({ field, order }) => {
            if (order !== SORT_STATE.NONE) {
                result = sortRawTransactions(result, field, order) as CasinoBet[];
            }
        });
        setSortedBets(result);
    }, [sortConfig, casinoBetsFromServer]);

    const onPageChange = (pageNumber: number) => {
        setPage((prev) => ({
            ...prev,
            pageNumber,
        }));
    };

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

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
            <p className="mt-4 text-base-400 text-sm">Loading transactions...</p>
        </div>
    );

    return (
        <div className="shadow-wrapper relative">
            <div
                className={cn(styles.buttons_wrapper, 'no-scrollbar overflow-x-auto md:overflow-hidden p-0', {
                    [styles.show_before]: showBefore,
                    [styles.show_after]: showAfter
                })}
                ref={containerRef}
            >
                <div className={cn("table-header flex flex-row justify-start gap-0", { "md:border-b md:border-b-base-700": !sortedBets.length })}>
                    <div className="flex text-xs items-center text-base-300 h-11 min-w-[85px]  lg:w-[260px] font-medium leading-4">
                        <SortingColumn
                            label={isDesktopScreen ? 'Date Placed' : 'Date'}
                            handleSort={() => handleSortBets(SORT_FIELD.PLACEDDATE)}
                            state={sortConfig.find((config) => config.field === SORT_FIELD.PLACEDDATE)?.order || SORT_STATE.NONE}
                        />
                    </div>
                    <div className="flex text-xs pl-3 items-center justify-start text-base-300 h-11 font-medium min-w-[150px]  lg:w-[300px] text-center leading-4 lg:ml-2">Game Name</div>
                    <div className="flex text-xs items-center min-w-[120px]  lg:w-[200px] text-base-300 h-11 font-medium leading-4">
                        <SortingColumn
                            label="Amount"
                            handleSort={() => handleSortBets(SORT_FIELD.STAKE)}
                            state={sortConfig.find((config) => config.field === SORT_FIELD.STAKE)?.order || SORT_STATE.NONE}
                        />
                    </div>
                    <div className="flex text-xs items-center min-w-[300px]  lg:w-[450px] text-base-300 h-11 font-medium leading-4">
                        <span className="inline-block lg:hidden text-base-300">Round ID</span>
                        {isDesktopScreen && (
                            <SortingColumn
                                label="Round ID"
                                handleSort={() => handleSortBets(SORT_FIELD.ROUNDID)}
                                state={sortConfig.find((config) => config.field === SORT_FIELD.ROUNDID)?.order || SORT_STATE.NONE}
                            />
                        )}
                    </div>
                    <div className="flex text-xs items-center min-w-[120px]  lg:w-[230px] text-base-300 h-11 font-medium leading-4">
                        <SortingColumn
                            label="Payout"
                            handleSort={() => handleSortBets(SORT_FIELD.PAYOUT)}
                            state={sortConfig.find((config) => config.field === SORT_FIELD.PAYOUT)?.order || SORT_STATE.NONE}
                        />
                    </div>
                    <div className="flex text-xs items-center ml-auto justify-center text-base-300 h-11 font-medium min-w-[48px] lg:w-[100px] text-center leading-4">Status</div>
                </div>
                <div className="table-content flex flex-col gap-2">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : !casinoBetsFromServer?.length ? (
                        <NoTransactionsPlaceholder />
                    ) : sortedBets?.map((bet) => (
                        <CasinoBetItem key={bet.roundId} casinoBet={bet} />
                    )
                    )}
                </div>
                {casinoBetsFromServer?.length > 0 && (
                    <Pagination
                        currentPage={page.pageNumber + 1}
                        totalPages={Math.ceil(casinoBetsFromServerTotalCount / page.itemPerPage)}
                        onPageChange={(p) => onPageChange(p - 1)}
                        totalCount={casinoBetsFromServerTotalCount}
                    />
                )}

            </div>
        </div>
    );
};

export default CasinoBetsTable;
