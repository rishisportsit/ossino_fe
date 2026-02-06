import { cn } from "helpers/ui";

import CopyButton from "components/shared/CopyButton";
import Icon from "components/shared/Icon";
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { formatDate, formatTransactionsDateToRender, parseUTCTimestamp } from "helpers/transactions/formatDate";

import failedIcon from '/icons/failedIcon.svg?url';
import pendingIcon from '/icons/pendingIcon.svg?url';
import successIcon from '/icons/successIcon.svg?url';
import type { CasinoBet } from "store/transactions/types";
import { BET_STATUS } from "store/transactions/constants";
import { CURRENCIES, CURRENCY_CODE_MAPPING } from "constants/currencies";
import { IoMdLink } from "react-icons/io";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "store/index";
import { getCasinoBetHistoryRounds } from "store/transactions/slice";
import { selectUserCasinoBetsRounds } from "store/transactions/selectors";
import CasinoBetsModel from "../CasinoBetsModel";

import { TruncateText } from "store/helpers/TruncateText";
import Tooltip from "helpers/Tooltip";

type CasinoBetItemProps = {
    casinoBet: CasinoBet
}

const CasinoBetItem = ({ casinoBet }: CasinoBetItemProps) => {
    const { placedDate, payout, currencyCode, currency, roundId, betStatus, gameName, stake } = casinoBet;

    const isUSDT = currencyCode?.toUpperCase() === 'USDT'
    const formattedStake = isUSDT ? Number(stake).toFixed(2) : stake;
    const formattedPayout = isUSDT ? Number(payout).toFixed(2) : payout;

    const dispatch = useAppDispatch()
    const casinoBetRoundsFromServer = useAppSelector(selectUserCasinoBetsRounds);
    const data = useAppSelector((state) => state.user.data);

    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [roundIdValue, setRoundIdValue] = useState("")
    const [gameNameValue, setGameNameValue] = useState("")

    const { screenWidth } = useBreakpoint();
    const isDesktopScreen = screenWidth >= BREAKPOINTS.lg;

    // Parse the UTC timestamp and convert to local timezone
    const localDate = parseUTCTimestamp(placedDate);
    const date = {
        day: formatDate(localDate),
        time: localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const currencyCodeFromApi = currency || currencyCode;
    const currencyName = CURRENCIES[CURRENCY_CODE_MAPPING[currencyCodeFromApi as keyof typeof CURRENCY_CODE_MAPPING]];

    const openModal = (roundId: string, gameName: string) => {
        setRoundIdValue(roundId)
        setGameNameValue(gameName)
        setIsOpen(true);
        setTimeout(() => setIsVisible(true), 10);
        setIsLoading(true);
        dispatch(getCasinoBetHistoryRounds({ roundId })).finally(() => {
            setIsLoading(false);
        });
    };


    const getAmount = (item: any): number => {
        if (Number(item.stake) > 0 && item.betTransactionType !== "WIN_REQUEST") {
            return item.stake;
        }
        if (Number(item.payout) > 0 && item.betTransactionType === "WIN_REQUEST") {
            return item.payout;
        }
        return 0;
    };


    const getBetStatus = (round: any) => {
        if (round.betTransactionType === "BET_REQUEST") {
            const placeBetType = round.placeBetType;
            if (!placeBetType) return "-";
            return String(placeBetType)
                .toLowerCase()
                .split(/[\s_]+/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        } else if (round.betTransactionType === "WIN_REQUEST") {
            return round.betStatus !== "Cancelled" ? "Win" : "Cancel";
        } else return "-";
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
            <p className="mt-4 text-base-400 text-sm">Loading transactions...</p>
        </div>
    );

    const getUserName = (data: any) => {
        return data?.firstName && data?.lastName ? `${data?.firstName} ${data?.lastName}` : data?.userName.split("@")[0]
    }

    return (
        <div className="flex flex-row no-scrollbar overflow-visible w-fit md:w-full justify-start items-center box-border h-11 text-sm border border-base-800 xl:border-base-700 bg-base-800 rounded-xl pl-0 pr-0">
            <div className="min-w-[85px]  lg:w-[260px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
                {formatTransactionsDateToRender(date)}
            </div>
            <div className="min-w-[150px]  lg:w-[300px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
                <Tooltip tooltipText={gameName}>
                    {isDesktopScreen ? gameName : TruncateText(gameName ?? "", 20)}
                </Tooltip>
            </div>
            <div className="flex items-center min-w-[120px]  lg:w-[200px] gap-1 text-xs lg:text-sm leading-[18px]">
                {currencyName?.icon && <img src={currencyName?.icon} alt={currencyName?.contraction} className="w-4 h-4" />}
                <div>{formattedStake}</div>
            </div>
            <div className="min-w-[300px] lg:w-[450px] text-xs lg:text-sm leading-[18px]">
                <div className="flex items-center gap-1">
                    <IoMdLink size={15} className="mt-1" />
                    <Tooltip tooltipText={roundId}>
                        <div className="flex items-center gap-1 cursor-pointer">
                            <div
                                className="max-w-[210px] overflow-hidden whitespace-nowrap text-ellipsis hover:opacity-65"
                                onClick={() => openModal(roundId ?? "", gameName ?? "")}>
                                {roundId}
                            </div>
                            <CopyButton valueToCopy={roundId} />
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div className="flex items-center min-w-[120px] lg:w-[230px] gap-1 text-xs lg:text-sm leading-[18px]">
                {currencyName?.icon && <img src={currencyName?.icon} alt={currencyName?.contraction} className="w-4 h-4" />}
                <div>{formattedPayout}</div>
            </div>
            <div className="flex min-w-[48px] lg:w-[100px] items-center justify-center ml-auto">
                {isDesktopScreen ? (
                    <div className={cn("rounded-full py-1 px-3 md:text-xs lg:text-xs leading-4",
                        { "bg-state-positive-bg text-state-positive": betStatus === BET_STATUS.Win || betStatus === BET_STATUS.Won },
                        { "bg-state-warning-bg text-state-warning": (betStatus === BET_STATUS.Return || betStatus === BET_STATUS.Running) },
                        { "bg-state-negative-bg text-state-negative": betStatus === BET_STATUS.Lost }
                    )}>
                        {betStatus}
                    </div>
                )
                    :
                    <>
                        {(betStatus === BET_STATUS.Win || betStatus === BET_STATUS.Won) && (
                            <Icon href={successIcon} id="successIcon" className="h-5 w-5" />
                        )}
                        {(betStatus === BET_STATUS.Return || betStatus === BET_STATUS.Running) && (<Icon href={pendingIcon} id="pendingIcon" className="h-5 w-5" />)}
                        {betStatus === BET_STATUS.Lost && (<Icon href={failedIcon} id="failedIcon" className="h-5 w-5" />)}
                    </>
                }
            </div>
            <CasinoBetsModel
                setIsVisible={setIsVisible}
                isVisible={isVisible}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                casinoBetRoundsFromServer={casinoBetRoundsFromServer}
                getUserName={getUserName}
                data={data}
                date={date}
                roundIdValue={roundIdValue}
                isLoading={isLoading}
                getAmount={getAmount}
                getBetStatus={getBetStatus}
                currencyName={currencyName}
                currencyCode={currencyCodeFromApi}
                LoadingSpinner={LoadingSpinner}
                gameNameValue={gameNameValue}
            />

        </div >
    )
}


export default CasinoBetItem