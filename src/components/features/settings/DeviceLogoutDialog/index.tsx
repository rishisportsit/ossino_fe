import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/shared/ui/Dialog';
import { useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import mobile from '/icons/mobile.svg?url';
import monitor from '/icons/monitor.svg?url';
import logout2 from '/icons/logout2.svg?url';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import { deleteSession } from 'store/sessions/slice';
import { formatDate } from '../formatDate';

const DeviceLogoutDialog = () => {
  const { open, data } = useAppSelector(
    selectDialogById(DIALOG_TYPE.deviceLogout),
  );

  const dispatch = useAppDispatch();

  const { closeDialog, openDialog } = useDialog();

  if (!data) {
    return null;
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.deviceLogout);
    } else {
      closeDialog(DIALOG_TYPE.deviceLogout);
    }
  };

  const handleClick = () => {
    dispatch(deleteSession(data.id));
    closeDialog(DIALOG_TYPE.deviceLogout);
  };

  const { country, deviceName, deviceType, lastVisited, status } = data;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='md:p-8'>
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            {deviceType === 'mobile' ? (
              // <img src={mobile} alt="mobile device" className="w-10 h-10" />
              <Icon href={mobile} id="mobileIcon" className="w-5 h-5 fill-1" />
            ) : (
              // <img src={monitor} alt="desktop device" className="w-10 h-10" />
              <Icon href={monitor} id="monitorIcon" className="w-5 h-5 fill-1" />
            )}
          </div>
          <DialogTitle className="leading-6 !mt-0">{deviceName}</DialogTitle>
          <DialogDescription className="!mt-2 flex items-center gap-1.5 justify-center">
            <span className="text-sm leading-none text-base-300">
              {country}
            </span>
            <span className="w-1 h-1 bg-base-300 rounded-full mt-[3px]" />
            {status === 'online' ? (
              <span className="text-sm text-status-success leading-none">
                Online
              </span>
            ) : (
              <span className="text-sm leading-none text-base-300">
                {formatDate(lastVisited)}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <Button variant="destructive" size="lg" onClick={handleClick}>
          <Icon href={logout2} id="logout2Icon" className="w-5 h-5 mr-2" /> Log
          Out from this Device
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceLogoutDialog;
