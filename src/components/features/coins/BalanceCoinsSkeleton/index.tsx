import { Skeleton } from 'components/shared/ui/Skeleton';

const BalanceCoinsSkeleton = () => {
  return (
    <div className="min-h-[82px] h-full bg-base-800 rounded-xl flex flex-col items-center justify-center xl:bg-base-735">
      <Skeleton className='w-[88px] h-[21px] rounded-xl mb-1' />
      <Skeleton className='w-[170px] h-[30px] rounded-xl' />
    </div>
  );
};

export default BalanceCoinsSkeleton;
