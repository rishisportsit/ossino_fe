import type { NOTIFICATION_STATUS } from './constants';
import type { NotificationData } from 'api/notifications/notifications.types';

export type NotificationStatus =
  (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS];

// New API-based notification type
export type Notification = NotificationData & {
  status: NotificationStatus;
};

// Keep old types for backward compatibility if needed
export type LegacyNotification = {
  id: number;
  status: NotificationStatus;
  details: string;
  type: string;
  user?: string;
  amount?: number;
  message?: string;
  promotion?: string;
};
