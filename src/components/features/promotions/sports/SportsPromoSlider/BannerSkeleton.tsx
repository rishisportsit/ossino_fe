import { Skeleton } from 'components/shared/ui/Skeleton';

const BannerSkeleton = () => {
  return (
    <div className="w-full md:w-[340px] h-[160px] rounded-xl bg-base-800 p-4 border border-base-700">
      <div className="flex flex-col gap-3 h-full">
        <Skeleton className="w-24 h-4 rounded" />
        <Skeleton className="w-36 h-6 rounded" />
        <Skeleton className="w-28 h-4 rounded" />
        <div className="flex-1" />
        <Skeleton className="w-20 h-6 rounded" />
      </div>
    </div>
  );
};

export default BannerSkeleton;