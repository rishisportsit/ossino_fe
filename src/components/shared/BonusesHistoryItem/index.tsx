import { format } from 'date-fns';
import { formatSmartCurrency } from 'helpers/currencyHelpers';
import { useAppSelector } from 'store/index';
import { selectWalletState } from 'store/wallet/selectors';
import Icon from '../Icon';
import USDT from '/icons/USDT.svg?url';
import { BonusHistoryTransaction } from 'api/registerBonuses/bonusHistory.types';

interface BonusHistoryItemProps {
  transaction: BonusHistoryTransaction;
}

const getTransactionTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    LOCKED_BONUS_APPLIED: 'Bonus',
    UNLOCKED_BONUS_APPLIED: 'Bonus Unlocked',
    UNLOCKED_BONUS: 'Bonus Unlocked',
    BONUS_USED: 'Bonus Used',
    BONUS_EXPIRED: 'Bonus Expired',
    BONUS_CANCELLED: 'Bonus Cancelled',
    BET_PLACED: 'Bet Placed',
    AWARD_FREE_SPINS: 'Free Spins Awarded',
    AWARD_FREEBET: 'Free Bet Awarded',
  };
  return labels[type] || type.replace(/_/g, ' ');
};

const getTransactionTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    LOCKED_BONUS_APPLIED: 'text-secondary-300',
    UNLOCKED_BONUS_APPLIED: 'text-secondary-300',
    UNLOCKED_BONUS: 'text-secondary-300',
    BONUS_USED: 'text-secondary-300',
    BONUS_EXPIRED: 'text-red-300',
    BONUS_CANCELLED: 'text-red-300',
    BET_PLACED: 'text-secondary-300',
    AWARD_FREE_SPINS: 'text-secondary-300',
    AWARD_FREEBET: 'text-secondary-300',
  };
  return colors[type] || 'text-secondary-300';
};

const BonusHistoryItem = ({ transaction }: BonusHistoryItemProps) => {
  const { selectedCurrency } = useAppSelector(selectWalletState);
  const currencyCode = selectedCurrency?.currencyCode || 'USDT';
  const { userBonusDetails } = transaction;

  const isFreeAwardTransaction = (transactionType: string): boolean => {
    return (
      transactionType === 'AWARD_FREE_SPINS' ||
      transactionType === 'AWARD_FREEBET'
    );
  };

  if (!userBonusDetails) {
    return (
      <div className="p-4 bg-base-800 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs body-txtColor-1">ID: {transaction.id}</p>
          <p className="text-xs body-txtColor-1">
            {format(new Date(transaction.releasedDate), 'dd MMM, HH:mm')}
          </p>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <p
              className={`text-sm font-medium mb-1 ${getTransactionTypeColor(transaction.transactionType)}`}
            >
              {getTransactionTypeLabel(transaction.transactionType)}
            </p>
            <p className="text-xs text-base-400">
              Type: <span className="body-txtColor-1">N/A</span>
            </p>
          </div>
          <div className="text-right">
            {transaction.lockedBonus > 0 && (
              <p className="text-xs body-txtColor-1 font-medium flex items-center justify-end gap-1.5 mb-1">
                <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                <span className="body-txtColor-1-400">
                  {formatSmartCurrency(transaction.lockedBonus, currencyCode)}
                </span>
              </p>
            )}
            {transaction.unlockedBonus > 0 && (
              <p className="text-xs body-txtColor-1 font-medium flex items-center justify-end gap-1.5">
                <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                <span className="body-txtColor-1-400">
                  {formatSmartCurrency(transaction.unlockedBonus, currencyCode)}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-base-800 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs body-txtColor-1">ID: {transaction.id}</p>
        <p className="text-xs body-txtColor-1">
          {format(new Date(transaction.releasedDate), 'dd MMM, HH:mm')}
        </p>
      </div>

      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p
            className={`text-sm font-medium mb-1 ${getTransactionTypeColor(transaction.transactionType)}`}
          >
            {getTransactionTypeLabel(transaction.transactionType)}
          </p>
          <p className="text-xs text-base-400">
            Type:{' '}
            <span className="body-txtColor-1">
              {userBonusDetails?.bonusType || 'N/A'}
            </span>
          </p>
        </div>

        <div className="text-right">
          {isFreeAwardTransaction(transaction.transactionType) ? (
            <p className="text-xs body-txtColor-1 font-medium flex items-center justify-end gap-1.5">
              {transaction.transactionType === 'AWARD_FREE_SPINS' ? (
                <span className="body-txtColor-1-300">
                  {transaction.transactionAmount} Free Spins
                </span>
              ) : (
                <>
                  <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                  <span className="body-txtColor-1-300">
                    {formatSmartCurrency(transaction.transactionAmount, currencyCode)}
                  </span>
                </>
              )}
            </p>
          ) : (
            <>
              {transaction.lockedBonus > 0 && (
                <p className="text-xs body-txtColor-1 font-medium flex items-center justify-end gap-1.5 mb-1">
                  <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                  <span className="body-txtColor-1-400">
                    {formatSmartCurrency(transaction.lockedBonus, currencyCode)}
                  </span>
                </p>
              )}
              {transaction.unlockedBonus > 0 && (
                <p className="text-xs body-txtColor-1 font-medium flex items-center justify-end gap-1.5">
                  <Icon id="USDTIcon" href={USDT} className="h-4 w-4" />
                  <span className="body-txtColor-1-400">
                    {formatSmartCurrency(transaction.unlockedBonus, currencyCode)}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-base-700">
        {isFreeAwardTransaction(transaction.transactionType) ? (
          <>
            {userBonusDetails?.bonusExpiry && (
              <div className="flex justify-between text-xs mt-1">
                <span className="text-base-400">Expires:</span>
                <span className="body-txtColor-1">
                  {format(
                    new Date(userBonusDetails.bonusExpiry),
                    'dd MMM yyyy',
                  )}
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between text-xs">
              <span className="text-base-400">Total Locked:</span>
              <span className="body-txtColor-1">
                {formatSmartCurrency(userBonusDetails?.totalLocked || 0, currencyCode)}
              </span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-base-400">Total Unlocked:</span>
              <span className="body-txtColor-1">
                {formatSmartCurrency(userBonusDetails?.totalUnlocked || 0, currencyCode)}
              </span>
            </div>
          </>
        )}
        {userBonusDetails?.rollOverMultiplier &&
        userBonusDetails.rollOverMultiplier > 0 ? (
          <div className="flex justify-between text-xs mt-1">
            <span className="text-base-400">Rollover:</span>
            <span className="body-txtColor-1">
              {userBonusDetails.rollOverMultiplier}x
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default BonusHistoryItem;
