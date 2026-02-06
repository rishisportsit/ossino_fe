import Icon from "components/shared/Icon";
import { getCurrencyIconByCode } from 'components/shared/Header/CurrencyDropdown';
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { formatTransactionsDateToRender } from "helpers/transactions/formatDate";
import { cn } from "helpers/ui";

import failedIcon from '/icons/failedIcon.svg?url';
import pendingIcon from '/icons/pendingIcon.svg?url';
import successIcon from '/icons/successIcon.svg?url';
import type { DepositTransaction } from "store/transactions/types";
import { formatCurrencyAmount } from "helpers/currencyHelpers";
import { TRANSACTION_STATUS } from "store/transactions/constants";

type DepositItemProps = {
  depositItem: DepositTransaction
}

const DepositItem = ({ depositItem }: DepositItemProps) => {
  const { date, amount, status, currency } = depositItem;
  const formattedAmount = formatCurrencyAmount(amount, currency.contraction || 'USD', {
    removeTrailingZeros: true,
    showSymbol: false // Symbol likely handled by icon or should be added if needed, but keeping consistent with previous simple number format
  });
  const iconSrc = getCurrencyIconByCode(currency.contraction ?? '') || '/icons/currencies/etheriumLogo.svg';

  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;

  return (
    <div className="flex flex-row justify-start items-center bg-base-800 box-border h-11 border border-base-800 xl:border-base-700 rounded-xl pl-0 pr-0">
      <div className="w-[140px] xl:w-[320px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
        {formatTransactionsDateToRender(date)}
      </div>
      <div className="flex items-center gap-1.5 text-xs lg:text-sm leading-[18px]">
        <img src={iconSrc} alt={currency.contraction || 'currency'} className="w-4 h-4" />
        <span>{amount > 0 ? `+${formattedAmount}` : formattedAmount}</span>
      </div>
      <div className="flex w-[48px] xl:w-[100px] items-center justify-center ml-auto">
        {isDesktopScreen ? (
          <div className={cn("rounded-full py-1 px-2 text-xs leading-4",
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
          </>
        }
      </div>
    </div>
  )
}


export default DepositItem