import NotificationToggles from 'components/features/settings/NotificationToggles';

const NotificationsSettingsPage = () => {
  return (
    <div>
      <h1 className="font-bold text-sm xl:text-lg leading-none mb-2">
        Manage Your Notification Preferences{' '}
      </h1>
      <p className="text-xs xl:text-sm text-base-300 leading-5 mb-5">
        You will receive notifications based on your selection.
      </p>
      <NotificationToggles />
    </div>
  );
};

export default NotificationsSettingsPage;
