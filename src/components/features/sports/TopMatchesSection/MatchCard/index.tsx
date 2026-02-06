import { cn } from 'helpers/ui';
import { LOCKED_ODDS_THRESHOLD } from 'constants/odds';
import { Link, useNavigate } from 'react-router-dom';
import LockSvg from 'components/shared/ui/LockSvg';

interface MatchCardProps {
  league: {
    name: string;
    flag: string;
    logo: string;
  };
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  matchTime: string;
  matchDate: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  eventId: string;
  marketStatusName?: string;
  selectionStatuses?: (string | undefined)[];
  selectionSuspended?: boolean[];
  selectedOdds?: readonly ('home' | 'draw' | 'away')[];
  className?: string;
  sportId?: number;
  segmentId?: number;
  leagueId?: number;
  match?: any;
  market?: any;
  handleSelections?: (selection: any, match: any, marketId?: string | number) => void;
  addingSelections?: any[];
}

const MatchCard = ({
  league,
  homeTeam,
  awayTeam,
  matchTime,
  matchDate,
  odds,
  eventId,
  marketStatusName,
  selectionStatuses = [],
  selectionSuspended = [],
  match,
  market,
  handleSelections,
  addingSelections,
  sportId,
  segmentId,
  leagueId,
  className,
}: MatchCardProps) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/sports/event/${eventId}`);
  };
  const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
  };

  const getSelectedOdds = () => {
    if (!addingSelections || !match) return [];
    const matchSelection = addingSelections.find(m => m.providerFixtureId === match.providerFixtureId);
    if (!matchSelection || !matchSelection.markets?.[0]?.selections?.[0]) return [];

    const selectionId = matchSelection.markets[0].selections[0].selectionId;
    if (selectionId === market?.selections?.[0]?.selectionId) return ['home'];
    if (selectionId === market?.selections?.[1]?.selectionId) return ['draw'];
    if (selectionId === market?.selections?.[2]?.selectionId) return ['away'];
    return [];
    
  };

  const currentSelectedOdds = getSelectedOdds();
  function isOddsDisabled(
    marketStatusName: string | undefined,
    selectionStatus: string | undefined,
    odds: number,
    suspended: boolean | undefined
  ): boolean {
    return (
      marketStatusName?.toLowerCase() === 'inactive' ||
      selectionStatus?.toLowerCase() === 'inactive' ||
      odds <= LOCKED_ODDS_THRESHOLD ||
      suspended === true
    );
  }
  return (
    <div
      className={cn("p-4 flex flex-col bg-base-735 rounded-[12px] cursor-pointer gap-3", className || "w-[252px]")}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(); }}
    >
      {/* League Info */}
      <div className="flex items-center justify-between gap-2">
        <div className={league.flag}></div>
        <Link className='min-w-0'
          to={`/sports/league/${sportId}/${segmentId}/${leagueId}`}
          onClick={e => e.stopPropagation()}
        >
          <span className="body-txtColor-1 text-xs xl:text-sm font-medium truncate block">{league.name}</span>
        </Link>
        <div className={`${league.logo} min-w-5 min-h-5`}></div>
      </div>

      {/* Match Details */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col items-center gap-1 w-20 min-w-0 text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center border"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <div className={`${homeTeam.logo} min-w-7 min-h-7`}></div>

          </div>
          <div className="w-full">
            <span className="body-txtColor-1 text-xs xl:text-sm font-medium truncate block">
              {homeTeam.name}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="body-txtColor-1 text-sm font-medium text-nowrap">{matchTime}</span>
          <span className="text-base-400 text-xs text-nowrap">{matchDate}</span>
        </div>

        <div className="flex flex-col items-center gap-1 w-20 min-w-0 text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center border"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <div className={`${awayTeam.logo} min-w-7 min-h-7`}></div>
          </div>
          <div className="w-full">
            <span className="body-txtColor-1 text-xs xl:text-sm font-medium truncate block">
              {awayTeam.name}
            </span>
          </div>
        </div>
      </div>

      {/* Betting Odds */}
      <div className="flex gap-2">
        {/* Home Odds */}
        <div
          className={cn(
            'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between min-w-[80px]',
            currentSelectedOdds?.includes('home')
              ? 'bg-button-gradient btn-textColor'
              : selectionSuspended[0]
              ? 'bg-base-600 text-base-400 cursor-not-allowed opacity-50'
              : 'bg-base-700 body-txtColor-1 cursor-pointer',
          )}
          onClick={(e) => {
            stopPropagation(e);
            const isDisabled = isOddsDisabled(
              marketStatusName,
              selectionStatuses[0],
              odds.home,
              selectionSuspended[0]
            );
            if (isDisabled) return;
            if (handleSelections && match && market?.selections?.[0]) {
              handleSelections(market.selections[0], match, market.marketId);
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); }}
        >
          {(marketStatusName?.toLowerCase() === 'inactive' || selectionStatuses[0]?.toLowerCase() === 'inactive' || odds.home <= LOCKED_ODDS_THRESHOLD) ? (
            <LockSvg />
          ) : (
            <>
              <span className={currentSelectedOdds?.includes('home') ? 'body-txtColor-2' : selectionSuspended[0] ? 'text-base-400' : 'text-base-400'}>1</span>
              <span className={currentSelectedOdds?.includes('home') ? 'body-txtColor-2' : selectionSuspended[0] ? 'text-base-400' : 'body-txtColor-1'}>{odds.home.toFixed(2)}</span>
            </>
          )}
        </div>
        {/* Draw Odds */}
        <div
          className={cn(
            'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between min-w-[80px]',
            currentSelectedOdds?.includes('draw')
              ? 'bg-button-gradient btn-textColor'
              : selectionSuspended[1]
              ? 'bg-base-600 text-base-400 cursor-not-allowed opacity-50'
              : 'bg-base-700 body-txtColor-1 cursor-pointer',
          )}
          onClick={(e) => {
            stopPropagation(e);
            const isDisabled = isOddsDisabled(
              marketStatusName,
              selectionStatuses[1],
              odds.draw,
              selectionSuspended[1]
            );
            if (isDisabled) return;
            if (handleSelections && match && market?.selections?.[1] ) {
              handleSelections(market.selections[1], match, market.marketId);
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); }}
        >
          {(marketStatusName?.toLowerCase() === 'inactive' || selectionStatuses[1]?.toLowerCase() === 'inactive' || odds.draw <= LOCKED_ODDS_THRESHOLD) ? (
            <LockSvg />
          ) : (
            <>
              <span className={currentSelectedOdds?.includes('draw') ? 'body-txtColor-2' : selectionSuspended[1] ? 'text-base-400' : 'text-base-400'}>X</span>{' '}
              <span className={currentSelectedOdds?.includes('draw') ? 'body-txtColor-2 font-bold' : selectionSuspended[1] ? 'text-base-400 font-bold' : 'font-bold'}>{odds.draw.toFixed(2)}</span>
            </>
          )}
        </div>
        {/* Away Odds */}
        <div
          className={cn(
            'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between min-w-[80px]',
            currentSelectedOdds?.includes('away')
              ? 'bg-button-gradient btn-textColor'
              : selectionSuspended[2]
              ? 'bg-base-600 text-base-400 cursor-not-allowed opacity-50'
              : 'bg-base-700 body-txtColor-1 cursor-pointer',
          )}
          onClick={(e) => {
            stopPropagation(e);
            const isDisabled = isOddsDisabled(
              marketStatusName,
              selectionStatuses[2],
              odds.away,
              selectionSuspended[2]
            );
            if (isDisabled) return;
            if (handleSelections && match && market?.selections?.[2]) {
              handleSelections(market.selections[2], match, market.marketId);
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); }}
        >
          {(marketStatusName?.toLowerCase() === 'inactive' || selectionStatuses[2]?.toLowerCase() === 'inactive' || odds.away <= LOCKED_ODDS_THRESHOLD) ? (
            <LockSvg />
          ) : (
            <>
              <span className={currentSelectedOdds?.includes('away') ? 'body-txtColor-2' : selectionSuspended[2] ? 'text-base-400' : 'text-base-400'}>2</span>{' '}
              <span className={currentSelectedOdds?.includes('away') ? 'body-txtColor-2' : selectionSuspended[2] ? 'text-base-400' : ''}>{odds.away.toFixed(2)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;