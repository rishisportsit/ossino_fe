import React, { useRef } from 'react';
import Model from "components/shared/ui/Model";
import styles from "../../../TransactionsContent/transactionsContent.module.css";
import { PiStarFourThin } from "react-icons/pi";
import { cn } from "helpers/ui";
import { formatTransactionsDateToRender } from 'helpers/transactions/formatDate';
import useScrollShadows from 'helpers/hooks';
import { IoGameControllerOutline } from "react-icons/io5";

interface CasinoBetsModelInter {
    setIsVisible: (val: boolean) => void,
    isVisible: boolean,
    setIsOpen: (val: boolean) => void,
    isOpen: boolean,
    casinoBetRoundsFromServer: any[],
    getUserName: (data: any) => string,
    data: any,
    date: any,
    roundIdValue: string,
    isLoading: boolean,
    getAmount: (round: any) => number,
    getBetStatus: (round: any) => string,
    currencyName: any,
    currencyCode: string,
    LoadingSpinner: React.FC,
    gameNameValue: string
}

const CasinoBetsModel = ({
    isOpen,
    setIsOpen,
    isVisible,
    setIsVisible,
    casinoBetRoundsFromServer,
    getUserName,
    data,
    date,
    roundIdValue,
    isLoading,
    getAmount,
    getBetStatus,
    currencyName,
    currencyCode,
    LoadingSpinner,
    gameNameValue
}: CasinoBetsModelInter) => {

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 300);
    };

    const containerRef = useRef<HTMLDivElement | null>(null);
    const { showBefore, showAfter } = useScrollShadows(containerRef);

    return (
        <Model
            closeModal={closeModal}
            isOpen={isOpen}
            isVisible={isVisible}
            width="sm:w-[95%] md:w-[70%] lg:w-[45%] xl:w-[45%]"
        >
            <div className="flex justify-center items-center gap-1 mb-6">
                <IoGameControllerOutline size={20} className="body-txtColor-1 mt-1" />
                <span className="text-xl body-txtColor-1 leading-none capitalize">{gameNameValue}</span>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center h-[35px] w-full gap-1">
                <div className="flex items-center justify-center gap-2 h-[35px]">
                    <span>Placed by:</span>
                    <span className="bg-base-700 text-base-300 flex items-center rounded px-3 gap-2 h-full">
                        <PiStarFourThin size={20} />
                        {getUserName(data)}
                    </span>
                </div>
                <span>on {formatTransactionsDateToRender(date)}</span>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 mt-2 w-full">
                <p className="text-sm text-base-300 text-center">
                    <span className="font-medium">  Round ID: </span>{roundIdValue}
                </p>
            </div>
            <div className="shadow-wrapper relative rounded-lg mt-6">
                <div
                    className={cn(
                        styles.buttons_wrapper,
                        'overflow-x-auto no-scrollbar p-0 max-w-[95vw] md:max-w-[700px] mx-auto',
                        {
                            [styles.show_before]: showBefore,
                            [styles.show_after]: showAfter,
                        }
                    )}
                    ref={containerRef}
                >
                    {!isLoading ? (
                        <div className="min-w-[600px]">
                            <div className="table-header flex min-w-[500px]">
                                <div className="flex-[0.5] leading-[18px] text-xs lg:text-sm text-base-300 font-medium h-11 flex items-center justify-center">
                                    Txn. ID
                                </div>
                                <div className="flex-[0.25] text-xs lg:text-sm text-base-300 font-medium h-11 flex items-center justify-center">
                                    Amount
                                </div>
                                <div className="flex-[0.25] text-xs lg:text-sm text-base-300 font-medium h-11 flex items-center justify-center">
                                    Type
                                </div>
                            </div>
                            <div className="table-content flex flex-col gap-2 min-w-[500px]">
                                {casinoBetRoundsFromServer?.map((round) => {
                                    if (round.payout <= 0 && round.betTransactionType === "WIN_REQUEST") return null;
                                    if (round.stake <= 0 && round.betTransactionType === "BET_REQUEST") return null;
                                    return (
                                        <div
                                            key={round.betId}
                                            className="flex justify-start items-center box-border h-11 text-sm border bg-base-700 border-base-800 rounded-xl min-w-[500px]"
                                        >
                                            <div className="flex-[0.5] flex items-center justify-center text-xs lg:text-sm">
                                                {round.betId}
                                            </div>
                                            <div className="flex-[0.25] flex items-center justify-center gap-1 text-xs lg:text-sm">
                                                {currencyName?.icon && (
                                                    <img
                                                        src={currencyName?.icon}
                                                        alt={currencyName?.contraction}
                                                        className="w-4 h-4"
                                                    />
                                                )}
                                                {currencyCode?.toLowerCase() === 'usdt' ? Number(getAmount(round)).toFixed(2) : getAmount(round)}
                                            </div>
                                            <div className="flex-[0.25] flex items-center justify-center text-xs lg:text-sm">
                                                {getBetStatus(round)}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
            </div>
        </Model>
    );
};

export default CasinoBetsModel;
