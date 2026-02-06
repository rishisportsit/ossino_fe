import iconSource from '/sprite-other-icons.svg?url';
import { ROUTES } from 'constants/routes';
import { type Icon } from 'components/shared/MenuItem/menuItems';
import home from '/icons/home2.svg?url';
import search from '/icons/searchNormal.svg?url';
import soccer from '/icons/soccer.svg?url';
import loyalty from '/sprite-other-icons.svg?url';
import menu from '/icons/menu.svg?url';
import type { BottomMenuItem } from 'api/sidebar/sidebar.types';
import { filterMenuItem } from 'store/sidebar/helpers';
import { type ClientType } from 'constants/clientType';

export type NavigationsItemsType = {
  id: number;
  icon: Icon;
  label: string;
  href?: string;
};

const MENU_LINKS = {
  1932: '/',
  1933: ROUTES.search,
  1934: '/sports',
  1935: '/loyalty/rewards',
};

const MENU_ICONS = {
  1932: { id: 'home2Icon', href: home },
  1933: { id: 'searchNormalIcon', href: search },
  1934: { id: 'soccerIcon', href: soccer },
  1935: { id: 'icon-loyalty', href: loyalty },
};

const ICON_MAPPING = { 'crash-game': 'crash-games' };

export const navigationItems: NavigationsItemsType[] = [
  {
    id: 1,
    label: 'Main',
    icon: {
      id: 'home2Icon',
      href: home,
    },
    href: '/',
  },
  {
    id: 2,
    label: 'Discovery',
    icon: {
      id: 'searchNormalIcon',
      href: search,
    },
    href: ROUTES.search,
  },
  {
    id: 3,
    label: 'Sports',
    icon: {
      id: 'soccerIcon',
      href: soccer,
    },
  },
  {
    id: 4,
    label: 'Loyalty',
    icon: {
      id: 'icon-loyalty',
      href: loyalty,
    },
    href: '/loyalty/rewards',
  },
  {
    id: 5,
    label: 'Menu',
    icon: {
      id: 'menuIcon',
      href: menu,
    },
  },
];

const mapMenuItem = (item: BottomMenuItem): NavigationsItemsType => {
  const href = MENU_LINKS[item.displayid as keyof typeof MENU_LINKS];
  const icon = MENU_ICONS[item.displayid as keyof typeof MENU_ICONS];

  const iconId = ICON_MAPPING[item.icontags as keyof typeof ICON_MAPPING] || item.icontags;

  return {
    id: item.displayid,
    label: item.menu_name,
    icon: icon || {
      id: iconId,
      href: iconSource,
    },
    href: href || item.menu_link,
  };
};

export const transformBottomMenuItems = (menuItems: BottomMenuItem[] | null, isAuth: boolean, device: ClientType): NavigationsItemsType[] => {
  if (!menuItems) return navigationItems;

  const sortedItems = [...menuItems].sort((a, b) => a.display_order - b.display_order);

  const result: NavigationsItemsType[] = sortedItems
    .filter((item) => filterMenuItem(item, isAuth, device))
    .map(mapMenuItem);

  result.push({
    id: 5,
    label: 'Menu',
    icon: {
      id: 'menuIcon',
      href: menu,
    },
  });

  return result;
};
