import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import ChangePasswordSheet from '../ChangePasswordSheet';
import ChangePasswordDrawer from '../ChangePasswordDrawer';

const ChangePassword = () => {
  const { screenWidth } = useBreakpoint();

  if (screenWidth < BREAKPOINTS.md) {
    return <ChangePasswordDrawer />;
  }

  return <ChangePasswordSheet />;
};

export default ChangePassword;
