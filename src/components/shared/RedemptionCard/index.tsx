import { type Redemption } from 'store/redemptions/slice';

import { cn } from 'helpers/ui';
import { Button } from 'components/shared/ui/Button';

type RedemptionCardProps = {
  onClick?: () => void;
  data: Redemption;
  imgClassName?: string;
};

const RedemptionCard = ({
  onClick,
  data,
  imgClassName,
}: RedemptionCardProps) => {
  return (
    <div className="rounded-xl overflow-hidden w-full bg-base-800 relative">
      <img
        src={data.href}
        className={cn('w-full aspect-square z-10 object-cover', imgClassName)}
        alt=""
      />
      <div className="p-2 pb-3 flex flex-col items-center relative z-10">
        <p className="font-bold mb-2 text-sm body-txtColor-1">{data.name}</p>
        <div className="flex gap-1 items-center mb-3">
          <img src="/images/redemptions/chip.png" className="w-4" alt="" />
          <span className="text-xs">{data.value}</span>
        </div>
        <Button variant="filled" size="sm" className="w-full" onClick={onClick}>
          Redeem
        </Button>
      </div>
      <div className="absolute bg-gradient-to-b from-5% from-gradient-secondary-dark-1 to-70% to-gradient-secondary-dark-2 w-[370px] h-[580px] rounded-full blur-[100px] rotate-[-150deg] bottom-[-400px] right-[-320px]" />
    </div>
  );
};

export default RedemptionCard;
