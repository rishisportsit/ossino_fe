import { format } from 'date-fns';
import { type CoinHistory } from 'store/coinsHistory/types';
import { cn } from 'helpers/ui';
import { formatNumber } from 'helpers/numbers';
import Icon from 'components/shared/Icon';
import gamepad from '/icons/gamepad.svg?url';
import fire from '/icons/fire.svg?url';
import profile2user from '/icons/profile2user.svg?url';
import medalStar from '/icons/medalStar.svg?url';

const types = {
  burn: {
    label: 'Coins Burn',
    icon: (
      <Icon
        id="fireIcon"
        href={fire}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
  signup: {
    label: 'Signup Bonus',
    icon: (
      <Icon
        id="medalStarIcon"
        href={medalStar}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
  betlost: {
    label: 'Bet Lost',
    icon: (
      <Icon
        id="gamepadIcon"
        href={gamepad}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
  friendDeposit: {
    label: 'Friend Deposit',
    icon: (
      <Icon
        id="profile2userIcon"
        href={profile2user}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
  missionCompleted: {
    label: 'Mission Completed',
    icon: (
      <Icon
        id="medalStarIcon"
        href={medalStar}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
  mission: {
    label: 'Mission Completed',
    icon: (
      <Icon
        id="medalStarIcon"
        href={medalStar}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
  cashback: {
    label: 'Cashback Credited',
    icon: (
      <Icon
        id="cashbackIcon"
        href={medalStar}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
  bonus: {
    label: 'Bonus Redemption',
    icon: (
      <Icon
        id="medalStarIcon"
        href={medalStar}
        className="w-5 h-5 fill-current text-primary-1"
      />
    ),
  },
};

const CoinsHistoryItem = ({
  history,
  className,
  isBurnTab = false,
}: {
  history: CoinHistory;
  className?: string;
  isBurnTab?: boolean;
}) => {
  const typeConfig = types[history.loyaltyType as keyof typeof types];

  const coinValue =
    history.transactionType === 'credit'
      ? history.coinsCredit || 0
      : -(history.coinsDebit || 0);

  const shouldShowGameName =
    !isBurnTab && history.gameName && history.gameName !== 'Unknown Game';

  const isBurnType = history.loyaltyType === 'burn';

  return (
    <div className={cn('rounded-xl p-4 bg-base-800 w-full flex', className)}>
      <div className="rounded-full bg-base-700 flex items-center justify-center w-10 h-10 mr-2">
        {typeConfig?.icon}
      </div>
      <div className="flex flex-col flex-1 justify-between gap-1">
        <div className="flex justify-between">
          <p className="text-sm font-medium text-base-200 leading-4">
            {typeConfig?.label || 'Unknown Transaction'}
          </p>
          <span
            className={cn('text-sm font-medium leading-4', {
              'text-secondary-1': coinValue > 0,
              'text-status-error-200': coinValue < 0,
            })}
          >
            {formatNumber(coinValue, 0, 'en', { signDisplay: 'exceptZero' })}
          </span>
        </div>
        <div className="flex justify-between">
          {shouldShowGameName && (
            <span className="text-xs text-base-400 leading-4 capitalize">
              {history.gameName}
            </span>
          )}
          {!shouldShowGameName && <span />}
          <span className="text-xs text-base-400 leading-4">
            {format(new Date(history.created_date), 'dd MMM yyyy HH:mm')}
          </span>
        </div>
        <div className="flex justify-between text-xs text-base-500">
          <div className="flex gap-2">
            {(history.missionId || history.betId || history.id) && (
              <span className="text-primary-2">
                ID: {history.missionId || history.betId || history.id}
              </span>
            )}
            {/* {!isBurnTab && history.loyaltyType && (
              <span className="text-base-400 capitalize">
                • {history.loyaltyType.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            )} */}
          </div>
          {history.amount !== undefined && history.amount !== null && history.loyaltyType !== 'bonus' && (
            <span>
              {isBurnType 
                ? (history.loyaltyType === 'cashback' ? 'Cashback Credited: ' : 'Burn Amount: ')
                : 'Bet: '}
              {formatNumber(history.amount, 0, 'en')}
            </span>
          )}
          {history.loyaltyType === 'bonus' && (
            <span>Freebet Credited</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinsHistoryItem;
