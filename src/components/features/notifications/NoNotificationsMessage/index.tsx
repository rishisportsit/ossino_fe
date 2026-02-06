import Icon from 'components/shared/Icon';
import notificationBing from '/icons/notificationBing.svg?url';
import type { NotificationsFilter } from 'store/notifications/selectors';

type NoNotificationsMessageProps = {
  filter?: NotificationsFilter;
};

const NoNotificationsMessage = ({ filter }: NoNotificationsMessageProps) => {
  const getMessage = () => {
    if (filter === 'unread') {
      return 'No unread messages';
    }
    return 'It seems like you don\'t have notifications';
  };

  return (
    <div className="bg-base-800 xl:bg-base-900 rounded-lg h-[552px] md:h-[443px] flex flex-col items-center justify-center text-center gap-4">
      <Icon
        id="notificationBingIcon"
        href={notificationBing}
        className="w-16 h-16 icon-placeholder"
      />
      <p className="text-xs text-base-400 leading-4 max-w-[170px] xl:text-base xl:max-w-[220px] xl:leading-[22px]">
        {getMessage()}
      </p>
    </div>
  );
};

export default NoNotificationsMessage;
