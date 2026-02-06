import GameCardSkeleton from 'components/shared/GameCard/GameCardSkeleton';
import Slider from 'components/shared/Slider';
import { Skeleton } from 'components/shared/ui/Skeleton';
import { SwiperSlide } from 'swiper/react';

const GamesSkeleton = () => {
  return (
    <div>
      <Skeleton className="rounded-xl w-[82px] h-6 mb-3" />
      <Slider withShadow>
        {Array.from({ length: 12 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index} style={{ width: 'auto' }}>
            <GameCardSkeleton />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
};

export default GamesSkeleton;
