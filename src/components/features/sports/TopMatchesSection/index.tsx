import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../store';
import { selectPopularHighlightsData } from 'store/SportsHomePage/selectors';
import { getPopularHighlights } from 'store/SportsHomePage/slice';
import { SwiperSlide } from 'swiper/react';
import Slider from 'components/shared/Slider';
import MatchCard from 'components/features/sports/TopMatchesSection/MatchCard';
import MatchCardSkeleton from './MatchCardSkeleton';
import { getIcons, getTimefromMatch } from 'helpers/common';
import { handleSelectionsGlobal } from 'helpers/betConfigHelpers';
import 'swiper/css';
import 'swiper/css/pagination';
import { TOP_MATCH_SECTION_MARKET_TEMPLATE_ID } from 'constants/odds';


const TopMatchesSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const popularHighlights = useSelector(selectPopularHighlightsData);
  const xApiKey = import.meta.env.VITE_X_Api_Key;
  const xClientId = import.meta.env.VITE_X_Client_Id;

  const [addingSelections, setAddingSelections] = useState<any[]>(() => {
    const storedSelections = localStorage.getItem("betSlipData");
    return storedSelections ? JSON.parse(storedSelections) : [];
  });

  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    if ((popularHighlights?.result?.competitions?.fixtures?.length ?? 0) > 0) return;
    dispatch(getPopularHighlights({
      'X-Client-Id': xClientId,
      'X-Api-Key': xApiKey,
      'X-Language-Code': 'en',
      isNextBetRequired: false,
      isSelectedFromHeader: false,
      sports: [{ markets: `1`, sportId: 1, },],
    }));
  }, [dispatch, xApiKey, xClientId, popularHighlights?.result?.competitions?.fixtures?.length]);

  if (!popularHighlights || !popularHighlights.result) {
    return (
      <Slider
        label="Top Matches"
        navigation
        withShadow
        sportShadow
        spaceBetween={12}
        loop
        headerClassName="pr-0 lg:pr-4"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`} className="!w-auto">
            <MatchCardSkeleton />
          </SwiperSlide>
        ))}
      </Slider>
    );
  }

  const fixtures = (popularHighlights?.result?.competitions?.fixtures || [])
    .filter(fixture => fixture?.isDefault === false)
    .map(fixture => {
      const market = fixture.markets?.find(m => m.marketTemplateId === TOP_MATCH_SECTION_MARKET_TEMPLATE_ID);
      return market ? { ...fixture, markets: [market] } : undefined;
    })
    .filter((fixture): fixture is NonNullable<typeof fixture> => Boolean(fixture));

  if (!fixtures?.length) return null;

  return (
    <div>
      {fixtures.length === 0 ? (
        <Slider
          label="Top Matches"
          navigation
          withShadow
          sportShadow
          spaceBetween={0}
          loop
          headerClassName="pr-0 lg:pr-4"
        >
          <div className="h-[272px] flex flex-col justify-center">
            <div className="flex flex-col items-center">
              <svg className="w-16 h-16 mb-4">
                <use className="w-16 h-16 mb-4 icon-placeholder" href="/icons/documentCopy.svg#documentCopyIcon"></use>
              </svg>
              <p className="test-sm text-base-400">No data found</p>
            </div>
          </div>
        </Slider>
      ) : (
        <Slider
          label="Top Matches"
          // count={fixtures.length}
          navigation
          withShadow
          sportShadow
          spaceBetween={12}
          loop
          headerClassName="pr-0 lg:pr-4"
          pagination={!(isMobile && fixtures.length === 1)}
        >
          {fixtures.map((fixture, index) => {
            const market = fixture.markets?.[0];
            const homeWin = market?.selections?.find((s: any) => s.selectionName === fixture?.homeName);
            const draw = market?.selections?.find((s: any) => s.selectionName?.toLowerCase().includes('draw'));
            const awayWin = market?.selections?.find((s: any) => s.selectionName === fixture?.awayName);
            const matchCardProps = {
              league: {
                name: fixture.leagueName,
                flag: `SB-flag ${String(fixture.segmentName).slice(0, 2).toLowerCase()}`,
                logo: getIcons('leagueName', fixture.leagueName),
              },
              homeTeam: {
                name: fixture.homeName,
                logo: getIcons('homeName', fixture.homeName),
              },
              awayTeam: {
                name: fixture.awayName,
                logo: getIcons('awayName', fixture.awayName),
              },
              matchTime: fixture.fixtureStartDate ? new Date(fixture.fixtureStartDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '',
              matchDate: fixture.fixtureStartDate ? getTimefromMatch(fixture.fixtureStatusName, fixture.fixtureStartDate, "notime") : '',
              odds: {
                home: homeWin?.decimalOdds ? Number(homeWin.decimalOdds) : 0,
                draw: draw?.decimalOdds ? Number(draw.decimalOdds) : 0,
                away: awayWin?.decimalOdds ? Number(awayWin.decimalOdds) : 0,
              },
              marketStatusName: market?.marketStatusName,
              selectionStatuses: [
                homeWin?.selectionStatus,
                draw?.selectionStatus,
                awayWin?.selectionStatus,
              ],
              selectionSuspended: [
                homeWin?.selectionSuspended ?? false,
                draw?.selectionSuspended ?? false,
                awayWin?.selectionSuspended ?? false,
              ],
              eventId: String(fixture.providerFixtureId ?? index),
              sportId: fixture.sportId,
              segmentId: fixture.segmentId,
              leagueId: fixture.leagueId,
              // Bet slip functionality props
              match: fixture,
              market: market,
              handleSelections: handleSelections,
              addingSelections: addingSelections,
            };
            const isSingleMobile = isMobile && fixtures.length === 1;
            return (
              <SwiperSlide key={fixture.eventCode ? `${fixture.eventCode}_${index}` : `fixture_${index}`} className={isSingleMobile ? '!w-full' : '!w-auto'}>
                <MatchCard {...matchCardProps} className={isSingleMobile ? 'w-full' : 'w-[290px]'} />
              </SwiperSlide>
            );
          })}
        </Slider>
      )}
    </div>

  );
};

export default TopMatchesSection;