import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/index';
import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import {
  selectHasExistingVipData,
  selectVipDataLoading,
} from 'store/vip/slice';

import { cn } from 'helpers/ui';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import { VipSheetView } from '../VipSheet';
import crown from '/icons/crown2.svg?url';
import arrowRight from '/icons/arrowRight.svg?url';

import styles from './index.module.css';
import Loader from 'components/shared/ui/Loader';

const Vip = () => {
  const { screenWidth } = useBreakpoint();
  const layout = screenWidth >= BREAKPOINTS.xl ? 'horizontal' : 'default';
  const dispatch = useAppDispatch();

  const hasExistingVipData = useAppSelector(selectHasExistingVipData);
  const vipDataLoading = useAppSelector(selectVipDataLoading);

  const onClick = (view: VipSheetView) => {
    dispatch(openDialog({ id: DIALOG_TYPE.vipPage, data: { view } }));
  };

  if (vipDataLoading) {
    return (
      <div className="rounded-xl p-4 pb-5 bg-base-800 flex items-center justify-center min-h-[108px]">
        <div className="body-txtColor-1 flex items-center gap-3">
          <Loader />
          <span className="text-sm">Setting up VIP...</span>
        </div>
      </div>
    );
  }

  if (hasExistingVipData) {
    return (
      <>
        <Button
          size="xl"
          className="bg-base-800 rounded-xl body-txtColor-1 text-base font-bold w-full justify-between hidden xl:flex"
          onClick={() => onClick(VipSheetView.Details)}
        >
          Your Vip Page
          <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
        </Button>
        <Link
          to="/loyalty/vip"
          className="bg-base-800 rounded-xl body-txtColor-1 text-base font-bold w-full flex justify-between h-14 items-center px-4 xl:hidden"
        >
          Your Vip Page
          <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
        </Link>
      </>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl p-4 pb-5 gradient relative overflow-hidden bg-gradient-to-b from-[#1569A6] to-80% to-[#178DBF] shadow-[0_11.04px_22.08px_0_#00000080]',
        {
          'flex gap-4 items-center justify-between pr-[30px] min-h-[108px]':
            layout === 'horizontal',
        },
      )}
    >
      <div className="relative z-10">
        <p className="leading-6 font-black mb-0.5 text-xl">CREATE VIP</p>
        <p className="max-w-52 text-xs mb-2 leading-4">
          Create your VIP Page and earn up to 20% on games your friends play.
        </p>
        {layout === 'default' && (
          <Button
            variant="filled"
            size="sm"
            onClick={() => onClick(VipSheetView.New)}
            className="xl:hidden flex items-center w-fit h-8 px-2 bg-primary-1 text-xs font-medium body-txtColor-2"
          >
            Create Now
          </Button>
        )}
      </div>
      <div
        className={cn('absolute z-10 w-[76px]', {
          'bottom-0 right-8': layout === 'default',
          '-bottom-[20%] left-[52%] z-10': layout === 'horizontal',
        })}
      >
        <img src="/images/promocode2.png" alt="" className="w-[75px]" />
        <Icon
          id="crown2Icon"
          href={crown}
          className="h-10 w-10 fill-current body-txtColor-1 absolute top-2 left-6"
        />
      </div>
      <img
        src="/images/star-1.png"
        alt=""
        className={cn({
          'w-9 absolute top-1 right-[90px]': layout === 'default',
          'w-5 absolute top-[11%] left-[51%] z-10': layout === 'horizontal',
        })}
      />
      <img
        src="/images/star-2.png"
        alt=""
        className={cn({
          'w-4 absolute top-2 right-8': layout === 'default',
          'w-2 h-2 absolute top-4 left-[60.7%] z-10': layout === 'horizontal',
        })}
      />
      <img
        src="/images/star-3.png"
        alt=""
        className={cn({
          'w-5 absolute top-24 right-3': layout === 'default',
          'w-3 absolute top-[64%] left-[65%] z-10': layout === 'horizontal',
        })}
      />
      {layout === 'horizontal' && (
        <Button
          variant="filled"
          size="sm"
          onClick={() => onClick(VipSheetView.New)}
          className="hidden xl:block"
        >
          Create Now
        </Button>
      )}
      {layout === 'horizontal' && (
        <div
          className={cn(
            'absolute left-[42%] top-[42%] w-[226px] h-[227px] rotate-[111deg] blur-[51px]',
            styles.gradient,
          )}
        />
      )}
    </div>
  );
};

export default Vip;
