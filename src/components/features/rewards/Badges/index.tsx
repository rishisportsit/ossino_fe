import { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';

import { getBadges } from 'store/badges/slice';
import { useAppDispatch, useAppSelector } from 'store/index';

import BadgeCard from 'components/shared/BadgeCard';
import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import Slider from 'components/shared/Slider';
import {
  selectBadges,
  selectBadgesError,
  selectBadgesLoading,
} from 'store/badges/selectors';
import BadgeCardSkeleton from '../../../shared/BadgeCardSkeleton';

const Badges = () => {
  const dispatch = useAppDispatch();

  const badges = useAppSelector(selectBadges);
  const badgesError = useAppSelector(selectBadgesError);
  const badgesLoading = useAppSelector(selectBadgesLoading);

  useEffect(() => {
    dispatch(getBadges());
  }, [dispatch]);

  if (badgesError) {
    const { message } = badgesError;

    return (
      <div>
        <span className="mb-3">Badges</span>
        <div className="h-[168px] flex flex-col justify-center">
          <ErrorMessage message={message} />
        </div>
      </div>
    );
  }

  if (badgesLoading) {
    return (
      <Slider label="Badges" className="mt-0">
        {Array.from({ length: 7 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index} className="min-w-[105px] pb-[5px]">
            <BadgeCardSkeleton />
          </SwiperSlide>
        ))}
      </Slider>
    );
  }

  if (!badges || badges.length === 0) {
    return (
      <div>
        <span className="mb-3">Badges</span>
        <div className="h-[168px] flex flex-col justify-center">
          <NoItemsMessage message="No badges found" />
        </div>
      </div>
    );
  }

  return (
    <Slider
      label="Badges"
      count={badges.length}
      showMore
      className="mt-0"
      to="badges"
      withShadow
      navigation
    >
      {badges.map((badge) => (
        <SwiperSlide key={badge.id} className="max-w-[105px]">
          <BadgeCard data={badge} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default Badges;
