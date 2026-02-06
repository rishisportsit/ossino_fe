import { SwiperSlide } from 'swiper/react';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import Slider from 'components/shared/Slider';
import Card from './Card';
import DiscoveryCardSkeleton from 'components/shared/DiscoveryCardSkeleton';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getTrendingGames } from 'store/discoverySearchSports/slice';
import NoItemsMessage from 'components/shared/NoItemsMessage';

const TrendingGamesSlider = () => {
  const accessToken = localStorage.getItem('accessToken') || '';

  const { screenWidth } = useBreakpoint();
  const isDesktop = screenWidth >= BREAKPOINTS.xl;

  const dispatch = useAppDispatch();
  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;

  const trendingGamesData = useAppSelector((state) => state.discoverySearchSports.trendingGames);

  useEffect(() => {
    if ((trendingGamesData?.result?.competitions?.fixtures?.length ?? 0) > 0) return;
    dispatch(getTrendingGames({
      accessToken,
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      isLiveRequired: true,
      offset: 0,
    }));
  }, [dispatch, xApiKey, xClientId, accessToken, trendingGamesData?.result?.competitions?.fixtures?.length]);

  if (trendingGamesData?.loading !== true && !trendingGamesData?.result?.competitions?.fixtures?.length) return null;

  return (
    <Slider
      label="Trending Games"
      withShadow={isDesktop}
      navigation
      spaceBetween={12}
      tooltipText="Trending Games tooltip"
    >

      {trendingGamesData?.loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`} className="!w-auto">
            <DiscoveryCardSkeleton />
          </SwiperSlide>
        ))
      ) : trendingGamesData?.error ? (
        <div className="h-[155px] flex flex-col justify-center">
          <NoItemsMessage
            message="No data found"
          />
        </div>
      ) : !trendingGamesData?.result?.competitions?.fixtures?.length ? (
        <div className="h-[155px] flex flex-col justify-center">
          <NoItemsMessage message="No data found" />
        </div>
      ) : (
        trendingGamesData?.result?.competitions?.fixtures?.map((data) => {
          return (
            <SwiperSlide key={data.providerFixtureId} className="!w-auto">
              <Card data={data} />
            </SwiperSlide>
          );
        })
      )}
    </Slider>
  );
};

export default TrendingGamesSlider;
