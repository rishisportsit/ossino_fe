import { Skeleton } from 'components/shared/ui/Skeleton';

const PopularParlayCardSkeleton = () => {
  return (
    <div className="w-80 h-[272px] relative bg-base-800 rounded-xl border border-base-700">
      <div className="p-4 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-16 h-5 rounded" />
            <Skeleton className="w-12 h-5 rounded" />
          </div>
          <Skeleton className="w-8 h-8 rounded" />
        </div>

        {/* Bet selections */}
        <div className="flex-1 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center py-3">
              <Skeleton className="w-5 h-5 rounded mr-2" />
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <Skeleton className="w-24 h-4 rounded" />
                  <Skeleton className="w-16 h-3 rounded" />
                </div>
                <Skeleton className="w-32 h-3 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer button */}
        <Skeleton className="w-full h-10 rounded-lg mt-4" />
      </div>
    </div>
  );
};

export default PopularParlayCardSkeleton;