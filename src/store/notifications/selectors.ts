import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { NOTIFICATIONS_FILTER } from './constants';
import type { Notification } from './types';

export type NotificationsFilter =
  (typeof NOTIFICATIONS_FILTER)[keyof typeof NOTIFICATIONS_FILTER];

export const selectNotificationsData = (filter: NotificationsFilter) =>
  createSelector(
    (state: RootState) => state.notifications.data,
    (data) => {
      if (!data) {
        return {};
      }

      let count = 0;

      const filteredData = Object.keys(data).reduce(
        (acc, key) => {
          if (filter === 'all') {
            count += data[key].length;
            return { ...acc, [key]: data[key] };
          }

          const filteredNotifications = data[key].filter((item) => {
            count += 1;
            return item.status === NOTIFICATIONS_FILTER.UNREAD;
          });

          return {
            ...acc,
            [key]: filteredNotifications,
          };
        },
        {} as Record<string, Notification[]>,
      );

      if (count === 0) {
        return {};
      }

      return filteredData;
    },
  );
