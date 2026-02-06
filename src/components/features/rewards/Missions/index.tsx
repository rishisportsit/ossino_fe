import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import { useAppDispatch, useAppSelector } from 'store/index';
import { getMissions, Mission } from 'store/missions/slice';

import ErrorMessage from 'components/shared/ErrorMessage';
import MissionCard from 'components/shared/MissionCard';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import Slider from 'components/shared/Slider';
import {
  selectMissions,
  selectMissionsError,
  selectMissionsLoading,
} from 'store/missions/selectors';
import MissionCardSkeleton from '../../../shared/MissionCardSkeleton';
import { LoyaltyApi } from 'api/loyalty/loyalty.api';
import DialogCoins from 'components/shared/DialogCoins';

const Missions = () => {
  const dispatch = useAppDispatch();

  const missions = useAppSelector(selectMissions);
  const missionsError = useAppSelector(selectMissionsError);
  const missionsLoading = useAppSelector(selectMissionsLoading);

  const [selectedReward, setSelectedReward] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getMissions());
  }, [dispatch]);

  const handleMissionClick = async (mission: Mission) => {
    const response = await LoyaltyApi.claimPromotion(mission.promotionId);
    if (response && response.data && response.data.code == 1000) {
      setSelectedReward(mission.prizeAmount);
      dispatch(getMissions());
    }
  };
  if (missionsError) {
    const { message } = missionsError;

    return (
      <div>
        <span className="mb-3">Missions</span>
        <div className="h-[303px] xl:h-[311px] flex flex-col justify-center">
          <ErrorMessage message={message} />
        </div>
      </div>
    );
  }

  if (missionsLoading) {
    return (
      <Slider label="Missions" className="mt-0">
        {Array.from({ length: 4 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index} className="min-w-[140px] xl:min-w-[148px]">
            <MissionCardSkeleton />
          </SwiperSlide>
        ))}
      </Slider>
    );
  }

  if (!missions || missions.length === 0) {
    return (
      <div>
        <span className="mb-3">Missions</span>
        <div className="h-[303px] xl:h-[311px] flex flex-col justify-center">
          <NoItemsMessage message="No missions found" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Slider
        label="Missions"
        count={missions.length}
        showMore
        className="mt-0"
        to="missions"
        withShadow
        navigation
      >
        {missions.map((mission) => (
          <SwiperSlide
            key={mission.promotionId}
            className="max-w-[140px] xl:max-w-[148px]"
          >
            <MissionCard
              data={mission}
              withIcon={false}
              onClick={() => handleMissionClick(mission)}
            />
          </SwiperSlide>
        ))}
      </Slider>
      <DialogCoins
        value={selectedReward}
        onClose={() => setSelectedReward(null)}
        description="Your account has been credited with"
        currency="coins"
      />
    </>
  );
};

export default Missions;
