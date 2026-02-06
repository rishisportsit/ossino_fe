import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsApi } from 'api/notifications/notifications.api';
import type {
  GetUserNotificationsRequest,
  NotificationData,
} from 'api/notifications/notifications.types';
import { handleError } from 'store/helpers/handleError';
import { handleResponse } from 'store/helpers/handleResponse';
import type { Notification } from './types';
import { NOTIFICATION_STATUS } from './constants';

// Helper function to group notifications by date
const groupNotificationsByDate = (notifications: Notification[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const grouped: Record<string, Notification[]> = {
    today: [],
    yesterday: [],
    earlier: [],
  };

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.createdDate);
    const notificationDay = new Date(
      notificationDate.getFullYear(),
      notificationDate.getMonth(),
      notificationDate.getDate(),
    );

    if (notificationDay.getTime() === today.getTime()) {
      grouped.today.push(notification);
    } else if (notificationDay.getTime() === yesterday.getTime()) {
      grouped.yesterday.push(notification);
    } else {
      grouped.earlier.push(notification);
    }
  });

  // Remove empty groups
  Object.keys(grouped).forEach((key) => {
    if (grouped[key].length === 0) {
      delete grouped[key];
    }
  });

  return grouped;
};

// Convert API notification to our internal format
const convertApiNotification = (apiNotification: NotificationData): Notification => ({
  ...apiNotification,
  status: apiNotification.isRead ? NOTIFICATION_STATUS.READ : NOTIFICATION_STATUS.UNREAD,
});

export const getUserNotifications = createAsyncThunk(
  'notifications/getUserNotifications',
  async (data: GetUserNotificationsRequest, { rejectWithValue }) => {
    try {
      const response = await NotificationsApi.getUserNotifications(data);
      const result = handleResponse(response);
      
      // Result structure: { status, data: { totalRecords, data: [], unReadRecords, deletedRecords }, message }
      const responseData = result.data;
      
      // Convert API notifications to internal format
      const notifications = responseData.data.map(convertApiNotification);
      
      return {
        notifications,
        totalRecords: responseData.totalRecords,
        unReadRecords: responseData.unReadRecords,
        deletedRecords: responseData.deletedRecords,
      };
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (
    { id, accessToken, uuid }: { id: string; accessToken: string; uuid: string },
    { rejectWithValue },
  ) => {
    try {
      await NotificationsApi.markNotificationAsRead({ 
        id, 
        accessToken, 
        uuids: uuid 
      });
      return Number(id);
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async ({ userId, accessToken }: { userId: string; accessToken: string }, { rejectWithValue }) => {
    try {
      await NotificationsApi.markAllNotificationsAsRead({ userId, accessToken });
      return true;
    } catch (error) {
      const errorState = handleError(error);
      return rejectWithValue(errorState);
    }
  },
);

type NotificationsState = {
  data: Record<string, Notification[]> | null;
  allNotifications: Notification[];
  totalRecords: number;
  unReadRecords: number;
  loading: boolean;
  markingAsRead: boolean;
  markingAllAsRead: boolean;
  error: Error | null;
  currentPage: number;
  hasMore: boolean;
};

const initialState: NotificationsState = {
  data: null,
  allNotifications: [],
  totalRecords: 0,
  unReadRecords: 0,
  loading: false,
  markingAsRead: false,
  markingAllAsRead: false,
  error: null,
  currentPage: 0,
  hasMore: true,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.data = null;
      state.allNotifications = [];
      state.totalRecords = 0;
      state.unReadRecords = 0;
      state.currentPage = 0;
      state.hasMore = true;
    },
    resetPagination: (state) => {
      state.currentPage = 0;
      state.allNotifications = [];
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get user notifications
      .addCase(getUserNotifications.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        
        // Append new notifications to existing list logic
        const newNotifications = action.payload.notifications;
        
        const existingIds = new Set(state.allNotifications.map(n => n.id));
        const uniqueNewNotifications = newNotifications.filter(n => !existingIds.has(n.id));
        
        state.allNotifications = [...state.allNotifications, ...uniqueNewNotifications];
        
        // Re-group all notifications
        state.data = groupNotificationsByDate(state.allNotifications);
        
        state.totalRecords = action.payload.totalRecords;
        state.unReadRecords = action.payload.unReadRecords;
        
        // Check if we have more records
        if (newNotifications.length === 0) {
          state.hasMore = false;
        } else {
          state.hasMore = state.allNotifications.length < state.totalRecords;
        }

        // Update current page based on request
        state.currentPage = action.meta.arg.pageNumber + 1;
      })
      .addCase(getUserNotifications.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.loading = false;
        // Don't clear data on error, so user can see what was loaded
      })
      // Mark notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.markingAsRead = true;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.markingAsRead = false;
        // Update the notification status in state
        
        // Update allNotifications array
        state.allNotifications = state.allNotifications.map((notification) => 
            notification.id === action.payload
            ? { ...notification, status: NOTIFICATION_STATUS.READ, isRead: true }
            : notification
        );

        if (state.data) {
          Object.keys(state.data).forEach((key) => {
            state.data![key] = state.data![key].map((notification) =>
              notification.id === action.payload
                ? { ...notification, status: NOTIFICATION_STATUS.READ, isRead: true }
                : notification,
            );
          });
          // Decrease unread count
          if (state.unReadRecords > 0) {
            state.unReadRecords -= 1;
          }
        }
      })
      .addCase(markNotificationAsRead.rejected, (state) => {
        state.markingAsRead = false;
      })
      // Mark all notifications as read
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.markingAllAsRead = true;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.markingAllAsRead = false;
        // Update all notifications to read status
        
        state.allNotifications = state.allNotifications.map((notification) => ({
             ...notification,
             status: NOTIFICATION_STATUS.READ,
             isRead: true,
        }));

        if (state.data) {
          Object.keys(state.data).forEach((key) => {
            state.data![key] = state.data![key].map((notification) => ({
              ...notification,
              status: NOTIFICATION_STATUS.READ,
              isRead: true,
            }));
          });
          state.unReadRecords = 0;
        }
      })
      .addCase(markAllNotificationsAsRead.rejected, (state) => {
        state.markingAllAsRead = false;
      });
  },
});

export const { clearNotifications, resetPagination } = notificationsSlice.actions;
export default notificationsSlice.reducer;
