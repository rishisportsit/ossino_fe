import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/index';
import { getReferralDetails } from 'store/referrals/slice';

import { formatNumber } from 'helpers/numbers';

const ReferralDetails = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.referrals.details.data);

  useEffect(() => {
    dispatch(getReferralDetails());
  }, [dispatch]);

  const safeData = data ?? [];
  const totalReferrals = safeData.length;
  const totalWagered = safeData.reduce(
    (acc, x) => acc + (x.totalReferralAmountEarned || 0),
    0,
  );
  const totalEarnings = totalWagered;

  return (
    <div>
      <h2 className="mb-3 body-txtColor-1 font-bold xl:text-lg xl:mb-4">Details</h2>
      <div className="flex gap-2 xl:flex-col h-36 md:h-32">
        <div className="rounded-xl flex flex-col justify-center items-center w-1/2 md:w-1/3 xl:w-full bg-base-800 px-3 xl:border xl:border-base-700 xl:h-fit xl:px-4 xl:py-5 xl:items-start">
          <p className="text-base-400 text-xs xl:text-sm">Total Referrals</p>
          <p className="text-sm font-medium xl:text-base">
            {totalReferrals}&nbsp;Users
          </p>
        </div>
        <div className="w-1/2 md:w-2/3 xl:w-full flex flex-col gap-2 md:flex-row">
          <div className="flex-1 px-3 bg-base-800 rounded-xl flex flex-col justify-center md:items-center xl:items-start xl:border xl:border-base-700 xl:px-4 xl:py-5">
            <p className="text-base-400 text-xs xl:text-sm">Total Wagered</p>
            <p className="text-sm font-medium xl:text-base">
              ${formatNumber(totalWagered, 2)}
            </p>
          </div>
          <div className="flex-1 px-3 bg-base-800 rounded-xl flex flex-col justify-center md:items-center xl:items-start xl:border xl:border-base-700 xl:px-4 xl:py-5">
            <p className="text-base-400 text-xs xl:text-sm">
              Referral Earnings
            </p>
            <p className="text-sm font-medium xl:text-base">
              ${formatNumber(totalEarnings, 2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralDetails;
