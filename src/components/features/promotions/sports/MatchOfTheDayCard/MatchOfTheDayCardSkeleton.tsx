import { Skeleton } from 'components/shared/ui/Skeleton';

const MatchOfTheDayCardSkeleton = () => {
  return (
    <div className="rounded-xl px-4 py-4 relative overflow-hidden w-full md:w-[340px] h-[160px] bg-base-800 border border-base-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-7">
        <Skeleton className="w-24 h-6 rounded-full" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-1 truncate">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-20 h-4 rounded" />
        </div>
        <div className="flex items-center gap-1 truncate">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-20 h-4 rounded" />
        </div>
      </div>

      {/* Betting buttons */}
      <div className="flex gap-2">
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
      </div>
    </div>
  );
};

export default MatchOfTheDayCardSkeleton;