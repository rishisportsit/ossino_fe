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
import { selectUserData } from 'store/user/selectors';
import { refreshUserData } from 'store/user/slice';

const Set2FADialog = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.set2FA));
  const account = useAppSelector(selectUserData);

  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.set2FA);
    } else {
      closeDialog(DIALOG_TYPE.set2FA);
    }
  };

  const handleClick = (enabled: boolean) => {
    dispatch(refreshUserData({ twoFactorEnabled: enabled }));
    closeDialog(DIALOG_TYPE.set2FA);
  };

  const is2FAEnabled = account?.twoFactorEnabled ?? false;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="md:p-8">
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <SmsIcon />
          </div>
          <DialogTitle className="mx-auto !mt-0">
            Two-factor Authentication
          </DialogTitle>
          <DialogDescription className="mx-auto md:max-w-none !mt-2">
            On each login, you&apos;ll be required to use the code created from
            your app to login.
          </DialogDescription>
        </DialogHeader>
        {!is2FAEnabled ? (
          <Button size="lg" onClick={() => handleClick(true)}>
            Enable 2FA
          </Button>
        ) : (
          <Button
            size="lg"
            variant="destructive"
            onClick={() => handleClick(false)}
          >
            Disable 2FA
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Set2FADialog;
