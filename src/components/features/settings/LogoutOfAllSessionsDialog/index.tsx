import {
  AlertDialogDescription,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';
import LogoutIcon from 'assets/icons/Logout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogHeader,
} from 'components/shared/ui/AlertDialog';
import { useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import { deleteAllSessions } from 'store/sessions/slice';

const LogoutOfAllSessionsDialog = () => {
  const { open } = useAppSelector(
    selectDialogById(DIALOG_TYPE.logoutOfAllSessions),
  );

  const dispatch = useAppDispatch();

  const { closeDialog, openDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.logoutOfAllSessions);
    } else {
      closeDialog(DIALOG_TYPE.logoutOfAllSessions);
    }
  };

  const handleClick = () => {
    dispatch(deleteAllSessions());
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className='md:p-8'>
        <AlertDialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <LogoutIcon />
          </div>
          <AlertDialogTitle className="!mt-0 mb-2 text-center text-xl leading-[23px] font-bold max-w-64 mx-auto">
            Are you sure you want to log out of all sessions?
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden" />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>
            Yes, I want
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutOfAllSessionsDialog;
