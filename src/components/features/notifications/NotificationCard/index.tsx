/* eslint-disable indent */
/* eslint-disable react/destructuring-assignment */
import Icon from 'components/shared/Icon';
import { truncateString } from 'helpers/strings';
import type { Notification } from 'store/notifications/types';
import { formatDistanceToNow } from 'date-fns';

// Icon imports
import buyCrypto2 from '/icons/buyCrypto2.svg?url';
import coinLogo from '/icons/coinLogo.svg?url';
import messageNotif from '/icons/messageNotif.svg?url';
import profile2User from '/icons/profile2user.svg?url';
import ticketDiscount from '/icons/ticketDiscount.svg?url';
import GiftIcon from '/icons/gift.svg?url';

// Map notification types to icons and display logic
const getNotificationDisplay = (notification: Notification) => {
  const notificationType = notification.notificationType?.toLowerCase();

  // Default icon and content
  let icon = <Icon id="messageNotifIcon" href={messageNotif} className="w-5 h-5 text-primary-1 fill-current" />;
  let title = notification.title;
  let subTitle = notification.description;

  // Map notification types to specific icons
  switch (notificationType) {
    case 'deposit_success':
    case 'withdrawal_success':
    case 'transaction_success':
      icon = <Icon id="buyCrypto2Icon" href={buyCrypto2} className="w-5 h-5 text-primary-1 fill-current" />;
      break;
    
    case 'bonus':
    case 'bonus_awarded':
    case 'bonus_available':
      icon = <Icon id="giftIcon" href={GiftIcon} className="w-5 h-5 text-primary-1 fill-current" />;
      break;
    
    case 'promotion':
    case 'promotion_available':
      icon = <Icon id="ticketDiscountIcon" href={ticketDiscount} className="w-5 h-5 text-primary-1" />;
      break;
    
    case 'referral':
    case 'registration_success':
    case 'friend_signup':
      icon = <Icon id="profile2userIcon" href={profile2User} className="w-5 h-5 text-primary-1" />;
      break;
    
    case 'tip':
    case 'reward':
      icon = <Icon id="coinLogoIcon" href={coinLogo} className="w-5 h-5 text-primary-1 inline-block" />;
      break;
    
    case 'mention':
    case 'message':
    case 'chat':
      icon = <Icon id="messageNotifIcon" href={messageNotif} className="w-5 h-5 text-primary-1 fill-current" />;
      break;
    
    default:
      // Use custom icon if provided
      if (notification.notificationIcon) {
        icon = (
          <img 
            src={notification.notificationIcon} 
            alt={notification.title}
            className="w-5 h-5"
          />
        );
      }
  }

  return { icon, title, subTitle };
};

// Format timestamp
const getTimeAgo = (dateString: string) => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch {
    return '';
  }
};

const NotificationCard = (notification: Notification) => {
  const { icon, title, subTitle } = getNotificationDisplay(notification);
  const timeAgo = getTimeAgo(notification.createdDate);

  return (
    <div className="p-4 bg-base-800 rounded-xl hover:bg-base-700 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-base-700 rounded-full flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="grow min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-medium text-base-200 text-sm leading-[18px]">
              {title}
            </p>
            {notification.status === 'unread' && (
              <div className="w-2 h-2 bg-accent-1 rounded-full flex-shrink-0 mt-1" />
            )}
          </div>
          <p className="text-xs text-base-300 leading-4 mb-1 break-words">
            {truncateString(subTitle, 100)}
          </p>
          {timeAgo && (
            <p className="text-xs text-base-400 leading-4">
              {timeAgo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
