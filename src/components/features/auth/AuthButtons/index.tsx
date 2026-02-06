import { Button } from 'components/shared/ui/Button';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';

const AuthButtons = () => {
  const { openDialog } = useDialog();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => openDialog(DIALOG_TYPE.login, { tab: 'login' })}
      >
        Login
      </Button>
      <Button className='btn-textColor'
        onClick={() => openDialog(DIALOG_TYPE.login, { tab: 'register' })}
      >
        Sign up
      </Button>
    </div>
  );
};

export default AuthButtons;
