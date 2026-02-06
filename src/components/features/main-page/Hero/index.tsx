import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { cn } from 'helpers/ui';
import { useEffect, useState } from 'react';
import {
  selectBannerError,
  selectBannerLoading,
  selectBanners,
} from 'store/banner/selectors';
import { fetchBanner } from 'store/banner/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import BannersSlider from '../BannersSlider/BannersSlider';
import { useNavigate } from 'react-router-dom';
import HeroSkeleton from '../HeroSkeleton';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';

const Hero = () => {
  // ALL HOOKS MUST BE CALLED FIRST - NO EARLY RETURNS BEFORE THIS POINT
  const dispatch = useAppDispatch();
  const { screenWidth } = useBreakpoint();
  const navigate = useNavigate();

  const bannerList = useAppSelector(selectBanners);
  const bannersError = useAppSelector(selectBannerError);
  const bannersLoading = useAppSelector(selectBannerLoading);

  const [selectedBannerImage, setSelectedBannerImage] = useState(
    bannerList[0]?.image,
  );

  const isSmallScreen = screenWidth < BREAKPOINTS.md;

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  useEffect(() => {
    if (bannerList.length > 0) {
      setSelectedBannerImage(bannerList[0]?.image);
    }
  }, [bannerList]);

  // Get the appropriate image URL based on screen size
  const getCurrentBannerImage = () => {
    const selectedBanner = bannerList.find(
      (banner) => banner.image === selectedBannerImage,
    );
    if (!selectedBanner) return selectedBannerImage;

    // Use mobile image if on small screen and mobile image is available
    if (isSmallScreen && selectedBanner.mobileImage) {
      return selectedBanner.mobileImage;
    }

    return selectedBanner.image;
  };

  const handleBannerClick = () => {
    const selectedBannerObj = bannerList.find(b => b.image === selectedBannerImage);
    if (selectedBannerObj && selectedBannerObj.link) {
      if (selectedBannerObj.link.startsWith('http')) {
        window.location.href = selectedBannerObj.link;
      } else {
        navigate(selectedBannerObj.link);
      }
    }
  };

  // NOW WE CAN DO CONDITIONAL RENDERING AFTER ALL HOOKS ARE CALLED
  if (bannersError) {
    const { message } = bannersError;

    return (
      <div
        className={cn(
          'relative mt-5 box-border max-w-full rounded-xl md:min-h-[375px] xl:min-h-[414px] text-center overflow-hidden w-screen',
        )}
      >
        <div className="flex flex-col bg-base-800 justify-center min-h-[360px] xl:min-h-[400px] rounded-xl">
          <ErrorMessage message={message} />
        </div>
      </div>
    );
  }

  if (bannersLoading && bannerList.length === 0) {
    return <HeroSkeleton />;
  }

  if (bannerList.length === 0) {
    return (
      <div
        className={cn(
          'relative mt-5 box-border max-w-full rounded-xl md:min-h-[375px] xl:min-h-[414px] text-center overflow-hidden w-screen',
        )}
      >
        <div className="flex flex-col bg-base-800 justify-center min-h-[360px] xl:min-h-[400px] rounded-xl">
          <NoItemsMessage message="No banners available" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative mt-5 box-border max-w-full rounded-xl overflow-hidden w-screen',
      )}
    >
      <div className="relative flex flex-col justify-end bg-no-repeat rounded-xl">
        <img
          src={getCurrentBannerImage()}
          alt="Hero banner"
          className="w-full h-auto object-cover rounded-xl cursor-pointer"
          onClick={handleBannerClick}
        />
        <div className="absolute bottom-0 left-0 right-0 mb-[10px] -mr-3 md:ml-1 md:m-3 md:-mr-4 leading-none">
          <BannersSlider
            selectedBannerImage={selectedBannerImage}
            banners={bannerList}
            onBannerClick={setSelectedBannerImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;