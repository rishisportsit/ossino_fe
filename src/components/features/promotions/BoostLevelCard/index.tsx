import { cn } from 'helpers/ui';

import styles from './index.module.css';

const BoostLevelCard = () => {
  return (
    <div
      className={cn(
        'rounded-xl px-3 py-[34px] relative overflow-hidden',
        styles['bg-gradient'],
      )}
    >
      <div className="flex flex-col gap-1 justify-center">
        <p className="text-xs font-black uppercase leading-[14px]">
          Boost your
        </p>
        <h2 className="text-primary-1 text-[34px] leading-none font-extrabold">
          Level up
        </h2>
      </div>
      <div className='absolute w-[105px] inset-y-0 right-[9.5%]'>
        <img
          src="/images/box-gloves.png"
          alt="box gloves"
          className="absolute top-[9%] left-[6%]"
        />
        <img
          src="/images/star-1.png"
          alt="star"
          width={20}
          height={19}
          className="absolute top-[10.8%] left-0"
        />
        <img
          src="/images/star-2.png"
          alt="star"
          width={9}
          height={9}
          className="absolute top-[5%] right-[13.2%]"
        />
        <img
          src="/images/star-3.png"
          alt="star"
          width={12}
          height={12}
          className="absolute right-0 bottom-[17.5%]"
        />
      </div>
    </div>
  );
};

export default BoostLevelCard;
