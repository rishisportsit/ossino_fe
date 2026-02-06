import React, { useRef } from 'react';
import Model from "components/shared/ui/Model";
import styles from "../../../TransactionsContent/transactionsContent.module.css";
import { PiStarFourThin } from "react-icons/pi";
import { cn } from "helpers/ui";
import { formatDate, parseUTCTimestamp } from 'helpers/transactions/formatDate';
import useScrollShadows, { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from 'components/shared/ui/Accordion';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { BET_STATUS, BET_STATUS_SPORTS } from 'store/transactions/constants';
import { PiSoccerBall } from "react-icons/pi";
import failedIcon from '/icons/failedIcon.svg?url';
import pendingIcon from '/icons/pendingIcon.svg?url';
import successIcon from '/icons/successIcon.svg?url';
import Icon from 'components/shared/Icon';

interface SportsBetsModelInter {
    setIsVisible: (val: boolean) => void,
    isVisible: boolean,
    setIsOpen: (val: boolean) => void,
    isOpen: boolean,
    sportsBetsData: any,
    getUserName: (data: any) => string,
    data: any,
    isLoading: boolean,
    LoadingSpinner: React.FC,
}

const SportsBetsModel = ({
    isOpen,
    setIsOpen,
    isVisible,
    setIsVisible,
    sportsBetsData,
    getUserName,
    data,
    isLoading,
    LoadingSpinner,
}: SportsBetsModelInter) => {

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 300);
    };

    const containerRef = useRef<HTMLDivElement | null>(null);
    const { showBefore, showAfter } = useScrollShadows(containerRef);

    const { screenWidth } = useBreakpoint();
    const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;

    const getDateandTime = (date: any) => {
        if (!date) return "N/A";
        // Parse UTC timestamp and convert to local timezone
        const d = parseUTCTimestamp(date);
        if (isNaN(d.getTime())) return "Invalid date";
        const updatedDate = {
            day: formatDate(d),
            time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return `${updatedDate.day} ${updatedDate.time}`;
    };


    return (
        <Model
            closeModal={closeModal}
            isOpen={isOpen}
            isVisible={isVisible}
            width="w-[95%] sm:w-[90%] md:w-[60%] lg:w-[45%] xl:w-[40%]"
        >
            <div className="w-full">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-2 h-[35px] w-full">
                <div className="flex items-center justify-center gap-2 h-[35px]">
                    <span>Placed by:</span>
                    <span className="bg-base-700 body-txtColor-1 flex items-center rounded px-3 gap-2 h-full">
                        <PiStarFourThin size={20} />
                        {getUserName(data)}
                    </span>
                </div>
                <span>on {getDateandTime(sportsBetsData?.createdDate)}</span>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-2 mt-2 w-full">
                <p className="text-sm body-txtColor-1">
                    <span className="font-medium">  Bet ID: </span>{sportsBetsData?.shortBetId}
                </p>
            </div>
            <div className="shadow-wrapper relative  rounded-lg mt-6">
                <div
                    className={cn(
                        styles.buttons_wrapper,
                        'no-scrollbar overflow-x-auto md:overflow-hidden p-0',
                        {
                            [styles.show_before]: showBefore && isDesktopScreen,
                            [styles.show_after]: showAfter && isDesktopScreen,
                        }
                    )}
                    ref={containerRef}
                >
                    <>
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : !sportsBetsData?.betParts?.length ? (
                            <div className="h-[187px] flex flex-col justify-center">
                                <NoItemsMessage message="No coins overview data" />
                            </div>
                        ) :
                            sportsBetsData?.betParts?.map((bet: any) => {
                                return (
                                    <div className="rounded-xl bg-base-700 px-4 mb-2 mx-2">
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>
                                                    <div className="flex justify-between items-center w-full gap-2">
                                                        <div className='flex justify-between items-center'>
                                                            <span>
                                                                <PiSoccerBall size={18} className='mr-1' />
                                                            </span>
                                                            <span >
                                                                {bet.competitionName}
                                                            </span>
                                                        </div>

                                                        {isDesktopScreen ? (
                                                            <div className={cn("rounded-full py-1 px-3 md:text-xs lg:text-xs leading-4",
                                                                { "bg-success-green-bg text-success-green": bet.outcomeResult === BET_STATUS_SPORTS.Won || bet.outcomeResult === BET_STATUS_SPORTS.CashedOut },
                                                                { "bg-pending-yellow-bg text-pending-yellow": bet.outcomeResult === BET_STATUS.Return },
                                                                { "bg-failed-red-bg text-failed-red": bet.outcomeResult === BET_STATUS_SPORTS.Lost }
                                                            )}>
                                                                {bet.outcomeResult}
                                                            </div>
                                                        )
                                                            :
                                                            <>
                                                                {(bet.outcomeResult === BET_STATUS_SPORTS.Won || bet.outcomeResult === BET_STATUS_SPORTS.CashedOut) && (<Icon href={successIcon} id="successIcon" className="h-5 w-5" />)}
                                                                {bet.outcomeResult === BET_STATUS.Return && (<Icon href={pendingIcon} id="pendingIcon" className="h-5 w-5" />)}
                                                                {bet.outcomeResult === BET_STATUS.Lost && (<Icon href={failedIcon} id="failedIcon" className="h-5 w-5" />)}
                                                            </>
                                                        }
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="flex flex-col gap-1 pb-4">
                                                    <div className='border-base-800 xl:border-base-700 bg-base-800 p-4 rounded-xl flex flex-col gap-0.5'>
                                                        <p className='font-bold'>{bet.marketName}</p>
                                                        <div className='flex justify-between'>
                                                            <span className='body-txtColor-1'>{bet.outcomeName}</span>
                                                            <span className='body-txtColor-1'>{bet.odds}</span>
                                                        </div>
                                                        <p className='min-w-[100px]' >
                                                            <span className='body-txtColor-1'>{bet.competitionName}</span>
                                                            <span className='text-base-400 ml-1 text-xs'>{getDateandTime(sportsBetsData?.createdDate)}</span>
                                                        </p>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                )
                            })
                        }
                    </>
                </div>
            </div>
            </div>

        </Model >
    );
};

export default SportsBetsModel;