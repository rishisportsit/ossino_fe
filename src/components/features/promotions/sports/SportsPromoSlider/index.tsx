import { useAppSelector } from 'store/index';
import { selectMasterType22Banners, selectBannerLoading } from 'store/banner/selectors';
import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';
import 'swiper/css';
import 'swiper/css/pagination';
import MatchOfTheDayCard from '../MatchOfTheDayCard';
import BannerSkeleton from './BannerSkeleton';
import { useDispatch } from 'react-redux';
import { selectMatchOfTheDay } from 'store/SportsHomePage/selectors';
import { useEffect, useMemo } from 'react';
import { getMatchOfTheDay } from 'store/SportsHomePage/slice';
import type { AppDispatch } from 'store/index';
import MatchOfTheDayCardSkeleton from '../MatchOfTheDayCard/MatchOfTheDayCardSkeleton';
import { SportWiseMultiMarkets } from 'helpers/SportWiseMultiMarkets';

const SportsPromoSlider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bannerState = useAppSelector(selectMasterType22Banners);
  const bannerLoading = useAppSelector(selectBannerLoading);
  const matchOfTheDay = useAppSelector(selectMatchOfTheDay);

  useEffect(() => {
    if (!matchOfTheDay?.result) {
      const xApiKey = import.meta.env.VITE_X_Api_Key;
      const xClientId = import.meta.env.VITE_X_Client_Id;
      dispatch(getMatchOfTheDay({
        'X-Client-Id': xClientId,
        'X-Api-Key': xApiKey,
      }));
    }
  }, [dispatch, matchOfTheDay?.result]);

  const fixtures = matchOfTheDay?.result?.competitions?.fixtures || [];
  const matchLoading = matchOfTheDay?.loading;

  const validFixtures = useMemo(() => {
    return fixtures.filter(fixture => {
      const sportConfig = SportWiseMultiMarkets.find((s: any) => s.sportId === fixture?.sportId);
      const uiMarkets = sportConfig?.markets?.marketsSupported || [];
      const mainMarket = uiMarkets[0];
      if (!mainMarket) return false;
      return fixture.markets?.some((m: any) => m.marketTemplateId === mainMarket.marketTemplateId);
    });
  }, [fixtures]);

  return (
    <div className="relative  p-0">
      <Slider
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        grabCursor
        withShadow
        spaceBetween={12}
      >
        {matchLoading ? (
            <SwiperSlide className="!w-full md:!w-auto">
             <div className="w-full md:w-[340px] h-[160px]">
               <MatchOfTheDayCardSkeleton />
             </div>
           </SwiperSlide>
        ) : (
          validFixtures.map((fixture) => (
            <SwiperSlide className="!w-full md:!w-auto" key={fixture.providerFixtureId}>
              <div className="w-full md:w-[340px] h-[160px]">
                <MatchOfTheDayCard fixture={fixture} />
              </div>
            </SwiperSlide>
          ))
        )}
        
        {bannerState.map((banner, idx) => (
          <SwiperSlide className="!w-auto" key={`banner-dynamic-${idx}`}>
             <a href={banner.banner_link || '#'} target="_blank" rel="noopener noreferrer">
                 <div className="w-full md:w-[340px] h-[160px]" dangerouslySetInnerHTML={{ __html: banner.banner_image }}>
            </div>
            </a>
          </SwiperSlide>
        ))}
        {bannerLoading && (
          <>
            <SwiperSlide className="!w-auto">
              <BannerSkeleton />
            </SwiperSlide>
            <SwiperSlide className="!w-auto">
              <BannerSkeleton />
            </SwiperSlide>
            <SwiperSlide className="!w-auto">
              <BannerSkeleton />
            </SwiperSlide>
          </>
        )}
      </Slider>
      <div className="swiper-pagination" />
    </div>
  );
};

export default SportsPromoSlider;