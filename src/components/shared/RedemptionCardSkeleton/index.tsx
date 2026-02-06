import { Skeleton } from 'components/shared/ui/Skeleton';

const RedemptionCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full rounded-xl bg-base-750">
      <Skeleton className="w-full aspect-square rounded-b-none rounded-t-xl" />
      <div className="p-2 pb-3 flex flex-col items-center">
        <Skeleton className="w-[92px] h-[21px] rounded-xl mb-2" />
        <Skeleton className="w-[41px] h-[18px] rounded-xl mb-3" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
};

export default RedemptionCardSkeleton;
