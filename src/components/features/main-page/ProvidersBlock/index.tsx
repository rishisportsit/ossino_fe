import { ROUTES } from 'constants/routes';
import ProvidersCard from 'components/shared/ProvidersCard';
import Slider from 'components/shared/Slider';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { useAppSelector } from 'store/index';
import {
  selectProviders,
  selectProvidersError,
  selectProvidersLoading,
} from 'store/providers/selectors';
import { selectGames } from 'store/games/selectors';
import { SwiperSlide } from 'swiper/react';
import { Skeleton } from 'components/shared/ui/Skeleton';
import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { mapApiIdToProviderCode } from 'store/providers/constants';

const ProvidersBlock = () => {
  const providers = useAppSelector(selectProviders);
  const games = useAppSelector(selectGames);
  
  
  const filteredProviders = providers?.filter((provider) => {
    // Convert provider API ID to provider code (e.g., "Evolution_Gaming" -> "evolution")
    const providerCode = mapApiIdToProviderCode(provider.id);
    
    if (!providerCode) return false;
    
    // Check if any game has this provider code
    const hasGames = games?.some((game) => {
      return game.providers.includes(providerCode);
    });
    
    return hasGames;
  });
  
  
  const providersError = useAppSelector(selectProvidersError);
  const providersLoading = useAppSelector(selectProvidersLoading);

  const { screenWidth } = useBreakpoint();

  const md = screenWidth > BREAKPOINTS.md;

  if (providersError) {
    const { message } = providersError;

    return (
      <div>
        <span className="text-base mb-3">Providers</span>
        <div className="h-[92px] md:h-[108px] flex items-center justify-center">
          <ErrorMessage message={message} />
        </div>
      </div>
    );
  }

  if (providersLoading) {
    return (
      <Slider label="Providers" withShadow>
        {Array.from({ length: 5 }).map((_, index) => (
          <SwiperSlide
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={{ width: md ? '214px' : 'auto' }}
          >
            <Skeleton className="bg-base-600 min-w-[180px] h-20 md:h-24 flex items-center justify-center rounded-[12px] cursor-pointer" />
          </SwiperSlide>
        ))}
      </Slider>
    );
  }

  if (!providers || providers.length === 0) {
    return (
      <div>
        <span className="text-base">Providers</span>
        <div className="h-[92px] md:h-[108px] flex items-center justify-center">
          <NoItemsMessage message="No providers found" />
        </div>
      </div>
    );
  }

  return (
    <Slider
      label="Providers"
      count={filteredProviders?.length ?? 0}
      showMore
      withShadow
      navigation
      to={ROUTES.providers}
    >
      {filteredProviders?.map((provider) => (
        <SwiperSlide key={provider.id} style={{ width: md ? '214px' : 'auto' }}>
          <ProvidersCard provider={provider} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default ProvidersBlock;
