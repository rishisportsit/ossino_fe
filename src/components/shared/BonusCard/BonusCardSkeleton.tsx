import { Skeleton } from '../ui/Skeleton';

const BonusCardSkeleton = () => {
  return (
    <div className="h-full rounded-[12px] bg-base-735 p-5 pt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Skeleton className="rounded-xl w-16 h-7 mb-3" />
          <Skeleton className="rounded-xl w-24 h-4" />
        </div>
        <Skeleton className="w-[98px] h-8 rounded-lg" />
      </div>
      <div className='flex items-center gap-2'>
        <Skeleton className='grow h-[75px]' />
        <Skeleton className='grow h-[75px]' />
        <Skeleton className='grow h-[75px]' />
      </div>
    </div>
  );
};

export default BonusCardSkeleton;
