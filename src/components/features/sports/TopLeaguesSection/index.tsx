import { useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';
import LeagueCard from 'components/features/sports/TopLeaguesSection/LeagueCard/index';
import 'swiper/css';
import 'swiper/css/pagination';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getTopLeagues } from 'store/SportsHomePage/slice';
import { selectTopLeaguesData } from 'store/SportsHomePage/selectors';
import { LeagueItem } from 'api/SportsHomePage/sportsHomePage.types';
import { SPORTS_ID, STORAGE_KEYS } from 'constants/storage';
import NoItemsMessage from 'components/shared/NoItemsMessage';

export interface SidebarClassConfig {
  padding: string;
}
const isSideBarClass: SidebarClassConfig = {
  padding: 'p-2'
}

const TopLeaguesSection = () => {
  const dispatch = useAppDispatch();
  const topLeaguesState = useAppSelector(selectTopLeaguesData);
  const topMatchesData = topLeaguesState?.result || [];
  const isLoading = topLeaguesState?.loading || false;

  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;
  const accessToken = localStorage.getItem(STORAGE_KEYS?.accessToken) || '';

  useEffect(() => {
    if ((topMatchesData?.length ?? 0) > 0) return;
    dispatch(getTopLeagues({
      sportId: SPORTS_ID.sportId,
      accessToken,
      minutes: 43200,
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      isNextBetRequired: false,
    }));
  }, [dispatch, xApiKey, xClientId, accessToken, topMatchesData?.length]);

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-base-300"></div>
    </div>
  );

  if (isLoading !== true && !topMatchesData?.length) return null;

  return (
    <Slider
      label="Top Leagues"
      // count={topMatchesData?.length}
      navigation
      withShadow
      sportShadow
      spaceBetween={8}
      loop={true}
      headerClassName="pr-0 lg:pr-4"
    >

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        topMatchesData?.length !== 0 ? (
          topMatchesData?.map((league: LeagueItem, index: any) => (
            <SwiperSlide key={index} className="!w-auto">
              <LeagueCard league={league} isSideBarClass={isSideBarClass} />
            </SwiperSlide>
          ))
        ) : (
          <div className="flex flex-col justify-center">
            <NoItemsMessage message="No data found" />
          </div>
        )
      )}
    </Slider>
  );
};

export default TopLeaguesSection;
