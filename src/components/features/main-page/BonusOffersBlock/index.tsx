import { SwiperSlide } from 'swiper/react';
import { useBreakpoint, BREAKPOINTS } from 'helpers/hooks';
import Slider from 'components/shared/Slider';
import BonusCard from 'components/shared/BonusCard';
import CategoryHeader from 'components/shared/CategoryHeader';
import { type DiscountItemsType } from 'components/shared/BonusCard/types';
import NoItemsMessage from 'components/shared/NoItemsMessage';

const bonusItems: {
  id: number;
  color: string;
  discount: string;
  bonuses: DiscountItemsType[];
}[] = [];

const BonusOffersBlock = () => {
  const { screenWidth } = useBreakpoint();
  const xl = screenWidth >= BREAKPOINTS.xl;

  if (bonusItems.length === 0) {
    return (
      <div>
        <span className="text-base">Promotions</span>
        <div className="py-[9px]">
          <NoItemsMessage message="No promotions found" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-inherit">
      <div className="hidden pre-sm:block xl:pr-5">
        <Slider
          label="Promotions"
          showMore
          withShadow
          slidesPerView={xl ? 3 : undefined}
          to="/promotions"
        >
          {bonusItems.map((bonus) => (
            <SwiperSlide key={bonus.id}>
              <BonusCard
                discount={bonus.discount}
                className={bonus.color}
                items={bonus.bonuses}
              />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
      <div className="flex flex-col gap-3 pre-sm:hidden pr-4">
        <CategoryHeader label="Promotions" showMore to="/promotions" />
        {bonusItems.map((bonus) => (
          <div key={bonus.id} className="w-full">
            <BonusCard
              discount={bonus.discount}
              className={bonus.color}
              items={bonus.bonuses}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BonusOffersBlock;
