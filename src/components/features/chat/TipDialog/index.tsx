import Icon from 'components/shared/Icon';
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
import buyCrypto from '/icons/buyCrypto.svg?url';
import bitcoinBTC from '/icons/bitcoinBTC.svg?url';

const TipDialog = () => {
  const { open, data } = useAppSelector(selectDialogById(DIALOG_TYPE.tip));
  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.tip);
    } else {
      closeDialog(DIALOG_TYPE.tip);
    }
  };

  if (!data) return null;
  const { amount, receiver, sender } = data;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="!rounded-xl gap-4">
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <Icon href={buyCrypto} id="buyCryptoIcon" className="w-10 h-10 fill-1" />
          </div>
          <DialogTitle className="mb-4 !mt-0 leading-5">
            Tip Information
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 w-full justify-center !mt-4">
            <span className="text-sm leading-4 font-bold text-primary-1">
              @{sender}
            </span>
            <span className="text-sm leading-[18px] text-base-200">tipped</span>
            <span className="text-sm leading-4 font-bold text-primary-1">
              @{receiver}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="bg-background-1/10 rounded-xl px-4 py-3 flex items-center gap-2 justify-center">
          <Icon href={bitcoinBTC} id="bitcoinBTCIcon" className="w-4 h-4" />
          <span className="text-sm leading-4">{amount}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipDialog;
