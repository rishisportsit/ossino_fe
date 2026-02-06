import { cn } from "helpers/ui";
import CopyButton from "components/shared/CopyButton";
import Icon from "components/shared/Icon";
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { formatDate, formatTransactionsDateToRender, parseUTCTimestamp } from "helpers/transactions/formatDate";
import type { CurrencyConversionItem } from 'api/currency/currency.types';
import type { WalletCurrency } from 'api/wallet/wallet.types';
import { getConversionValue } from 'helpers/usdConversion';

import failedIcon from '/icons/failedIcon.svg?url';
import pendingIcon from '/icons/pendingIcon.svg?url';
import successIcon from '/icons/successIcon.svg?url';
import type { SportsBetData } from "store/transactions/types";
import { formatNumber } from "helpers/numbers";
import { BET_STATUS, BET_STATUS_SPORTS } from "store/transactions/constants";
import { CURRENCIES, CURRENCY_CODE_MAPPING } from "constants/currencies";
import { useState, useEffect } from "react";
import SportsBetsModel from "../SportsBetsModel";
import { useAppSelector } from "store/index";
import { IoMdLink } from "react-icons/io";
import { PiSoccerBall, PiTicket } from "react-icons/pi";

type SportsBetItemProps = {
  sportBet: SportsBetData | any;
  conversionData?: CurrencyConversionItem[];
  currencies?: WalletCurrency[];
  selectedCurrency?: WalletCurrency | null;
  usdToggleEnabled?: boolean;
}

