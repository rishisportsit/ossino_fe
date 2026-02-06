import { Skeleton } from '../ui/Skeleton';

const UserCardSkeleton = () => {
  return (
    <div className="px-4 bg-base-800 py-5 xl:py-[17.5px] flex items-center gap-3 rounded-xl flex-1 relative overflow-hidden md:gap-5 xl:gap-8">
      <Skeleton className="w-[104px] h-[104px] xl:w-[149px] xl:h-[149px] z-10 rounded-full" />
      <div className="flex-1">
        <Skeleton className="w-40 h-[27px] xl:h-9 rounded-xl mb-1" />
        <Skeleton className="w-[150px] h-[29px] xl:h-9 rounded-xl mb-1.5 xl:mb-5" />
        <div className="flex gap-2">
          <div className="flex flex-col flex-1">
            <Skeleton className="h-[16px] xl:h-6 w-24 rounded-xl mb-1" />
            <Skeleton className="h-[19px] xl:h-[30px] w-20 rounded-xl " />
          </div>
          <div className="flex flex-col flex-1">
            <Skeleton className="h-[16px] xl:h-6 w-24 rounded-xl mb-1" />
            <Skeleton className="h-[19px] xl:h-[30px] w-20 rounded-xl " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
