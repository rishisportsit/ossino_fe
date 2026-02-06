import { SportWiseMultiMarkets } from 'helpers/SportWiseMultiMarkets';
import { getTimefromMatch, getIcons } from 'helpers/common';
import { handleSelectionsGlobal } from 'helpers/betConfigHelpers';
import styles from './index.module.css';
import { cn } from 'helpers/ui';
import { useEffect, useState } from 'react';
import { LOCKED_ODDS_THRESHOLD } from 'constants/odds';
import { useNavigate } from 'react-router-dom';
import LockSvg from 'components/shared/ui/LockSvg';
import { useBetslipValidation } from 'hooks/useBetslipValidation';
import type { Fixture } from 'api/SportsHomePage/sportsHomePage.types';

interface MatchOfTheDayCardProps {
  fixture: Fixture;
}

const MatchOfTheDayCard = ({ fixture }: MatchOfTheDayCardProps) => {
  const navigate = useNavigate();
  const [addingSelections, setAddingSelections] = useState<any[]>(() => {
    const storedSelections = localStorage.getItem("betSlipData");
    return storedSelections ? JSON.parse(storedSelections) : [];
  });

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

  // Always call the hook, even if fixture is undefined
  useBetslipValidation({
    match: fixture!,
    addingSelections,
    setAddingSelections
  });

  if (!fixture) return null;

  const sportConfig = SportWiseMultiMarkets.find((s: any) => s.sportId === fixture?.sportId);
  const uiMarkets = sportConfig?.markets?.marketsSupported || [];
  const fixtureMarkets = fixture?.markets || [];

  const getMarketByTemplateId = (templateId: string) => fixtureMarkets.find((m: any) => m.marketTemplateId === templateId);

  const mainMarket = uiMarkets[0];
  const market = getMarketByTemplateId(mainMarket?.marketTemplateId);
  if (!market || !mainMarket) {
    return null;
  }
  const getSelectedOdds = (selectionId: string) => {
    if (!addingSelections || !fixture) return false;
    const matchSelection = addingSelections.find(m => m.providerFixtureId === fixture.providerFixtureId);
    if (!matchSelection || !matchSelection.markets?.[0]?.selections?.[0]) return false;

    return matchSelection.markets[0].selections[0].selectionId === selectionId;
  };
   
  const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
  };
  
  let buttons: JSX.Element[] = [];
  const headers = mainMarket.displayHeaders.split(',');
  const isMarketInactive = market.marketStatusName?.toLowerCase() === 'inactive';
  const homeWin = market.selections?.find((s: any) => s.selectionName === fixture?.homeName);
  const draw = market.selections?.find((s: any) => s.selectionName?.toLowerCase().includes('draw'));
  const awayWin = market.selections?.find((s: any) => s.selectionName === fixture?.awayName);
  const selections = [homeWin, draw, awayWin];
  buttons = headers.map((header: string, idx: number) => {
    const sel = selections[idx];
    const isSelected = sel && getSelectedOdds(sel.selectionId);
    const isSelectionInactive = sel?.selectionStatus?.toLowerCase() === 'inactive';
    const isSuspended = sel?.selectionSuspended;
    const isOddsLocked = sel && Number(sel.decimalOdds) < LOCKED_ODDS_THRESHOLD;
    const isLocked = !sel || isMarketInactive || isSelectionInactive || isOddsLocked;
    const isDisabled = isLocked || isSuspended;
    return (
      <button
        key={sel?.selectionId || `${header}-${idx}`}
        className={cn(
          "px-3 py-2 flex justify-center gap-2 text-sm font-medium w-full transition-colors",
          isSelected ? "banner-textColor-1" : "banner-textColor-1",
          isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        )}
        style={{
          borderRadius: '8px',
          backdropFilter: 'blur(35px)',
          backgroundColor: isSelected ? '#000' : 'rgba(255, 255, 255, 0.2)'
        }}
        disabled={isDisabled}
        onClick={(e) => {
          stopPropagation(e);
          if (sel && !isDisabled && handleSelections) {
            handleSelections(sel, fixture, market.marketId);
          }
        }}
      >
        {header}{' '}
        {isLocked ? (
          <LockSvg />
        ) : (
          <span className={cn("font-bold", isSelected ? "banner-textColor-1" : "banner-textColor-1")}>
            {Number(sel.decimalOdds).toFixed(2)}
          </span>
        )}
      </button>
    );
  });

  const leftTeamIcon = getIcons('homeName', fixture?.homeName ?? '');
  const rightTeamIcon = getIcons('awayName', fixture?.awayName ?? '');
  const matchDate = getTimefromMatch(fixture?.fixtureStatusName ?? '', fixture?.fixtureStartDate ?? '');

  const handleNavigate = () => {
    const eventId = fixture?.providerFixtureId;
    if (eventId) {
      navigate(`/sports/event/${eventId}`);
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl px-4 py-4 relative overflow-hidden w-full md:w-[340px] h-[160px] cursor-pointer hover:opacity-90',
        styles['bg-gradient'],
      )}
      onClick={handleNavigate}
      tabIndex={0}
      role="button"
      aria-label="Go to event details"
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleNavigate(); }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-7">
        <div className="banner-bg banner-textColor px-3 h-6 rounded-full text-xs font-medium flex items-center">
          Match of the day
        </div>
        <div
          className="banner-textColor-1 px-3 h-6 rounded-full text-xs flex items-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(40px)'
          }}
        >
          {matchDate}
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-1 truncate">
          <div className={`${leftTeamIcon} min-w-5 min-h-5`}></div>
          <span className="banner-textColor-1 font-[900] text-md truncate ">{fixture?.homeName}</span>
        </div>
        <div className="flex items-center gap-1 truncate">
          <div className={`${rightTeamIcon} min-w-5 min-h-5`}></div>
          <span className="banner-textColor-1 font-[900] text-md truncate ">{fixture?.awayName}</span>
        </div>
      </div>
      {/* Dynamic Betting odds */}
      <div className="flex gap-2">
        {buttons.map((btn, idx) =>
          <span className='flex-1' key={btn.key || idx} tabIndex={-1}>{btn}</span>
        )}
      </div>
    </div>
  );
};

export default MatchOfTheDayCard;