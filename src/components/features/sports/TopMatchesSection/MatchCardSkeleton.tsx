import { Skeleton } from 'components/shared/ui/Skeleton';

const MatchCardSkeleton = () => {
  return (
    <div className="w-[252px] h-[187px] bg-base-800 rounded-xl p-4 border border-base-700">
      <div className="flex flex-col h-full">
        {/* League header */}
        <div className="flex justify-between items-center gap-2 mb-4">
          <Skeleton className="w-6 h-6 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
          <Skeleton className="w-6 h-6 rounded" />
        </div>

        {/* Teams */}
        <div className="flex gap-3 justify-between mb-6">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="w-20 h-4 rounded" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="w-20 h-4 rounded" />
          </div>
        </div>

        {/* Odds buttons */}
        <div className="flex gap-2 mt-auto">
          <Skeleton className="flex-1 h-10 rounded-lg" />
          <Skeleton className="flex-1 h-10 rounded-lg" />
          <Skeleton className="flex-1 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default MatchCardSkeleton;