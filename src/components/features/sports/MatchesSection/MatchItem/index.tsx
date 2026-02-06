import Select from 'components/shared/Select';
import Icon from 'components/shared/Icon';
import { Fixture } from 'api/SportsHomePage/sportsHomePage.types';
import { SportWiseMultiMarkets } from 'helpers/SportWiseMultiMarkets';
import { useEffect, useMemo, useState } from 'react';
import { CiLock } from "react-icons/ci";
import { getIcons, getTimefromMatch } from 'helpers/common';
import { Link, useNavigate } from 'react-router-dom';
import { handleSelectionsGlobal } from 'helpers/betConfigHelpers';
import { LOCKED_ODDS_THRESHOLD } from 'constants/odds';
import MatchItemSkeleton from './MatchItemSkeleton';
import ChartIcon from '/icons/chart.svg?url';
import { useBetslipValidation } from 'hooks/useBetslipValidation';
import { findSelectionByHeader } from 'helpers/selectionFinder';

interface MatchItemProps {
  match: Fixture;
  activeTab?: string;
  selectedOverUnder: string | null;
  SportsIdForDesktop?: string | null;
  defaultMarketsForSport?: string | null;
  isLoading?: boolean;
  addingSelections: any[];
  setAddingSelections: React.Dispatch<React.SetStateAction<any[]>>;
}

