
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarListSkeleton from 'components/shared/SidebarListSkeleton';
import { useAppDispatch, useAppSelector } from 'store/index';
import { getStandings } from 'store/standings/slice';
import {
  selectAllStandings,
  selectStandingsLoading,
  selectStandingsLeague,
} from 'store/standings/selectors';

const SportsStandings: React.FC = () => {
  const dispatch = useAppDispatch();
  const standings = useAppSelector(selectAllStandings);
  const league = useAppSelector(selectStandingsLeague);
  const loading = useAppSelector(selectStandingsLoading);

  useEffect(() => {
    if ((standings?.length ?? 0) > 0) return;
    dispatch(getStandings());
  }, [dispatch, standings.length]);

  if (loading !== true && standings?.length === 0) return null;
  if (loading) return (
    <SidebarListSkeleton 
      title="Standings" 
      subtitle="Loading league..." 
      showSeeAll={true} 
      columnHeaders={['Rank', 'Club', 'G', 'P', 'W']} 
      itemCount={5} 
    />
  );

  // Group standings by group if group property exists and show only first group for sidebar
  const groupedStandings = standings.reduce((acc, item) => {
    const groupName = (item as any).group || 'Main';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item);
    return acc;
  }, {} as Record<string, typeof standings>);

  const groupNames = Object.keys(groupedStandings);
  const hasGroups = groupNames.length > 1 || (groupNames.length === 1 && groupNames[0] !== 'Main');
  const displayGroup = hasGroups ? groupNames[0] : 'Main';
  const displayStandings = hasGroups ? groupedStandings[displayGroup] : standings;
  const displayLeague = hasGroups ? `${league} - ${displayGroup}` : league;

  return (
    <div className="bg-base-725 rounded-xl w-full lg:w-[290px] overflow-hidden">
      <div className="px-4 py-3 bg-base-860 border-b border-base-800">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-[16px] font-regular body-txtColor-1 leading-5">Standings</h3>
            <span className="text-sm font-regular text-base-400">{league}</span>
          </div>
          <Link to="/sports/standings" className="text-primary-2 text-sm font-medium flex items-center">
            See all
            <svg className="w-4 h-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.43799 13.28L11.002 8.93333C11.541 8.41999 11.541 7.57999 11.002 7.06666L6.43799 2.71999" className="stroke-primary-2" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm border-b border-base-800">
        <div className="w-12 text-base-400">Rank</div>
        <div className="w-12 text-base-400">Club</div>
        <div className="w-6 text-center text-base-400">G</div>
        <div className="w-6 text-center text-base-400">P</div>
        <div className="w-6 text-center text-base-400">W</div>
      </div>
      <ul className="divide-y divide-base-800">
        {displayStandings.map((item) => (
          <li key={`${item.rank}-${item.clubName || 'club'}-${item.goals}-${item.points}-${item.wins}`} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2 w-32">
              <div className="w-6 flex justify-center">
                <span className="text-xs text-base-200">{item.rank}</span>
              </div>
              <div className="w-6 flex justify-center">
                {item.logoUrl ? (
                  <img src={item.logoUrl} alt={item.clubName || 'Club'} className="w-5 h-5 object-contain" />
                ) : (
                  <span className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm text-base-200">{item.clubName || '-'}</span>
              </div>
            </div>
            <div className="w-6 text-center text-sm text-base-200">{item.goals}</div>
            <div className="w-6 text-center text-sm text-base-200">{item.points}</div>
            <div className="w-6 text-center text-sm text-base-200">{item.wins}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SportsStandings;
