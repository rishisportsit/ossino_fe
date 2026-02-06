import { cn } from 'helpers/ui';
import italyFlag from '/icons/sports/countries/italy.svg?url';
import RatioProgressBar from 'components/shared/ui/CircleProg';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';

type ExploreCardProps = {
  isMain?: boolean;
  onClick?: () => void;
};

const ExploreCard = ({ isMain = true, onClick }: ExploreCardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl p-4 flex flex-col gap-4 xl:bg-base-750',
        isMain ? 'bg-base-700' : 'bg-base-800',
      )}
    >
      <div
        className={cn(
          'flex',
          isMain ? 'justify-between items-center' : 'flex-col-reverse gap-5',
        )}
      >
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
        <span className="text-xs text-base-300 text-nowrap">30 Aug, 11:00</span>
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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <RatioProgressBar value={50} />
            <div className="flex flex-col gap-2">
              <p className="relative text-xs before:block before:size-1.5 before:bg-primary-1 before:rounded-full before:absolute before:-left-2.5 before:bottom-1/2 before:transform before:translate-y-1/2">
                Traded Units: 750
              </p>
              <p className="relative text-xs before:block before:size-1.5 before:bg-accent-2 before:rounded-full before:absolute before:-left-2.5 before:bottom-1/2 before:transform before:translate-y-1/2">
                Traded Units: 750
              </p>
            </div>
          </div>
          <Button size="sm" className="w-20" onClick={onClick}>
            Buy
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ExploreCard;
