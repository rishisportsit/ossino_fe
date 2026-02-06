import { cn } from 'helpers/ui';
import Button from 'components/shared/Button';
import type { HTMLAttributes } from 'react';
import type { DiscountItemsType } from './types';

type BonusCardProps = HTMLAttributes<{ className?: string; discount?: string }>;

interface IBonusCard extends BonusCardProps {
  discount: string;
  items: DiscountItemsType[];
}

const MiniCard = ({
  value,
  valueLabel,
}: {
  value: string;
  valueLabel: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center border border-border-1/[0.10] px-2 py-4 rounded-[4px] w-24">
      <span className="text-base font-bold">{value}</span>
      <span className="text-xs">{valueLabel}</span>
    </div>
  );
};

const BonusCard = ({ className, discount, items }: IBonusCard) => {
  return (
    <div className={cn('p-5 flex flex-col rounded-[12px] w-full ', className)}>
      <h1 className="flex item justify-between items-center pb-2">
        <div className="flex flex-col font-black">
          <span className="text-primary-1 text-[26px]">{discount}</span>
          <span className="text-sm uppercase">Casino bonus</span>
        </div>
        <Button className="w-[98px] h-8 text-xs bg-gradient-to-r from-accent-3 to-accent-4">
          Claim Bonus
        </Button>
      </h1>
      <div className="flex items-center justify-evenly pt-2 gap-2">
        {items.map((item) => (
          <MiniCard
            key={item.id}
            value={item.value}
            valueLabel={item.valueLabel}
          />
        ))}
      </div>
    </div>
  );
};

export default BonusCard;
