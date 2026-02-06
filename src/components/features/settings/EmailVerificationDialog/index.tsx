import SmsIcon from 'assets/icons/Sms';
import { Button } from 'components/shared/ui/Button';
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
import { refreshUserData } from 'store/user/slice';

const EmailVerificationDialog = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(
    selectDialogById(DIALOG_TYPE.emailVerification),
  );

  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.emailVerification);
    } else {
      closeDialog(DIALOG_TYPE.emailVerification);
    }
  };

  const handleClick = () => {
    dispatch(refreshUserData({ emailVerified: true }));
    closeDialog(DIALOG_TYPE.emailVerification);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='md:p-8'>
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <SmsIcon />
          </div>
          <DialogTitle className="max-w-[220px] md:max-w-full xl:max-w-[220px] mx-auto !mt-0">
            Email Verification Required
          </DialogTitle>
          <DialogDescription className="mx-auto md:max-w-none !mt-2">
            lPlease verify your account to gain access to Two-factor
            Authentication
          </DialogDescription>
        </DialogHeader>
        <Button size="lg" onClick={handleClick}>
          Send Verification Email
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationDialog;
