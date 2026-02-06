import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/index';
import {
  getVipDetails,
  getVipGames,
  selectVipGamesAreFresh,
} from 'store/vip/slice';

import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import VipDetailsEnhanced from 'components/features/vip/VipDetailsEnhanced';
import PageHeader from 'components/shared/PageHeader';
import PageHeaderBalance from 'components/shared/PageHeaderBalance';

const VipDetailsPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.vip.details.data);
  const games = useAppSelector((state) => state.vip.games.data);
  const gamesLoading = useAppSelector((state) => state.vip.games.loading);
  const userData = useAppSelector((state) => state.user.data);
  const affiliateData = useAppSelector((state) => state.vip.affiliate.data);
  const vipGamesAreFresh = useAppSelector(selectVipGamesAreFresh);
  const navigate = useNavigate();
  const { screenWidth } = useBreakpoint();

  useEffect(() => {
    if (screenWidth >= BREAKPOINTS.xl) {
      navigate('/loyalty/overview');
    }
  }, [dispatch, navigate, screenWidth]);

  useEffect(() => {
    if (
      userData?.id &&
      affiliateData?.btag &&
      !vipGamesAreFresh &&
      !gamesLoading
    ) {
      dispatch(
        getVipGames({
          userId: userData.id.toString(),
          affiliateId: affiliateData.btag,
        }),
      );
    }
    if (!data) {
      dispatch(getVipDetails());
    }
  }, [
    dispatch,
    userData?.id,
    affiliateData?.btag,
    vipGamesAreFresh,
    gamesLoading,
    data,
  ]);

  return (
    <div className="pb-[72px] pt-[76px] md:pt-0">
      <PageHeader className="mx-4">
        <PageHeaderBalance />
      </PageHeader>
      {games ? <VipDetailsEnhanced data={data} games={games} /> : null}
    </div>
  );
};

export default VipDetailsPage;
