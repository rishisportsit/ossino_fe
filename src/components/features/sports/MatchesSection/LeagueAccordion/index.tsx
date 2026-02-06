import { useState } from 'react';
import { League } from '../types';
import { cn } from 'helpers/ui';
import styles from './LeagueAccordion.module.css';
import MatchItem from '../MatchItem';
import { Link } from 'react-router-dom';
import { Skeleton } from 'components/shared/ui/Skeleton';

import Icon from 'components/shared/Icon';
import arrowDown from '/icons/arrowDown.svg?url';

interface LeagueAccordionProps {
  league: League;
  activeTab?: string;
  selectedOverUnder: string;
  SportsIdForDesktop?: string | null;
  defaultMarketsForSport?: string | null;
  popularHighlightsLoading?: boolean;
  liveMatchesLoading?: boolean;
  upcomingMatchesLoading?: boolean;
  index?: number;
  addingSelections: any[];
  setAddingSelections: React.Dispatch<React.SetStateAction<any[]>>;
  showAllByDefault?: boolean;
}

const LeagueAccordion = ({ league, activeTab, selectedOverUnder, popularHighlightsLoading, liveMatchesLoading, upcomingMatchesLoading, index, addingSelections, setAddingSelections, SportsIdForDesktop, defaultMarketsForSport, showAllByDefault = false }: LeagueAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(index === 0 ? true : false);
  const [showAllMatches, setShowAllMatches] = useState(showAllByDefault);

  const displayedMatches = showAllMatches ? league?.matches : league?.matches?.slice(0, 2);
  const hasMoreMatches = league?.matches?.length > 2;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) setShowAllMatches(false);
  };

  const handleLoadMore = () => setShowAllMatches(true);

  const isLoading =
    (activeTab === "popular" && popularHighlightsLoading) ||
    (activeTab === "live" && liveMatchesLoading) ||
    (activeTab === "upcoming" && upcomingMatchesLoading);

  return (
    <div className="bg-base-750 rounded-xl overflow-hidden">
      {/* League Header */}
      <div className={cn("flex items-center justify-between p-4 cursor-pointer transition-colors",
        {
          "hover:bg-base-680 hover:rounded-xl": !isExpanded,
        }
      )}
        onClick={toggleExpanded}
      >

        <div className="flex items-center space-x-3">
          {isLoading ? (
            <Skeleton className="w-48 h-6 rounded" />
          ) : (
            <Link to={`/sports/league/${league?.sportid}/${league?.segmentid}/${league?.leagueId}`}>
              <h3 className="body-txtColor-1 font-medium">{league?.name}</h3>
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Expand/Collapse Arrow */}
          <div className="flex items-center">
            <Icon id="arrowDownIcon" href={arrowDown} className={cn("w-4 h-4 shrink-0 transition-transform duration-300 body-txtColor-1 origin-center",
              { "rotate-90": isExpanded }
            )}
            />
          </div>
        </div>
      </div>

      {/* League Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${isExpanded
          ? 'max-h-[800px] opacity-100 overflow-auto no-scrollbar'
          : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 pb-4 space-y-4">
          <>
            {displayedMatches?.map((match, index: number) => (
              <MatchItem
                key={`${match.eventCode || match.marketCount || index}-${selectedOverUnder}`}
                match={match}
                selectedOverUnder={selectedOverUnder}
                isLoading={isLoading}
                addingSelections={addingSelections}
                setAddingSelections={setAddingSelections}
                activeTab={activeTab}
                SportsIdForDesktop={SportsIdForDesktop}
                defaultMarketsForSport={defaultMarketsForSport}
              />
            ))}

            {/* Load More Button */}
            {!showAllByDefault && hasMoreMatches && !showAllMatches && (
              <div className="flex justify-center">
                {isLoading ? (
                  <Skeleton className="w-24 h-6 rounded" />
                ) : (
                  <button
                    onClick={handleLoadMore}
                    className="flex items-center gap-2 text-special-2 transition-colors text-sm"
                  >
                    Load more
                    <div className={cn('w-4 h-4', styles.loadMoreIcon)} />
                  </button>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default LeagueAccordion;
