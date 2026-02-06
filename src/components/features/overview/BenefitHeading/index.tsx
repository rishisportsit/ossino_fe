import Icon from 'components/shared/Icon';
import type { Benefit } from 'store/benefits/slice';
import lockIcon from '/icons/lock.svg?url';
import unlockIcon from '/icons/unlock.svg?url';
import { cn } from 'helpers/ui';
import { useAppSelector } from 'store/index';
import { selectLoyaltyDetails } from 'store/loyaltyDetails/selectors';

type BenefitHeadingProps = Pick<
  Benefit,
  'image' | 'title' | 'isOpened' | 'points'
>;

const BenefitHeading = ({
  image,
  isOpened,
  title,
  points,
}: BenefitHeadingProps) => {
  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);

  const isCurrentLevel =
    loyaltyDetails?.level &&
    title?.toLowerCase().includes(loyaltyDetails.level.replace('level', ''));

  return (
    <div className="flex items-center gap-3 w-full">
      <div
        className={cn(
          'w-14 h-14 bg-base-700 border border-base-700 rounded-xl flex items-center justify-center benefit-image transition-all duration-200',
          {
            'bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg':
              isCurrentLevel,
            'border border-amber-400': isCurrentLevel,
          },
        )}
      >
        <img
          src={image}
          alt={title}
          width={40}
          height={40}
          className={cn({
            'drop-shadow-lg': isCurrentLevel,
          })}
        />
      </div>
      <div className="flex flex-col gap-2 items-start grow">
        <div className="flex items-center gap-2">
          <h3
            className={cn(
              'font-bold leading-4 transition-colors duration-200',
              {
                'text-amber-300': isCurrentLevel,
              },
            )}
          >
            {title}
          </h3>
          {isCurrentLevel && (
            <span className="text-xs bg-gradient-to-r from-amber-400 to-amber-600 body-txtColor-2 px-2 py-0.5 rounded-full font-medium">
              Current
            </span>
          )}
        </div>
        <span
          className={cn(
            'inline-flex text-base-100 font-medium items-center justify-center h-[18px] px-2 rounded-xl text-[10px] transition-colors duration-200',
            {
              'bg-gradient-to-r from-emerald-500 to-emerald-600 body-txtColor-1 shadow-sm':
                isOpened,
              'bg-base-700': !isOpened,
              'bg-gradient-to-r from-amber-500 to-amber-600 body-txtColor-2':
                isCurrentLevel,
            },
          )}
        >
          {points} points
        </span>
      </div>
      <div className="flex items-center">
        {isOpened ? (
          <Icon
            id="unlockIcon"
            href={unlockIcon}
            className={cn('w-5 h-5 transition-colors duration-200', {
              'text-amber-400': isCurrentLevel,
              'text-emerald-400': !isCurrentLevel,
            })}
          />
        ) : (
          <Icon
            id="lockIcon"
            href={lockIcon}
            className="w-5 h-5 text-base-400"
          />
        )}
      </div>
    </div>
  );
};

export default BenefitHeading;
