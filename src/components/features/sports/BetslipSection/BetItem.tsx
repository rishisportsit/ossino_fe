interface BetItemProps {
  title: string;
  match: string;
  odds?: number; 
  payout?: number;
  iconPath?: string;
  score?: string;
  isLive?: boolean;
  isClosed?: boolean;
  variant?: 'standard' | 'system';
  eventName ?: string;
  selectionName?: string;
  eventId?: string;
  onRemove?: () => void;
}

const BetItem = ({
  title,
  match,
  odds,
  payout,
  iconPath = '/icons/tether.svg',
  score,
  isLive,
  isClosed,
  variant = 'standard',
  onRemove,
}: BetItemProps) => {
  return (
    <div
      className={
        (
          isClosed
            ? 'bg-base-800 border border-state-negative '
            : isLive && variant !== 'system'
            ? 'bg-base-800 '
            : 'bg-base-725 '
        ) + 'rounded-lg p-2'
      }
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium body-txtColor-1">{title}</span>
            {isLive && (
              <span className="text-[10px] leading-none px-2 py-[2px] rounded-full bg-accent-live body-txtColor-1 font-semibold">Live</span>
            )}
          </div>
          <button onClick={onRemove} className="hover:[&>span]:body-txtColor-1 transition-colors">
            <span className="text-lg font-bold text-base-400">×</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-base-400">{match}</span>
          {variant === 'system' ? (
            score ? <span className="text-sm text-secondary-light-1">{score}</span> : <span />
          ) : (
            <span className="text-sm text-secondary-light-1">{odds?.toFixed(2) ?? ''}</span>
          )}
        </div>
        <span className="text-sm text-secondary-light-1">1-0</span>

        {/* {variant === 'system' ? (
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm body-txtColor-1">Odds</span>
            <span className="text-sm font-medium text-secondary-light-1">{odds?.toFixed(2)}</span>
          </div>
        ) : (
          !isClosed && (
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm body-txtColor-1">Est. Payout</span>
              <div className="flex items-center">
                <img src={iconPath} alt="Currency" className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium text-secondary-light-1">{(payout ?? 0).toFixed(2)}</span>
              </div>
            </div>
          )
        )} */}
      </div>

      {isClosed && (
        <div className="flex items-center justify-center gap-2 mt-3">
          <img src="/icons/lock-slash.svg" alt="closed" className="w-4 h-4" />
          <span className="text-state-negative text-[12px] font-medium">Market closed</span>
        </div>
      )}
    </div>
  );
};

export default BetItem;



