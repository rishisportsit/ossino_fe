import { useMemo } from 'react';

import { formatNumber } from 'helpers/numbers';
import LinkWithArrow from '../ui/LinkWithArrow';
import { Button } from '../ui/Button';
import arrowRight from '/icons/arrowRight.svg?url';
import Icon from '../Icon';
import Tooltip from '../ui/Tooltip';
import infoIcon from '/icons/info.svg?url';

interface CategoryHeaderProps {
  label?: string;
  count?: number;
  showMore?: boolean;
  showMoreComponent?: 'button' | 'link';
  to?: string;
  onClick?: () => void;
  tooltipText?: string;
}

const TooltipContent = ({ text }: { text: string }) => {
  return <span className="text-xs leading-none text-base-200">{text}</span>;
};

const CategoryHeader = ({
  label,
  count,
  showMore,
  to = '#',
  showMoreComponent = 'link',
  onClick,
  tooltipText,
}: CategoryHeaderProps) => {
  const formattedCount = count
    ? formatNumber(count, 0, 'en', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : '';

  const seeAll = useMemo(() => {
    if (!showMore) {
      return null;
    }

    switch (showMoreComponent) {
      case 'link':
        return <LinkWithArrow to={to}>See all</LinkWithArrow>;
      case 'button':
        return (
          <Button
            onClick={onClick}
            className="text-primary-2 text-sm font-medium flex items-center gap-1 bg-none"
          >
            See all
            <Icon
              id="arrowRightIcon"
              href={arrowRight}
              className="w-4 h-4 fill-current text-primary-2"
            />
          </Button>
        );
      default:
        return null;
    }
  }, [onClick, showMore, showMoreComponent, to]);

  return (
    <div className="flex items-center w-full gap-4">
      <div className="flex items-center gap-1">
        <div className="text-base font-bold xl:text-lg flex items-center gap-1">
          {label}

          {tooltipText ? (
            <Tooltip content={<TooltipContent text={tooltipText} />}>
              <button type="button" className="body-txtColor-1 inline-flex items-center -mb-px">
                <Icon
                  href={infoIcon}
                  id="infoIcon"
                  className="size-4 text-base-400 shrink-0"
                />
              </button>
            </Tooltip>
          ) : null}
        </div>
        {count && (
          <span className="flex items-center justify-center w-7 h-5 rounded-full bg-base-700 text-[10px]">
            {formattedCount}
          </span>
        )}
      </div>
      {seeAll}
    </div>
  );
};

export default CategoryHeader;
