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

const TipDialog = () => {
  const { open, data } = useAppSelector(
    selectDialogById(DIALOG_TYPE.tip),
  );

  const { openDialog, closeDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.tip);
    } else {
      closeDialog(DIALOG_TYPE.tip);
    }
  };

  const handleClick = () => {
    closeDialog(DIALOG_TYPE.tip);
    closeDialog(DIALOG_TYPE.wallet);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent variant="success" className="md:min-w-[400px] xl:min-w-[400px] h-auto">
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
              Tip is sent successful!             
            </DialogTitle>
            <DialogDescription>
              You have successfully tipped @{data?.receiver || ''} with {data?.amount || '0'}
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

export default TipDialog;
