import { SwiperSlide } from 'swiper/react';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import Slider from 'components/shared/Slider';
import Card from './Card';
import DiscoveryCardSkeleton from 'components/shared/DiscoveryCardSkeleton';
import { useAppDispatch, useAppSelector } from 'store/index';
import { useEffect, useState } from 'react';
import { getOverClubs } from 'store/discoverySearchSports/slice';
import { handleSelectionsGlobal } from 'helpers/betConfigHelpers';
import NoItemsMessage from 'components/shared/NoItemsMessage';

const OversClubSlider = () => {
  const accessToken = localStorage.getItem('accessToken') || '';

  const { screenWidth } = useBreakpoint();
  const isDesktop = screenWidth >= BREAKPOINTS.xl;

  const dispatch = useAppDispatch();
  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;

  const [addingSelections, setAddingSelections] = useState<any[]>(() => {
    const storedSelections = localStorage.getItem("betSlipData");
    return storedSelections ? JSON.parse(storedSelections) : [];
  });

  useEffect(() => {
    localStorage.setItem("betSlipData", JSON.stringify(addingSelections));
    window.dispatchEvent(new CustomEvent("betSlip_updated"));

    const handleBetSlipRemoveUpdate = () => {
      const storedSelections = localStorage.getItem("betSlipData");
      setAddingSelections(storedSelections ? JSON.parse(storedSelections) : []);
    };

    window.addEventListener("betSlip_removing_updated", handleBetSlipRemoveUpdate);
    return () => {
      window.removeEventListener("betSlip_removing_updated", handleBetSlipRemoveUpdate);
    };
  }, [addingSelections]);

  useEffect(() => {
    const handleBetSlipUpdate = () => {
      const storedSelections = localStorage.getItem("betSlipData");
      const currentSelections = storedSelections ? JSON.parse(storedSelections) : [];

      if (JSON.stringify(currentSelections) !== JSON.stringify(addingSelections)) {
        setAddingSelections(currentSelections);
      }
    };

    window.addEventListener("betSlip_updated", handleBetSlipUpdate);
    return () => {
      window.removeEventListener("betSlip_updated", handleBetSlipUpdate);
    };
  }, [addingSelections]);

  const handleSelections = (selection: any, match: any, marketId?: string | number) => {
    handleSelectionsGlobal(setAddingSelections, selection, match, marketId);
  };

  const oversClubData = useAppSelector((state) => state.discoverySearchSports.oversClub);

  useEffect(() => {
    if ((oversClubData?.result?.competitions?.fixtures?.length ?? 0) > 0) return;
    dispatch(getOverClubs({
      accessToken,
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      sportIds: 1,
      matchStatus: "All",
      dataFilterOrder: "Time",
    }));
  }, [dispatch, xApiKey, xClientId, accessToken, oversClubData?.result?.competitions?.fixtures?.length]);

  if (oversClubData?.loading !== true && !oversClubData?.result?.competitions?.fixtures?.length) return null;

  return (
    <Slider
      label="Overs Club"
      navigation
      withShadow={isDesktop}
      spaceBetween={12}
      tooltipText="Overs Club tooltip"
    >
      {oversClubData?.loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`} className="!w-auto">
            <DiscoveryCardSkeleton />
          </SwiperSlide>
        ))
      ) : oversClubData?.error ? (
        <div className="h-[155px] flex flex-col justify-center">
          <NoItemsMessage
            message="No data found"
          />
        </div>
      ) : !oversClubData?.result?.competitions?.fixtures?.length ? (
        <div className="h-[155px] flex flex-col justify-center">
          <NoItemsMessage message="No data found" />
        </div>
      ) : (
        oversClubData?.result?.competitions?.fixtures?.map((data: any) => {
          return (
            <SwiperSlide key={data.providerFixtureId} className="!w-auto">
              <Card
                data={data}
                handleSelections={handleSelections}
                addingSelections={addingSelections}
              />
            </SwiperSlide>
          );
        })
      )}
    </Slider>
  );
};

export default OversClubSlider;
