import LockSvg from "components/shared/ui/LockSvg";
import { LOCKED_ODDS_THRESHOLD } from "constants/odds";

export interface SportEventBannerData {
  fixtureStatusName: string;
  leagueName: string;
  countryName: string;
  startTime: string;
  islive: boolean;
  scores: string;
  minutes: string;
  marketCount?: number;
  leagueLogo: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  mainMarket?: {
    homeWin?: {
      name: string;
      odds: number | string;
    };
    draw?: {
      name: string;
      odds: number | string;
    };
    awayWin?: {
      name: string;
      odds: number | string;
    };
  };
}

const SportEventBanner = (item: SportEventBannerData) => {
  return (
    <div className="p-4 bg-gradient-to-b from-[#011504] via-5 to-[#3F803C] via-75% rounded-xl flex justify-center">
      <div className="w-full max-w-[886px] flex flex-col gap-5 xl:gap-0">
        <div className="flex justify-between xl:flex-col xl:items-center xl:gap-3">
          {item.islive && (
            <div className="rounded-xl h-6 px-1.5 bg-status-error-200 flex items-center xl:px-2">
              <span className="text-xs xl:text-sm font-medium">
                Live {item.minutes}
              </span>
            </div>
          )}
          <div className="flex flex-col items-end xl:items-center gap-1 ml-auto">
            <div className="flex items-center gap-2">
              <div className={item.leagueLogo}></div>
              <span className="text-sm font-bold xl:font-medium ">
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
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col items-center min-w-0">
            <div className="size-11 xl:size-14 bg-background-1/20 rounded-full flex items-center justify-center mb-1">
              <div className={item.homeTeam.logo}></div>
            </div>
            <div className="w-full">
              <span className="font-medium mb-2 xl:text-3xl truncate block">{item.homeTeam.name} </span></div>
            <div className="bg-background-1/20 px-2 h-5 flex items-center rounded-full">
              <span className="text-xs xl:text-sm font-medium text-secondary-2">
                +{item.marketCount}
              </span>
            </div>
          </div>
          <span className="font-medium xl:text-4xl">VS</span>
          <div className="flex flex-col items-center min-w-0">
            <div className="size-11 xl:size-14 bg-background-1/20 rounded-full flex items-center justify-center mb-1">
              <div className={item.awayTeam.logo}></div>
            </div>
            <div className="w-full">
              <span className="font-medium mb-2 xl:text-3xl truncate block">{item.awayTeam.name} </span></div>
            <div className="bg-background-1/20 px-2 h-5 flex items-center rounded-full">
              <span className="text-xs xl:text-sm font-medium text-secondary-2">
                +{item.marketCount}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mx-auto text-center">
          {item.mainMarket?.homeWin && (
            <div className="rounded-lg h-10 background-1 flex flex-col items-center justify-center w-24 xl:w-36 xl:flex-row xl:gap-2 px-2">
              <div className="w-full min-w-0 ">
                <span className="text-base-900 text-xs xl:text-sm font-medium truncate block">
                  {item.mainMarket.homeWin.name}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                {(!item.mainMarket.homeWin.odds || Number(item.mainMarket.homeWin.odds) <= LOCKED_ODDS_THRESHOLD) ? (
                  <span className="text-base-900 text-xs xl:text-sm font-medium">
                    <LockSvg />
                  </span>
                ) : (
                  <span className="text-base-900 text-xs xl:text-sm font-medium">
                    {item.mainMarket.homeWin.odds}
                  </span>
                )}
              </div>
            </div>
          )}
          {item.mainMarket?.draw && (
            <div className="rounded-lg h-10 bg-base-800 flex flex-col items-center justify-center w-24 xl:w-28 xl:flex-row xl:gap-2 px-2">
              <div className="w-full min-w-0 ">
                <span className="text-base-300 text-xs xl:text-sm font-medium truncate block">
                  {item.mainMarket.draw.name}
                </span>
              </div>
              {(!item.mainMarket.draw.odds || Number(item.mainMarket.draw.odds) <= LOCKED_ODDS_THRESHOLD) ? (
                <span className="body-txtColor-1 text-xs font-medium xl:text-sm">
                  <LockSvg />
                </span>
              ) : (
                <span className="text-base-900 text-xs xl:text-sm font-medium">
                  {item.mainMarket.draw.odds}
                </span>
              )}
            </div>
          )}
          {item.mainMarket?.awayWin && (
            <div className="rounded-lg h-10 background-1 flex flex-col items-center justify-center w-24 xl:w-36 xl:flex-row xl:gap-2 px-2">
              <div className="w-full min-w-0 ">
                <span className="text-base-900 text-xs xl:text-sm font-medium truncate block">
                  {item.mainMarket.awayWin.name}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                {(!item.mainMarket.awayWin.odds || Number(item.mainMarket.awayWin.odds) <= LOCKED_ODDS_THRESHOLD) ? (
                  <span className="text-base-900 text-xs xl:text-sm font-medium">
                    <LockSvg />
                  </span>
                ) : (
                  <span className="text-base-900 text-xs xl:text-sm font-medium">
                    {item.mainMarket.awayWin.odds}
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