import { formatNumber } from 'helpers/numbers';
import {
  selectCoinsOverviewError,
  selectCoinsOverviewLoading,
  selectTotalCoins,
} from 'store/coinsOverview/selectors';

import { useAppSelector } from 'store/index';
import { Skeleton } from '../ui/Skeleton';

const PageHeaderBalance = () => {
  const totalCoins = useAppSelector(selectTotalCoins);
  const coinsOverviewError = useAppSelector(selectCoinsOverviewError);
  const coinsOverviewLoading = useAppSelector(selectCoinsOverviewLoading);

  if (coinsOverviewError) {
    return (
      <div className="bg-base-800 rounded-lg h-8 font-semibold px-4 flex items-center gap-2 w-fit text-status-error-200">
        Error
      </div>
    );
  }

  if (coinsOverviewLoading) {
    return (
      <div className="bg-base-800 rounded-lg h-8 px-4 flex items-center gap-2 w-fit">
        <Skeleton className="w-[94px] h-[21px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="bg-base-800 rounded-lg h-8 px-4 flex items-center gap-2 w-fit">
      <img src="/images/redemptions/chip.png" className="h-4" alt="" />
      <span className="text-sm font-medium body-txtColor-1">
        {formatNumber(totalCoins || 0)}
      </span>
    </div>
  );
};

export default PageHeaderBalance;
