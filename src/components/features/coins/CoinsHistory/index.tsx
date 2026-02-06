import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCoinsHistory } from 'store/coinsHistory/slice';
import { useAppDispatch } from 'store/index';
import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';

import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import arrowRight from '/icons/arrowRight.svg?url';
import { text } from 'express';

const CoinsHistory = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCoinsHistory());
  }, [dispatch]);

  return (
    <>
      <Button
        size="xl"
        className="bg-base-735 rounded-xl body-txtColor-1 text-base font-bold w-full justify-between hidden xl:flex"
        onClick={() => dispatch(openDialog({ id: DIALOG_TYPE.coinsHistory }))}
      >
        Earning History
        <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
      </Button>
      <Link
        to="history"
        className="bg-base-800 rounded-xl body-txtColor-1 text-base font-bold w-full flex justify-between h-14 items-center px-4 xl:hidden"
      >
        Earning History
        <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4 fill-current body-txtColor-1" />
      </Link>
    </>
  );
};

export default CoinsHistory;
