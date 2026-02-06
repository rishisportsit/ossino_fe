import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/shared/Icon';
import { cn } from 'helpers/ui';
import { useAppSelector } from 'store/index';
import { selectBottomMenuItems } from 'store/sidebar/selectors';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { NavigationsItemsType } from './navigationsItems';
import { selectIsLoggedIn } from 'store/user/selectors';

interface INavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Navbar = ({ isOpen, setIsOpen }: INavbarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navigationItems = useAppSelector(selectBottomMenuItems('mobile'));
  const { openDialog } = useDialog();

  const isAuth = useAppSelector(selectIsLoggedIn);
  const handleNavigation = (item: NavigationsItemsType) => {
    if (item.label === 'Menu') {
      setIsOpen(!isOpen);
      return;
    }

    if (!isAuth && item.label !== 'Discovery' && item.label !== "Main" && item.label !== "Sports") {
      openDialog(DIALOG_TYPE.login, { tab: 'login' });
      return;
    }

    navigate(item.href || '/');
  };

  return (
    <nav className="w-full md:w-[calc(100%-var(--scrollbar-width))] fixed h-[73px] bottom-0 left-0 xl:hidden z-50 bg-base-800 flex items-center">
      <ul className="flex w-full justify-between px-4 ">
        {navigationItems.map((item) => {
          const selected = () => {
            if (pathname.startsWith('/sports')) {
              if (item.label === 'Sports') return true;
              if (item.label === 'Discovery') return false;
            }
            if (pathname.includes(item.label?.toLowerCase())) {
              return true;
            }
            return item.href === pathname;
          };
          return (
            <li key={item.id} className="w-[70px] h-[52px] pb-1">
              <button
                type="button"
                className="flex w-full h-full flex-col items-center justify-center gap-1 text-center"
                onClick={() => handleNavigation(item)}
              >
                <span className="flex items-center justify-center body-txtColor-1">
                  {'component' in item.icon ? (
                    <item.icon.component
                      className={cn('w-5 h-5 fill-current stroke-current', {
                        'text-primary-1 stroke-primary-1': selected(),
                      })}
                    />
                  ) : (
                    <Icon
                      id={item.icon.id}
                      href={item.icon.href}
                      className={cn('w-5 h-5 fill-current stroke-current', {
                        'text-primary-1 stroke-primary-1': selected(),
                      })}
                    />
                  )}
                </span>
                <span
                  className={cn('text-xs body-txtColor-1', {
                    'text-special-2': selected(),
                  })}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
