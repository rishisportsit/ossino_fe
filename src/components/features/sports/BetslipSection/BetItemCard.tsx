import { Link } from "react-router-dom";

interface BetItemProps {
  odds?: number;
  score?: string;
  isLive?: boolean;
  isClosed?: boolean;
  eventName?: string;
  selectionName?: string;
  marketName?: string;
  eventId?: number;
  sportId?: number;
  onRemove?: (eventId: number) => void;
}

const BetItemCard = ({
  marketName,
  selectionName,
  odds,
  eventName,
  score,
  isLive,
  isClosed,
  sportId,
  eventId,
  onRemove,
}: BetItemProps) => {
  return (
    <div
      className={
        (
          isClosed
            ? 'bg-base-800 border border-state-negative '
            : isLive
              ? 'bg-base-800 '
              : 'bg-base-725 '
        ) + 'rounded-lg p-2'
      }
      
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2  w-full ">
            <span className="text-sm font-medium body-txtColor-1">{marketName}</span>
            {isLive && (
              <span className="text-[10px] leading-none px-2 py-[2px] rounded-full bg-accent-live body-txtColor-1 font-semibold">Live</span>
            )}
          </div>
          <button onClick={() => onRemove?.(Number(eventId!))} className="hover:[&>span]:body-txtColor-1 transition-colors">
            <span className="text-lg font-bold text-base-400">×</span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 justify-between w-full ">
            <span className="text-sm font-medium body-txtColor-1">{selectionName}</span>
            <span className="text-sm text-secondary-light-1">{Number(odds)?.toFixed(2) ?? ''}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link to={`/sports/event/${eventId}`}>
            <span className="text-sm text-base-400">{eventName}</span>
          </Link>
          {score ? <span className="text-sm text-secondary-light-1">{score}</span> : ''}
        </div>
        {/*
        {!isClosed && (
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm body-txtColor-1">Est. Payout</span>
            <div className="flex items-center">
              <img src={iconPath} alt="Currency" className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium text-secondary-light-1">{(payout ?? 0).toFixed(2)}</span>
            </div>
          </div>
        )}
        */}
      </div>

      {isClosed && (
        <div className="flex items-center justify-center gap-2 mt-3">
          <img src="/icons/lock-slash.svg" alt="closed" className="w-4 h-4" />
          <span className="text-state-negative text-[12px] font-medium">Market has been suspended</span>
        </div>
      )}
    </div>
  
  );
};


export default BetItemCard;


