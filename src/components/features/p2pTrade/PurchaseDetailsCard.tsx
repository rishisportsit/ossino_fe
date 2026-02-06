import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import SemiCircleProgress from 'components/shared/ui/SemiCircleProgress';
import { cn } from 'helpers/ui';

type PurchaseDetailsCardProps = {
  isMain?: boolean;
  onClick?: () => void;
};

const PurchaseDetailsCard = ({
  isMain = true,
  onClick,
}: PurchaseDetailsCardProps) => {
  return (
    <div
      className={cn('bg-base-800 border border-primary-1 rounded-xl p-4', {
        'pb-0': isMain,
      })}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="background-1 rounded-full px-2 h-5 flex items-center">
          <span className="text-base-900 text-10px font-semibold">
            Best buy
          </span>
        </div>
        {isMain ? (
          <div className="flex items-center gap-1">
            <Icon
              id="timerIcon"
              href="/icons/timer.svg"
              className="body-txtColor-1 size-5"
            />
            <span className="body-txtColor-1 text-xs font-medium">10:54 min</span>
          </div>
        ) : null}
      </div>
      <div className="grid grid-cols-4">
        <div className="flex">
          <p className="text-base-300 text-xs">
            Price
            <br />
            <span className="body-txtColor-1 text-sm">$69.00</span>
          </p>
        </div>
        <div className="flex justify-center">
          <p className="text-base-300 text-xs">
            Est. Payout
            <br />
            <span className="text-secondary-3 text-sm font-medium">$300.00</span>
          </p>
        </div>
        <div className="flex justify-center">
          <p className="text-base-300 text-xs">
            Units
            <br />
            <span className="body-txtColor-1 text-sm">45</span>
          </p>
        </div>
        <div className="flex justify-end">
          <p className="text-base-300 text-xs">
            Profit
            <br />
            <span className="text-secondary-3 text-sm font-medium">231%</span>
          </p>
        </div>
      </div>
      {isMain ? (
        <div className="mt-5 flex justify-between">
          <SemiCircleProgress value={80} label="chance" />
          <Button size="sm" className="w-28" onClick={onClick}>
            Buy
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default PurchaseDetailsCard;
