import { Link } from 'react-router-dom';
import { Fixture } from 'api/SportsHomePage/sportsHomePage.types';
import { getFormattedTotalCount, getIcons, getTimefromMatch } from 'helpers/common';
import { CiLock } from 'react-icons/ci';
import { cn } from 'helpers/ui';
import { LOCKED_ODDS_THRESHOLD } from 'constants/odds';

interface CardProps {
  data: Fixture;
  handleSelections?: (selection: any, match: any, marketId?: string | number) => void;
  addingSelections?: any[];
}

const Details = ({ data }: { data: Fixture }) => {
  return (
    <div className='w-full flex justify-between gap-2 min-w-0'>
      <div className="flex gap-1 items-center min-w-0 flex-1">
        <div className="size-9 background-1 rounded-full flex items-center justify-center relative z-0 shrink-0">
          <img
            src="/images/sports/playerProps/Ellipse.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
          <span className={getIcons("homeName", data?.translations?.homeName)} />
        </div>
        <span className="font-medium text-xs body-txtColor-1 truncate min-w-0">{data?.translations?.homeName}</span>
      </div>
      <div className="flex gap-1 items-center min-w-0 flex-1">
        <div className="size-9 background-1 rounded-full flex items-center justify-center relative z-0 shrink-0">
          <img
            src="/images/sports/playerProps/Ellipse.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
          <span className={getIcons("awayName", data?.translations?.awayName)} />
        </div>
        <span className="font-medium text-xs body-txtColor-1 truncate min-w-0">{data?.translations?.awayName}</span>
      </div>
    </div>
  );
};

const Card = ({ data, handleSelections, addingSelections }: CardProps) => {
  const getSelectedOdds = () => {
    if (!addingSelections || !data) return false;
    const matchSelection = addingSelections.find(m => m.providerFixtureId === data.providerFixtureId);
    if (!matchSelection || !matchSelection.markets?.[0]?.selections?.[0]) return false;

    const selectionId = matchSelection.markets[0].selections[0].selectionId;
    return selectionId === data?.markets[0]?.selections[0]?.selectionId;
  };

  const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const isSelected = getSelectedOdds();
  const market = data?.markets[0];
  const selection = market?.selections[0];
  const isMarketInactive = market?.marketStatusName !== "Active";
  const isSelectionInactive = selection?.selectionStatus !== "Active";
  const isOddsLocked = Number(selection?.decimalOdds) <= LOCKED_ODDS_THRESHOLD;
  const canClickOdds = !isMarketInactive && !isSelectionInactive && !isOddsLocked;

  const { total, formatted } = getFormattedTotalCount(data);

  return (
    <Link to={`/sports/event/${data?.providerFixtureId}`}>
      <div className="rounded-xl w-80 bg-base-735 p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-xs body-txtColor-1">
            {getTimefromMatch(data?.fixtureStatusName, data?.fixtureStartDate)}
          </span>
          <span className="text-secondary-2 text-xs font-medium">
            {total <= 0 ? "" : `${formatted} People Bet`}
          </span>
        </div>
        <div className="flex justify-between gap-1 items-center">
          <Details data={data} />
        </div>
        <div className="flex items-center justify-between gap-1 folex">
          <span className="text-sm font-medium body-txtColor-1">{selection?.selectionName}</span>
          {!canClickOdds ? (
            <div onClick={stopPropagation} className="h-9 w-[122px] rounded-lg bg-base-700 flex items-center justify-center disabled cursor-not-allowed">
              <CiLock fontSize={22} />
            </div>
          ) : (
            <div
              className={cn(
                "h-9 w-[122px] rounded-lg flex items-center justify-center cursor-pointer transition-colors",
                isSelected ? "bg-button-gradient btn-textColor" : "bg-base-700 body-txtColor-1"
              )}
              onClick={(e) => {
                stopPropagation(e);
                if (handleSelections && selection && market) {
                  handleSelections(selection, data, market.marketId);
                }
              }}
            >
              <span className={cn("text-sm font-medium", isSelected ? "btn-textColor" : "body-txtColor-1")}>
                {selection?.decimalOdds}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
