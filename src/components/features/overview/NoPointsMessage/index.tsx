//import giftIcon from '/icons/gift.svg?url';
import { Button } from 'components/shared/ui/Button';

const NoPointsMessage = () => {
  return (
    <div className="flex flex-col items-center xl:w-full xl:flex-row xl:gap-3 xl:bg-base-735 xl:rounded-xl xl:px-4 xl:py-6">
      {/* <img
        src={giftIcon}
        alt="gift"
        width={32}
        height={32}
        className="w-10 h-10 mb-4 xl:w-8 xl:h-8 xl:mb-0"
      /> */}
      <svg className="w-8 h-8 fill-current">
          <use className="fill-current text-base-300" href="/icons/gift.svg#giftIcon"></use>
      </svg>
      <div className='xl:grow'>
        <p className="text-xs leading-4 text-base-300 mb-3 xl:mb-0 text-center xl:text-left max-w-[220px] xl:max-w-[240px]">
          No Loyalty points for now. Start playing and earn your first rewards!
        </p>
      </div>
      <Button variant="filled" size="sm" type="button" className="px-[42px]">
        Play Now
      </Button>
    </div>
  );
};

export default NoPointsMessage;
