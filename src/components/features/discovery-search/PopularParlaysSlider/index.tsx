import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';
import Card from './Card';
import PopularParlayCardSkeleton from './PopularParlayCardSkeleton';
import { useAppDispatch, useAppSelector } from 'store/index';
import { useEffect } from 'react';
import { getPopularParlays } from 'store/discoverySearchSports/slice';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { selectIsLoggedIn } from 'store/user/selectors';
import { selectWalletState } from 'store/wallet/selectors';
import { selectCurrencyData } from 'store/currency/selectors';
import { useBetConfig } from 'hooks/useBetConfig';
import { ConvertCurrenciesToUSD } from 'helpers/usdConversion';
import { LOCKED_ODDS_THRESHOLD } from 'constants/odds';
import { useFixtureSignalRGroups } from 'hooks/useSignalRGroups';

const PopularParlaysSlider = () => {
  const dispatch = useAppDispatch();
  const popularParlaysData = useAppSelector((state) => state.discoverySearchSports.popularParlays);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { selectedCurrency, usdToggleEnabled } = useAppSelector(selectWalletState);
  const conversionData = useAppSelector(selectCurrencyData);
  const { getBonusPercentage, getOddsThreshold, getWhattaxPercentages } = useBetConfig();
  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;
  const accessToken = localStorage.getItem('accessToken') || '';

  const eventIds = Array.from(new Set(
    popularParlaysData?.result?.data?.flatMap(parlay => 
      parlay.accumulatorSelections?.map(selection => selection.eventId)?.filter(Boolean) || []
    ) || []
  ));
  useFixtureSignalRGroups(eventIds);

  useEffect(() => {
    if ((popularParlaysData?.result?.data?.length ?? 0) > 0) return;
    dispatch(getPopularParlays({
      accessToken,
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
    }));
  }, [dispatch, xApiKey, xClientId, accessToken, popularParlaysData?.result?.data?.length]);

  if (popularParlaysData?.loading !== true && !popularParlaysData?.result?.data?.length) return null;

  return (
    <Slider
      label="Popular Parlays"
      navigation
      spaceBetween={12}
      tooltipText="Popular Parlays tooltip"
    >
      {popularParlaysData?.loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`} className="!w-auto">
            <PopularParlayCardSkeleton />
          </SwiperSlide>
        ))
      ) : popularParlaysData?.error ? (
        <div className="h-[155px] flex flex-col justify-center">
          <NoItemsMessage
            message="No data found"
          />
        </div>
      ) : !popularParlaysData?.result?.data?.length ? (
        <div className="h-[155px] flex flex-col justify-center">
          <NoItemsMessage message="No data found" />
        </div>
      ) : (
        popularParlaysData?.result?.data
          ?.filter((parlay) => {
            return parlay.accumulatorSelections?.every((selection: any) => {
              const isOddsValid = Number(selection.odds) > LOCKED_ODDS_THRESHOLD;
              return isOddsValid;
            });
          })
          ?.map((parlay, index) => {
            const selectionCount = parlay.accumulatorSelections?.length || 0;
            const odds = parlay.accumulatorSelections?.map(selection => selection.odds) || [];
            const bonusPercentage = getBonusPercentage(selectionCount, odds);
            const oddsthreshold = getOddsThreshold();
            const { winningsTaxPercentage } = getWhattaxPercentages();
            let minStakeLimit = parlay.minStake;
            let maxStakeLimit = parlay.maxStake;
            let maxPayout = parlay.maxStake * 100;

            if (isLoggedIn && !usdToggleEnabled && conversionData && selectedCurrency) {
              const convertedMin = ConvertCurrenciesToUSD(
                selectedCurrency.currencyCode,
                conversionData,
                parlay.minStake
              );
              const convertedMax = ConvertCurrenciesToUSD(
                selectedCurrency.currencyCode,
                conversionData,
                parlay.maxStake
              );
              
              const convertedMaxPayout = ConvertCurrenciesToUSD(
                selectedCurrency.currencyCode,
                conversionData,
                maxPayout
              );
              minStakeLimit = convertedMin || parlay.minStake;
              maxStakeLimit = convertedMax || parlay.maxStake;
              maxPayout = convertedMaxPayout || maxPayout;
            }

            const convertedStakeLimits = {
              minStake: minStakeLimit,
              maxStake: maxStakeLimit,
              maxPayout: maxPayout
            };
            return (
              <SwiperSlide key={parlay.client + index} className="!w-auto">
                <Card 
                  {...parlay}
                  isLoggedIn={isLoggedIn}
                  usdToggleEnabled={usdToggleEnabled}
                  selectedCurrency={selectedCurrency?.currencyCode}
                  convertedStakeLimits={convertedStakeLimits}
                  bonusPercentage={bonusPercentage}
                  oddsthreshold={oddsthreshold}
                  whattax={winningsTaxPercentage}
                />
              </SwiperSlide>
            );
          })
      )}
    </Slider>
  );
};

export default PopularParlaysSlider;
