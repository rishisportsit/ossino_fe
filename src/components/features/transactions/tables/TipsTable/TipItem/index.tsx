import { cn } from "helpers/ui";
import { useEffect, useMemo } from "react";

import Icon from "components/shared/Icon";
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { formatTransactionsDateToRender } from "helpers/transactions/formatDate";
import userAvatarIcon from '/icons/userAvatar.svg?url';

import { useAppDispatch, useAppSelector } from "store/index";
import { getAllUsers } from "store/users/slice";
import failedIcon from '/icons/failedIcon.svg?url';
import pendingIcon from '/icons/pendingIcon.svg?url';
import successIcon from '/icons/successIcon.svg?url';
import { type TipTransaction } from "store/transactions/types";
import { formatCurrencyNumber } from "helpers/numbers";
import { TRANSACTION_STATUS } from "store/transactions/constants";

type TipItemProps = {
  tipItem: TipTransaction
}

const TipItem = ({ tipItem }: TipItemProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const allUsers = useMemo(() => {
    if (!users) {
      return null;
    }
    return users.map((user) => ({
      id: user.id,
      userName: user.userName,
    }));
  }, [users]);

  const { date, amount, status, currency, senderId, receiverId, userName: tipUserName, counterPartyUserName } = tipItem;
  const formattedAmount = formatCurrencyNumber(amount, currency.contraction);
  const iconSrc = currency.icon || '/icons/currencies/etheriumLogo.svg';
  const userId = (amount > 0) ? senderId : receiverId;
  const fallbackUserName = allUsers?.find((user) => user.id === userId)?.userName ?? '';
  const displayUserName = tipUserName || counterPartyUserName || fallbackUserName;

  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;

  return (
    <div className="flex flex-row justify-start items-center bg-base-800 box-border h-11 border border-base-800 xl:border-base-700 rounded-xl pl-0 pr-0">
      <div className="w-[140px] xl:w-[300px] pl-3 text-start text-xs lg:text-sm leading-[10px]">
        {formatTransactionsDateToRender(date)}
      </div>
      <div className="flex text-xs items-center text-base-300 h-11 font-medium leading-4 w-[130px] md:w-[180px] gap-1.5 pl-3">
        <img src={iconSrc} alt={currency.contraction || 'currency'} className="w-4 h-4" />
        <span className={cn({ "text-state-positive": amount > 0 })}>{amount > 0 ? `+${formattedAmount}` : formattedAmount}</span>
      </div>
      <div className="flex items-center flex-1 gap-1.5 text-xs lg:text-sm leading-[18px] pl-3 pr-4">
        {tipItem.isPublic || displayUserName ? (
          <div className="flex flex-row items-center gap-1 truncate">
            <Icon href={userAvatarIcon} id="userAvatarIcon" className="w-4 h-4 flex-shrink-0" />
            <div className="truncate">@{displayUserName}</div>
          </div>
        ) : (<span>Anonymous</span>)}
      </div>
      <div className="flex w-[48px] xl:w-[100px] items-center justify-center">
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


export default TipItem