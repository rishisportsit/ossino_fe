import Slider from 'components/shared/Slider';
import { Skeleton } from 'components/shared/ui/Skeleton';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperSlide } from 'swiper/react';

const HeroSkeleton = () => {
  return (
    <div className="relative mt-5  box-border max-w-full rounded-xl md:min-h-[375px] xl:min-h-[414px] text-center overflow-hidden w-screen">
      <div className="bg-base-800 flex flex-col justify-end min-h-[360px] xl:min-h-[400px] rounded-xl">
        <div className="mb-[10px] -mr-3 md:ml-1 md:m-3 md:-mr-4 leading-none">
          <div className="relative mx-3 p-0">
            <Slider
              slidesPerGroup={4}
              pagination={{ clickable: true, el: '.swiper-pagination' }}
              grabCursor
            >
              {Array.from({ length: 24 }).map((_, index) => (
                <SwiperSlide
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="w-16 xl:w-20"
                >
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Skeleton className="w-full bg-base-600 aspect-square rounded-2xl xl:rounded-[24px]" />
                    <Skeleton className="w-16 bg-base-600 rounded-xl h-[14px]" />
                  </div>
                </SwiperSlide>
              ))}
            </Slider>
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
