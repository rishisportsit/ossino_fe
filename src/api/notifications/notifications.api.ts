import type { AxiosResponse } from 'axios';
import { config } from 'config/index';
import type { ServiceResponse } from 'api/types/ServiceResponse';
import { AxiosClient } from '../axiosClient';
import type {
  GetUserNotificationsRequest,
  GetUserNotificationsResponse,
  MarkNotificationAsReadRequest,
  MarkAllNotificationsAsReadRequest,
} from './notifications.types';

const { wrapperServiceUrl } = config;

class NotificationsApi extends AxiosClient {
  getUserNotifications(
    data: GetUserNotificationsRequest,
  ): Promise<AxiosResponse<ServiceResponse<GetUserNotificationsResponse>>> {
    return this.client.post('/api/v1/player/notifications', data);
  }

  markNotificationAsRead(
    data: MarkNotificationAsReadRequest,
  ): Promise<AxiosResponse<ServiceResponse<any>>> {
    return this.client.put('/api/v1/player/notifications/mark-as-read', data);
  }

  markAllNotificationsAsRead(
    data: MarkAllNotificationsAsReadRequest,
  ): Promise<AxiosResponse<ServiceResponse<any>>> {
    return this.client.post('/api/v1/player/notifications/mark-all-as-read', data);
  }
}

const notificationsApiInstance = new NotificationsApi(wrapperServiceUrl);

export { notificationsApiInstance as NotificationsApi };
