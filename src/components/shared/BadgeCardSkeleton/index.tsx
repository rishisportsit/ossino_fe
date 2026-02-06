import { Skeleton } from 'components/shared/ui/Skeleton';

const BadgeCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full h-full aspect-square rounded-full border-2 border-base-700 mb-3 p-1.5">
        <Skeleton className="h-full w-full rounded-full" />
      </div>
      <div className="flex flex-col gap-1.5 items-center">
        <Skeleton className="h-[16px] w-20 rounded-xl" />
        <Skeleton className="h-[12px] w-10 rounded-xl" />
      </div>
    </div>
  );
};

export default BadgeCardSkeleton;
