import { Skeleton } from 'components/shared/ui/Skeleton';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';

interface MatchItemSkeletonProps {
  showLiveBadge?: boolean;
  showScores?: boolean;
  className?: string;
}

const MatchItemSkeleton = ({ 
  showLiveBadge = false, 
  showScores = false, 
  className = "" 
}: MatchItemSkeletonProps) => {
  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS?.lg;

  return (
    <div className={`p-4 border border-base-700 bg-base-800 rounded-xl overflow-visible ${className}`}>
      {/* Top section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {showLiveBadge && (
            <>
              <Skeleton className="w-8 h-5 rounded-full" />
            </>
          )}

          <div className="flex items-center space-x-1">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-16 h-4 rounded" />
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-20 h-4 rounded" />
              <Skeleton className="w-5 h-5 rounded" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="w-6 h-6 rounded" />
          <Skeleton className="w-10 h-5 rounded-full" />
        </div>
      </div>

      {/* Middle section - Teams */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-4 justify-start lg:justify-center min-w-0 lg:min-w-auto w-full">
          <div className="flex items-center space-x-2 flex-1 justify-end min-w-0">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="w-24 h-4 rounded" />
          </div>

          {showScores ? (
            <div className="text-center mx-8">
              <Skeleton className="w-8 h-4 rounded" />
            </div>
          ) : (
            <div className="text-center mx-8 text-base-500 text-sm font-medium flex-shrink-0">
            </div>
          )}

          <div className="flex items-center space-x-2 flex-1 justify-start min-w-0">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="w-24 h-4 rounded" />
          </div>
        </div>
      </div>

      {/* Bottom section - Odds */}
      <div className="w-full overflow-visible">
        {/* Headers */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-0.5">
          {Array.from({ length: isDesktopScreen ? 6 : 3 }).map((_, i) => (
            <Skeleton key={`header-${i}`} className="w-full h-5 rounded" />
          ))}
        </div>

        {/* Odds Buttons */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: isDesktopScreen ? 6 : 3 }).map((_, i) => (
            <Skeleton key={`odds-${i}`} className="w-full h-10 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchItemSkeleton;