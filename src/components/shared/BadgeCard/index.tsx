import { type Badge } from 'store/badges/slice';

import { cn } from 'helpers/ui';
import tickCircle from '/tickCircle.svg?url';
import CircleProgress from 'components/shared/ui/CircleProgress';
import Icon from '../Icon';

type BadgeCardProps = {
  onClick?: () => void;
  data: Badge;
};
const BadgeCard = ({ data, onClick }: BadgeCardProps) => {
  return (
    <div
      className={cn('flex flex-col w-full items-center', {
        'cursor-pointer': !!onClick,
      })}
      onClick={onClick}
    >
      <div className="mb-2">
        <CircleProgress
          strokeWidth={2}
          value={data.completed}
          minValue={0}
          maxValue={100}
          mainClassName="stroke-secondary-1"
          secondaryClassName="stroke-[#E0FF88]/[0.55] blur-[3px]"
          bgClassName="stroke-base-700 opacity-1"
        >
          <div className="p-2">
            <div className="rounded-full flex items-center justify-center overflow-hidden relative">
              <img
                src={data.iconUrl ?? '/images/badges/cup.png'}
                className="aspect-square w-full"
                alt=""
              />
              {data.completed < 100 ? (
                <div className="absolute h-full w-full top-0 left-0 backdrop-blur-[10px] bg-base-645/[0.70] rounded-full" />
              ) : null}
            </div>
          </div>
        </CircleProgress>
      </div>
      <p className="font-medium text-sm mb-1 text-center body-txtColor-1">
        {data.name
          .replace(/_/g, ' ')
          .replace(
            /\w\S*/g,
            (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
          )}
      </p>
      <div className="flex items-center gap-1">
        <Icon
          id="tickCircleIcon"
          href={tickCircle}
          className={cn('w-[14px] h-[14px] fill-current', {
            'text-base-500': data.completed < 100,
            'text-secondary-1': data.completed === 100,
          })}
        />
        <span className="text-base-500 text-xs font-medium">
          {data.completed}/100
        </span>
      </div>
    </div>
  );
};

export default BadgeCard;
