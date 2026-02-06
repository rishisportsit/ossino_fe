
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { fetchAllSports } from 'store/SportsHomePage/slice';
import Icon from 'components/shared/Icon';
import arrowDown from '/icons/arrowDown.svg?url';
import { cn } from 'helpers/ui';
import { getIcons } from 'helpers/common';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SportsCountriesLeaguesAccordion.module.css';
import MenuListLoader from '../SideBar/MenuListLoader';

const SportsCountriesLeaguesAccordion = ({ isOpen = true, onClick }: { isOpen: boolean; onClick?: () => void }) => {
  const dispatch = useAppDispatch();
  const { data: sports, loading } = useAppSelector((state) => state.sportsBook.data.allSports);
  const [openSports, setOpenSports] = useState<Record<string, boolean>>({});
  const [openSegmentBySport, setOpenSegmentBySport] = useState<Record<string, string | null>>({});

  const navigation = useNavigate();

  useEffect(() => {
    if (!sports.length) dispatch(fetchAllSports());
  }, [dispatch, sports.length]);

  useEffect(() => {
    if (sports.length) {
      setOpenSports((prev) => {
        if (Object.keys(prev).length) return prev;
        const initial: Record<string, boolean> = {};
        sports.forEach((sport: any, idx: number) => {
          initial[sport.sportId] = false;
        });
        return initial;
      });
      setOpenSegmentBySport((prev) => {
        if (Object.keys(prev).length) return prev;
        const initial: Record<string, string | null> = {};
        sports.forEach((sport: any) => {
          initial[sport.sportId] = null;
        });
        return initial;
      });
    }
  }, [sports]);

  const handleSportToggle = (sportId: string) => {
    setOpenSports((prev) => ({ ...prev, [sportId]: !prev[sportId] }));
  };
  const handleSegmentToggle = (sportId: string, segmentId: string) => {
    setOpenSegmentBySport((prev) => ({
      ...prev,
      [sportId]: prev[sportId] === segmentId ? null : segmentId,
    }));
  };

  const getIconsSVG = (icon: String) => {
    if (icon === "International") return icon?.toLowerCase()?.slice(0, 3);
    return icon?.toLowerCase()?.slice(0, 2)
  }

  const handleNavigationtoInnerPage = (e: React.MouseEvent<HTMLSpanElement>, sport: any) => {
    e.preventDefault();
    e.stopPropagation();
    navigation(`/sports/${(sport?.sportName)?.toLowerCase()?.replaceAll(" ", "-")}/${sport?.sportId}`);
    onClick?.();
  }

  if (loading) {
    return (
      <>
        <div
          className={cn(
            'border-b border-base-600 mt-8 w-full transition-width duration-300',
            { 'xl:w-10': !isOpen },
          )}
        />
        <div className='pt-6'>
          <MenuListLoader isOpen={isOpen} />
        </div>
      </>
    )
  }

  return (
    <>
      <div
        className={cn(
          'border-b border-base-600 mt-8 w-full transition-width duration-300',
          { 'xl:w-10': !isOpen },
        )}
      />
      {(!loading && sports.length > 0) && (
        <>
          {!isOpen ? (
            <div className='pt-2 pb-4 transition-opacity duration-300' />
          ) : (
            <h2 className={cn('body-txtColor-1 text-base font-bold pt-6 pb-4 transition-opacity duration-300', { 'xl:opacity-0': !isOpen })}>ALL SPORTS</h2>
          )}

          <div className={cn('flex flex-col gap-2 items-center', isOpen ? 'w-full' : 'w-10')}>
            {sports?.map((sport: any) => {
              const isSportOpen = openSports[sport.sportId];
              const openSegmentId = openSegmentBySport[sport.sportId];
              return (
                <div key={sport.sportId} className={cn('flex flex-col rounded-xl relative', isOpen ? 'w-full' : 'w-10', { 'bg-base-725': isSportOpen && isOpen })}>
                  <button
                    type="button"
                    title={sport.sportName}
                    onClick={() => handleSportToggle(sport.sportId)}
                    className={cn(
                      'flex items-center body-txtColor-1',
                      'rounded-xl bg-base-750',
                      'transition-colors',
                      { [styles.sportButtonOpen]: isOpen },
                      styles.sportButton,
                      isOpen ? 'w-full justify-between p-0' : 'w-10 h-10 justify-center p-0',
                      {
                        'bg-base-725 body-txtColor-2': isSportOpen,
                      },
                    )}
                  >
                    {isOpen ? (
                      <>
                        <div className="flex items-center">
                          <span className="w-10 h-10 shrink-0 flex items-center justify-center">
                            <svg className="w-5 h-5 fill-secondary-2">
                              <use className="w-5 h-5 fill-secondary-2" href={`/sprite-sports-icons.svg#${sport.sportName?.toLowerCase().replace(/\s+/g, '-')}`}></use>
                            </svg>
                          </span>
                          <span
                            onClick={(e) => handleNavigationtoInnerPage(e, sport)}
                            className={cn(
                              'text-xs',
                              { [styles.sportLabelOpen]: isOpen },
                              styles.sportLabel,
                            )}
                          >
                            {sport.sportName}
                          </span>
                        </div>
                        <span className="w-[24px] h-[24px] flex justify-center items-center xl:rounded-[6px] xl:w-[30px] xl:h-[30px] mr-3 shrink-0">
                          <Icon
                            id="arrowDownIcon"
                            href={arrowDown}
                            className={cn(
                              'w-4 h-4 shrink-0 transition-transform duration-300 body-txtColor-1 origin-center',
                              { 'rotate-90': isSportOpen }
                            )}
                          />
                        </span>
                      </>
                    ) : (
                      <span className="w-10 h-10 shrink-0 flex items-center justify-center">
                        <svg className="w-5 h-5 fill-secondary-2">
                          <use className="w-5 h-5 fill-secondary-2" href={`/sprite-sports-icons.svg#${sport.sportName?.toLowerCase().replace(/\s+/g, '-')}`}></use>
                        </svg>
                      </span>
                    )}
                  </button>

                  {/*SEGMENTS/COUNTRIES ACCORDION */}
                  {isSportOpen && isOpen && sport.segments && (
                    <>
                      <div className='absolute w-[2px] bg-base-700 h-[calc(100%-54px)] top-9 left-5'></div>
                      <div className={cn('pb-2 transition-all duration-300 overflow-auto opacity-0', { 'max-h-[800px] opacity-100 no-scrollbar': isSportOpen })}>
                        {sport.segments.map((segment: any) => {
                          const isSegmentOpen = openSegmentId === segment.segmentId;
                          return (
                            <div key={segment.segmentId} className="w-full flex flex-col">
                              <button
                                type="button"
                                title={segment.segmentName}
                                onClick={() => handleSegmentToggle(sport.sportId, segment.segmentId)}
                                className={cn(
                                  'flex items-center justify-items-center body-txtColor-1 transition-colors pl-8',
                                  { [styles.segmentButtonOpen]: isOpen },
                                  styles.segmentButton,
                                )}
                              >
                                <div className="w-full flex items-center justify-between">
                                  <div className="flex items-center min-w-0 gap-2">
                                    <span className="w-10 h-10 shrink-0 flex items-center justify-center">
                                      <i className={`SB-flag ${getIconsSVG(segment.segmentName)}`} />
                                    </span>
                                    <span
                                      className={cn(
                                        'text-xs capitalize',
                                        { [styles.segmentLabelOpen]: isOpen },
                                        styles.segmentLabel,
                                      )}
                                    >
                                      {segment.segmentName}
                                    </span>
                                  </div>
                                  <span className="w-[24px] h-[24px] flex justify-center items-center mr-2">
                                    <Icon
                                      id="arrowDownIcon"
                                      href={arrowDown}
                                      className={cn(
                                        'w-4 h-4 shrink-0 transition-transform duration-300 body-txtColor-1 origin-center',
                                        { 'rotate-90': isSegmentOpen }
                                      )}
                                    />
                                  </span>
                                </div>
                              </button>
                              {/* LEAGUES LIST */}
                              {isSegmentOpen && segment.leagues && (
                                <ul className="w-full pl-9 pr-1 py-1 flex flex-col gap-1">
                                  {segment.leagues.map((league: any) => (
                                    <li key={league.leagueId} className="w-full">
                                      <Link
                                        to={`/sports/league/${sport.sportId}/${segment.segmentId}/${league.leagueId}`}
                                        className={cn(
                                          'w-full flex items-center justify-between body-txtColor-1 px-3 py-1.5 text-[11px] md:text-xs transition-colors hover:text-primary-1'
                                        )}
                                        onClick={onClick}
                                      >
                                        <span className="flex items-center gap-2 min-w-0">
                                          <span className={`w-5 h-5 ${getIcons('leagueName', league.leagueName)}`} />
                                          <span className="truncate text-left">{league.leagueName}</span>
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default SportsCountriesLeaguesAccordion;