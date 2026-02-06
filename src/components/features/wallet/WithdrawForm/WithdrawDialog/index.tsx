import Icon from 'components/shared/Icon';
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
import { useAppSelector } from 'store/index';

import yellowWallet from '/icons/yellowWallet.svg?url';

type WithdrawDialogProps = {
  amount: string;
  currency: string;
}

const WithdrawDialog = ({ amount, currency }: WithdrawDialogProps) => {
  const { open } = useAppSelector(
    selectDialogById(DIALOG_TYPE.withdrawn),
  );

  const { openDialog, closeDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.withdrawn);
    } else {
      closeDialog(DIALOG_TYPE.withdrawn);
    }
  };

  const handleClick = () => {
    closeDialog(DIALOG_TYPE.withdrawn);
    closeDialog(DIALOG_TYPE.wallet);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent variant="success" className="md:min-w-[480px] xl:min-w-[400px] h-auto">
        <DialogHeader className='flex flex-col gap-8'>
          <div className="relative w-[220px] h-[220px] mx-auto flex items-center justify-center">
            <img
              src="/images/success-gif.gif"
              alt="success"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="z-10 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center">
              <Icon href={yellowWallet} id='yellowWalletIcon' className='w-10 h-10 fill-current text-primary-1' />
            </div>
          </div>
          <div className="mx-0">
            <DialogTitle className="mb-2">
              Withdrawal is successful!             
            </DialogTitle>
            <DialogDescription>
            You have successfully withdrawn {amount} {currency}. <br />It takes around few minutes <br />to be sent to your address.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Button size="lg" onClick={handleClick}>
          Got it!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialog;
