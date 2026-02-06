import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/index';
import { getVipDetails, type VipDetailsData } from 'store/vip/slice';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import VipEditForm from 'components/features/vip/VipEditForm';
import PageHeader from 'components/shared/PageHeader';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';

const getDefaultValues = (data: VipDetailsData) => {
  const { overview, ...other } = data;
  return {
    ...other,
    games: other.games.map(String), // Convert number[] to string[]
  };
};

const VipEditPage = () => {
  const { screenWidth } = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.vip.details.data);

  useEffect(() => {
    dispatch(getVipDetails());
  }, [dispatch]);

  useEffect(() => {
    if (screenWidth >= BREAKPOINTS.xl) {
      navigate('/loyalty/overview');
    }
  }, [dispatch, navigate, screenWidth]);

  return screenWidth < BREAKPOINTS.xl && data ? (
    <div className="pb-[72px] pt-[76px] md:pt-0">
      <PageHeader className="mx-4">
        <PageHeaderBalance />
      </PageHeader>
      <div className="px-4">
        <VipEditForm defaultValues={getDefaultValues(data)} />
      </div>
    </div>
  ) : null;
};

export default VipEditPage;
