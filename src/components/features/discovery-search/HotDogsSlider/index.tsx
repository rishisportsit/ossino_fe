import { SwiperSlide } from 'swiper/react';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import Slider from 'components/shared/Slider';
import Card from './Card';
import { useEffect, useState } from 'react';
import { getHotDogs } from 'store/discoverySearchSports/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { handleSelectionsGlobal } from 'helpers/betConfigHelpers';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import DiscoveryCardSkeleton from 'components/shared/DiscoveryCardSkeleton';

const HotDogsSlider = () => {
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

  const hotDogsData = useAppSelector((state) => state.discoverySearchSports.hotDogs);

  useEffect(() => {
    if ((hotDogsData?.result?.competitions?.fixtures?.length ?? 0) > 0) return;
    dispatch(getHotDogs({
      accessToken,
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      sportIds: 1,
      matchStatus: "All",
      dataFilterOrder: "Time",
    }));
  }, [dispatch, xApiKey, xClientId, accessToken, hotDogsData?.result?.competitions?.fixtures?.length]);

  if (hotDogsData?.loading !== true && !hotDogsData?.result?.competitions?.fixtures?.length) return null;

  return (
    <Slider
      label="Hot dogs"
      navigation
      withShadow={isDesktop}
      spaceBetween={12}
      tooltipText="Our most bet underdogs to win straight up."
    >
      {hotDogsData?.loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`} className="!w-auto">
            <DiscoveryCardSkeleton />
          </SwiperSlide>
        ))
      ) : hotDogsData?.error ? (
        <div className="h-[155px] flex flex-col justify-center">
          <NoItemsMessage
            message="No data found"
          />
        </div>
      ) : !hotDogsData?.result?.competitions?.fixtures?.length ? (
        <div className="h-[155px] flex flex-col justify-center">
          <NoItemsMessage message="No data found" />
        </div>
      ) : (
        hotDogsData?.result?.competitions?.fixtures?.map((data: any) => {
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

export default HotDogsSlider;
