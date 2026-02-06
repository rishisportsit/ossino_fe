import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from './constants';
import type { Notification } from './types';

const details =
  '*Ends at 14:00 PM, 12/08/2024*\n\n## Super Special Giveaway 2024 Every Year\n\n### General Updates\n\nWe have successfully completed an upgrade on our wallets for DOT, KSM, TRX, SUNNEW, NANO and BTTNEW, as a result, we have changed deposit address for above mentioned crypto currencies.\n\n### Personal Information\n\nThe Company collects, or may collect, such information through methods including:\n\n- Data input during account registration processes\n\n- Communications with Customers\n\n### Rakeback\n\nThese programs provide additional funds and incentives to our players which not only provides for a better gambling experience but also contributes to increasing your overall affiliate commission earnings:\n\n- Rakeback\n\n- Weekly bonus\n\n- Monthly bonus\n\n- Hourly / Daily reload\n\n- VIP level rewards';

export const notifications: Record<string, Notification[]> = {
  today: [
    {
      id: 1,
      status: NOTIFICATION_STATUS.UNREAD,
      type: NOTIFICATION_TYPE.TIP,
      user: 'user1432',
      amount: 0.00001,
      details,
    },
    {
      id: 2,
      status: NOTIFICATION_STATUS.UNREAD,
      type: NOTIFICATION_TYPE.REFERAL,
      user: 'rajesh3421',
      details,
    },
    {
      id: 3,
      status: NOTIFICATION_STATUS.READ,
      type: NOTIFICATION_TYPE.MENTION,
      user: 'rajesh3421',
      message: 'Hi! Are you going to join the',
      details,
    },
    {
      id: 4,
      status: NOTIFICATION_STATUS.READ,
      type: NOTIFICATION_TYPE.BONUS,
      details,
    },
    {
      id: 5,
      status: NOTIFICATION_STATUS.UNREAD,
      type: NOTIFICATION_TYPE.PROMOTION,
      promotion: '$10,000 Daily Race',
      details,
    },
  ],
  yesterday: [
    {
      id: 6,
      status: NOTIFICATION_STATUS.UNREAD,
      type: NOTIFICATION_TYPE.TIP,
      user: 'user1432',
      amount: 0.00001,
      details,
    },
    {
      id: 7,
      status: NOTIFICATION_STATUS.UNREAD,
      type: NOTIFICATION_TYPE.REFERAL,
      user: 'rajesh3421',
      details,
    },
    {
      id: 8,
      status: NOTIFICATION_STATUS.READ,
      type: NOTIFICATION_TYPE.MENTION,
      user: 'rajesh3421',
      message: 'Hi! Are you going to join the',
      details,
    },
    {
      id: 9,
      status: NOTIFICATION_STATUS.READ,
      type: NOTIFICATION_TYPE.BONUS,
      details,
    },
    {
      id: 10,
      status: NOTIFICATION_STATUS.UNREAD,
      type: NOTIFICATION_TYPE.PROMOTION,
      promotion: '$10,000 Daily Race',
      details,
    },
  ],
};
