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
import AuthTabs, { type AuthTab } from '../AuthTabs';

const AuthSheet = () => {
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
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetTitle className="hidden" />
        <SheetDescription className="hidden" />
        <div className="flex items-center gap-2 mb-5">
          <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center">
            <span className="sr-only">Close</span>
            <ArrowRight2Icon />
          </SheetClose>
        </div>
        <AuthTabs currentTab={currentTab} referalCode={referalCode} />
      </SheetContent>
    </Sheet>
  );
};

export default AuthSheet;
