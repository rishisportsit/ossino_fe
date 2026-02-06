import { type ButtonHTMLAttributes } from 'react';
import { cn } from 'helpers/ui';
import { LiveMatchesCountResults } from 'api/SportsHomePage/sportsHomePage.types';

type SportTagProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  sport: LiveMatchesCountResults;
  active: boolean;
  size?: 'sm';
};

const toKebabCase = (value?: string) => {
  if (!value) return '';
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

const SportTag = ({ active, sport, size = 'sm', ...props }: SportTagProps) => {
  const iconId = toKebabCase(sport?.sportName);
  const showIcon = sport?.sportName && iconId !== 'all-sports';
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center space-x-2 rounded-xl whitespace-nowrap transition-colors',
        {
          sm: 'px-3 h-10 text-sm  border',
          //lg: 'px-4 h-12 text-lg  border',
        }[size],
        active
          ? 'bg-base-750 text-special-2 font-medium border-special-2'
          : 'bg-base-750 body-txtColor-1 hover:bg-base-600 border-transparent',
      )}
      {...props}
    >
      {showIcon && (
        <svg className="w-5 h-5 fill-secondary-2">
          <use className="w-5 h-5 fill-secondary-2" href={`/sprite-sports-icons.svg#${iconId}`}></use>
        </svg>
      )}
      <span className={cn(active ? 'text-special-2' : 'body-txtColor-1')}>{sport?.sportName}</span>
    </button>
  );
};

export default SportTag;