import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Dialog, DialogContent } from 'components/shared/ui/Dialog';
import { useDialog } from 'helpers/hooks';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import { chatRules } from './mockRules';

const ChatRulesModal = () => {
  const { open } = useAppSelector(selectDialogById(DIALOG_TYPE.chatRules));

  const { openDialog, closeDialog } = useDialog();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDialog(DIALOG_TYPE.chatRules);
    } else {
      closeDialog(DIALOG_TYPE.chatRules);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-8 gap-4 z-[10000]">
        <DialogTitle className="font-bold text-xl leading-6 items-center mx-auto">
          Chat Rules
        </DialogTitle>

        <DialogDescription className="text-sm font-normal text-base-200 leading-[18px]">
          <ol className="list-decimal list-outside ml-6">
            {chatRules.map((rule) => (
              <li key={rule} className=" text-base-200">{rule}</li>
            ))}
          </ol>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ChatRulesModal;
