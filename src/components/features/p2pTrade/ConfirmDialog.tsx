import { type PropsWithChildren } from 'react';

import { selectDialogById } from 'store/dialog/selectors';
import { useAppSelector } from 'store/index';
import { DIALOG_TYPE } from 'store/dialog/slice';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import moneys from '/icons/moneys.svg?url';
import Icon from 'components/shared/Icon';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from 'components/shared/ui/Drawer';
import { Button } from 'components/shared/ui/Button';
import ErrorMessage from 'components/shared/ui/ErrorMessage';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeaderWithBack,
} from 'components/shared/ui/Sheet';

const Dialogs = ({ children }: PropsWithChildren) => {
  const { screenWidth } = useBreakpoint();
  const { open } = useAppSelector(
    selectDialogById(DIALOG_TYPE.p2pTradeConfirm),
  );
  const { closeDialog, openDialog } = useDialog();

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.p2pTradeConfirm);
    }
  };
  if (screenWidth >= BREAKPOINTS.md) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="max-w-[600px] py-5 px-8 bg-base-900"
        >
          <SheetHeaderWithBack
            onClick={() => openDialog(DIALOG_TYPE.p2pTradeDetails)}
            label="Purchasing Details"
          />
          <SheetDescription hidden />
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-fit pb-8">
        <DrawerTitle className="flex items-center gap-2 mb-5">
          <Icon id="moneysIcon" href={moneys} className="size-4 fill-1" />
          Listing details
        </DrawerTitle>
        <DrawerDescription hidden />
        {children}
      </DrawerContent>
    </Drawer>
  );
};

const ConfirmDialog = () => {
  const { closeDialog } = useDialog();

  const onClick = () => {
    closeDialog(DIALOG_TYPE.p2pTradeConfirm);
  };
  return (
    <Dialogs>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-base-300 text-sm flex justify-between">
            Units<span className="body-txtColor-1 font-medium">100</span>
          </p>
          <p className="text-base-300 text-sm flex justify-between">
            List Timer<span className="body-txtColor-1 font-medium">40min</span>
          </p>
          <p className="text-base-300 text-sm flex justify-between">
            Sell Price<span className="text-primary-1 font-medium">$69.00</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button size="lg" disabled onClick={onClick}>
            Confirm Buy
          </Button>
          <ErrorMessage>
            Unable to list the trade currently. Please try again later.
          </ErrorMessage>
        </div>
      </div>
    </Dialogs>
  );
};

export default ConfirmDialog;
