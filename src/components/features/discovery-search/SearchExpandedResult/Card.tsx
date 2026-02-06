import { cn } from 'helpers/ui';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import type { ResultData } from './types';
import { Link } from 'react-router-dom';
import { getIcons } from 'helpers/common';
import { useState } from 'react';

const Card = ({ data }: { data: ResultData }) => {
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLoadMore = () => setShowAllMatches(true);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) setShowAllMatches(false);
  };

  return (
    <AccordionItem
      value={data?.id.toString()}
      className="bg-base-800 px-4 rounded-xl"
      onClick={toggleExpanded}
    >
      <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-sm font-medium">
        {data?.name}
      </AccordionTrigger>
      <AccordionContent className="pb-4 flex flex-col gap-2">
        {(showAllMatches ? data?.matches : data?.matches?.slice(0, 2))?.map((match) => {
          return (
            <div key={match?.providerFixtureId} className="rounded-xl px-3 py-2 border border-base-700">
              {/* <div className="flex items-center justify-between mb-4">
            <Date live={"Live"} />
            <Icon id="chartIcon" href="/icons/chart.svg" className="size-5 text-primary-1 fill-current" />
          </div> */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-2">

                  <div className="flex items-center justify-start lg:justify-center my-2">
                    <Link to={`/sports/event/${match?.providerFixtureId}`} className="flex items-center space-x-4 justify-start lg:justify-center min-w-0 lg:min-w-96">
                      <div className="flex justify-start items-center space-x-2 flex-1 min-w-0">
                        <span className={`min-w-6 min-h-6 ${getIcons("homeName", match?.translations?.homeName)}`} />
                        <span className="body-txtColor-1 font-normal text-sm truncate">
                          {match?.translations?.homeName}
                        </span>
                      </div>

                      {match?.fixtureStatusName !== "Live" && (
                        <div className="text-center mx-8 text-base-500 text-sm font-medium flex-shrink-0">
                          vs
                        </div>
                      )}

                      <div className="flex justify-start items-center space-x-2 pl-2 flex-1 min-w-0">
                        <span className={`min-w-6 min-h-6 ${getIcons("awayName", match?.translations?.awayName)}`} />
                        <span className="body-txtColor-1 font-normal text-sm truncate">
                          {match?.translations?.awayName}
                        </span>
                      </div>
                    </Link>
                  </div>
                  {/* <span className="text-xs font-medium order-2">{data.result}</span> */}
                </div>
                {/* <div className="rounded-full px-2 h-5 bg-base-700 flex items-center">
              <span className="text-secondary-2 text-xs">+{data.bets}</span>
            </div> */}
              </div>
            </div>

          );
        })}
        {(!showAllMatches && data?.matches?.length > 2) && (
          <Button variant="text" onClick={handleLoadMore} className="flex items-center w-full gap-2">
            Load more
            <Icon
              id="arrowDownIcon"
              href="/icons/arrowDown.svg"
              className="w-4 h-3 text-primary-1"
            />
          </Button>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Card;