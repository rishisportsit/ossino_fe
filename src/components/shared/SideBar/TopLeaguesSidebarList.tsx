import { useAppSelector } from 'store/index';
import { selectTopLeaguesData } from 'store/SportsHomePage/selectors';
import LeagueCard from 'components/features/sports/TopLeaguesSection/LeagueCard';
import { cn } from 'helpers/ui';
import MenuListLoader from './MenuListLoader';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { useLocation } from 'react-router-dom';

const TopLeaguesSidebarList = ({ isOpen, onClick }: { isOpen: boolean; onClick?: () => void }) => {
  const topLeaguesState = useAppSelector(selectTopLeaguesData);
  const topLeagues = topLeaguesState?.result || [];
  const isLoading = topLeaguesState?.loading || false;
  const { screenWidth } = useBreakpoint();
  const xl = screenWidth >= BREAKPOINTS.md;
  const { pathname } = useLocation();

  const isLeagueSelected = (sportId: number | undefined, segmentId: number | undefined, leagueId: number | undefined) => {
    if (!sportId || !segmentId || !leagueId) return false;
    return pathname.includes(`/sports/league/${sportId}/${segmentId}/${leagueId}`);
  };

  if (!xl) {
    if (!isLoading && (!topLeagues || topLeagues.length === 0)) return null;
    return (
      <>
        <div className="border-b-2 border-gray-700 mt-6 w-full" />
        {isLoading ? (
          <div className='pt-6'>
            <MenuListLoader isOpen={isOpen} />
          </div>
        ) : (
          <>
            <h2 className="body-txtColor-1 text-base font-bold pt-6 pb-4">
              Top Leagues
            </h2>
            <div className="flex flex-col gap-2">
              {topLeagues.map((league, idx) => (
                <LeagueCard
                  key={league.leagueId || idx} league={league}
                  iconSizeClass="w-5 h-5" isOpen={isOpen}
                  selected={isLeagueSelected(league.sportId, league.segmentId, league.leagueId)}
                  onClick={onClick}
                />
              ))}
            </div>
          </>
        )}
      </>
    );
  }

  if (isLoading) {
    return (
      <div className='pt-6'>
        <MenuListLoader isOpen={isOpen} />
      </div>
    )
  }

  if (!topLeagues || topLeagues.length === 0) return null;
  return (
    <>
      {!isOpen ? (
        <div className='pt-2 pb-4 transition-opacity duration-300' />
      ) : (
        <h2
          className={cn(
            'body-txtColor-1 text-base font-bold pt-6 pb-4 transition-opacity duration-300',
            { 'xl:opacity-0': !isOpen },
          )}
        >
          Top Leagues
        </h2>
      )}

      <div className="flex flex-col gap-2">
        {topLeagues.map((league, idx) => (
          <LeagueCard
            key={league.leagueId || idx} league={league}
            iconSizeClass="w-5 h-5" isOpen={isOpen}
            selected={isLeagueSelected(league.sportId, league.segmentId, league.leagueId)}
            onClick={onClick}
          />
        ))}
      </div>
    </>
  );
};

export default TopLeaguesSidebarList;