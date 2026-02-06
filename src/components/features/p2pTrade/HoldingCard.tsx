import { cn } from 'helpers/ui';
import italyFlag from '/icons/sports/countries/italy.svg?url';
import Icon from 'components/shared/Icon';
import SemiCircleProgress from 'components/shared/ui/SemiCircleProgress';
import { Button } from 'components/shared/ui/Button';

type HoldingCardProps = {
  isMain?: boolean;
  sold?: boolean;
  onClick?: () => void;
};

const HoldingCard = ({
  isMain = true,
  sold = false,
  onClick,
}: HoldingCardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl p-4 flex flex-col gap-4 xl:bg-base-750',
        isMain ? 'bg-base-700' : 'bg-base-800',
      )}
    >
      {!isMain ? (
        <span className="text-xs text-base-300 text-nowrap">30 Aug, 11:00</span>
      ) : null}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Icon id="italyFlagIcon" href={italyFlag} className="w-5 h-5" />
          <p
            className={cn(
              'text-secondary-2 font-medium',
              isMain ? 'text-xs' : 'text-base',
            )}
          >
            Philippines - To Win
          </p>
        </div>
        {isMain ? (
          <span className="text-xs text-base-300 text-nowrap">
            30 Aug, 11:00
          </span>
        ) : (
          <SemiCircleProgress value={75} label="chance" />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <p
          className={cn('flex justify-between', isMain ? 'text-xs' : 'text-sm')}
        >
          Philippines
          <span>
            140/5&nbsp;<span className="text-base-300">(12ov)</span>
          </span>
        </p>
        <p
          className={cn('flex justify-between', isMain ? 'text-xs' : 'text-sm')}
        >
          Nigeria
          <span>
            140/5&nbsp;<span className="text-base-300">(12ov)</span>
          </span>
        </p>
      </div>
      {isMain ? (
        <>
          <div className="grid grid-cols-3">
            <div className="flex">
              <p className="text-base-300 text-xs">
                Investment
                <br />
                <span className="text-secondary-3 text-sm">$100.00</span>
              </p>
            </div>
            <div className="flex justify-center">
              <p className="text-base-300 text-xs">
                Est. Payout
                <br />
                <span className="text-secondary-3 text-sm font-medium">
                  $300.00
                </span>
              </p>
            </div>
            <div className="flex justify-end">
              <SemiCircleProgress value={75} label="chance" />
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-base-300 text-xs">
              Est. Payout
              <br />
              <span className="text-secondary-3 text-base font-medium">
                $300.00
              </span>
            </p>
            <Button disabled={sold} className="w-[100px]" onClick={onClick}>
              {sold ? 'Sold' : 'List Trade'}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <p className="flex justify-between text-sm">
              Units
              <span className="font-medium">100</span>
            </p>
            <p className="flex justify-between text-sm">
              Investment
              <span className="font-medium text-secondary-3">$100.00</span>
            </p>
            <p className="flex justify-between text-sm">
              Est. Payout
              <span className="font-medium text-secondary-3">$300.00</span>
            </p>
          </div>
          <p className="flex justify-between text-sm">
            Recommend Price
            <span className="font-medium text-base text-secondary-3">$69.00</span>
          </p>
        </>
      )}
    </div>
  );
};

export default HoldingCard;
