import React, { useState } from 'react';
import LinkWithArrow from 'components/shared/ui/LinkWithArrow';
import type { ResultData } from './types';
import { getIcons } from 'helpers/common';
import { Fixture } from 'api/SportsHomePage/sportsHomePage.types';
import { Link } from 'react-router-dom';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';

const Details = ({ data }: { data: Fixture }) => {
  return (
    <div>
      <p className="text-base-200 text-xs font-medium mb-2">{data?.leagueName}</p>
      <Link to={`/sports/event/${data?.providerFixtureId}`} className="flex flex-row items-center gap-4 pl-2">
        {/* Home Team */}
        <div className="flex items-center gap-2 w-[45%] min-w-0">
          <span className={`min-w-5 min-h-5 ${getIcons("homeName", data?.homeName)}`} />
          <span className="text-xs body-txtColor-1 truncate overflow-hidden whitespace-nowrap">{data?.homeName}</span>
        </div>
        {/* Away Team */}
        <div className="flex items-center gap-2 w-[45%] min-w-0">
          <span className={`min-w-5 min-h-5 ${getIcons("awayName", data?.awayName)}`} />
          <span className="text-xs body-txtColor-1 truncate overflow-hidden whitespace-nowrap">{data.awayName}</span>
        </div>
      </Link>
    </div>
  );
};

const Card = ({ data }: { data: ResultData }) => {
  const [visibleCount, setVisibleCount] = useState(2);

  const matches = (data as any)?.matches || [];
  const handleLoadMore = () => setVisibleCount((prev) => prev + 2);
  const allVisible = visibleCount >= matches.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">{data.name}</p>
      </div>
      <div className="rounded-xl py-5 px-2 flex flex-col gap-6 bg-base-700">
        {matches.slice(0, visibleCount).map((match: Fixture) => (
          <Details key={match?.providerFixtureId} data={match} />
        ))}
      </div>
      {!allVisible && matches.length > 2 && (
        <div className="flex justify-center">
          <Button variant="text" onClick={handleLoadMore} className="flex items-center gap-2">
            Load more
            <Icon
              id="arrowDownIcon"
              href="/icons/arrowDown.svg"
              className="w-4 h-3 text-primary-1"
            />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Card;
