import { Skeleton } from 'components/shared/ui/Skeleton';

const CoinsHistoryItemSkeleton = () => {
  return (
    <div className="rounded-xl p-4 bg-base-800 w-full flex">
      <Skeleton className="rounded-full bg-base-700 flex items-center justify-center w-10 h-10 mr-2" />
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-[100px] rounded-xl" />
          <Skeleton className="h-4 w-[84px] rounded-xl" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-3 w-[65px] rounded-xl bg-base-700" />
          <Skeleton className="h-3 w-[67px] rounded-xl bg-base-700" />
        </div>
      </div>
    </div>
  );
};

export default CoinsHistoryItemSkeleton;
