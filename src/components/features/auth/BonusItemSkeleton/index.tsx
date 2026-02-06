import { Skeleton } from 'components/shared/ui/Skeleton';

const BonusSkeleton = () => {
  return (
    <div className="h-[63.33px] rounded-xl px-4 py-3.5 border border-base-300">
      <div className="flex items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="grow">
          <Skeleton className="h-3 w-28 rounded-md mb-0.5" />
          <Skeleton className="h-3 w-16 rounded-md" />
        </div>
        <div className="w-4 h-4 rounded-full border border-base-300" />
      </div>
    </div>
  );
};

export default BonusSkeleton;
