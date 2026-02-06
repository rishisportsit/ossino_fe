import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectLoyaltyPointsData } from 'store/loyaltyPoints/selectors';
import { getLoyaltyPoints } from 'store/loyaltyPoints/slice';
import LoyaltyPointsMobile from '../LoyaltyPointsMobile';
import LoyaltyPointsDesktop from '../LoyaltyPointsDesktop';

const LoyaltyPoints = () => {
  const dispatch = useAppDispatch();
  const loyaltyPoints = useAppSelector(selectLoyaltyPointsData) ?? [];

  const { screenWidth } = useBreakpoint();

  useEffect(() => {
    dispatch(getLoyaltyPoints());
  }, [dispatch]);

  if (screenWidth < BREAKPOINTS.xl) {
    return <LoyaltyPointsMobile loyaltyPoints={loyaltyPoints} />;
  }

  return <LoyaltyPointsDesktop loyaltyPoints={loyaltyPoints} />;
};

export default LoyaltyPoints;
