import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/index';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import PageHeader from 'components/shared/PageHeader';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';
import VipEarningHistoryContent from 'components/shared/VipEarningHistoryContent';

const VipEarningHistoryPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { screenWidth } = useBreakpoint();

  useEffect(() => {
    if (screenWidth >= BREAKPOINTS.xl) {
      navigate('/loyalty/overview');
    }
  }, [dispatch, navigate, screenWidth]);

  return screenWidth < BREAKPOINTS.xl ? (
    <div className="pb-[72px] pt-[76px] md:pt-0">
      <PageHeader className="mb-5 px-4 xl:px-5">
        <PageHeaderBalance />
      </PageHeader>
      <div className="pb-16 px-4">
        <VipEarningHistoryContent />
      </div>
    </div>
  ) : null;
};

export default VipEarningHistoryPage;
