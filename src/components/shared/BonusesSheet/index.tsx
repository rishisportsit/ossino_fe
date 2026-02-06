import { closeDialog, DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';

import ArrowRight2Icon from 'assets/icons/ArrowRight2';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from 'components/shared/ui/Sheet';
import BonusesContent from 'components/shared/BonusesContent';

const BonusesSheet = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialog.bonuses.open);

  const onChangeStatus = (open: boolean) => {
    if (open) {
      dispatch(openDialog({ id: DIALOG_TYPE.bonuses }));
    } else {
      dispatch(closeDialog({ id: DIALOG_TYPE.bonuses }));
    }
  };

  return (
    <Sheet open={open} onOpenChange={onChangeStatus}>
      <SheetContent className="z-[999] !max-w-[600px] w-full">
        <SheetTitle hidden />
        <SheetDescription hidden />
        <div className="mb-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
              <span className="sr-only">Close</span>
              <ArrowRight2Icon />
            </SheetClose>
            <div className="bg-base-800 px-4 h-8 flex items-center justify-center rounded-lg">
              <span className="font-medium text-primary-2 text-sm">Bonuses</span>
            </div>
          </div>
        </div>
        <BonusesContent />
      </SheetContent>
    </Sheet>
  );
};

export default BonusesSheet;
