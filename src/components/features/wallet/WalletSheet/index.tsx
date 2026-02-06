import ArrowRight2Icon from 'assets/icons/ArrowRight2';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from 'components/shared/ui/Sheet';
import { useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import type { WalletTab } from 'store/transactions/mockData/wallet/types';
import WalletTabs from '../WalletTabs';

const WalletSheet = () => {
  const { open, data } = useAppSelector(selectDialogById(DIALOG_TYPE.wallet));

  const { closeDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.wallet);
    }
  };
  const currentTab: WalletTab = data?.tab || 'deposit';

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="!max-w-[600px] w-full">
        <SheetTitle>
          <SheetDescription>
            <div className="flex items-center gap-2 mb-5">
              <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
                <span className="sr-only">Close</span>
                <ArrowRight2Icon />
              </SheetClose>
              <div className="bg-base-800 px-4 h-8 flex items-center justify-center rounded-lg">
                <span className="font-medium text-primary-2 text-sm">Wallet</span>
              </div>
            </div>
          </SheetDescription>
        </SheetTitle>
        <WalletTabs currentTab={currentTab} dialogData={data} />
      </SheetContent>
    </Sheet>
  );
};

export default WalletSheet;
