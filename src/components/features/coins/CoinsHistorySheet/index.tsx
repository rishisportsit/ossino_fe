import { closeDialog, DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';

import ArrowRight2Icon from 'assets/icons/ArrowRight2';
import CoinsHistoryTabs from 'components/features/coins-history/CoinsHistoryTabs';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from 'components/shared/ui/Sheet';

const CoinsHistorySheet = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.dialog.coinsHistory.open);

  const onChangeStatus = (open: boolean) => {
    const func = open ? openDialog : closeDialog;
    dispatch(func({ id: DIALOG_TYPE.coinsHistory }));
  };

  return (
    <Sheet open={open} onOpenChange={onChangeStatus}>
      <SheetContent className="z-[999] !max-w-[600px] w-full">
        <SheetTitle className="hidden" />
        <SheetDescription className="hidden" />
        <div className="flex items-center gap-2 mb-5">
          <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
            <span className="sr-only">Close</span>
            <ArrowRight2Icon />
          </SheetClose>
          <div className="bg-base-800 px-4 h-8 flex items-center justify-center rounded-lg">
            <span className="font-medium text-primary-2 text-sm">
              Coins History
            </span>
          </div>
        </div>
        <CoinsHistoryTabs />
      </SheetContent>
    </Sheet>
  );
};

export default CoinsHistorySheet;
