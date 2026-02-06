import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import { useAppDispatch } from 'store/index';

import PageHeader from 'components/shared/PageHeader';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import NotificationsTabs from 'components/features/notifications/NotificationsTabs';

const NotificationsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { screenWidth } = useBreakpoint();

  useEffect(() => {
    if (screenWidth >= BREAKPOINTS.xl) {
      dispatch(openDialog({ id: DIALOG_TYPE.notifications }));
      navigate('/');
    }
  }, [dispatch, navigate, screenWidth]);

  return screenWidth < BREAKPOINTS.xl ? (
    <div className="px-4 pb-[41px] md:pb-0 pt-[76px] md:pt-0 h-[calc(100vh-60px)] flex flex-col">
      <div className="shrink-0">
        <PageHeader to="/" label="Notifications" className="mb-5" />
      </div>
      <div className="grow overflow-hidden flex flex-col">
        <NotificationsTabs />
      </div>
    </div>
  ) : null;
};

export default NotificationsPage;
