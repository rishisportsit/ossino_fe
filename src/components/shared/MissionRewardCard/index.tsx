import { useMemo } from 'react';
import { type MissionReward } from 'api/missions/missions.types';
import { cn } from 'helpers/ui';

type MissionRewardCardProps = {
  onClick: () => void;
  data: MissionReward;
  isLoading?: boolean;
};

type BaseMissionRewardProps = {
  data: MissionReward;
  isLoading?: boolean;
};

type AvailableMissionRewardProps = {
  onClick: () => void;
  isLoading?: boolean;
};

const classNames = {
  wrapper:
    'w-[120px] h-[120px] rounded-lg flex flex-col justify-center items-center shadow-[0_11.04px_22.08px_0_#00000080] md:w-[104px] md:h-[104px] xl:w-[150px] xl:h-[150px]',
  label:
    'text-xs md:text-[10px] md:leading-[10px] font-medium xl:text-sm xl:leading-[14px] text-center px-2',
  description:
    'text-xs md:text-[10px] md:leading-[10px] font-medium xl:text-xs xl:leading-[12px] text-center px-2',
};

const CompletedMissionReward = ({ data }: BaseMissionRewardProps) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-b from-[#1B0243] to-80% to-[#231A33]',
        classNames.wrapper,
      )}
    >
      <div className="relative w-[85px] flex justify-center pb-2">
        <div className="w-12 h-12 md:w-10 md:h-10 xl:h-12 xl:w-12 rounded-full bg-primary-1 flex flex-col justify-center items-center relative z-20">
          <span className="leading-3 md:text-xs md:leading-[12px] font-bold body-txtColor-2 text-center">
            {data.prizeAmount}
          </span>
          <span className="text-[10px] md:text-[9px] xl:text-[10px] leading-[10px] font-medium body-txtColor-2">
            coins
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
      <span className={cn(classNames.description, 'body-txtColor-1')}>Claimed!</span>
    </div>
  );
};

const IncompleteMissionReward = ({ data }: BaseMissionRewardProps) => {
  return (
    <div
      className={cn(
        'gap-2 md:gap-2 bg-base-700 relative overflow-hidden xl:gap-2',
        classNames.wrapper,
      )}
    >
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          className="w-[50px] h-[50px] md:w-[40px] md:h-[40px] xl:w-[50px] xl:h-[50px] object-cover rounded"
          alt={data.description}
        />
      ) : (
        <img
          src="/images/present-disabled.png"
          className="w-[50px] md:w-[40px] xl:w-[50px]"
          alt=""
        />
      )}

      <div className="flex flex-col items-center gap-1">
        <span className={cn(classNames.label, 'text-base-300')}>
          {data.description}
        </span>
        <div className="w-full bg-base-600 rounded-full h-2">
          <div
            className="bg-primary-1 h-2 rounded-full transition-all duration-300"
            style={{ width: `${data.progress}%` }}
          />
        </div>
        <span className="text-xs text-base-400">{data.progress}% Complete</span>
      </div>

      <div className="absolute bg-gradient-to-b from-5% from-gradient-secondary-dark-1 to-70% to-gradient-secondary-dark-2 w-[370px] h-[580px] rounded-full blur-[300px] rotate-[-150deg] bottom-[-500px] right-[-350px]" />
    </div>
  );
};

const AvailableMissionReward = ({
  onClick,
  isLoading,
}: AvailableMissionRewardProps) => {
  return (
    <div
      onClick={isLoading ? undefined : onClick}
      className={cn(
        'gap-2.5 md:gap-2 bg-gradient-to-b from-gradient-third-1 to-80% to-gradient-third-2 xl:gap-3.5',
        classNames.wrapper,
        {
          'cursor-pointer': !isLoading,
          'cursor-not-allowed opacity-70': isLoading,
        },
      )}
    >
      <img
        src="/images/present.png"
        className="w-[70px] md:w-[60px] xl:w-[70px]"
        alt=""
      />
      <span className={classNames.label}>
        {isLoading ? 'Claiming...' : 'Tap to Open'}
      </span>
    </div>
  );
};

const MissionRewardCard = ({
  onClick,
  data,
  isLoading = false,
}: MissionRewardCardProps) => {
  const currentView = useMemo(() => {
    const { prizeAwarded, progress } = data;

    if (prizeAwarded) {
      return <CompletedMissionReward data={data} isLoading={isLoading} />;
    }

    if (progress < 100) {
      return <IncompleteMissionReward data={data} isLoading={isLoading} />;
    }

    return <AvailableMissionReward onClick={onClick} isLoading={isLoading} />;
  }, [data, onClick, isLoading]);

  return currentView;
};

export default MissionRewardCard;
