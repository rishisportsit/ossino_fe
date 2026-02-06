import { Button } from 'components/shared/ui/Button';
import logout2 from '/icons/logout2.svg?url';
import Icon from 'components/shared/Icon';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';

const LogoutOfAllSessionButton = () => {
  const { openDialog } = useDialog();

  const handleClick = () => {
    openDialog(DIALOG_TYPE.logoutOfAllSessions);
  };

  return (
    <Button size="lg" variant="destructive" onClick={handleClick}>
      <Icon href={logout2} id="logout2Icon" className="w-5 h-5 mr-2" /> Log Out
      of All Sessions
    </Button>
  );
};

export default LogoutOfAllSessionButton;
