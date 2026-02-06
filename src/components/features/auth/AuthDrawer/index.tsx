import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from 'components/shared/ui/Drawer';
import { useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import AuthTabs, { type AuthTab } from '../AuthTabs';

const AuthDrawer = () => {
  const { open, data } = useAppSelector(selectDialogById(DIALOG_TYPE.login));
  const { closeDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.login);
    }
  };

  const currentTab: AuthTab = data?.tab || 'login';
  const referalCode: string | undefined = data?.referalCode;

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerDescription className="hidden" />
        <DrawerTitle className="hidden" />
        <div className="max-w-[430px] mx-auto">
          <AuthTabs currentTab={currentTab} referalCode={referalCode} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AuthDrawer;
