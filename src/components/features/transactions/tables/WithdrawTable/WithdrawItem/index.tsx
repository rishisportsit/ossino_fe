import { cn } from "helpers/ui";
import CopyButton from "components/shared/CopyButton";
import { formatTransactionsDateToRender } from "helpers/transactions/formatDate";

import Icon from "components/shared/Icon";
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { truncateString } from "helpers/strings";
import failedIcon from '/icons/failedIcon.svg?url';
import pendingIcon from '/icons/pendingIcon.svg?url';
import successIcon from '/icons/successIcon.svg?url';

import '../../../../../../styles/index.css';
import { type WithdrawTransaction } from "store/transactions/types";
import { formatCurrencyAmount } from "helpers/currencyHelpers";
import { TRANSACTION_STATUS } from "store/transactions/constants";

type WithdrawItemProps = {
  withdrawItem: WithdrawTransaction
}

const WithdrawItem = ({ withdrawItem }: WithdrawItemProps) => {
  const { date, amount, transactionId, status, currency } = withdrawItem;
  const formattedAmount = formatCurrencyAmount(amount, currency.contraction || 'USD', {
    removeTrailingZeros: true,
    showSymbol: false
  });
  const { icon: currencyIcon } = currency;

  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;
  const isMobileScreen = screenWidth <= BREAKPOINTS.md;

  return (
    <div className="flex flex-row no-scrollbar overflow-visible justify-start items-center bg-base-800 box-border w-fit md:w-auto h-11 border border-base-800 xl:border-base-700 rounded-xl pl-0 pr-0">
      <div className="min-w-[120px] md:w-1/3 xl:min-w-[320px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
        {formatTransactionsDateToRender(date)}
      </div>
      <div className="flex flex-row gap-0 xl:w-full md:w-2/3">
        <div className="flex items-center min-w-[130px]  md:w-1/2 xl:w-1/2 gap-1.5 text-xs lg:text-sm leading-[18px]">
          <Icon href={currencyIcon} id={currency.contraction || 'currencyIcon'} className="w-4 h-4" />
          <span>{amount > 0 ? `+${formattedAmount}` : formattedAmount}</span>
        </div>
        <div className="flex items-center min-w-[100px] xl:w-1/2 gap-0 md:gap-1.5 text-xs lg:text-sm leading-[18px]">
          <div className="w-[60px] text-xs overflow-hidden whitespace-nowrap text-ellipsis lg:w-auto">{!isMobileScreen ? transactionId : truncateString(transactionId, 7)}</div>
          <CopyButton valueToCopy={transactionId} />
        </div>
      </div>
      <div className="flex min-w-[48px] xl:min-w-[100px] items-center justify-center ml-auto">
        {isDesktopScreen ? (
          <div className={cn("rounded-full py-1 px-3 text-xs leading-4",
            { "bg-state-positive-bg text-state-positive": status === TRANSACTION_STATUS.Success },
            { "bg-state-warning-bg text-state-warning": status === TRANSACTION_STATUS.Pending },
            { "bg-state-negative-bg text-state-negative": status === TRANSACTION_STATUS.Failed }
          )}>
            {status}
          </div>
        )
          :
          <>
            {status === TRANSACTION_STATUS.Success && (<Icon href={successIcon} id="successIcon" className="h-5 w-5" />)}
            {status === TRANSACTION_STATUS.Pending && (<Icon href={pendingIcon} id="pendingIcon" className="h-5 w-5" />)}
            {status === TRANSACTION_STATUS.Failed && (<Icon href={failedIcon} id="failedIcon" className="h-5 w-5" />)}
          </>}
      </div>
    </div>
  )
}


export default WithdrawItem