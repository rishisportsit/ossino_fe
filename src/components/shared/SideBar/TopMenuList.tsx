import { CLIENT_TYPE } from 'constants/clientType';
import { useAppSelector, useAppDispatch } from 'store/index';
import { selectSiteMode } from 'store/siteMode/selectors';
import {
  selectMenuItemsLoading,
  selectTopMenuItems,
} from 'store/sidebar/selectors';
import { setSelectedGameType } from 'store/sidebar/slice';
import { selectIsLoggedIn, selectIsVipUser } from 'store/user/selectors';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useNavigate } from 'react-router-dom';
import MenuList from '../MenuItem/MenuList';
import MenuListLoader from './MenuListLoader';

interface TopMenuListProps {
  isOpen: boolean;
  onClick: (itemId: number | string) => void;
}

const TopMenuList = ({ isOpen, onClick }: TopMenuListProps) => {
  // ...existing code...
  // All variable declarations above

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuItems = useAppSelector(selectTopMenuItems(CLIENT_TYPE));
  const menuItemsLoading = useAppSelector(selectMenuItemsLoading);
  const isAuth = useAppSelector(selectIsLoggedIn);
  const isVipUser = useAppSelector(selectIsVipUser);
  const { openDialog } = useDialog();
  const mode = useAppSelector(selectSiteMode);

  const protectedItems = ['Loyalty', 'Favourites', 'Referral'];

  // Filter menu items by menu_type_name and VIP logic
  const filteredMenuItems = menuItems?.filter((item: any) => {
    // Hide Referral for VIP users
    if (isVipUser && (item.menu_name === 'Referral' || item.label === 'Referral')) return false;
    // Use menu_type_name from API, fallback to ALL if missing
    const type = item.menu_type_name || 'ALL';
    // Accept ALL (case-insensitive)
    if (typeof type === 'string' && type.toUpperCase() === 'ALL') return true;
    // Accept only mode-specific items
    if (mode === 'sports' && typeof type === 'string' && type?.toLowerCase() === 'sports') return true;
    if (mode === 'casino' && typeof type === 'string' && type?.toLowerCase() === 'casino') return true;
    return false;
  });

  const handleMenuClick = (
    itemId: number | string,
    label?: string,
    href?: string,
    menu_type_name?: string,
  ) => {
    if (!isAuth && label && protectedItems.includes(label)) {
      openDialog(DIALOG_TYPE.login, { tab: 'login' });
      return;
    }

    if (label && menu_type_name?.toLowerCase() === 'casino' &&
      !['Favourites', 'Providers', 'Discovery'].includes(label)) {
      dispatch(setSelectedGameType(label));
    }
    if (href) {
      navigate(href);
    }
    onClick(itemId);
  };

  if (menuItemsLoading) {
    return <MenuListLoader isOpen={isOpen} />;
  }
  if (!filteredMenuItems || filteredMenuItems.length === 0) {
    return null;
  }
  return (
    <MenuList
      list={filteredMenuItems}
      isOpen={isOpen}
      onClick={handleMenuClick}
    />
  );
};

export default TopMenuList;
