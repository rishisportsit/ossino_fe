import { LeagueItem } from 'api/SportsHomePage/sportsHomePage.types';
import { getIcons } from 'helpers/common';
import { Link } from 'react-router-dom';

import { cn } from 'helpers/ui';
import styles from './styles.module.css';
import { SidebarClassConfig } from '..';

interface LeagueCardProps {
  league: LeagueItem;
  sportId?: number;
  segmentId?: number;
  leagueId?: number;
  leaagueLogo?: string;
  iconSizeClass?: string;
  isOpen?: boolean;
  isSideBarClass?: SidebarClassConfig;
  selected?: boolean;
  onClick?: () => void;
}

const LeagueCard = ({ league, iconSizeClass = 'w-6 h-6', isOpen = true, isSideBarClass, selected = false, onClick }: LeagueCardProps) => {
  return (
    <div
      className={cn(
        'rounded-[12px] flex items-center overflow-hidden body-txtColor-1',
        { 'bg-secondary-light-2': selected },
        { 'bg-base-750': !selected },
        { 'border border-secondary-light-2': selected },
        { [styles.open]: isOpen },
        styles.card,
      )}
    >
      <Link
        to={`/sports/league/${league.sportId}/${league.segmentId}/${league.leagueId}`}
        className={cn(`w-full flex items-center ${isSideBarClass?.padding}`, styles.link)}
        onClick={onClick}
      >
        <span className={cn('w-10 h-10 shrink-0 flex items-center justify-center')}>
          <div className={getIcons('leagueName', league.leagueName || '', iconSizeClass)} />
        </span>
        <span
          className={cn(
            'text-xs font-medium text-nowrap pr-2',
            { 'body-txtColor-2': selected },
            { 'body-txtColor-1': !selected },
            { [styles.labelOpen]: isOpen },
            styles.label,
          )}
        >
          {league.leagueName}
        </span>
      </Link>
    </div>
  );
};

export default LeagueCard;
