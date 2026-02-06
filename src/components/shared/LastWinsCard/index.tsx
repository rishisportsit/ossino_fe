import { currencySymbols } from 'constants/currencies';
import { formatCurrencyAmount } from 'helpers/currencyHelpers';

interface ILastWinsCardProps {
  winnerName: string;
  win: number;
  currency: string;
  /** Relative time string already formatted in user's local timezone (e.g., "Just now", "5m ago") */
  winTime: string;
  game: {
    src: string;
    alt: string;
  };
}

const LastWinsCard = ({
  winnerName,
  win,
  currency,
  winTime,
  game,
}: ILastWinsCardProps) => {
  const formattedWinAmount = formatCurrencyAmount(win, currency, {
    showSymbol: false,
    removeTrailingZeros: true,
    minDecimals: 2, // Force at least 2 decimals (e.g. 10.00)
    maxDecimals: 8, // Allow up to 20 for crypto (show full precision)
  });

  return (
    <div className="bg-base-735 rounded-[12px] w-[280px] p-2 flex justify-between items-start">
      <div className="flex gap-2 min-w-0 flex-1 mr-2">
        <img src={game.src} alt={game.alt} className="w-12 h-12 bg-cover rounded-lg flex-shrink-0" />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-primary-1 font-bold text-base font-mono tabular-nums break-all">
            {currencySymbols[currency]} {formattedWinAmount}
          </span>
          <span className="text-xs text-base-400 truncate">{winnerName}</span>
        </div>
      </div>
      <span className="text-base-400 text-xs flex-shrink-0">{winTime}</span>
    </div>
  );
};

export default LastWinsCard;
