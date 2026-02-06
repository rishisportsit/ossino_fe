import KeyIcon from 'assets/icons/Key';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/shared/ui/Dialog';
import { useDialog } from 'helpers/hooks';
import { useAppSelector } from 'store/index';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import ForgotPasswordForm from '../ForgotPasswordForm';

const ForgotPasswordDialog = () => {
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.forgotPassword));

  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.forgotPassword);
    } else {
      closeDialog(DIALOG_TYPE.forgotPassword);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent variant="success">
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <KeyIcon />
          </div>
          <DialogTitle className="mb-2">Forgot Password?</DialogTitle>
          <DialogDescription>
            Enter your email address and we&apos;ll send you a password reset
            link
          </DialogDescription>
        </DialogHeader>
        <ForgotPasswordForm />
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
