import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';

import PageHeader from 'components/shared/PageHeader';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import NotificationMarkdown from 'components/features/notifications/NotificationMarkdown';

const NotificationsDetailsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { screenWidth } = useBreakpoint();
  const { data } = useAppSelector(
    selectDialogById(DIALOG_TYPE.notificationDetails),
  );

  useEffect(() => {
    if (screenWidth >= BREAKPOINTS.xl) {
      dispatch(openDialog({ id: DIALOG_TYPE.notificationDetails, data }));
      navigate('/');
    }
  }, [dispatch, navigate, screenWidth, data]);

  return screenWidth < BREAKPOINTS.xl ? (
    <div className="px-4 pb-[41px] md:pb-0">
      <PageHeader to="/notifications" className="mb-5" />
      <NotificationMarkdown>{data?.details ?? ''}</NotificationMarkdown>
    </div>
  ) : null;
};

export default NotificationsDetailsPage;
