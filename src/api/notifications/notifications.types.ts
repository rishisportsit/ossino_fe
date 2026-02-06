export interface GetUserNotificationsRequest {
  isDeleted: boolean;
  itemsPerPage: number;
  pageNumber: number;
  userId: string;
  accessToken: string;
}

export interface NotificationData {
  id: number;
  userId: number;
  uuid: string;
  userCampaignId: number;
  brand: string;
  entityType: string;
  notificationType: string;
  notificationStatus: string;
  notificationPriority: string;
  notificationIcon: string | null;
  bannerName: string | null;
  bannerPath: string | null;
  title: string;
  description: string;
  message: string;
  htmlTemplate: string;
  startDate: string | null;
  endDate: string | null;
  actionButtonUrls: string[];
  actionButtonLabels: string[];
  isRead: boolean;
  isDeleted: boolean;
  data: string;
  createdDate: string;
  updatedDate: string;
  isActive: boolean;
  notificationsCount: number;
  totalRecords: number;
  unReadRecords: number;
  deletedRecords: number;
}

export interface GetUserNotificationsResponse {
  totalRecords: number;
  data: NotificationData[];
  unReadRecords: number;
  deletedRecords: number;
}

export interface MarkNotificationAsReadRequest {
  id: string;
  accessToken: string;
  uuids: string;
}

export interface MarkAllNotificationsAsReadRequest {
  userId: string;
  accessToken: string;
}
