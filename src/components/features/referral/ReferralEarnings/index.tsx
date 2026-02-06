import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getReferralDetails } from 'store/referrals/slice';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import { formatNumber } from 'helpers/numbers';
import btc from '/icons/btc.svg?url';
import eth from '/icons/eth.svg?url';
import sol from '/icons/sol.svg?url';

const cryptoOptions = {
  btc: {
    icon: <Icon id="btcIcon" href={btc} className="w-6 h-6" />,
    label: 'Bitcoin (BTC)',
  },
  eth: {
    icon: <Icon id="ethIcon" href={eth} className="w-6 h-6" />,
    label: 'Ethereum (ETH)',
  },
  sol: {
    icon: <Icon id="solIcon" href={sol} className="w-6 h-6" />,
    label: 'Solana (SOL)',
  },
};

const ReferralEarnings = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.referrals.details.data);

  useEffect(() => {
    dispatch(getReferralDetails());
  }, [dispatch]);

  const earningsData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const totalEarned = data.reduce(
      (acc, referral) => acc + (referral.totalReferralAmountEarned || 0),
      0,
    );

    const btcAmount = totalEarned * 0.5;
    const ethAmount = totalEarned * 0.3;
    const solAmount = totalEarned * 0.2;

    return {
      totalClaimed: 0,
      totalClaimable: totalEarned,
      earnings: [
        {
          id: 'btc',
          value: btcAmount,
          currency: 'btc' as const,
        },
        {
          id: 'eth',
          value: ethAmount,
          currency: 'eth' as const,
        },
        {
          id: 'sol',
          value: solAmount,
          currency: 'sol' as const,
        },
      ].filter((item) => item.value > 0),
    };
  }, [data]);

  if (!earningsData) {
    return (
      <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:min-h-full">
        <h2 className="mb-3 body-txtColor-1 font-bold hidden xl:block xl:text-lg">
          Earnings
        </h2>
        <p className="text-base-400 text-sm">No earnings data available</p>
      </div>
    );
  }

  return (
    <div className="xl:p-5 xl:rounded-xl xl:bg-base-800 xl:min-h-full">
      <h2 className="mb-3 body-txtColor-1 font-bold hidden xl:block xl:text-lg">
        Earnings
      </h2>
      <div className="flex gap-3 mb-3">
        <div className="flex-1 px-3 py-5 bg-base-800 rounded-xl xl:border xl:border-base-700 md:h-32 md:flex md:flex-col md:justify-center md:items-center xl:items-start xl:h-fit">
          <p className="text-base-400 text-xs xl:text-sm">Total Claimed</p>
          <p className="text-sm font-medium">
            ${formatNumber(earningsData.totalClaimed, 2)}
          </p>
        </div>
        <div className="flex-1 px-3 py-5 bg-base-800 rounded-xl xl:border xl:border-base-700 md:h-32 md:flex md:flex-col md:justify-center md:items-center xl:items-start xl:h-fit">
          <p className="text-base-400 text-xs xl:text-sm">Total Claimable</p>
          <p className="text-sm font-medium">
            ${formatNumber(earningsData.totalClaimable, 2)}
          </p>
        </div>
      </div>
      <Button
        variant="filled"
        className="w-full mb-8 md:w-fit md:px-24 xl:w-full"
        disabled={earningsData.totalClaimable === 0}
      >
        Claim
      </Button>
      <div className="flex flex-col gap-3">
        {earningsData.earnings.length > 0 ? (
          earningsData.earnings.map(({ id, value, currency }) => (
            <div
              key={id}
              className="p-3 flex bg-base-800 rounded-lg xl:border xl:border-base-700"
            >
              {cryptoOptions[currency].icon}
              <p className="text-sm text-base-200 ml-1">
                {cryptoOptions[currency].label}
              </p>
              <p className="ml-auto text-primary-1 font-medium text-sm">
                ${formatNumber(value, 2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-base-400 text-sm text-center py-4">
            No earnings to display
          </p>
        )}
      </div>
    </div>
  );
};

export default ReferralEarnings;
