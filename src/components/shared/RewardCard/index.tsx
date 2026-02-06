import { useMemo } from 'react';

import { type Reward } from 'store/rewards/slice';

import { cn } from 'helpers/ui';

type RewardCardProps = {
  onClick: () => void;
  data: Reward;
};

type BaseRewardProps = {
  data: Reward;
};

type AvailableRewardProps = {
  onClick: () => void;
};

const classNames = {
  wrapper:
    'w-[120px] h-[120px] rounded-lg flex flex-col justify-center items-center shadow-[0_11.04px_22.08px_0_#00000080] md:w-[104px] md:h-[104px] xl:w-[150px] xl:h-[150px]',
  label:
    'text-xs md:text-[10px] md:leading-[10px] font-medium xl:text-sm xl:leading-[14px]',
};

const DisabledReward = ({ data }: BaseRewardProps) => {
  return (
    <div
      className={cn(
        'gap-2.5 md:gap-2 bg-base-700 relative overflow-hidden xl:gap-3.5',
        classNames.wrapper,
      )}
    >
      <img
        src="/images/present-disabled.png"
        className="w-[70px] md:w-[60px] xl:w-[70px]"
        alt=""
      />
      <span className={classNames.label}>
        {data.available_at}&nbsp;day to unlock
      </span>
      <div className="absolute bg-gradient-to-b from-5% from-gradient-secondary-dark-1 to-70% to-gradient-secondary-dark-2 w-[370px] h-[580px] rounded-full blur-[300px] rotate-[-150deg] bottom-[-500px] right-[-350px]" />
    </div>
  );
};

const OpenedReward = ({ data }: BaseRewardProps) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-b from-gradient-third-3 to-80% to-gradient-third-4',
        classNames.wrapper,
      )}
    >
      <div className="relative w-[85px] flex justify-center pb-5">
        <div className="w-12 h-12 md:w-10 md:h-10 xl:h-12 xl:w-12 rounded-full bg-primary-1 flex flex-col justify-center items-center relative z-20">
          <span className="leading-4 md:text-sm md:leading-[14px] font-bold body-txtColor-2">
            {data.value}
          </span>
          <span className="text-xs leading-[10px] md:text-[9px] md:leading-[9px] font-medium body-txtColor-2">
            Coins
          </span>
        </div>
        <img
          src="/images/present-top.png"
          alt=""
          className="absolute z-30 w-11 -top-5 left-0"
        />
        <img
          src="/images/present-bottom.png"
          alt=""
          className="absolute z-10 top-9 w-16 md:top-7 md:w-[54px] xl:w-16 xl:top-9"
        />
      </div>
    </div>
  );
};

const AvailableReward = ({ onClick }: AvailableRewardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'gap-2.5 md:gap-2 bg-gradient-to-b cursor-pointer from-gradient-third-1 to-80% to-gradient-third-2 xl:gap-3.5',
        classNames.wrapper,
      )}
    >
      <img
        src="/images/present.png"
        className="w-[70px] md:w-[60px] xl:w-[70px]"
        alt=""
      />
      <span className={classNames.label}>Tab to Open</span>
    </div>
  );
};

const RewardCard = ({ onClick, data }: RewardCardProps) => {
  const currentView = useMemo(() => {
    const { opened, available_at } = data;
    if (opened) {
      return <OpenedReward data={data} />;
    }
    if (available_at > 0) {
      return <DisabledReward data={data} />;
    }

    return <AvailableReward onClick={onClick} />;
  }, [data, onClick]);

  return currentView;
};

export default RewardCard;
