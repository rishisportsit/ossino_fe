import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import EditAvatarDrawer from '../EditAvatarDrawer';
import EditAvatarSheet from '../EditAvatarSheet';

const EditAvatar = () => {
  const { screenWidth } = useBreakpoint();

  if (screenWidth < BREAKPOINTS.md) {
    return <EditAvatarDrawer />;
  }

  return <EditAvatarSheet />;
};

export default EditAvatar;
