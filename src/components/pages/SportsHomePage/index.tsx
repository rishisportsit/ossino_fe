import SportsPromoSlider from 'components/features/promotions/sports/SportsPromoSlider';
import TopMatchesSection from 'components/features/sports/TopMatchesSection';
import HotMultisSection from 'components/features/sports/HotMultisSection';
import PlayerPropsSection from 'components/shared/PlayerPropsSection';
import TopLeaguesSection from 'components/features/sports/TopLeaguesSection';
import MatchesSection from 'components/features/sports/MatchesSection';
import FeaturedGamesBlock from 'components/shared/FeaturedGamesBlock';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectTopGames, selectTopGamesLoading } from 'store/playerInsights/selectors';
import { getTopLossesGames } from 'store/playerInsights/slice';
import { selectGames } from 'store/games/selectors';
import { selectIsLoggedIn } from 'store/user/selectors';
import BetslipSection from 'components/features/sports/BetslipSection';
import MobileBetslip from 'components/features/sports/BetslipSection/MobileBetslip';
import TopWinningsSection from 'components/features/sports/TopWinningsSection';
import { useEffect, useMemo, useRef } from 'react';
import StandingsSection from 'components/features/sports/StandingsSection';
import NewsSection from 'components/features/sports/NewsSection';
import './styles.css';
import PromoBlock from 'components/features/main-page/PromoBlock';
import { mapTopGames } from 'helpers/mapTopGames';
import { useBetConfig } from '../../../hooks/useBetConfig';
import { useBetSlipData } from '../../../hooks/useBetSlipData';
import LoadingSpinner from 'components/shared/ui/LoadingSpinner';
import { selectBetHistoryInSportsBook } from 'store/SportsHomePage/selectors';
import { getBetHistoryInSportsBook } from 'store/SportsHomePage/slice';
import { STORAGE_KEYS } from 'constants/storage';
import { getChannelType } from 'helpers/common';

const SportsHomePage = () => {
  const { betSlipCount } = useBetSlipData();
  const originalBetHistory = useAppSelector(selectBetHistoryInSportsBook);

  useBetConfig();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const topGamesData = useAppSelector(selectTopGames);
  const topGamesLoading = useAppSelector(selectTopGamesLoading);
  const allGames = useAppSelector(selectGames);
  const apiCalledRef = useRef(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (apiCalledRef.current) return;
    if (!topGamesData || topGamesData.length === 0) {
      dispatch(getTopLossesGames());
      apiCalledRef.current = true;
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const accessToken = localStorage.getItem(STORAGE_KEYS?.accessToken) || '';
    const xClientId = import.meta.env.VITE_X_Client_Id;
    const channelType = getChannelType();
    dispatch(
      getBetHistoryInSportsBook({
        'X-Client-Id': xClientId,
        accessToken,
        channel: channelType,
        settled: false,
      })
    );
  }, [dispatch, isLoggedIn]);

  const topGames = useMemo(() => mapTopGames(topGamesData, allGames), [topGamesData, allGames]);
  return (
    <div className="p-4 body-txtColor-1 pt-[76px] md:pt-0">
      <SportsPromoSlider />
      <div className="mt-8 lg:bg-secondary rounded-xl lg:px-5 lg:pl-5 lg:pr-5 py-5 mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row w-full min-w-0">
          <div className="flex-1 w-full xl:flex-1 flex flex-col gap-8 min-w-0">
            <TopMatchesSection />
            <HotMultisSection />
            {/* <PlayerPropsSection
              label="Player Props"
              showMore
              to="/sports/player-props"
              showMoreComponent="link"
              // withCount
              withShadow
              sportShadow
            /> */}
            <TopLeaguesSection />
            <MatchesSection />
            <PromoBlock category="sports" />
            {isLoggedIn && (
              <div className="pb-8">
                {topGamesLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <LoadingSpinner></LoadingSpinner>
                  </div>
                ) : (
                  topGames.length > 0 && (
                    <FeaturedGamesBlock
                      games={topGames}
                      label="Top Games"
                      headerClassName="pr-0"
                      withShadow
                      sportShadow
                    />
                  )
                )}
              </div>
            )}
          </div>
          <div className="hidden lg:block w-px bg-borderdefault mx-6"></div>
          <div className="w-full lg:w-[290px] lg:flex-shrink-0 flex flex-col gap-6">
            <BetslipSection betcount={betSlipCount} myBetsCount={originalBetHistory?.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
              <TopWinningsSection />
              <StandingsSection />
            </div>

            <NewsSection />
          </div>
        </div>
      </div>

      {/* Mobile Betslip Button and Panels */}
      <MobileBetslip betCount={betSlipCount} />
    </div>
  );
};

export default SportsHomePage;
