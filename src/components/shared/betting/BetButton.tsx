import { cn } from 'helpers/ui';

interface BetButtonProps {
  isLoggedIn: boolean;
  isValidBet: boolean;
  isPlacing: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const BetButton = ({ 
  isLoggedIn, 
  isValidBet, 
  isPlacing, 
  onClick, 
  className = '',
  disabled = false 
}: BetButtonProps) => {
  const isDisabled = !isLoggedIn || !isValidBet || isPlacing || disabled;
  
  return (
    <button
      className={cn(
        "px-4 flex-1 h-[38px] rounded-lg text-sm font-medium transition-opacity flex items-center justify-center",
        isDisabled
          ? "bg-base-600 text-base-400 cursor-not-allowed" 
          : "bg-button-gradient btn-textColor hover:opacity-90",
        className
      )}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
    >
      {!isLoggedIn ? 'Login to Place Bet' : isPlacing ? 'Placing...' : 'Place bet'}
    </button>
  );
};