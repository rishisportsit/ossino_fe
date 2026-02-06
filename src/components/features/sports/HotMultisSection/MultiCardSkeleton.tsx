import { Skeleton } from 'components/shared/ui/Skeleton';

const MultiCardSkeleton = () => {
  return (
    <div className="p-4 w-[326px] h-[272px] md:w-[384px] flex flex-col bg-base-800 rounded-xl border border-base-700">
      {/* Header with Total Odds and Add Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-row items-baseline gap-2">
          <Skeleton className="w-16 h-4 rounded" />
          <Skeleton className="w-8 h-5 rounded" />
        </div>
        <Skeleton className="w-20 h-8 rounded" />
      </div>

      {/* Selections */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* Bet Type */}
              <Skeleton className="w-32 h-4 rounded" />

              {/* Match Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-6 h-6 rounded" />
                  <Skeleton className="w-12 h-3 rounded" />
                  <Skeleton className="w-2 h-3 rounded" />
                  <Skeleton className="w-6 h-6 rounded" />
                  <Skeleton className="w-12 h-3 rounded" />
                </div>
                <Skeleton className="w-8 h-4 rounded" />
              </div>

              {/* Divider line (except for last item) */}
              {index < 3 && (
                <div className="border-t border-base-600 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiCardSkeleton;