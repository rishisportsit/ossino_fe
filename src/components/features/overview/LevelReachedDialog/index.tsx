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

const LevelReachedDialog = () => {
  const { open, data } = useAppSelector(
    selectDialogById(DIALOG_TYPE.levelReached),
  );
  
  const { openDialog, closeDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.levelReached);
    } else {
      closeDialog(DIALOG_TYPE.levelReached);
    }
  };

  const handleClick = () => {
    closeDialog(DIALOG_TYPE.levelReached);
  };

  const level = data?.level ?? 'Emerald Dragon';
  const image = data?.image ?? '/images/levels/dragon.png';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent variant="success" className="p-8">
        <DialogHeader>
          <div className="relative w-[220px] h-[220px] mx-auto flex items-center justify-center">
            <img
              src="/images/success-gif.gif"
              alt="success"
              className="z-10 absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center">
              <img src={image} alt={level} width={40} height={40} />
            </div>
          </div>
          <div className="w-[220px] md:w-[300px] mx-auto">
            <DialogTitle className="mb-2">Congratulations!</DialogTitle>
            <DialogDescription>
              You’ve reached level{' '}
              <span className="font-bold text-primary-1">{level}</span>
            </DialogDescription>
          </div>
        </DialogHeader>
        <Button size="lg" onClick={handleClick}>
          Got It!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LevelReachedDialog;
