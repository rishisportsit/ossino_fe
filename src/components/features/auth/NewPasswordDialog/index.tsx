import KeyIcon from 'assets/icons/Key';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/shared/ui/Dialog';
import { useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { useAppSelector } from 'store/index';
import { DIALOG_TYPE } from 'store/dialog/slice';
import NewPasswordForm from '../NewPasswordForm';

interface NewPasswordDialogData {
  token?: string;
}

const NewPasswordDialog = () => {
  const dialogState = useAppSelector(
    selectDialogById(DIALOG_TYPE.newPassword),
  ) as {
    open: boolean;
    data?: NewPasswordDialogData;
  };
  const { open, data } = dialogState;
  const token = data?.token;

  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.newPassword);
    } else {
      closeDialog(DIALOG_TYPE.newPassword);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="md:max-w-[446px] lg:max-w-[480px]">
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <KeyIcon />
          </div>
          <DialogTitle className="mb-2">Create New Password</DialogTitle>
          <DialogDescription>Please enter a new password</DialogDescription>
        </DialogHeader>
        <NewPasswordForm token={token} />
      </DialogContent>
    </Dialog>
  );
};

export default NewPasswordDialog;
