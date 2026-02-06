import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';
import { NOTIFICATIONS_FILTER } from 'store/notifications/constants';
import { useAppSelector } from 'store/index';
import NotificationsList from '../NotificationsList';

const NotificationsTabs = () => {
  const unReadRecords = useAppSelector((state) => state.notifications.unReadRecords);

  return (
    <div className="flex flex-col grow min-h-0">
      <Tabs defaultValue={NOTIFICATIONS_FILTER.ALL} className="grow flex flex-col min-h-0 overflow-hidden">
        <TabsList className="shrink-0">
          <TabsTrigger
            value={NOTIFICATIONS_FILTER.ALL}
            className="md:w-40 lg:w-32"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value={NOTIFICATIONS_FILTER.UNREAD}
            className="md:w-40 lg:w-32 relative"
          >
            Unread
            {unReadRecords > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-accent-1 text-white rounded-full">
                {unReadRecords}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={NOTIFICATIONS_FILTER.ALL} className="grow flex flex-col min-h-0 overflow-hidden">
          <NotificationsList filter={NOTIFICATIONS_FILTER.ALL} />
        </TabsContent>
        <TabsContent value={NOTIFICATIONS_FILTER.UNREAD} className="grow flex flex-col min-h-0 overflow-hidden">
          <NotificationsList filter={NOTIFICATIONS_FILTER.UNREAD} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsTabs;
