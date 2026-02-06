import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import AuthDrawer from '../AuthDrawer';
import AuthSheet from '../AuthSheet';

const AuthDialogs = () => {
  const { screenWidth } = useBreakpoint();

  if (screenWidth >= BREAKPOINTS.md) {
    return <AuthSheet />;
  }

  return <AuthDrawer />;
};

export default AuthDialogs;
