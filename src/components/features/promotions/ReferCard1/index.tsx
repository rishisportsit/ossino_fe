import { cn } from 'helpers/ui';
import type { BonusAmountData } from 'store/promotions/types';

import styles from './index.module.css';

const ReferCard1 = ({ amount }: BonusAmountData) => {
  return (
    <div
      className={cn(
        'rounded-xl px-3 py-4 relative overflow-hidden',
        styles['bg-gradient'],
      )}
    >
      <h2 className="text-primary-1 text-[34px] leading-none font-extrabold mb-[18px]">
        Get ${amount}
      </h2>
      <p className="text-sm leading-[18px]">
        Refer a friend <br /> to get the reward
      </p>
      <div className='absolute w-[110px] inset-y-0 right-[7.2%]'>
        <img
          src="/images/promotions/trophy-2.png"
          alt="trophy"
          width={82}
          height={79}
          className="absolute left-0 top-[14.3%]"
        />
        <img
          src="/images/promotions/zirka.png"
          alt="star"
          width={22}
          height={22}
          className="absolute right-0 top-[19.9%]"
        />
      </div>
    </div>
  );
};

export default ReferCard1;
