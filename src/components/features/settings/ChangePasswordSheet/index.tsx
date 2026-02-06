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
import ChangePasswordForm from '../ChangePasswordForm';

const ChangePasswordSheet = () => {
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.changePassword));
  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.changePassword);
    } else {
      closeDialog(DIALOG_TYPE.changePassword);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetTitle className="hidden" />
        <SheetDescription className="hidden" />
        <div className="flex items-center gap-2 mb-5">
          <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
            <span className="sr-only">Close</span>
            <ArrowRight2Icon />
          </SheetClose>
          <span className="hidden lg:inline-flex items-center justify-center text-sm text-primary-2 font-medium h-8 px-4 bg-base-800 rounded-lg">
            Change Password
          </span>
        </div>
        <ChangePasswordForm />
      </SheetContent>
    </Sheet>
  );
};

export default ChangePasswordSheet;