const MatchItem = ({ match, selectedOverUnder, isLoading, addingSelections, setAddingSelections, SportsIdForDesktop, defaultMarketsForSport }: MatchItemProps) => {
  const [goalsValue, setGoalsValue] = useState<string>("");
  const navigate = useNavigate()
  useEffect(() => {
    const filteredMarkets = match?.markets
      ?.filter((market) => String(market?.marketTemplateId) === String(selectedOverUnder))
      ?.sort((a, b) => parseFloat(a.line) - parseFloat(b.line));

    const initialLine = filteredMarkets?.[0]?.line || "";
    setGoalsValue(initialLine);
  }, [match, selectedOverUnder]);
  useBetslipValidation({ match, addingSelections, setAddingSelections });

  const ismarketTemplateIdOne = useMemo(() => SportWiseMultiMarkets?.find((each: any) => each?.sportId === Number(SportsIdForDesktop)), [SportsIdForDesktop]);
  const findMarketTemplateIdOne = useMemo(() => match?.markets?.find((m) => m?.marketTemplateId === defaultMarketsForSport),
    [match, defaultMarketsForSport]
  );
  const MarketHeader = SportWiseMultiMarkets?.find((sport: any) => sport?.sportId === Number(SportsIdForDesktop))
    ?.markets?.marketsSupported?.find(
      (market: any) => market?.marketTemplateId === selectedOverUnder
    );
  const MarketDropdown = useMemo(() => {
    return match?.markets
      ?.filter((market) => String(market?.marketTemplateId) === String(selectedOverUnder))
      ?.sort((a, b) => parseFloat(a.line) - parseFloat(b.line));
  }, [match, selectedOverUnder]);


  const basedOnMarketDropdown = MarketDropdown?.filter((market) => market?.line === goalsValue);

  const sport = SportWiseMultiMarkets?.find(
    (sport: any) => sport?.sportId === Number(SportsIdForDesktop)
  );

  const findSubMarketHeader = sport?.markets?.marketsSupported?.find(
    (market: any) =>
      market?.marketWithSubMarket === true &&
      market?.marketTemplateId === selectedOverUnder
  );

  if (isLoading) {
    return (
      <MatchItemSkeleton 
        showLiveBadge={match?.fixtureStatusName === "Live"}
        showScores={match?.fixtureStatusName === "Live"}
      />
    );
  }
  const handleSelections = (selection: any, match: any, marketId?: string | number) => {
    handleSelectionsGlobal(setAddingSelections, selection, match, marketId);
  };

  const getTimefromLiveMatch = (match: Fixture) => {
    if (match?.fixtureStatusName === "Live" && match?.sportId === 2) return match?.currentMinute;
    if (match?.fixtureStatusName === "Live" && match?.sportId === 5) return match?.event_status || match?.eventStatus;
    if (match?.fixtureStatusName === "Live" && match?.sportId === 21) return match?.event_status || match?.eventStatus;

    const eventStatus = match?.event_status || "";
    const findHalfStatus = Number(eventStatus?.match(/\d+/)?.[0]);
    return `${findHalfStatus}H ${match?.currentMinute}`
  };

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

  return (
    <div className="p-4 border border-third rounded-xl overflow-visible">
      {/* Top section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {match?.fixtureStatusName === "Live" && (
            <>
              <div className="bg-state-negative body-txtColor-1 px-2 py-1 rounded-full text-xs font-medium h-5 flex items-center">
                Live
              </div>
              <div className="w-px h-4 bg-base-500"></div>
            </>
          )}

          <div className="flex items-center space-x-1">
            <Icon
              id="timerIcon"
              href="/icons/timer.svg"
              className="size-5 min-w-5 text-secondary-light-3"
            />
            <div className="flex items-center space-x-1">
              <span className="text-base-500 text-sm font-medium leading-tight">
                {match?.fixtureStatusName === "Live" ? (
                  getTimefromLiveMatch(match)
                ) : (
                  getTimefromMatch(match?.fixtureStatusName, match?.fixtureStartDate)
                )}
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <div className="w-px h-4 bg-base-500"></div>
            <Link to={`/sports/league/${match?.sportId}/${match?.segmentId}/${match?.leagueId}`} className="flex items-center gap-2">
              <span className="body-txtColor-1 text-sm">{match?.leagueName}</span>
              <span className={`w-5 h-5 ${getIcons("leagueName", match?.leagueName)}`} />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-base-680 rounded transition-colors">
            <Icon
          id="chartIcon"
          href={ChartIcon}
          className="w-5 h-5 text-primary-1 fill-current"
        />
          </button>
          <button onClick={() => navigate(`/sports/event/${match?.providerFixtureId}`)} className="bg-button-gradient btn-textColor px-2 py-1 rounded-full text-sm font-medium h-5 flex items-center">
            +{match?.marketCount}
          </button>
        </div>
      </div>

      {/* Middle section */}
      {(match?.sportId !== 5 && match?.sportId !== 21 || match?.fixtureStatusName !== "Live") && (
        <div className="flex items-center justify-center mb-4">
          <Link to={`/sports/event/${match?.providerFixtureId}`} className="flex items-center space-x-4 justify-start lg:justify-center min-w-0 lg:min-w-auto w-full">
            <div className="flex items-center space-x-2 flex-1 justify-end min-w-0">
              <span className={`min-w-6 min-h-6 ${getIcons("homeName", match?.translations?.homeName)}`} />
              <span className="body-txtColor-1 font-normal text-sm truncate md:truncate-none text-nowrap">
                {match?.translations?.homeName}
              </span>
            </div>

            {match?.fixtureStatusName !== "Live" && (
              <div className="text-center mx-8 text-base-500 text-sm font-medium flex-shrink-0">
                vs
              </div>
            )}

            {/* Soccer & other Sports Score */}
            {(match?.sportId !== 5 && match?.sportId !== 21 && match?.fixtureStatusName === "Live") && (
              <div className="text-center mx-8">
                <div
                  className="body-txtColor-1 text-sm"
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  {match?.homeScore} : {match?.awayScore}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 flex-1 justify-start min-w-0">
              <span className={`min-w-6 min-h-6 ${getIcons("awayName", match?.translations?.awayName)}`} />
              <span className="body-txtColor-1 font-normal text-sm truncate md:truncate-none text-nowrap">
                {match?.translations?.awayName}
              </span>
            </div>
          </Link>
        </div>
      )}


      {/* Cricket Score */}
      {match?.sportId === 21 && match?.fixtureStatusName === "Live" && (
        <div className="flex items-center justify-start lg:justify-center mb-4">
          <a className="flex gap-2 flex-col w-full justify-start lg:justify-center min-w-0" href="/sports/event/10093129">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className={`min-w-6 min-h-6 ${getIcons("homeName", match?.translations?.homeName)}`} />
                <span className="body-txtColor-1 font-normal text-sm truncate md:truncate-none lg:text-nowrap">{match?.translations?.homeName}</span>
              </div>
              <div className="flex gap-2 text-center mx-8">
                <div className="body-txtColor-1 text-sm">{match?.scores?.split("-")[0].trim() ?? "-"}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className={`min-w-6 min-h-6 ${getIcons("awayName", match?.translations?.awayName)}`} />
                <span className="body-txtColor-1 font-normal text-sm truncate md:truncate-none lg:text-nowrap">{match?.translations?.awayName}</span>
              </div>
              <div className="flex gap-2 text-center mx-8">
                <div className="body-txtColor-1 text-sm">{match?.scores?.split("-")[1].trim() ?? "-"}</div>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Tennis Score */}
      {match?.sportId === 5 && match?.fixtureStatusName === "Live" && (
        <div className="flex items-center justify-start lg:justify-center mb-4 ">
          <a className="flex gap-2 flex-col w-full justify-start lg:justify-center min-w-0" >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className={`min-w-6 min-h-6 ${getIcons("homeName", match?.translations?.homeName)}`} />
                <span className="body-txtColor-1 font-normal text-sm truncate md:truncate-none lg:text-nowrap">{match?.translations?.homeName}</span>
              </div>
              <div className="flex gap-2 text-center mx-8">
                {/* Current serving indication */}
                {/* <div className="flex items-center justify-center body-txtColor-1 text-sm w-6 h-6">
                <span className='bg-button-gradient btn-textColor w-2 h-2 block rounded-full'></span>
              </div> */}
                <div className="text-special-2 text-sm min-w-6">{getTenniesScores(match?.scores)?.currentScores?.split("-")[0]}</div>
                {getTenniesScores(match?.scores)?.setScores?.map((set, index) => {
                  return (
                    <div key={index} className="body-txtColor-1 text-sm min-w-6">{set?.player1Score}</div>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className={`min-w-6 min-h-6 ${getIcons("awayName", match?.translations?.awayName)}`} />
                <span className="body-txtColor-1 font-normal text-sm truncate md:truncate-none lg:text-nowrap">{match?.translations?.awayName}</span>
              </div>
              <div className="flex gap-2 text-center mx-8">
                <div className="text-special-2 text-sm min-w-6">{getTenniesScores(match?.scores)?.currentScores?.split("-")[1]}</div>
                {getTenniesScores(match?.scores)?.setScores?.map((set, index) => {
                  return (
                    <div key={index} className="body-txtColor-1 text-sm min-w-6">{set?.player2Score}</div>
                  )
                })}
              </div>
            </div>
          </a>
        </div >
      )}


      {/* Bottom section */}
      <div className="w-full overflow-visible" >
        {/* Headers */}
        <div className="grid gap-3 mb-0.5 grid-auto-fit">
          {ismarketTemplateIdOne &&
            ismarketTemplateIdOne?.markets?.marketsSupported[0]?.displayHeaders
              ?.split(",")
              .map((each: string, index: number) => {
                if (!each) return null;
                return (
                  <span
                    key={`${each}-${index}`}
                    className="hidden lg:block text-base-500 text-sm text-center"
                  >
                    {each}
                  </span>
                );
              })}

          {findSubMarketHeader?.marketWithSubMarket && (
            <span className="text-base-500 text-sm text-center">
              {findSubMarketHeader?.subMarketHeader}
            </span>
          )}

          {MarketHeader?.displayHeaders?.split(",").map((header: string, index: number) => (
            <span key={`${header}-${index}`} className="text-base-500 text-sm text-center">
              {header}
            </span>
          ))}
        </div>

        {/* Odds Buttons */}
        <div className="grid gap-3 grid-auto-fit">
          {/* Default market selections */}
          {findMarketTemplateIdOne?.selections?.map((selection, index) => {
            const isDisabled = !selection?.decimalOdds || Number(selection?.decimalOdds) <= LOCKED_ODDS_THRESHOLD;
            const isSuspended = selection?.selectionSuspended;

            const isSelected = addingSelections.some(
              (m) =>
                m.providerFixtureId === match.providerFixtureId &&
                m.markets?.some(
                  (mk: any) =>
                    String(mk.marketId) === String(findMarketTemplateIdOne?.marketId) &&
                    mk.selections?.some((s: any) => s.selectionId === selection.selectionId)
                )
            );

            return isDisabled ? (
              <div
                key={index}
                className="hidden lg:flex w-full h-10 bg-base-675 body-txtColor-1 rounded-lg items-center justify-center cursor-not-allowed"
              >
                <CiLock fontSize={22} />
              </div>
            ) : (
              <button
                key={selection.selectionId}
                onClick={() => handleSelections(selection, match, findMarketTemplateIdOne?.marketId)}
                disabled={isSuspended}
                className={`hidden lg:flex w-full h-10 rounded-lg text-sm items-center justify-center transition-colors
                ${isSelected ? "bg-button-gradient btn-textColor" : "bg-base-680 body-txtColor-1 hover:bg-base-690"}
                ${isSuspended ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {Number(selection?.decimalOdds).toFixed(2)}
              </button>
            );
          })}

          {/* Fallback if no default market selections */}
          {(!findMarketTemplateIdOne?.selections || findMarketTemplateIdOne?.selections?.length === 0) &&
            ismarketTemplateIdOne?.markets?.marketsSupported[0]?.displayHeaders
              ?.split(",")
              ?.map((header: string, index: number) => (
                <div
                  key={`${header}-${index}`}
                  className="hidden lg:flex w-full h-10 bg-base-675 body-txtColor-1 rounded-lg items-center justify-center cursor-not-allowed"
                >
                  <CiLock fontSize={22} />
                </div>
              ))}

          {/* Submarket Dropdown */}
          {findSubMarketHeader && (
            MarketDropdown?.length > 0 ? (
              <Select
                className="bg-base-680 body-txtColor-1 text-sm rounded-lg border-0 h-10 flex items-center justify-center"
                dropDownClassName="bg-base-680 body-txtColor-1"
                withChevron
                chevronClassName="!bg-inherit"
                closeOnClick
                usePortal
                list={
                  <div className="p-2 space-y-1">
                    {MarketDropdown?.map((market, index: number) => (
                      <div
                        key={`${market?.line}-${index}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setGoalsValue(market?.line);
                          setTimeout(() => {
                            document.dispatchEvent(new MouseEvent('mousedown', {
                              bubbles: true,
                              cancelable: true,
                            }));
                          }, 0);
                        }}
                        className={`px-2 py-1 hover:bg-base-690 rounded cursor-pointer${goalsValue === market.line ? ' bg-base-690' : ''}`}
                      >
                        {market?.line}
                      </div>
                    ))}
                  </div>
                }
              >
                <span className="flex items-center justify-center w-full text-center">
                  {goalsValue || 'Select...'}
                </span>
              </Select>
            ) : (
              <div className="bg-base-675 body-txtColor-1 rounded-lg text-sm h-10 flex items-center justify-center cursor-not-allowed w-full">
                <CiLock fontSize={22} />
              </div>
            )
          )}

          {/* Main selections */}
          {MarketHeader?.displayHeaders?.split(",").map((header: string, colIndex: number) => {
            const market = basedOnMarketDropdown?.[0];
            const homeName = (match?.translations?.homeName || match?.homeName)?.toLowerCase();
            const awayName = (match?.translations?.awayName || match?.awayName)?.toLowerCase();
            
            const selection = findSelectionByHeader(market, header, homeName, awayName, colIndex);
            
            if (selection?.decimalOdds) {
              const isSelected = addingSelections?.some(
                (m) =>
                  m.providerFixtureId === match.providerFixtureId &&
                  m.markets?.some(
                    (mk: any) =>
                      String(mk.marketId) === String(market?.marketId) &&
                      mk.selections?.some((s: any) => s.selectionId === selection.selectionId)
                  )
              );
              const isSuspended = selection?.selectionSuspended;
              return (
                (market?.marketStatusName?.toLowerCase() !== "active" || selection?.selectionStatus?.toLowerCase() !== "active" || Number(selection?.decimalOdds) <= LOCKED_ODDS_THRESHOLD) ? (
                  <div
                    key={colIndex}
                    className="flex bg-base-675 body-txtColor-1 rounded-lg text-sm h-10 items-center justify-center cursor-not-allowed"
                  >
                    <CiLock fontSize={22} />
                  </div>
                ) : (
                  <button
                    key={colIndex}
                    onClick={() => handleSelections(selection, match, market?.marketId)}
                    disabled={isSuspended}
                    className={`rounded-lg text-sm transition-colors h-10 flex items-center justify-center ${isSelected ? "bg-button-gradient btn-textColor" : "bg-base-680 text-white hover:bg-base-690"} ${isSuspended ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {Number(selection?.decimalOdds).toFixed(2)}
                  </button>
                )
              );
            } else {
              return (
                <div
                  key={colIndex}
                  className="flex bg-base-675 body-txtColor-1 rounded-lg text-sm h-10 items-center justify-center cursor-not-allowed"
                >
                  <CiLock fontSize={22} />
                </div>
              );
            }
          })}
        </div>
      </div >
    </div >
  );
};

export default MatchItem;