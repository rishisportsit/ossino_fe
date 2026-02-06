import { useState, useEffect, type PropsWithChildren } from 'react';

import { DIALOG_TYPE } from 'store/dialog/slice';
import { selectDialogById } from 'store/dialog/selectors';
import { useAppSelector } from 'store/index';
import { selectBetHistoryInSportsBook } from 'store/SportsHomePage/selectors';

import { BREAKPOINTS, useBreakpoint, useDialog } from 'helpers/hooks';
import arrowRight from '/icons/arrowRight.svg?url';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '../ui/Drawer';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '../ui/Sheet';
import Icon from '../Icon';
import BetslipTabs from './BetslipTabs';

const Dialogs = ({ children }: PropsWithChildren) => {
  const { screenWidth } = useBreakpoint();
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.betslip));
  const { closeDialog } = useDialog();

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.betslip);
    }
  };

  if (screenWidth >= BREAKPOINTS.md) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="max-w-[600px] p-0 bg-base-900 flex flex-col"
        >
          <SheetTitle>
            <div className="flex justify-start pt-5 px-5">
              <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
                <span className="sr-only">Close</span>
                <Icon
                  id="arrowRightIcon"
                  href={arrowRight}
                  className="w-4 h-4 fill-current body-txtColor-1"
                />
              </SheetClose>
            </div>
          </SheetTitle>
          <SheetDescription hidden />
          <div className="px-5 pb-5 flex-1">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] !px-0">
        <DrawerTitle hidden />
        <DrawerDescription hidden />
        <div className="px-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};


const BetslipDialog = () => {
  const { data } = useAppSelector(selectDialogById(DIALOG_TYPE.betslip));
  const { openDialog } = useDialog();
  const { screenWidth } = useBreakpoint();
  const originalBetHistory = useAppSelector(selectBetHistoryInSportsBook);
  const [betslipCount, setBetslipCount] = useState(() => {
    const storedSlip = localStorage.getItem("betSlipData") || "[]";
    return JSON.parse(storedSlip).length;
  });

  useEffect(() => {
    const updateCount = () => {
      const storedSlip = localStorage.getItem("betSlipData") || "[]";
      setBetslipCount(JSON.parse(storedSlip).length);
    };
    window.addEventListener("betSlip_updated", updateCount);
    window.addEventListener("betSlip_removing_updated", updateCount);
    return () => {
      window.removeEventListener("betSlip_updated", updateCount);
      window.removeEventListener("betSlip_removing_updated", updateCount);
    };
  }, []);

  useEffect(() => {
    const handleSwitchToBetslip = () => {
      if (screenWidth < BREAKPOINTS.lg) {
        openDialog(DIALOG_TYPE.betslip, { tab: 'betslip' });
      }
    };

    window.addEventListener("switch_to_betslip_tab", handleSwitchToBetslip);
    return () => {
      window.removeEventListener("switch_to_betslip_tab", handleSwitchToBetslip);
    };
  }, [openDialog, screenWidth]);

  return data ? (
    <Dialogs>
      <BetslipTabs
        activeTab={data.tab}
        betslipCount={betslipCount}
        myBetsCount={originalBetHistory?.length ?? 0}
        onTabChange={(val) => openDialog(DIALOG_TYPE.betslip, { tab: val })}
      />
    </Dialogs>
  ) : null;
};

export default BetslipDialog;
