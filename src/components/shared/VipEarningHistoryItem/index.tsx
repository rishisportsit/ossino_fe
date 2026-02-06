import { format } from 'date-fns';

import { VipEarningHistoryType } from 'store/vip/types';
import { type VipEarningHistory } from 'store/vip/slice';

import Icon from '../Icon';
import { cn } from 'helpers/ui';
import { formatNumber } from 'helpers/numbers';
import gamepad from '/icons/gamepad.svg?url';
import profile2user from '/icons/profile2user.svg?url';

const types = {
  [VipEarningHistoryType.FriendSignedUp]: {
    label: 'Friend Signed Up',
    icon: (
      <Icon
        id="profile2userIcon"
        href={profile2user}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
  [VipEarningHistoryType.GamePlayed]: {
    label: 'Game Played',
    icon: (
      <Icon
        id="gamepadIcon"
        href={gamepad}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
};

const VipEarningHistoryItem = ({
  history,
  className,
}: {
  history: VipEarningHistory;
  className?: string;
}) => {
  return (
    <div className={cn('rounded-xl p-4 bg-base-800 w-full flex', className)}>
      <div className="rounded-full bg-base-700 flex items-center justify-center w-10 h-10 mr-2">
        {types[history.type].icon}
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-base-200 leading-4">
            {types[history.type].label}
          </p>
          <span
            className={cn('text-sm font-medium leading-4', {
              'text-secondary-1': history.value > 0,
              'text-status-error-200': history.value < 0,
            })}
          >
            {formatNumber(history.value, 0, 'en', 
              { signDisplay: 'exceptZero', })
            }
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-base-400 leading-4">
            {history.name}
          </span>
          <span className="text-xs text-base-400 leading-4">
            {format(new Date(history.date), 'dd MMM yyyy')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VipEarningHistoryItem;
