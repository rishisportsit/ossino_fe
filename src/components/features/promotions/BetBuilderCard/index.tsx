import { cn } from 'helpers/ui';

import styles from './index.module.css';

const BetBuilderCard = () => {
  return (
    <div
      className={cn(
        'rounded-xl px-3 py-4 relative overflow-hidden',
        styles['bg-gradient'],
      )}
    >
      <h2 className="text-primary-1 text-[34px] leading-none font-extrabold mb-[18px]">
        Betbuilder
      </h2>
      <p className="text-sm leading-[18px]">
        Boost your rewards <br /> from one match
      </p>
      <img
        src="/images/promotions/ball-medium.png"
        alt="ball"
        className="absolute bottom-0 right-[19%]"
        width={72}
        height={72}
      />
      <img
        src="/images/promotions/ball-small.png"
        alt="ball"
        className="absolute top-1/2 right-[17%] -translate-y-1/2"
        width={39}
        height={40}
      />
      <img
        src="/images/promotions/ball-big.png"
        alt="ball"
        className="absolute top-0 right-0"
      />
    </div>
  );
};

export default BetBuilderCard;
