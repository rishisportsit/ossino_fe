import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectNotificationsData,
  type NotificationsFilter,
} from 'store/notifications/selectors';
import {
  getUserNotifications,
  markNotificationAsRead,
} from 'store/notifications/slice';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { resetPagination } from 'store/notifications/slice';
import NotificationCard from '../NotificationCard';
import NoNotificationsMessage from '../NoNotificationsMessage';
import Loader from 'components/shared/ui/Loader';
import { Button } from 'components/shared/ui/Button';

type NotificationsListProps = {
  filter: NotificationsFilter;
};

const NotificationsList = ({ filter }: NotificationsListProps) => {
  const notifications = useAppSelector(selectNotificationsData(filter));
  const loading = useAppSelector((state) => state.notifications.loading);
  const markingAsRead = useAppSelector((state) => state.notifications.markingAsRead);
  const currentPage = useAppSelector((state) => state.notifications.currentPage);
  const hasMore = useAppSelector((state) => state.notifications.hasMore);
  const totalNotifications = useAppSelector((state) => state.notifications.allNotifications.length);
  
  const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId);
  const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);
  
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();

  useEffect(() => {
    if (userId && accessToken && totalNotifications === 0) {
       dispatch(
        getUserNotifications({
          isDeleted: false,
          itemsPerPage: 10,
          pageNumber: 0,
          userId: String(userId),
          accessToken,
        }),
      );
    }
  }, [dispatch, userId, accessToken, totalNotifications]);

  const loadMore = () => {
    if (userId && accessToken && !loading && hasMore) {
        dispatch(
             getUserNotifications({
               isDeleted: false,
               itemsPerPage: 10,
               pageNumber: currentPage,
               userId: String(userId),
               accessToken,
             }),
        );
    }
  };






  const handleClick = async (notification: any) => {
    // Mark notification as read if it's unread
    if (notification.status === 'unread' && userId && accessToken) {
      await dispatch(
        markNotificationAsRead({
          id: String(notification.id),
          accessToken,
          uuid: notification.uuid,
        }),
      );
    }

    // Open notification details dialog with full notification object
    openDialog(DIALOG_TYPE.notificationDetails, { notification });
  };

  if (loading && (!notifications || Object.keys(notifications).length === 0)) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  if (!notifications || Object.keys(notifications).length === 0) {
    return <NoNotificationsMessage filter={filter} />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-5 flex-1 overflow-y-auto pb-4 px-1 scrollbar-thin scrollbar-thumb-primary-1/30 hover:scrollbar-thumb-primary-1/50 scrollbar-track-base-800/20">
        {Object.keys(notifications).map((key) => {
          const notificationsList = notifications[key];

          if (!notificationsList || notificationsList.length === 0) {
            return null;
          }

          return (
            <div key={key} className="flex flex-col gap-3">
              <h4 className="text-sm text-base-200 font-medium leading-4 capitalize">
                {key}
              </h4>
              {notificationsList.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleClick(notification)}
                  className={`cursor-pointer transition-opacity ${
                    markingAsRead ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <NotificationCard {...notification} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
      
      {hasMore && (
        <div className="flex justify-center py-4 px-4 flex-shrink-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-sm">
          <Button 
            variant="default" 
            size="lg" 
            onClick={loadMore} 
            className="w-full max-w-sm text-white font-bold bg-base-700 hover:bg-base-600 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 border border-base-600 shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Load More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
