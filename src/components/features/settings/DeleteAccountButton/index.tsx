import { Button } from 'components/shared/ui/Button';
import trash from '/icons/trash.svg?url';
import Icon from 'components/shared/Icon';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';

const DeleteAccountButton = () => {
  const { openDialog } = useDialog();

  const handleClick = () => {
    openDialog(DIALOG_TYPE.deleteAccount);
  };

  return (
    <Button
      onClick={handleClick}
      variant="destructive"
      size="lg"
      className="w-full md:w-[294px]"
    >
      <Icon href={trash} id="trashIcon" className="w-5 h-5 mr-2" />
      Delete Account
    </Button>
  );
};

export default DeleteAccountButton;
