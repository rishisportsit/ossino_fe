import { cn } from 'helpers/ui';
import { Skeleton } from '../ui/Skeleton';

type GameCardSkeletonProps = {
  className?: string;
};

const GameCardSkeleton = ({ className }: GameCardSkeletonProps) => {
  return (
    <div
      className={cn(
        'border border-border-1/[0.10] rounded-xl w-full h-[223.33px]',
        className,
      )}
    >
      <Skeleton className="aspect-square w-[140px] rounded-t-[12px] rounded-b-none" />
      <div className="pb-3 pt-4 px-2">
        <Skeleton className="w-20 h-3.5 rounded-xl mb-2.5" />
        <Skeleton className="w-16 h-3 rounded-xl mb-2" />
        <Skeleton className="w-20 h-3 rounded-xl" />
      </div>
    </div>
  );
};

export default GameCardSkeleton;
