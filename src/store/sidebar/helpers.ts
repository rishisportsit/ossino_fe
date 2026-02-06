import type { MenuItem } from 'components/shared/MenuItem/menuItems';
import { CLIENT_TYPES, type ClientType } from 'constants/clientType';
import { filterContentItem } from 'store/helpers/filterContentItem';
import iconSource from '/sprite-other-icons.svg?url';

type FilterMenuItem = {
  is_active: boolean;
  after_login: boolean;
  before_login: boolean;
  isDesktopMenu: boolean;
  isMobileMenu: boolean;
};

export const filterMenuItem = <T extends FilterMenuItem>(
  item: T,
  isAuth: boolean,
  device: string,
) => {
  if (!filterContentItem(item, isAuth)) {
    return false;
  }

  if (!item.isDesktopMenu && !item.isMobileMenu) {
    return true;
  }

  if (device === CLIENT_TYPES.desktop && !item.isDesktopMenu) {
    return false;
  }

  if (device === CLIENT_TYPES.mobile && !item.isMobileMenu) {
    return false;
  }

  return true;
};

type MapMenuItem = {
  displayid: number;
  menutype_id: number;
  icontags: string;
  menu_name: string;
  game_count?: number;
  menu_link: string;
  menu_type_name: string;
};

const getMenuLink = (menuName: string, menuLink: string): string => {
  const categoryNames = ['Live Casino', 'Top Games', 'Originals', 'Slots', 'New Releases'];

  if (categoryNames.includes(menuName)) {
    return `/categories${menuLink}`;
  }

  if (menuName === 'Loyality') {
    return '/loyalty/rewards';
  }

  return menuLink;
};

const mapMenuItem = <T extends MapMenuItem & { menu_type_name?: string }>(item: T): MenuItem => {
  return {
    id: item.menutype_id,
    icon: {
      href: iconSource,
      id: item.icontags,
    },
    label: item.menu_name,
    count: item.game_count ?? 0,
    href: getMenuLink(item.menu_name, item.menu_link),
    menu_type_name: item.menu_type_name,
  };
};

type BaseMenuItem = FilterMenuItem &
  MapMenuItem & {
    display_order: number;
  };

export const selectMenuItems = <T extends BaseMenuItem>(
  items: T[] | null,
  isAuth: boolean,
  device: ClientType,
) => {
  if (!items) return null;

  const sorted = [...items].sort((a, b) => a.display_order - b.display_order);

  const result: MenuItem[] = [];

  for (const item of sorted) {
    if (!filterMenuItem(item, isAuth, device)) continue;
    const mappedItem = mapMenuItem(item);
    result.push(mappedItem);
  }

  return result;
};