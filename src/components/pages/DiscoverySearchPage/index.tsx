import FollowOrFadeSlider from 'components/features/discovery-search/FollowOrFadeSlider';
import HotDogsSlider from 'components/features/discovery-search/HotDogsSlider';
import OversClubSlider from 'components/features/discovery-search/OversClubSlider';
import PopularParlaysSlider from 'components/features/discovery-search/PopularParlaysSlider';
import DiscoverySearch from 'components/features/discovery-search/Search';
import TrendingGamesSlider from 'components/features/discovery-search/TrendingGames';
import BetslipSection from 'components/features/sports/BetslipSection';
import MobileBetslip from 'components/features/sports/BetslipSection/MobileBetslip';
import NewsSection from 'components/features/sports/NewsSection';
import StandingsSection from 'components/features/sports/StandingsSection';
import TopWinningsSection from 'components/features/sports/TopWinningsSection';
import PageHeader from 'components/shared/PageHeader';
import PlayerPropsSection from 'components/shared/PlayerPropsSection';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { useBetSlipData } from 'hooks/useBetSlipData';
import { useAppSelector } from 'store/index';
import { selectBetHistoryInSportsBook } from 'store/SportsHomePage/selectors';

const DiscoverySearchPage = () => {
  const { screenWidth } = useBreakpoint();
  const isDesktop = screenWidth >= BREAKPOINTS.xl;

  const originalBetHistory = useAppSelector(selectBetHistoryInSportsBook);
  const { betSlipCount } = useBetSlipData();

  return (
    <div className="pt-[76px] pb-4 md:pt-0 xl:px-5">
      <PageHeader to="/sports" className="px-4 xl:px-0" />
      <div className="xl:bg-base-800 xl:p-5 xl:rounded-xl xl:flex">
        <div className="flex flex-col gap-8 xl:flex-1 overflow-auto">
          <DiscoverySearch />
          <div className="pl-4 flex flex-col gap-8 md:hidden">
            <PopularParlaysSlider />
            {/* <PlayerPropsSection
              label="Top Player Props"
              tooltipText="Top Player Props tooltip"
            /> */}
            <OversClubSlider />
            <FollowOrFadeSlider />
            <HotDogsSlider />
            <TrendingGamesSlider />
          </div>
          <div className="pl-4 xl:pl-0 flex-col hidden md:flex md:flex-col md:gap-8">
            <PopularParlaysSlider />
            {/* <PlayerPropsSection
              label="Top Player Props"
              withShadow={isDesktop}
              tooltipText="Top Player Props tooltip"
            /> */}
            <OversClubSlider />
            <FollowOrFadeSlider />
            <HotDogsSlider />
            <TrendingGamesSlider />
          </div>
        </div>
        <div className="hidden lg:block w-px bg-borderdefault mx-5" />
        <div className="hidden xl:w-[290px] xl:flex xl:flex-col xl:gap-6">
          <BetslipSection withControl={false} betcount={betSlipCount} myBetsCount={originalBetHistory?.length} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
            <TopWinningsSection />
            <StandingsSection />
          </div>

          <NewsSection />
        </div>
      </div>
      {/* Mobile Betslip Button and Panels */}
      <MobileBetslip betCount={betSlipCount} />
    </div>
  );
};

export default DiscoverySearchPage;
