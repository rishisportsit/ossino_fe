import { Skeleton } from 'components/shared/ui/Skeleton';

const DiscoveryCardSkeleton = () => {
  return (
    <div className="w-full min-w-[200px] bg-base-800 rounded-xl border border-base-700 p-4">
      {/* Header with date and people count */}
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="w-20 h-4 rounded" />
        <Skeleton className="w-16 h-4 rounded" />
      </div>

      {/* Teams */}
      <div className="w-full flex justify-between mb-4">
        <div className="flex gap-1 items-center">
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="w-16 h-3 rounded" />
        </div>
        <div className="flex gap-1 items-center">
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="w-16 h-3 rounded" />
        </div>
      </div>

      {/* Betting button */}
      <Skeleton className="h-9 w-full rounded-lg" />
    </div>
  );
};

export default DiscoveryCardSkeleton;