import Icon from 'components/shared/Icon';
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
import EditAvatarForm from '../EditAvatarForm';
import user from "/icons/user.svg?url"

const EditAvatarDrawer = () => {
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.editAvatar));

  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.editAvatar);
    } else {
      openDialog(DIALOG_TYPE.editAvatar);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="h-max pb-8">
        <DrawerTitle className="text-base font-medium mb-5 flex items-center gap-2">
          <Icon href={user} id="userIcon" className='w-4 h-4 fill-1' /> <span className='mt-[2px]'>Edit your avatar</span>
        </DrawerTitle>
        <DrawerDescription className="hidden" />
        <EditAvatarForm />
      </DrawerContent>
    </Drawer>
  );
};

export default EditAvatarDrawer;
