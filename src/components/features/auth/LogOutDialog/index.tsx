import LogoutIcon from 'assets/icons/Logout';
import { Button } from 'components/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/shared/ui/Dialog';
import { useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import LogoutButton from '../LogoutButton';

const LogOutDialog = () => {
  const { closeDialog, openDialog } = useDialog();
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.logout));

  const handleClose = () => {
    closeDialog(DIALOG_TYPE.logout);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.logout);
    } else {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <LogoutIcon />
          </div>
          <DialogTitle className="mb-2 max-w-60 mx-auto">
            Are you sure you want to log out?
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <div className="flex flex-row justify-center gap-4 mt-6 w-full">
          <Button
            onClick={handleClose}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            No
          </Button>
          <LogoutButton className="flex-1" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogOutDialog;
