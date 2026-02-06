import { cn } from 'helpers/ui';
import type { BonusAmountData } from 'store/promotions/types';

import styles from './index.module.css';

const ReferCard1 = ({ amount }: BonusAmountData) => {
  return (
    <div
      className={cn(
        'rounded-xl px-3 py-4 relative overflow-hidden w-[340px] h-[160px]',
        styles['bg-gradient'],
      )}
    >
      <h2 className="text-primary-1 text-[34px] leading-none font-extrabold mb-[10px] mt-2">
        Get ${amount}
      </h2>
      <p className="text-sm leading-[18px]">
        Refer a friend to get <br /> the reward
      </p>

      <button className="bg-base-200 body-txtColor-2 rounded-lg text-sm font-medium hover:bg-base-300 transition-colors absolute bottom-4 right-3 z-10 px-3" style={{ height: '28px' }}>
        Invite Friend
      </button>

      <div className='absolute w-[110px] inset-y-0 right-[7.2%]'>
        <img
          src="/images/sports/promotions/ReferCard1/trophy.png"
          alt="trophy"
          width={82}
          height={79}
          className="absolute left-0 top-[10%]"
        />
        <img
          src="/images/sports/promotions/ReferCard1/star.png"
          alt="star-right"
          width={22}
          height={22}
          className="absolute -right-3 top-[15%]"
        />
      </div>

      <img
        src="/images/sports/promotions/ReferCard1/star.png"
        alt="star-left"
        width={36}
        height={36}
        className="absolute left-[20%] -bottom-1"
      />
    </div>
  );
};

export default ReferCard1;
