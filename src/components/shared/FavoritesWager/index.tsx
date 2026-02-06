import { Progress } from 'components/shared/ui/Progress';
import { cn } from 'helpers/ui';

interface FavoritesWagerProps {
  className?: string;
}

const FavoritesWager = ({ className }: FavoritesWagerProps) => {
  const currentBalance = 391;
  const targetBalance = 500;

  const percentage = (currentBalance / targetBalance) * 100;

  return (
    <div className={cn("flex flex-col w-full justify-center p-4 bg-background-1/10", className)}>
      <h4 className="pb-2 text-xs">Favorites Wager Unlock</h4>
      <Progress value={percentage} />
      <div className="flex items-center justify-between text-xs">
        <span>{percentage}%</span>
        <span>${currentBalance}/${targetBalance}</span>
      </div>
    </div>
  );
};

export default FavoritesWager;