import SheetHeading from 'components/shared/SheetHeading';
import { Sheet, SheetContent } from 'components/shared/ui/Sheet';
import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import { cn } from 'helpers/ui';
import NotificationsTabs from '../NotificationsTabs';

import styles from './index.module.css';

const NotificationsSheet = () => {
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.notifications));
  const { closeDialog, openDialog } = useDialog();
  const { screenWidth } = useBreakpoint();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.notifications);
    } else {
      closeDialog(DIALOG_TYPE.notifications);
    }
  };

  if (screenWidth < BREAKPOINTS.xl) return null;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        className="flex flex-col border-l border-base-700 max-w-[400px] z-[620] xl:pb-10"
        overlayClassName="z-[610]"
      >
        <SheetHeading title="Notifications" />
        <NotificationsTabs />
      </SheetContent>
      <div
        className={cn(
          'fixed w-[399px] h-[66px] z-[130] transition ease-in-out',
          styles['bg-gradient'],
          {
            'slide-out-to-right animate-out duration-300': !open,
            'slide-in-from-right animate-in duration-500 bottom-0 right-0': open,
          },
        )}
      />
    </Sheet>
  );
};

export default NotificationsSheet;
