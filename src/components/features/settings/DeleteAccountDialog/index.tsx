import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'components/shared/ui/AlertDialog';
import { useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { deleteAccount } from 'store/settings/slice';
import { logout } from 'store/user/slice';
import Loader from 'components/shared/ui/Loader';
import warning2 from '/icons/warning2.svg?url';
import Icon from 'components/shared/Icon';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';

const DeleteAccountDialog = () => {
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.deleteAccount));
  const deleteAccountLoading = useAppSelector((state) => state.settings.deleteAccountLoading);
  const dispatch = useAppDispatch();
  const { openDialog, closeDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.deleteAccount);
    } else {
      closeDialog(DIALOG_TYPE.deleteAccount);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteAccount()).unwrap();

      // Close the delete dialog immediately
      closeDialog(DIALOG_TYPE.deleteAccount);

      // Show brief success message
      openDialog(DIALOG_TYPE.success, {
        message: 'Account deleted successfully',
        details: 'Your account has been permanently excluded. Logging out...'
      });

      // Automatically logout after 1.5 seconds
      setTimeout(() => {
        LocalStorageHelper.removeItem(STORAGE_KEYS.accessToken);
        LocalStorageHelper.removeItem(STORAGE_KEYS.userId);
        LocalStorageHelper.removeItem('persist:root');
        window.location.href = '/';
      }, 1500);

    } catch (error) {
      openDialog(DIALOG_TYPE.error, {
        message: 'Failed to delete account',
        details: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="bg-gradient-pop-up-error md:p-8">
        <AlertDialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full background-1/[0.10]  flex items-center justify-center mx-auto">
            <Icon href={warning2} id="warning2Icon" className="w-10 h-10" />
          </div>
          <AlertDialogTitle className="mb-2 max-w-[350px] mx-auto">
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center max-w-[330px] text-sm text-base-200 leading-[18px] mx-auto">
            All your balance and progress on the platform will be lost and you
            will not be able to manage it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel variant="filledWhite" disabled={deleteAccountLoading}>
            Go back
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={deleteAccountLoading}
          >
            {deleteAccountLoading ? <Loader className="mr-2" /> : null}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
