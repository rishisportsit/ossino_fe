import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';
import ReferCard1 from 'components/features/promotions/ReferCard1';
import BoostLevelCard from 'components/features/promotions/BoostLevelCard';
import DailyRacesCard from 'components/features/promotions/DailyRacesCard';
import 'swiper/css';
import 'swiper/css/pagination';

const PromoCardsSection = () => {
  return (
    <Slider
      withShadow
      sportShadow
      spaceBetween={12}
      loop={true}
    >
      <SwiperSlide className="!w-auto">
        <div className="w-[300px]">
          <ReferCard1 amount={50} />
        </div>
      </SwiperSlide>
      <SwiperSlide className="!w-auto">
        <div className="w-[300px]">
          <BoostLevelCard />
        </div>
      </SwiperSlide>
      <SwiperSlide className="!w-auto">
        <div className="w-[300px]">
          <DailyRacesCard amount={10000} />
        </div>
      </SwiperSlide>
    </Slider>
  );
};

export default PromoCardsSection;
