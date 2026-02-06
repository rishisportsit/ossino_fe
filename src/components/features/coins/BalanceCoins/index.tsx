import { formatNumber } from 'helpers/numbers';
import {
  selectCoinsOverviewError,
  selectCoinsOverviewLoading,
} from 'store/coinsOverview/selectors';

import { useAppSelector } from 'store/index';
import ErrorMessage from 'components/shared/ErrorMessage';
import BalanceCoinsSkeleton from '../BalanceCoinsSkeleton';
import { selectLoyaltyDetails } from 'store/loyaltyDetails/selectors';

const BalanceCoins = () => {
  const coinsOverviewLoading = useAppSelector(selectCoinsOverviewLoading);
  const coinsOverviewError = useAppSelector(selectCoinsOverviewError);
  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);
  const coinsavailable = loyaltyDetails?.coins;


  if (coinsOverviewError) {
    const { message } = coinsOverviewError;

    return (
      <div className='min-h-[82px] h-full flex flex-col justify-center bg-base-800 rounded-xl xl:hidden'>
        <ErrorMessage message={message} />
      </div>
    );
  }

  if (coinsOverviewLoading) {
    return <BalanceCoinsSkeleton />;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-[-15%] from-gradient-secondary-dark-1 to-90% to-gradient-secondary-dark-2 rounded-xl">
      <p className="text-sm banner-textColor-1">Ossino Coins</p>
      <div className="flex items-center gap-1">
        <img
          src="/images/redemptions/chip.png"
          className="h-6 w-6 object-cover xl:h-7 xl:w-7"
          alt=""
        />
        <span className="font-bold text-xl text-primary-1 xl:text-2xl">
          {formatNumber(coinsavailable || 0, 0, 'en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </span>
      </div>
    </div>
  );
};

export default BalanceCoins;
