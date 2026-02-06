import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';
import MultiCard from 'components/features/sports/HotMultisSection/MultiCard/index';
import MultiCardSkeleton from './MultiCardSkeleton';
import 'swiper/css';
import 'swiper/css/pagination';
import { useAppDispatch, useAppSelector } from 'store/index';
import { useEffect } from 'react';
import { getHotMultis } from 'store/SportsHomePage/slice';
import { SPORTS_ID, STORAGE_KEYS } from 'constants/storage';
import { selectHotMultisData } from 'store/SportsHomePage/selectors';
import { selectIsLoggedIn } from 'store/user/selectors';
import { selectWalletState } from 'store/wallet/selectors';
import { selectCurrencyData } from 'store/currency/selectors';
import { useBetConfig } from 'hooks/useBetConfig';
import { ConvertCurrenciesToUSD } from 'helpers/usdConversion';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { useFixtureSignalRGroups } from 'hooks/useSignalRGroups';
import { LOCKED_ODDS_THRESHOLD } from 'constants/odds';

const HotMultisSection = () => {

  const dispatch = useAppDispatch();
  const hotMultisData = useAppSelector(selectHotMultisData) || [];
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { selectedCurrency, usdToggleEnabled } = useAppSelector(selectWalletState);
  const conversionData = useAppSelector(selectCurrencyData);
  const { getBonusPercentage, getOddsThreshold,getWhattaxPercentages } = useBetConfig();

  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;
  const accessToken = localStorage.getItem(STORAGE_KEYS?.accessToken) || '';
  const eventIds = Array.from(new Set(
    hotMultisData?.data?.list?.flatMap(multi => 
      multi.accumulatorSelections?.map(selection => selection.eventId)?.filter(Boolean) || []
    ) || []
  ));
  useFixtureSignalRGroups(eventIds);

  useEffect(() => {
    if ((hotMultisData?.data?.list?.length ?? 0) > 0) return;
    dispatch(getHotMultis({
      sportId: SPORTS_ID.sportId,
      accumulatorsType: 'allData',
      accessToken,
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': "en"
    }));
  }, [dispatch, xApiKey, xClientId, accessToken, hotMultisData?.data?.list?.length]);

  

  if (hotMultisData?.loading !== true && !hotMultisData?.data?.list?.length) return null;
  const allCombisHaveInactive = hotMultisData?.data?.list?.length > 0 &&
    hotMultisData.data.list.every((multi: any) =>
      multi.accumulatorSelections?.some((selection: any) => selection.selectionStatus?.toLowerCase() !== "active")
    );
  if (allCombisHaveInactive) return null;
  return (
    <Slider
      label="Hot Multis"
      navigation
      withShadow
      sportShadow
      spaceBetween={12}
      loop={true}
    >
      {hotMultisData?.loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`} className="!w-auto">
            <MultiCardSkeleton />
          </SwiperSlide>
        ))
      ) : hotMultisData?.error ? (
        <div className="h-[272px] flex flex-col justify-center">
          <NoItemsMessage
            message="No data found"
          />
        </div>
      ) : !hotMultisData?.data?.list?.length ? (
        <div className="h-[272px] flex flex-col justify-center">
          <NoItemsMessage message="No data found" />
        </div>
      ) : (
        hotMultisData?.data?.list
          ?.filter((multi) => {
            return multi.accumulatorSelections?.every((selection: any) => {
              const isSelectionActive = selection.selectionStatus.toLowerCase() === "active";
              const isOddsValid = Number(selection.odds) > LOCKED_ODDS_THRESHOLD;
              return isSelectionActive && isOddsValid;
            });
          })
          ?.map((multi) => {
            const selectionCount = multi.accumulatorSelections?.length || 0;
            const odds = multi.accumulatorSelections?.map(selection => selection.odds) || [];
            const bonusPercentage = getBonusPercentage(selectionCount, odds);
            const oddsthreshold = getOddsThreshold();
            const {  winningsTaxPercentage } = getWhattaxPercentages();
            let minStakeLimit = multi.minStake;
            let maxStakeLimit = multi.maxStake;
            let maxPayout = multi.liabilityLimit;

            if (isLoggedIn && !usdToggleEnabled && conversionData && selectedCurrency) {
              const convertedMin = ConvertCurrenciesToUSD(
                selectedCurrency.currencyCode,
                conversionData,
                multi.minStake
              );
              const convertedMax = ConvertCurrenciesToUSD(
                selectedCurrency.currencyCode,
                conversionData,
                multi.maxStake
              );
              const convertedMaxPayout = ConvertCurrenciesToUSD(
                selectedCurrency.currencyCode,
                conversionData,
                multi.liabilityLimit
              );
              minStakeLimit = convertedMin || multi.minStake;
              maxStakeLimit = convertedMax || multi.maxStake;
              maxPayout = convertedMaxPayout || multi.liabilityLimit;
            }

            const convertedStakeLimits = {
              minStake: minStakeLimit,
              maxStake: maxStakeLimit,
              maxPayout: maxPayout
            };

            return (
              <SwiperSlide key={multi.id} className="!w-auto">
                <MultiCard
                  {...multi}
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

export default HotMultisSection;
