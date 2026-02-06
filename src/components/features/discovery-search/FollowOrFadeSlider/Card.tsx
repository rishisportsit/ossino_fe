import { Link } from 'react-router-dom';

import { CompareProgress } from 'components/shared/ui/CompareProgress';
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

const Card = ({ data, handleSelections, addingSelections }: CardProps) => {
  const getSelectedOdds = (selectionId: string) => {
    if (!addingSelections || !data) return false;
    const matchSelection = addingSelections.find(m => m.providerFixtureId === data.providerFixtureId);
    if (!matchSelection || !matchSelection.markets?.[0]?.selections?.[0]) return false;

    return matchSelection.markets[0].selections[0].selectionId === selectionId;
  };

  const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const totalBets = data?.markets?.reduce((total, market) => total +
    (market?.selections
      ? market.selections.reduce((selTotal, selection) => selTotal + (selection?.betCount || 0), 0)
      : 0),
    0
  ) || 0;

  const totalBetsForFirstMarket =
    data?.markets && data.markets.length > 0
      ? data.markets[0].selections?.reduce((selTotal, selection) => selTotal + (selection?.betCount || 0), 0) || 0
      : 0;

  const percentageForFirstMarket = totalBets > 0
    ? Math.round((totalBetsForFirstMarket / totalBets) * 100)
    : 0;

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
        <div className="flex flex-col gap-1">
          <span className="text-xs text-base-400 text-center">{data?.markets[0]?.marketName}</span>
          <div className="flex items-center gap-3">
            <span className={`${getIcons("homeName", data?.translations?.homeName)} order-1`} />
            <CompareProgress value={percentageForFirstMarket === 0 ? 50 : percentageForFirstMarket} className="order-2" />
            <span className={`${getIcons("awayName", data?.translations?.awayName)} order-3`} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-1">
          {data?.markets?.map((market) => {
            if (market?.marketStatusName !== "Active") {
              return market.selections?.map((selection, index) => (
                <div key={selection?.selectionId + index} className="flex flex-col items-center gap-1">
                  <span className="text-base-400 text-xs line-clamp-2 truncate">{selection?.selectionName}</span>
                  <div onClick={(e) => e.preventDefault()} className="h-9 w-[122px] rounded-lg bg-base-700 flex items-center justify-center disabled cursor-not-allowed">
                    <CiLock fontSize={22} />
                  </div>
                </div>
              ))
            };
            return market.selections?.map((selection, index) => (
              <div key={selection?.selectionId + index} className="flex flex-col items-center gap-1">
                <span className="text-base-400 text-xs line-clamp-2 truncate">{selection?.selectionName}</span>
                {selection?.selectionStatus !== "Active" || Number(selection?.decimalOdds) <= LOCKED_ODDS_THRESHOLD ? (
                  <div onClick={(e) => e.preventDefault()} className="h-9 w-[122px] rounded-lg bg-base-700 flex items-center justify-center disabled cursor-not-allowed">
                    <CiLock fontSize={22} />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "h-9 w-[122px] rounded-lg flex items-center justify-center cursor-pointer transition-colors",
                      getSelectedOdds(selection?.selectionId) ? "bg-button-gradient btn-textColor" : "bg-base-700 body-txtColor-1"
                    )}
                    onClick={(e) => {
                      stopPropagation(e);
                      if (handleSelections && selection && market) {
                        handleSelections(selection, data, market.marketId);
                      }
                    }}
                  >
                    <span className={cn(
                      "text-sm font-medium",
                      getSelectedOdds(selection?.selectionId) ? "btn-textColor" : "body-txtColor-1"
                    )}>
                      {selection?.decimalOdds}
                    </span>
                  </div>
                )}
              </div>
            ))
          }

          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
