import { useNavigate } from 'react-router-dom';
import AuthButtons from 'components/features/auth/AuthButtons';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import { useDialog } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import { selectIsLoggedIn } from 'store/user/selectors';
import ActionsBlock from '../Actions/ActionsBlock';
import Switch from '../Switch';
import UserAction from '../User/UserAction';
import useUserDisplayName from '../User/UserDisplayName';
import CurrencyDropdown from './CurrencyDropdown';
import BonusDropdown from './BonusDropdown';
import mainLogo from '/images/o-brand.svg?url';
import wallet2 from '/icons/wallet2.svg?url';

const Header = () => {
  const isAuth = useAppSelector(selectIsLoggedIn);
  const { openDialog } = useDialog();
  const isChatShown = useAppSelector((state) => state.chat.isChatOpen);
  const navigate = useNavigate();
  const userName = useUserDisplayName();

  if (!isAuth) {
    return (
      <header className="w-full fixed md:sticky top-0 z-[100] px-4 pt-4 pb-5 md:pr-4 xl:px-5 bg-header">
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="xl:hidden w-22"
            style={{ height: '40px' }}
          >
            <Icon id="" href={mainLogo} />
          </button>
          <div className="hidden xl:block">
            <Switch />
          </div>
          <AuthButtons />
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        'w-full fixed md:sticky transition-all duration-300 top-0 z-[100] px-4 pt-4 pb-5 md:pr-4 xl:px-5 xl:pl-0 bg-header',
        { 'xl:w-[calc(100%-340px)] transition-all duration-300': isChatShown },
      )}
    >
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="xl:hidden w-22"
          style={{ height: '40px' }}
        >
          <Icon id="" href={mainLogo} />
        </button>
        <div className="flex h-10 w-full items-center justify-end gap-2 pl-2 lg:pl-4">
          <div className="hidden xl:flex w-full justify-between">
            <Switch />
            <ActionsBlock />
          </div>
          <div className="h-10 flex gap-1 md:gap-2 justify-end">
            <div className="relative flex h-full gap-1 md:gap-2">
              <CurrencyDropdown />
              <BonusDropdown />
              <Button
                onClick={() => {
                  openDialog(DIALOG_TYPE.wallet);
                }}
                className=" h-full w-10 xl:w-full rounded-lg px-0 xl:px-4"
              >
                <Icon
                  id="wallet2Icon"
                  href={wallet2}
                  className="w-5 h-5 fill-current body-txtColor-2"
                />
                <span className="hidden xl:block pl-2 body-txtColor-2 text-xs font-medium">
                  Deposit
                </span>
              </Button>
            </div>
            <UserAction name={userName} />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
