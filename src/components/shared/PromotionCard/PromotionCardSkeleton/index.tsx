import { Skeleton } from 'components/shared/ui/Skeleton';

const PromotionCardSkeleton = () => {
  return (
    <div className="relative flex-shrink-0 w-[248px] lg:w-[376px] h-[120px] lg:h-[120px] rounded-xl p-3 lg:p-4 bg-base-800">
      <div className="flex flex-col gap-1.5 lg:gap-2.5 justify-start mb-5">
        <Skeleton className="w-[70px] lg:w-[90px] h-4 rounded-[74px] lg:rounded-[100px]" />
        <Skeleton className="w-36 h-4 rounded-xl" />
        <Skeleton className="w-32 h-6 rounded-xl" />
      </div>
      <Skeleton className="w-28 h-4 rounded-xl" />
    </div>
  );
};

export default PromotionCardSkeleton;
