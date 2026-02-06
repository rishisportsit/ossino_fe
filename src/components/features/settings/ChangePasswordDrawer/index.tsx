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
import ChangePasswordForm from '../ChangePasswordForm';
import Icon from 'components/shared/Icon';
import key from '/icons/key.svg?url';

const ChangePasswordDrawer = () => {
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.changePassword));

  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.changePassword);
    } else {
      openDialog(DIALOG_TYPE.changePassword);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="h-max pb-8">
        <DrawerTitle className="text-base font-medium mb-5 flex items-center gap-2">
          {/* <img src="/icons/key.svg" alt="key" className="w-4 h-4" /> */}
          <Icon href={key} id="keyIcon" className="w-4 h-4 fill-1" />
          <span>Change Password</span>
        </DrawerTitle>
        <DrawerDescription className="hidden" />
        <ChangePasswordForm />
      </DrawerContent>
    </Drawer>
  );
};

export default ChangePasswordDrawer;
