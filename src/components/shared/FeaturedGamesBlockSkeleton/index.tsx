import { cn } from 'helpers/ui';
import { SwiperSlide } from 'swiper/react';
import Slider from '../Slider';
import { Skeleton } from '../ui/Skeleton';

type FeaturedGamesBlockSkeletonProps = {
  label: string;
  headerClassName?: string;
  className?: string;
};

const FeaturedGamesBlockSkeleton = ({
  label,
  className,
  headerClassName,
}: FeaturedGamesBlockSkeletonProps) => {
  return (
    <Slider label={label} navigation headerClassName={headerClassName}>
      {Array.from({ length: 12 }).map((_, index) => (
        <SwiperSlide
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={cn('min-w-16 xl:min-w-[88px]', className)}
        >
          <div className="flex flex-col w-16 xl:w-[88px] gap-2">
            <Skeleton className="aspect-square rounded-full" />
            <Skeleton className="w-16 rounded-xl h-[14px] self-center" />
          </div>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default FeaturedGamesBlockSkeleton;
