import Warning2Icon from 'assets/icons/Warning2Icon';
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
import { Button } from '../ui/Button';

const ErrorDialog = () => {
  const { open, data } = useAppSelector(selectDialogById(DIALOG_TYPE.error));
  const { openDialog, closeDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.error);
    } else {
      closeDialog(DIALOG_TYPE.error);
    }
  };

  const handleClick = () => {
    closeDialog(DIALOG_TYPE.error);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="bg-gradient-pop-up-error p-8 z-[10004]"
        overlayClassName="z-[10003]"
      >
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full background-1/[0.10]  flex items-center justify-center mx-auto">
            <Warning2Icon />
          </div>
          <DialogTitle className="mb-2 max-w-[350px] mx-auto">
            {data?.message}
          </DialogTitle>
          {data?.details ? (
            <DialogDescription className="text-center max-w-[330px] text-sm text-base-200 leading-[18px] mx-auto">
              {data.details}
            </DialogDescription>
          ) : null}
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-full"
            variant="outlineWhite"
            onClick={handleClick}
          >
            Got It!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
