import Slider from 'components/shared/Slider';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperSlide } from 'swiper/react';
import GameIcon, { type GameIconProps } from '../GameIcon/GameCard';
import '../BannersSlider.css';

type BannersSliderProps = {
  banners: GameIconProps[];
  selectedBannerImage: string;
  onBannerClick: (image: string) => void;
};

const BannersSlider = ({
  banners,
  onBannerClick,
  selectedBannerImage,
}: BannersSliderProps) => {
  return (
    <div className="relative mx-3 p-0">
      <Slider
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        grabCursor
      >
        {banners.map((game, index) => (
          <SwiperSlide
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="!w-auto"
            onClick={() => onBannerClick(game.image)}
          >
            <GameIcon
              title={game.title}
              image={game.thumbnailImage || game.image}
              selected={game.image === selectedBannerImage}
            />
          </SwiperSlide>
        ))}
      </Slider>
      <div className="swiper-pagination" />
    </div>
  );
};

export default BannersSlider;
