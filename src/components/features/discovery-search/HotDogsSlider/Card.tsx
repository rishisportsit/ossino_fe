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
    <div className='w-full flex justify-between '>
      <div className="flex items-center gap-1">
        <span className={getIcons("homeName", data?.translations?.homeName)} />
        {/* {data.win ? (
        <>
          <span className="font-medium text-xs body-txtColor-1">{data.name}</span>
          <div className="w-[1px] h-4 bg-background-1/10" />
          <span className="text-secondary-2 font-medium text-10px">To Win</span>
        </>
      ) : (
        <span className="text-10px text-base-400">{data.name}</span>
      )} */}
        <span className="text-xs text-base-400 ">{data?.translations?.homeName}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className={getIcons("awayName", data?.translations?.awayName)} />
        <span className="text-xs text-base-400">{data?.translations?.awayName}</span>
      </div>
    </div>
  );
};

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
        <div className="flex items-center justify-between gap-1">
          <Details data={data} />
        </div>

        {data?.markets?.map((market, mIndex) => {
          const selection = market?.selections?.[0];

          if (market?.marketStatusName !== "Active") {
            return (
              <div key={mIndex} className="h-9 w-full rounded-lg bg-base-700 flex items-center justify-center">
                <div
                  onClick={(e) => e.preventDefault()}
                  className="h-9 w-full rounded-lg bg-base-700 flex items-center justify-center disabled cursor-not-allowed"
                >
                  <CiLock fontSize={22} />
                </div>
              </div>
            );
          }

          if (selection?.selectionStatus !== "Active" || Number(selection?.decimalOdds) <= LOCKED_ODDS_THRESHOLD) {
            return (
              <div key={mIndex} className="h-9 w-full rounded-lg bg-base-700 flex items-center justify-center">
                <div
                  onClick={(e) => e.preventDefault()}
                  className="h-9 w-full rounded-lg bg-base-700 flex items-center justify-center disabled cursor-not-allowed"
                >
                  <CiLock fontSize={22} />
                </div>
              </div>
            );
          }
          return (
            <div
              key={mIndex}
              className={cn(
                "h-9 w-full rounded-lg flex items-center justify-between cursor-pointer transition-colors px-3",
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
                "text-sm font-medium truncate",
                getSelectedOdds(selection?.selectionId) ? "btn-textColor" : "body-txtColor-1"
              )}>
                {selection?.selectionName}
              </span>
              <span className={cn(
                "text-sm font-medium",
                getSelectedOdds(selection?.selectionId) ? "btn-textColor" : "body-txtColor-1"
              )}>
                {selection?.decimalOdds}
              </span>
            </div>
          );
        })}
      </div>
    </Link >
  );
};

export default Card;