const SportsBetItem = ({
  sportBet,
  conversionData,
  selectedCurrency,
  usdToggleEnabled
}: SportsBetItemProps) => {
  const { createdDate: date, totalOdds: odds, stake, payout, currency, shortBetId: transactionId, status, currencyCode, betType } = sportBet;

  const [localUsdToggle, setLocalUsdToggle] = useState(usdToggleEnabled);

  // Convert amounts to USD if toggle is enabled
  const shouldShowUSD = localUsdToggle && conversionData;
  const currencyCodeFromApi = currency || currencyCode || selectedCurrency?.currencyCode;

  let displayStake = stake;
  let displayPayout = payout;

  if (shouldShowUSD && currencyCodeFromApi) {
    const convertedStake = getConversionValue(currencyCodeFromApi, stake, selectedCurrency?.multiplier || null, conversionData || []);
    const convertedPayout = getConversionValue(currencyCodeFromApi, payout, selectedCurrency?.multiplier || null, conversionData || []);

    if (convertedStake !== null) displayStake = convertedStake;
    if (convertedPayout !== null) displayPayout = convertedPayout;
  }

  const isUSDT = currencyCodeFromApi?.toUpperCase() === 'USDT';

  if (isUSDT && !shouldShowUSD) {
    const truncatedStake = Math.floor(displayStake * 100) / 100;
    displayStake = truncatedStake;
    const truncatedPayout = Math.floor(displayPayout * 100) / 100;
    displayPayout = truncatedPayout;
  }

  const formattedStake = isUSDT ? formatNumber(displayStake, 2) : displayStake;
  const formattedPayout = isUSDT ? formatNumber(displayPayout, 2) : displayPayout;

  const data = useAppSelector((state) => state.user.data);

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [betParts, setBetParts] = useState([])

  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;

  // Parse the UTC timestamp and convert to local timezone
  const localDate = parseUTCTimestamp(date);
  const updatedDate = { 
    day: formatDate(localDate), 
    time: localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
  };
  const currencyName = CURRENCIES[CURRENCY_CODE_MAPPING[currencyCodeFromApi as keyof typeof CURRENCY_CODE_MAPPING]];

  const getUserName = (data: any) => {
    return data?.firstName && data?.lastName ? `${data?.firstName} ${data?.lastName}` : data?.userName.split("@")[0]
  }

  const openModal = (sportBet: []) => {
    setBetParts(sportBet)
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 10);
    setIsLoading(false);
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
      <p className="mt-4 text-gray-400 text-sm">Loading transactions...</p>
    </div>
  );

  useEffect(() => {
    const handleToggleChange = (event: CustomEvent) => {
      if (event.detail?.currentUsdToggle !== undefined) {
        setLocalUsdToggle(event.detail.currentUsdToggle);
      }
    };
    window.addEventListener('currencyToggleChanged', handleToggleChange as EventListener);

    return () => {
      window.removeEventListener('currencyToggleChanged', handleToggleChange as EventListener);
    };
  }, []);

  useEffect(() => {
    setLocalUsdToggle(usdToggleEnabled);
  }, [usdToggleEnabled]);

  return (
    <div className="flex flex-row no-scrollbar overflow-visible justify-start items-center box-border h-11 text-sm border border-base-800 xl:border-base-700 bg-base-800 rounded-xl pl-0 pr-0">
      <div className="min-w-[110px] lg:w-[200px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
        {formatTransactionsDateToRender(updatedDate)}
      </div>
      <div
        className="min-w-[200px] w-[200px] lg:min-w-[250px] lg:w-[250px] text-xs lg:text-sm text-start cursor-pointer hover:opacity-75 transform transition-all"
        onClick={() => openModal(sportBet)}
      >
        {betType === "single" && sportBet?.betParts?.length ? (
          <div className="flex items-center min-w-0">
            <PiSoccerBall size={18} className="mr-1 flex-shrink-0" />
            <span
              className="truncate min-w-0 overflow-hidden whitespace-nowrap text-ellipsis block"
              title={sportBet?.betParts[0]?.competitionName}
            >
              {sportBet?.betParts[0]?.competitionName}
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <PiTicket size={18} className="mr-1" />
            <span>{`Multi (${sportBet?.betParts?.length} Legs)`}</span>
          </div>
        )}
      </div>

      <div className="min-w-[80px] xl:w-[130px] text-xs lg:text-sm text-start">
        {odds}
      </div>
      <div className="flex items-center min-w-[200px] xl:w-[240px] gap-1 text-xs lg:text-sm leading-[18px] whitespace-nowrap">
        {shouldShowUSD ? (
          <div className="flex items-center gap-1 flex-shrink-0">
            {currencyName?.icon && <img src={currencyName?.icon} alt={currencyName?.contraction} className="w-4 h-4" />}
            <img src="/icons/currencies/dollarUsd.svg" alt="USD" className="w-4 h-4" />
          </div>
        ) : (
          currencyName?.icon && <img src={currencyName?.icon} alt={currencyName?.contraction} className="w-4 h-4 flex-shrink-0" />
        )}
        <div>{formattedStake}</div>
      </div>
      <div className="flex items-center min-w-[200px] xl:w-[240px] gap-1 text-xs lg:text-sm leading-[18px] whitespace-nowrap">
        {shouldShowUSD ? (
          <div className="flex items-center gap-1 flex-shrink-0">
            {currencyName?.icon && <img src={currencyName?.icon} alt={currencyName?.contraction} className="w-4 h-4" />}
            <img src="/icons/currencies/dollarUsd.svg" alt="USD" className="w-4 h-4" />
          </div>
        ) : (
          currencyName?.icon && <img src={currencyName?.icon} alt={currencyName?.contraction} className="w-4 h-4 flex-shrink-0" />
        )}
        <div>{formattedPayout}</div>
      </div>
      <div className="min-w-[100px] lg:w-[240px] text-xs lg:text-sm leading-[18px]">
        <div className="flex flex-row items-center align-items-center gap-1">
          <IoMdLink size={15} />
          <div className=" flex flex-row items-center align-items-center gap-1">
            <div className="min-w-[65px] text-xs overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:opacity-65" onClick={() => openModal(sportBet)}>{transactionId}</div>
            <CopyButton valueToCopy={transactionId ?? ""} />
          </div>

        </div>
      </div>
      <div className="flex min-w-[70px] xl:w-[100px] items-center justify-center pr-3">
        {isDesktopScreen ? (
          <div className={cn("rounded-full py-1 px-3 md:text-xs lg:text-xs leading-4",
            { "bg-state-positive-bg text-state-positive": status?.toLowerCase() === BET_STATUS_SPORTS.Won?.toLowerCase() || status?.toLowerCase() === BET_STATUS_SPORTS.CashedOut?.toLowerCase() || status?.toLowerCase() === BET_STATUS_SPORTS.accepted?.toLowerCase() },
            { "bg-state-warning-bg text-state-warning": status?.toLowerCase() === BET_STATUS.Return?.toLowerCase() },
            { "bg-state-negative-bg text-state-negative": status?.toLowerCase() === BET_STATUS_SPORTS.Lost?.toLowerCase() || status?.toLowerCase() === BET_STATUS_SPORTS.Rejected?.toLowerCase() }
          )}>
            {status}
          </div>
        )
          :
          <>
            {(status?.toLowerCase() === BET_STATUS_SPORTS.Won?.toLowerCase() || status?.toLowerCase() === BET_STATUS_SPORTS.CashedOut?.toLowerCase() || status?.toLowerCase() === BET_STATUS_SPORTS.accepted?.toLowerCase()) && (<Icon href={successIcon} id="successIcon" className="h-5 w-5" />)}
            {status?.toLowerCase() === BET_STATUS.Return?.toLowerCase() && (<Icon href={pendingIcon} id="pendingIcon" className="h-5 w-5" />)}
            {(status?.toLowerCase() === BET_STATUS_SPORTS.Lost?.toLowerCase() || status?.toLowerCase() === BET_STATUS_SPORTS.Rejected?.toLowerCase()) && (<Icon href={failedIcon} id="failedIcon" className="h-5 w-5" />)}
          </>
        }
      </div>
      <SportsBetsModel
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sportsBetsData={betParts}
        data={data}
        isLoading={isLoading}
        LoadingSpinner={LoadingSpinner}
        getUserName={getUserName}
      />
    </div>
  )
}


export default SportsBetItem