import { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';

import { useAppDispatch, useAppSelector } from 'store/index';
import { getRedemptions, Redemption } from 'store/redemptions/slice';

import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import RedemptionCard from 'components/shared/RedemptionCard';
import Slider from 'components/shared/Slider';
import {
  selectRedemptions,
  selectRedemptionsError,
  selectRedemptionsLoading,
} from 'store/redemptions/selectors';
import RedemptionCardSkeleton from '../RedemptionCardSkeleton';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useDialog } from 'helpers/hooks';

const RedemptionsSlider = () => {
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();
  const redemptions = useAppSelector(selectRedemptions);
  const redemptionsError = useAppSelector(selectRedemptionsError);
  const redemptionsLoading = useAppSelector(selectRedemptionsLoading);
  const handleRedemptionClick = (redemption: Redemption) => {
    openDialog(DIALOG_TYPE.redemption, { data: redemption });
  };

  useEffect(() => {
    dispatch(getRedemptions());
  }, [dispatch]);

  if (redemptionsError) {
    const { message } = redemptionsError;

    return (
      <div>
        <span className="mb-3">Redemption</span>
        <div className="h-[262px] flex flex-col justify-center">
          <ErrorMessage message={message} />
        </div>
      </div>
    );
  }

  if (redemptionsLoading) {
    return (
      <Slider label="Redemption" className="mt-0" to="redemption">
        {Array.from({ length: 4 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index} className="min-w-[140px]">
            <RedemptionCardSkeleton />
          </SwiperSlide>
        ))}
      </Slider>
    );
  }

  if (!redemptions || redemptions.length === 0) {
    return (
      <div>
        <span className="mb-3">Redemption</span>
        <div className="h-[262px] flex flex-col justify-center">
          <NoItemsMessage message="No redemptions found" />
        </div>
      </div>
    );
  }

  return (
    <Slider
      label="Redemption"
      count={redemptions.length}
      showMore
      className="mt-0"
      to="/loyalty/rewards/redemption"
      withShadow
      navigation
    >
      {redemptions.map((redemption) => (
        <SwiperSlide key={redemption.id} className="max-w-[140px]">
          <RedemptionCard
            data={redemption}
            onClick={() => handleRedemptionClick(redemption)}
          />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default RedemptionsSlider;
