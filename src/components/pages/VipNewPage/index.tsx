import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/index';
import { getVipDetails } from 'store/vip/slice';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import VipEditForm from 'components/features/vip/VipEditForm';
import PageHeader from 'components/shared/PageHeader';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';

const VipNewPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { screenWidth } = useBreakpoint();
  const data = useAppSelector((state) => state.vip.details.data);

  useEffect(() => {
    if (screenWidth >= BREAKPOINTS.xl || data) {
      navigate('/loyalty/overview');
    }
  }, [dispatch, navigate, screenWidth, data]);

  useEffect(() => {
    dispatch(getVipDetails());
  }, [dispatch]);

  return screenWidth < BREAKPOINTS.xl || data ? (
    <div className="pb-[72px] pt-[76px] md:pt-0">
      <PageHeader className="mx-4">
        <PageHeaderBalance />
      </PageHeader>
      <div className="px-4">
        <VipEditForm defaultValues={{ name: '', url: '', games: [] }} isNew />
      </div>
    </div>
  ) : null;
};

export default VipNewPage;
