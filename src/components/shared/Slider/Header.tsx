import CategoryHeader from 'components/shared/CategoryHeader';
import Icon from 'components/shared/Icon';
import { cn } from 'helpers/ui';
import type SwiperCore from 'swiper';
import left from '/icons/arrowLeft.svg?url';
import right from '/icons/arrowRight.svg?url';

interface ISwiperHeaderProps {
  label?: string;
  count?: number;
  swiper: SwiperCore | null;
  showMore?: boolean;
  to: string;
  navigation?: boolean;
  showMoreComponent?: 'link' | 'button';
  onClick?: () => void;
  className?: string;
  tooltipText?: string;
}

const SwiperHeader = ({
  label,
  count,
  showMore,
  swiper,
  navigation,
  className,
  to,
  showMoreComponent,
  onClick,
  tooltipText,
}: ISwiperHeaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center w-full mb-3 pr-4 justify-between',
        className,
      )}
    >
      <CategoryHeader
        label={label}
        count={count}
        showMore={showMore}
        to={to}
        showMoreComponent={showMoreComponent}
        onClick={onClick}
        tooltipText={tooltipText}
      />
      {navigation && (
        <div className="flex bg-base-750 w-14 h-6 rounded-full justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (swiper) {
                swiper.slidePrev();
              }
            }}
          >
            <Icon id="arrowLeftIcon" href={left} className="w-4 h-4 fill-current body-txtColor-1" />
          </button>
          <button
            type="button"
            onClick={() => {
              if (swiper) {
                swiper.slideNext();
              }
            }}
          >
            <Icon id="arrowRightIcon" href={right} className="w-4 h-4 fill-current body-txtColor-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SwiperHeader;
