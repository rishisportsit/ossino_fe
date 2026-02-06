import { Drawer, DrawerContent } from "components/shared/ui/Drawer";
import { useDialog } from "helpers/hooks";
import { selectDialogById } from "store/dialog/selectors"
import { DIALOG_TYPE } from "store/dialog/slice"
import { useAppSelector } from "store/index"
import type { WalletTab } from "store/transactions/mockData/wallet/types";
import WalletTabs from "../WalletTabs";

const WalletDrawer = () => {
  const { open, data } = useAppSelector(selectDialogById(DIALOG_TYPE.wallet));
  const { closeDialog } = useDialog();

  const currentTab: WalletTab = data?.tab || 'deposit';

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.wallet);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-h-[720px]">
        <WalletTabs currentTab={currentTab} dialogData={data} />
      </DrawerContent>
    </Drawer>
  )
}

export default WalletDrawer