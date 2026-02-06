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
import { useAppSelector } from 'store/index';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';

const PasswordLinkDialog = () => {
  const { open, data } = useAppSelector(selectDialogById(DIALOG_TYPE.passwordLink));

  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.passwordLink);
    } else {
      closeDialog(DIALOG_TYPE.passwordLink);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='lg:max-w-[480px]'>
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <SmsIcon />
          </div>
          <DialogTitle className="mb-2 max-w-[220px] mx-auto">
            Password link has been sent
          </DialogTitle>
          <DialogDescription className="max-w-[220px] mx-auto md:max-w-none">
            Please check your inbox{' '}
            <span className="font-medium">{data?.email}</span>
          </DialogDescription>
        </DialogHeader>
        <Button size="lg" onClick={() => closeDialog(DIALOG_TYPE.passwordLink)}>
          Check Now
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordLinkDialog;
