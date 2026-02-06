import { cn } from 'helpers/ui';
import Icon from 'components/shared/Icon';
import receiptIcon from '/icons/receipt-item.svg?url';

interface BetslipButtonProps {
  betCount?: number;
  onClick: () => void;
  className?: string;
}

const BetslipButton = ({ betCount = 0, onClick, className }: BetslipButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-24 right-4 z-50 w-14 h-14 bg-accent-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group',
        'hover:scale-105 active:scale-95',
        className
      )}
    >
      {/* Main Icon */}
      {/* <img 
        src={receiptIcon} 
        alt="Betslip" 
        className="w-6 h-6"
      /> */}
      <Icon
            id="betslip-placeholder"
            href={receiptIcon}
            className="w-6 h-6 fill-current body-txtColor-2"
          />
      
      {/* Notification Badge */}
      {betCount > 0 && (
        <div className="absolute -top-1 -left-1 w-5 h-5 background-1 rounded-full flex items-center justify-center shadow-sm">
          <span className="text-xs font-bold body-txtColor-2">
            {betCount > 99 ? '99+' : betCount}
          </span>
        </div>
      )}
      
      {/* Pulse animation for new bets */}
      {betCount > 0 && (
        <div className="absolute inset-0 bg-accent-3 rounded-full animate-ping opacity-20" />
      )}
    </button>
  );
};

export default BetslipButton;
