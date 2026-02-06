export const NOTIFICATION_TYPE = {
  TIP: 'tip',
  REFERAL: 'referal',
  MENTION: 'mention',
  BONUS: 'bonus',
  PROMOTION: 'promotion',
} as const;

export const NOTIFICATION_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
} as const;

export const NOTIFICATIONS_FILTER = {
  ALL: 'all',
  UNREAD: NOTIFICATION_STATUS.UNREAD,
} as const;
