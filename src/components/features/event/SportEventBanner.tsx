import LockSvg from "components/shared/ui/LockSvg";
import { LOCKED_ODDS_THRESHOLD } from "constants/odds";
import { cn } from 'helpers/ui';

export interface SportEventBannerData {
  fixtureStatusName: string;
  leagueName: string;
  countryName: string;
  startTime: string;
  islive: boolean;
  scores: string;
  minutes: string;
  homeScore?: string;
  awayScore?: string;
  marketCount?: number;
  leagueLogo: string;
  sportId?: number;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  mainMarket?: {
    marketStatus?: string;
    homeWin?: {
      name: string;
      odds: number | string;
      marketId?: string;
      selectionId?: string;
      selectionStatus?: string;
      selectionSuspended?: boolean;
    };
    draw?: {
      name: string;
      odds: number | string;
      marketId?: string;
      selectionId?: string;
      selectionStatus?: string;
      selectionSuspended?: boolean;
    };
    awayWin?: {
      name: string;
      odds: number | string;
      marketId?: string;
      selectionId?: string;
      selectionStatus?: string;
      selectionSuspended?: boolean;
    };
  };
  handleBetSelection?: (selection: any, marketId: string) => void;
  isSelectionSelected?: (marketId: string, selectionId: string) => boolean;
  fixture?: any;
}

const getTenniesScores = (scores: string | undefined) => {
  const currentScores = scores?.split("|")[0]?.trim().split(" ").slice(-1)[0] || "";
  const setScores = scores
    ?.split("|")[0]
    .trim()
    .split(" ")
    .map((set) => set.replace("*", ""))
    .filter(Boolean)
    .reverse()
    .slice(1)
    .map((set) => {
      const [player1Score, player2Score] = set.split("-");
      return {
        player1Score: Number(player1Score),
        player2Score: Number(player2Score),
      };
    });
  return { currentScores, setScores };
}

