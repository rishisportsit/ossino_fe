import { cn } from 'helpers/ui';
import type { BonusAmountData } from 'store/promotions/types';

import styles from './index.module.css';

const WelcomeBonusCard = ({ amount }: BonusAmountData) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-xl justify-center gap-[2px] py-[33px] relative overflow-hidden',
        styles['bg-gradient'],
      )}
    >
      <h2 className="text-primary-1 text-[34px] leading-none font-extrabold">
        ${amount}
      </h2>
      <p className="text-sm leading-[18.2px]">Your welcome sport bonus</p>
      <img
        src="/images/pr1.png"
        alt="prize"
        width={44}
        height={48}
        className="absolute top-[18%] left-[5%]"
      />
      <img
        src="/images/pr1.png"
        alt="prize"
        width={72}
        height={79}
        className="absolute -bottom-4 -right-3 -rotate-45"
      />
    </div>
  );
};

export default WelcomeBonusCard;
