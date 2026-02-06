import { Skeleton } from 'components/shared/ui/Skeleton';

const RewardCardSkeleton = () => {
  return (
    <div className="w-[120px] bg-base-800 md:bg-base-700 h-[120px] md:w-[104px] md:h-[104px] xl:w-[150px] xl:h-[150px] rounded-lg flex flex-col justify-center items-center">
      <Skeleton className="mb-2.5 md:mb-2 xl:mb-3.5 w-[70px] h-[70px] md:w-[60px] md:h-[60px] xl:w-[80px] xl:h-[80px] rounded-xl" />
      <Skeleton className="w-[80px] xl:w-[100px] h-[10px] xl:h-[12px] rounded-xl" />
    </div>
  );
};

export default RewardCardSkeleton;
