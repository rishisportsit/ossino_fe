import { Sheet, SheetClose, SheetContent } from 'components/shared/ui/Sheet';
import { useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import { formatDistanceToNow } from 'date-fns';
import ArrowRight2Icon from 'assets/icons/ArrowRight2';

const NotificationDetailsSheet = () => {
  const { open, data } = useAppSelector(
    selectDialogById(DIALOG_TYPE.notificationDetails),
  );
  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.notificationDetails);
    } else {
      closeDialog(DIALOG_TYPE.notificationDetails);
    }
  };

  const notification = data?.notification;
  
  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return '';
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        className="flex flex-col border-l border-base-700 max-w-[500px] z-[620] xl:pb-10"
        overlayClassName="z-[610] bg-transparent"
      >
        <div className="flex items-center gap-2 mb-5">
          <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center hover:bg-base-700 transition-colors">
            <span className="sr-only">Back</span>
            <div className="rotate-180 flex items-center justify-center">
              <ArrowRight2Icon />
            </div>
          </SheetClose>
          <div className="inline-flex items-center justify-center text-sm text-primary-2 font-medium h-8 px-4 bg-base-800 rounded-lg">
            Notification Details
          </div>
        </div>
        
        {notification ? (
          <div className="flex flex-col gap-4">
            {/* Notification Header */}
            <div className="p-4 bg-base-800 rounded-xl">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-semibold text-base-100">
                  {notification.title}
                </h3>
                {notification.isRead === false && (
                  <div className="w-2 h-2 bg-accent-1 rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-base-400 mb-3">
                <span className="px-2 py-1 bg-base-700 rounded">
                  {notification.notificationType?.replace(/_/g, ' ')}
                </span>
                {notification.createdDate && (
                  <span>{getTimeAgo(notification.createdDate)}</span>
                )}
              </div>

              {notification.description && (
                <p className="text-sm text-base-300 mb-2">
                  {notification.description}
                </p>
              )}
            </div>

            {/* Notification Message */}
            <div className="p-4 bg-base-800 rounded-xl">
              <h4 className="text-sm font-medium text-base-200 mb-2">Message</h4>
              <div className="text-sm text-base-300 leading-relaxed whitespace-pre-wrap">
                {notification.htmlTemplate || notification.message || 'No message available'}
              </div>
            </div>

            {/* Additional Info */}
           {/*  {(notification.entityType || notification.brand) && (
              <div className="p-4 bg-base-800 rounded-xl">
                <h4 className="text-sm font-medium text-base-200 mb-3">Details</h4>
                <div className="space-y-2">
                  {notification.entityType && (
                    <div className="flex justify-between text-xs">
                      <span className="text-base-400">Type:</span>
                      <span className="text-base-200">{notification.entityType}</span>
                    </div>
                  )}
                  {notification.brand && (
                    <div className="flex justify-between text-xs">
                      <span className="text-base-400">Brand:</span>
                      <span className="text-base-200 capitalize">{notification.brand}</span>
                    </div>
                  )}
                  {notification.notificationPriority && (
                    <div className="flex justify-between text-xs">
                      <span className="text-base-400">Priority:</span>
                      <span className={`font-medium ${
                        notification.notificationPriority === 'HIGH' ? 'text-status-error-100' :
                        notification.notificationPriority === 'MEDIUM' ? 'text-status-warning' :
                        'text-base-200'
                      }`}>
                        {notification.notificationPriority}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )} */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-base-400">No notification details available</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationDetailsSheet;
