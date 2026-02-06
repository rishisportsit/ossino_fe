import PageHeader from 'components/shared/PageHeader';
import Select from 'components/shared/Select';

import { useState, useEffect } from 'react';
import { standingsApi } from 'api/standings/standings.api';
import LoadingSpinner from 'components/shared/ui/LoadingSpinner';


import { config } from 'config/index';

const noofRows = config.standingsFullPageSize;
const season = config.seasons;


const StandingsPage = () => {

  const [leagues, setLeagues] = useState<string[]>([]);
  const [allStandings, setAllStandings] = useState<Record<string, import('api/standings/standings.types').Standing[]>>({});
  const [selectedLeague, setSelectedLeague] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await standingsApi.getStandings(season, noofRows);
        const arr = Array.isArray(data) ? data : [data];
        const leagueNames = arr.map((item) => item.league).filter(Boolean);
        const standingsMap: Record<string, import('api/standings/standings.types').Standing[]> = {};
        arr.forEach((item) => {
          if (item.league) standingsMap[item.league] = item.standings || [];
        });
        setLeagues(leagueNames);
        setAllStandings(standingsMap);
        setSelectedLeague(leagueNames[0] || '');
      } catch (e) {
        setLeagues([]);
        setAllStandings({});
        setError('Failed to load standings');
      } finally {
        setLoading(false);
      }
    };
    fetchLeagues();

    return () => {
      setLeagues([]);
      setAllStandings({});
      setSelectedLeague('');
      setError(null);
    };
  }, []);

  const standings = selectedLeague ? allStandings[selectedLeague] || [] : [];
  if (loading !== true && standings?.length === 0) return null;

  // Group standings by group if group property exists
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

  return (
    <div className="relative p-4 pt-[76px] md:pt-0 xl:p-5 mb-2 flex flex-col overflow-hidden min-h-svh md:min-h-full md:-mb-4">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-base-900 bg-opacity-80">
          <LoadingSpinner />
        </div>
      )}
      <div className={loading ? 'pointer-events-none opacity-50' : ''}>
        <PageHeader label="Standings" className="xl:px-0" />

        <div className="w-full xl:flex mb-3">
          <Select
            className="px-3 py-0 h-10 w-full bg-base-775 xl:bg-base-700 xl:max-w-full"
            dropDownClassName="w-full"
            withChevron
            chevronClassName="bg-base-775 xl:bg-base-700"
            closeOnClick
            list={
              <div className="px-4 py-0 xl:pr-2">
                {leagues.filter((label) => label !== selectedLeague).map((label) => (
                  <div
                    key={label}
                    className="border-b border-b-borderdefault py-3 text-sm last:border-none hover:text-primary-1"
                    onClick={() => setSelectedLeague(label)}
                  >
                    {label}
                  </div>
                ))}
              </div>
            }
          >
            <div className="flex gap-2.5 items-center text-sm">{selectedLeague}</div>
          </Select>
        </div>

        {error ? (
          <div className="text-center py-8 text-status-error-100">{error}</div>
        ) : standings.length > 0 ? (
          hasGroups ? (
            // Show all groups when groups exist
            groupNames.map((groupName) => (
              <div key={groupName} className="shadow-wrapper relative mb-6 last:mb-0">
                <div className="mb-3 py-2">
                  <h3 className="text-sm font-semibold text-primary-1 uppercase tracking-wide">
                    {groupName}
                  </h3>
                </div>

                <div className="no-scrollbar overflow-x-auto">
                  <div className="table-header flex flex-row justify-start gap-0">
                    <div className="flex text-xs items-center text-base-300 h-11 min-w-[85px] font-medium leading-4">
                      <div className="flex items-center cursor-pointer">
                        <span className="text-xs font-medium leading-4 text-base-300">Rank</span>
                      </div>
                    </div>
                    <div className="flex text-xs pl-3 items-center justify-start text-base-300 h-11 font-medium min-w-[150px] lg:w-[300px] text-center leading-4 lg:ml-2">
                      Club
                    </div>
                    <div className="flex text-xs items-center min-w-[120px] lg:w-[200px] text-base-300 h-11 font-medium leading-4">
                      <div className="flex items-center cursor-pointer">
                        <span className="text-xs font-medium leading-4 text-base-300">G</span>
                      </div>
                    </div>
                    <div className="flex text-xs items-center min-w-[100px] text-base-300 h-11 font-medium leading-4">
                      <span className="inline-block lg:hidden text-base-300">P</span>
                      <div className="flex items-center cursor-pointer">
                        <span className="text-xs font-medium leading-4 text-base-300">P</span>
                      </div>
                    </div>
                    <div className="flex text-xs items-center ml-auto justify-center text-base-300 h-11 font-medium min-w-[48px] lg:w-[100px] text-center leading-4">
                      W
                    </div>
                  </div>
                  <div className="table-content flex flex-col gap-2">
                    {groupedStandings[groupName].map((item) => (
                      <div
                        key={`${groupName}-${item.rank}-${item.clubName || '-'}`}
                        className="flex flex-row no-scrollbar overflow-visible w-fit md:w-full justify-start items-center box-border h-11 text-sm border border-base-800 xl:border-base-700 bg-base-800 rounded-xl pl-0 pr-0"
                      >
                        <div className="min-w-[85px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
                          {item.rank}
                        </div>
                        <div className="flex items-center gap-1 min-w-[150px] lg:w-[300px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
                          {item.logoUrl ? (
                            <img src={item.logoUrl} alt={item.clubName || 'Team Logo'} className="w-4 h-4" />
                          ) : (
                            <span className="w-4 h-4" />
                          )}
                          <div>{item.clubName || '-'}</div>
                        </div>
                        <div className="flex items-center min-w-[120px] lg:w-[200px] gap-1 text-xs lg:text-sm leading-[18px]">
                          {item.goals}
                        </div>
                        <div className="min-w-[100px] text-xs lg:text-sm leading-[18px]">
                          <div className="flex flex-row items-center align-items-center gap-1">
                            {item.points}
                          </div>
                        </div>
                        <div className="flex min-w-[48px] lg:w-[100px] items-center justify-center ml-auto">
                          {item.wins}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Show single table when no groups
            <div className="shadow-wrapper relative">
              <div className="no-scrollbar overflow-x-auto">
                <div className="table-header flex flex-row justify-start gap-0">
                  <div className="flex text-xs items-center text-base-300 h-11 min-w-[85px] font-medium leading-4">
                    <div className="flex items-center cursor-pointer">
                      <span className="text-xs font-medium leading-4 text-base-300">Rank</span>
                    </div>
                  </div>
                  <div className="flex text-xs pl-3 items-center justify-start text-base-300 h-11 font-medium min-w-[150px] lg:w-[300px] text-center leading-4 lg:ml-2">
                    Club
                  </div>
                  <div className="flex text-xs items-center min-w-[120px] lg:w-[200px] text-base-300 h-11 font-medium leading-4">
                    <div className="flex items-center cursor-pointer">
                      <span className="text-xs font-medium leading-4 text-base-300">G</span>
                    </div>
                  </div>
                  <div className="flex text-xs items-center min-w-[100px] text-base-300 h-11 font-medium leading-4">
                    <span className="inline-block lg:hidden text-base-300">P</span>
                    <div className="flex items-center cursor-pointer">
                      <span className="text-xs font-medium leading-4 text-base-300">P</span>
                    </div>
                  </div>
                  <div className="flex text-xs items-center ml-auto justify-center text-base-300 h-11 font-medium min-w-[48px] lg:w-[100px] text-center leading-4">
                    W
                  </div>
                </div>
                <div className="table-content flex flex-col gap-2">
                  {standings.map((item) => (
                    <div
                      key={item.rank + '-' + (item.clubName || '-')}
                      className="flex flex-row no-scrollbar overflow-visible w-fit md:w-full justify-start items-center box-border h-11 text-sm border border-base-800 xl:border-base-700 bg-base-800 rounded-xl pl-0 pr-0"
                    >
                      <div className="min-w-[85px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
                        {item.rank}
                      </div>
                      <div className="flex items-center gap-1 min-w-[150px] lg:w-[300px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
                        {item.logoUrl ? (
                          <img src={item.logoUrl} alt={item.clubName || 'Team Logo'} className="w-4 h-4" />
                        ) : (
                          <span className="w-4 h-4" />
                        )}
                        <div>{item.clubName || '-'}</div>
                      </div>
                      <div className="flex items-center min-w-[120px] lg:w-[200px] gap-1 text-xs lg:text-sm leading-[18px]">
                        {item.goals}
                      </div>
                      <div className="min-w-[100px] text-xs lg:text-sm leading-[18px]">
                        <div className="flex flex-row items-center align-items-center gap-1">
                          {item.points}
                        </div>
                      </div>
                      <div className="flex min-w-[48px] lg:w-[100px] items-center justify-center ml-auto">
                        {item.wins}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-8 text-base-400">No standings data found.</div>
        )}
      </div>
    </div>
  );
};

export default StandingsPage;