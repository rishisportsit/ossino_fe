import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/index';
import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';

import PageHeader from 'components/shared/PageHeader';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import CoinsHistoryTabs from 'components/features/coins-history/CoinsHistoryTabs';

const CoinsHistoryPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { screenWidth } = useBreakpoint();

  useEffect(() => {
    if (screenWidth >= BREAKPOINTS.xl) {
      dispatch(openDialog({ id: DIALOG_TYPE.coinsHistory }));
      navigate('/loyalty/coins');
    }
  }, [dispatch, navigate, screenWidth]);

  return screenWidth < BREAKPOINTS.xl ? (
    <>
      <PageHeader className="mx-4 mt-[76px] md:mt-0">
        <PageHeaderBalance />
      </PageHeader>
      <div className="pb-16 px-4">
        <CoinsHistoryTabs />
      </div>
    </>
  ) : null;
};

export default CoinsHistoryPage;
