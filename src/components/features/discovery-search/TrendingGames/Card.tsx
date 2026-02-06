import { Link } from 'react-router-dom';
import { Fixture } from 'api/SportsHomePage/sportsHomePage.types';
import { getFormattedTotalCount, getIcons } from 'helpers/common';

const Team = ({ data }: { data: Fixture }) => {
  return (
    <div className='w-full flex justify-between '>
      <div className="flex gap-1 items-center">
        <div className="size-9 background-1 rounded-full flex items-center justify-center relative z-0">
          <img
            src="/images/sports/playerProps/Ellipse.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
          <span className={getIcons("homeName", data?.translations?.homeName)} />
        </div>
        <span className="font-medium text-xs body-txtColor-1">{data?.translations?.homeName}</span>
      </div>
      <div className="flex gap-1 items-center">
        <div className="size-9 background-1 rounded-full flex items-center justify-center relative z-0">
          <img
            src="/images/sports/playerProps/Ellipse.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
          <span className={getIcons("awayName", data?.translations?.awayName)} />
        </div>
        <span className="font-medium text-xs body-txtColor-1">{data?.translations?.awayName}</span>
      </div>
    </div>
  );
};

const Card = ({ data }: { data: Fixture }) => {

  const { total, formatted } = getFormattedTotalCount(data);

  return (
    <Link to={`/sports/event/${data?.providerFixtureId}`}>
      <div className="rounded-xl w-80 bg-base-735 p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="px-2 h-[22px] flex items-center rounded-full background-1">
            <span className="text-base-900 text-xs font-semibold">
              Trending
            </span>
          </div>
          <span className="text-secondary-2 text-xs font-medium">
            {total <= 0 ? "" : `${formatted} People Bet`}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <Team data={data} />
        </div>
      </div>
    </Link>
  );
};

export default Card;