const SportEventBanner = (item: SportEventBannerData) => {
  return (
    <div className="p-4 bg-gradient-to-b from-[#011504] via-5 to-[#3F803C] via-75% rounded-xl flex justify-center">
      <div className="w-full max-w-[886px] flex flex-col gap-5 xl:gap-2">
        <div className="flex justify-between md:flex-col md:items-center xl:gap-3">
          {item.islive && (
            <div className="rounded-xl h-6 px-1.5 bg-status-error-200 flex items-center xl:px-2">
              <span className="text-xs xl:text-sm font-medium">
                Live {item.minutes}
              </span>
            </div>
          )}
          <div className="flex flex-col items-end lg:items-center gap-1 lg:ml-0 ml-auto">
            <div className="flex items-center gap-2 max-w-[150px] md:max-w-none justify-end lg:justify-center">
              <div className={`min-w-5 min-h-5 ${item.leagueLogo}`}></div>
              <span className="text-sm font-bold xl:font-medium truncate block text-right lg:text-center banner-textColor-1">
                {item.countryName}, {item.leagueName}
              </span>
            </div>
            {!item.islive && (
              <span className="text-xs font-medium text-primary-3">
                {item.startTime}
              </span>
            )}
          </div>
        </div>
        {(item.sportId !== 5 && item.sportId !== 21 || !item.islive) && (
          <div className="flex justify-between items-center gap-2 ">
            <div className="flex flex-col items-center min-w-0 flex-1 text-center">
              <div className="size-11 xl:size-14 bg-background-1/20 rounded-full flex items-center justify-center mb-1">
                <div className={`${item.homeTeam.logo} min-w-6 min-h-6`}></div>
              </div>
              <div className="w-full">
                <span className="font-medium mb-1 lg:mb-2 xl:text-3xl truncate block banner-textColor-1">{item.homeTeam.name} </span></div>
              <div className="bg-background-1/20 px-2 h-5 flex items-center rounded-full">
                <span className="text-xs xl:text-sm font-medium text-secondary-2">
                  +{item.marketCount}
                </span>
              </div>
            </div>
            {(!item.islive) && (
              <span className="font-medium xl:text-4xl flex-shrink-0 px-2 banner-textColor-1">VS</span>
            )}
            {(item.sportId !== 5 && item.sportId !== 21 && item.islive) && (
              <div className="text-center mx-8">
                <div className="body-txtColor-1 text-2xl lg:text-4xl font-medium">
                  {item.homeScore}: {item.awayScore}
                </div>
              </div>
            )}

            <div className="flex flex-col items-center min-w-0 flex-1 text-center">
              <div className="size-11 xl:size-14 bg-background-1/20 rounded-full flex items-center justify-center mb-1">

                <div className={`${item.awayTeam.logo} min-w-6 min-h-6`}></div>
              </div>
              <div className="w-full">
                <span className="font-medium mb-1 lg:mb-2 xl:text-3xl truncate block banner-textColor-1">{item.awayTeam.name} </span></div>
              <div className="bg-background-1/20 px-2 h-5 flex items-center rounded-full">
                <span className="text-xs xl:text-sm font-medium text-secondary-2">
                  +{item.marketCount}
                </span>
              </div>
            </div>
          </div>
        )}

        {(item.sportId === 5 || item.sportId === 21 && item.islive) && (
          <div className="flex gap-2 flex-col w-full justify-start lg:justify-center min-w-0 ">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="SB-flag SB-home in">
                </span>
                <span className="body-txtColor-1 font-normal text-md truncate">{item.homeTeam.name}</span>
              </div>
              <div className="flex gap-2 text-center mx-8">
                {/* Current serving indication */}
                <div className="flex items-center justify-center body-txtColor-1 text-sm w-6 h-6">
                  <span className='bg-secondary-light-4 w-2 h-2 block rounded-full'></span>
                </div>
                {(item.sportId === 21) && (
                  <div className="body-txtColor-1 text-sm min-w-6">{item.homeScore ?? "-"}</div>
                )}
                {(item.sportId === 5) && (
                  <>
                    <div className="text-special-2 text-sm min-w-6">{getTenniesScores(item?.scores)?.currentScores?.split("-")[0]}</div>
                    {getTenniesScores(item?.scores)?.setScores?.map((set, index) => {
                      return (
                        <div key={index} className="body-txtColor-1 text-sm min-w-6">{set?.player1Score}</div>
                      )
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="SB-flag SB-home sf"></span>
                <span className="body-txtColor-1 font-normal text-md truncate">{item.awayTeam.name}</span>
              </div>
              <div className="flex gap-2 text-center mx-8">
                {(item.sportId === 21) && (
                  <div className="body-txtColor-1 text-sm min-w-6">{item.homeScore ?? "-"}</div>
                )}
                {(item.sportId === 5) && (
                  <>
                    <div className="text-special-2 text-sm min-w-6">{getTenniesScores(item?.scores)?.currentScores?.split("-")[1]}</div>
                    {getTenniesScores(item?.scores)?.setScores?.map((set, index) => {
                      return (
                        <div key={index} className="body-txtColor-1 text-sm min-w-6">{set?.player2Score}</div>
                      )
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tennis Score End */}
        <div className="flex gap-3 mx-auto text-center">
          {item.mainMarket?.homeWin && (
            <div
              className={cn(
                "rounded-lg h-10 flex flex-col items-center justify-between w-20 xl:w-36 xl:flex-row xl:gap-2 p-0.5 xl:p-2 transition-colors",
                item.mainMarket.homeWin.selectionSuspended
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-60"
                  : item.isSelectionSelected && item.mainMarket.homeWin.marketId && item.mainMarket.homeWin.selectionId &&
                    item.isSelectionSelected(item.mainMarket.homeWin.marketId, item.mainMarket.homeWin.selectionId)
                    ? "banner-bg-1 banner-textColor cursor-pointer"
                    : "banner-bg text-base-900 cursor-pointer"
              )}
              onClick={(e) => {
                const isLocked =
                  !item.mainMarket?.homeWin?.odds ||
                  Number(item.mainMarket.homeWin.odds) < LOCKED_ODDS_THRESHOLD ||
                  item.mainMarket?.marketStatus === 'inactive' ||
                  item.mainMarket.homeWin.selectionStatus === 'inactive' ||
                  item.mainMarket?.homeWin?.selectionSuspended;
                if (isLocked) {
                  return;
                }
                if (item.handleBetSelection && item.mainMarket?.homeWin && item.mainMarket.homeWin.marketId) {
                  const selection = {
                    selectionId: item.mainMarket.homeWin.selectionId,
                    selectionName: item.mainMarket.homeWin.name,
                    decimalOdds: item.mainMarket.homeWin.odds,
                    selectionStatus: item.mainMarket.homeWin.selectionStatus
                  };
                  item.handleBetSelection(selection, item.mainMarket.homeWin.marketId);
                }
              }}
            >
              <div className="flex w-full min-w-0 justify-center xl:justify-start">
                <span className={cn(
                  "text-xs xl:text-sm font-medium truncate inline-block",
                  item.mainMarket.homeWin.selectionSuspended
                    ? "text-gray-600"
                    : item.isSelectionSelected && item.mainMarket.homeWin.marketId && item.mainMarket.homeWin.selectionId &&
                      item.isSelectionSelected(item.mainMarket.homeWin.marketId, item.mainMarket.homeWin.selectionId)
                      ? "banner-textColor-1" : "banner-textColor"
                )}>
                  {item.mainMarket.homeWin.name}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                {(!item.mainMarket.homeWin.odds || Number(item.mainMarket.homeWin.odds) < LOCKED_ODDS_THRESHOLD || item.mainMarket?.marketStatus === 'inactive' || item.mainMarket.homeWin.selectionStatus === 'inactive') && !item.mainMarket.homeWin.selectionSuspended ? (
                  <span className={cn(
                    "text-xs xl:text-sm font-medium cursor-not-allowed",
                    item.isSelectionSelected && item.mainMarket.homeWin.marketId && item.mainMarket.homeWin.selectionId &&
                      item.isSelectionSelected(item.mainMarket.homeWin.marketId, item.mainMarket.homeWin.selectionId)
                      ? "banner-textColor-1" : "banner-textColor"
                  )}>
                    <LockSvg className="fill-base-900" />
                  </span>
                ) : (
                  <span className={cn(
                    "text-xs xl:text-sm font-medium",
                    item.mainMarket.homeWin.selectionSuspended
                      ? "text-gray-600"
                      : item.isSelectionSelected && item.mainMarket.homeWin.marketId && item.mainMarket.homeWin.selectionId &&
                        item.isSelectionSelected(item.mainMarket.homeWin.marketId, item.mainMarket.homeWin.selectionId)
                        ? "banner-textColor-1" : "banner-textColor"
                  )}>
                    {Number(item.mainMarket.homeWin.odds).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          )}
          {item.mainMarket?.draw && (
            <div
              className={cn(
                "rounded-lg h-10 flex flex-col items-center justify-between w-20 xl:w-28 xl:flex-row xl:gap-2 p-0.5 xl:p-2 transition-colors",
                item.mainMarket.draw.selectionSuspended
                  ? "bg-base-400 text-base-600 cursor-not-allowed opacity-60"
                  : item.isSelectionSelected && item.mainMarket.draw.marketId && item.mainMarket.draw.selectionId &&
                    item.isSelectionSelected(item.mainMarket.draw.marketId, item.mainMarket.draw.selectionId)
                    ? "banner-bg-1 banner-textColor cursor-pointer"
                    : "banner-bg text-base-900 cursor-pointer"
              )}
              onClick={(e) => {
                e.stopPropagation();
                // Don't process click if selection is suspended or locked
                const isLocked =
                  !item.mainMarket?.draw?.odds ||
                  Number(item.mainMarket.draw.odds) < LOCKED_ODDS_THRESHOLD ||
                  item.mainMarket?.marketStatus === 'inactive' ||
                  item.mainMarket.draw.selectionStatus === 'inactive' ||
                  item.mainMarket?.draw?.selectionSuspended;
                if (isLocked) {
                  return;
                }
                if (item.handleBetSelection && item.mainMarket?.draw && item.mainMarket.draw.marketId) {
                  const selection = {
                    selectionId: item.mainMarket.draw.selectionId,
                    selectionName: item.mainMarket.draw.name,
                    decimalOdds: item.mainMarket.draw.odds,
                    selectionStatus: item.mainMarket.draw.selectionStatus
                  };
                  item.handleBetSelection(selection, item.mainMarket.draw.marketId);
                }
              }}
            >
              <div className="flex w-full min-w-0 justify-center xl:justify-start">
                <span className={cn(
                  "text-xs xl:text-sm font-medium truncate inline-block",
                  item.mainMarket.draw.selectionSuspended
                    ? "text-base-600"
                    : item.isSelectionSelected && item.mainMarket.draw.marketId && item.mainMarket.draw.selectionId &&
                      item.isSelectionSelected(item.mainMarket.draw.marketId, item.mainMarket.draw.selectionId)
                      ? "banner-textColor-1" : "banner-textColor"
                )}>
                  {item.mainMarket.draw.name}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                {(!item.mainMarket.draw.odds || Number(item.mainMarket.draw.odds) < LOCKED_ODDS_THRESHOLD || item.mainMarket?.marketStatus === 'inactive' || item.mainMarket.draw.selectionStatus === 'inactive') && !item.mainMarket.draw.selectionSuspended ? (
                  <span className={cn(
                    "text-xs font-medium xl:text-sm cursor-not-allowed",
                    item.isSelectionSelected && item.mainMarket.draw.marketId && item.mainMarket.draw.selectionId &&
                      item.isSelectionSelected(item.mainMarket.draw.marketId, item.mainMarket.draw.selectionId)
                      ? "banner-textColor-1" : "banner-textColor"
                  )}>
                    <LockSvg className="fill-base-900" />
                  </span>
                ) : (
                  <span className={cn(
                    "text-xs xl:text-sm font-medium",
                    item.mainMarket.draw.selectionSuspended
                      ? "text-base-600"
                      : item.isSelectionSelected && item.mainMarket.draw.marketId && item.mainMarket.draw.selectionId &&
                        item.isSelectionSelected(item.mainMarket.draw.marketId, item.mainMarket.draw.selectionId)
                        ? "banner-textColor-1" : "banner-textColor"
                  )}>
                    {Number(item.mainMarket.draw.odds).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          )}
          {item.mainMarket?.awayWin && (
            <div
              className={cn(
                "rounded-lg h-10 flex flex-col items-center justify-between w-20 xl:w-36 xl:flex-row xl:gap-2 p-0.5 xl:p-2 transition-colors",
                item.mainMarket.awayWin.selectionSuspended
                  ? "bg-base-400 text-base-600 cursor-not-allowed opacity-60"
                  : item.isSelectionSelected && item.mainMarket.awayWin.marketId && item.mainMarket.awayWin.selectionId &&
                    item.isSelectionSelected(item.mainMarket.awayWin.marketId, item.mainMarket.awayWin.selectionId)
                    ? "banner-bg-1 banner-textColor cursor-pointer"
                    : "banner-bg text-base-900 cursor-pointer"
              )}
              onClick={(e) => {
                e.stopPropagation();
                const isLocked =
                  !item.mainMarket?.awayWin?.odds ||
                  Number(item.mainMarket.awayWin.odds) < LOCKED_ODDS_THRESHOLD ||
                  item.mainMarket?.marketStatus === 'inactive' ||
                  item.mainMarket.awayWin.selectionStatus === 'inactive' ||
                  item.mainMarket?.awayWin?.selectionSuspended;
                if (isLocked) {
                  return;
                }
                if (item.handleBetSelection && item.mainMarket?.awayWin && item.mainMarket.awayWin.marketId) {
                  const selection = {
                    selectionId: item.mainMarket.awayWin.selectionId,
                    selectionName: item.mainMarket.awayWin.name,
                    decimalOdds: item.mainMarket.awayWin.odds,
                    selectionStatus: item.mainMarket.awayWin.selectionStatus
                  };
                  item.handleBetSelection(selection, item.mainMarket.awayWin.marketId);
                }
              }}
            >
              <div className="flex w-full min-w-0 justify-center xl:justify-start">
                <span className={cn(
                  "text-xs xl:text-sm font-medium truncate inline-block",
                  item.mainMarket.awayWin.selectionSuspended
                    ? "text-base-600"
                    : item.isSelectionSelected && item.mainMarket.awayWin.marketId && item.mainMarket.awayWin.selectionId &&
                      item.isSelectionSelected(item.mainMarket.awayWin.marketId, item.mainMarket.awayWin.selectionId)
                      ? "banner-textColor-1" : "banner-textColor"
                )}>
                  {item.mainMarket.awayWin.name}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                {(!item.mainMarket.awayWin.odds || Number(item.mainMarket.awayWin.odds) < LOCKED_ODDS_THRESHOLD || item.mainMarket?.marketStatus === 'inactive' || item.mainMarket.awayWin.selectionStatus === 'inactive') && !item.mainMarket.awayWin.selectionSuspended ? (
                  <span className={cn(
                    "text-xs xl:text-sm font-medium cursor-not-allowed",
                    item.isSelectionSelected && item.mainMarket.awayWin.marketId && item.mainMarket.awayWin.selectionId &&
                      item.isSelectionSelected(item.mainMarket.awayWin.marketId, item.mainMarket.awayWin.selectionId)
                      ? "banner-textColor-1" : "banner-textColor"
                  )}>
                    <LockSvg className="fill-base-900" />
                  </span>
                ) : (
                  <span className={cn(
                    "text-xs xl:text-sm font-medium",
                    item.mainMarket.awayWin.selectionSuspended
                      ? "text-base-600"
                      : item.isSelectionSelected && item.mainMarket.awayWin.marketId && item.mainMarket.awayWin.selectionId &&
                        item.isSelectionSelected(item.mainMarket.awayWin.marketId, item.mainMarket.awayWin.selectionId)
                        ? "banner-textColor-1" : "banner-textColor"
                  )}>
                    {Number(item.mainMarket.awayWin.odds).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SportEventBanner;