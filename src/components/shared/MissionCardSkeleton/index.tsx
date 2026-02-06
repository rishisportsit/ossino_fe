import { Skeleton } from 'components/shared/ui/Skeleton';

const MissionCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border-1/[0.1]">
      <Skeleton className="aspect-square md:aspect-[1/0.75] xl:aspect-square" />
      <div className="px-2 pb-3 pt-3.5">
        <Skeleton className="rounded-xl h-[16px] mb-1" />
        <Skeleton className="rounded-xl h-[16px] mb-2.5" />
        <Skeleton className="rounded-xl h-[12px] w-[60px] mb-4" />
        <Skeleton className="h-1.5 rounded-full mb-3" />
        <Skeleton className="h-8 rounded-md" />
      </div>
    </div>
  );
};

export default MissionCardSkeleton;
