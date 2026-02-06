import { DIALOG_TYPE } from 'store/dialog/slice';

import { type MenuItem } from 'components/shared/MenuItem/menuItems';
import wallet from '/icons/wallet2.svg?url';
import transactions from '/icons/convertCard.svg?url';
import bonuses from '/icons/gift.svg?url';
import settings from '/icons/setting2.svg?url';
import refer from '/icons/people.svg?url';
import logout from '/icons/logout.svg?url';

const baseLinks = (isDesktop: boolean): MenuItem[] => [
  {
    id: 1,
    icon: {
      id: 'wallet2Icon',
      href: wallet,
    },
    label: 'Wallet',
    href: '#',
    dialogId: DIALOG_TYPE.wallet,
  },
  {
    id: 2,
    icon: {
      id: 'convertCardIcon',
      href: transactions,
    },
    label: 'Transactions',
    href: '/transactions',
  },
  {
    id: 3,
    icon: {
      id: 'giftIcon',
      href: bonuses,
    },
    label: 'Bonuses',
    ...(isDesktop
      ? { href: '#', dialogId: DIALOG_TYPE.bonuses }
      : { href: 'bonuses' }),
  },
  {
    id: 4,
    icon: {
      id: 'settings2Icon',
      href: settings,
    },
    label: 'Settings',
    href: "settings",
  },
  {
    id: 5,
    icon: {
      id: 'peopleIcon',
      href: refer,
    },
    label: 'Refer a Friend',
    href: 'referral',
  },
  {
    id: 6,
    icon: {
      id: 'logoutIcon',
      href: logout,
    },
    label: 'Logout',
    href: '#',
    dialogId: DIALOG_TYPE.logout,
  },
];

export const links = (isDesktop: boolean, isVipUser: boolean = false): MenuItem[] => {
  const menuItems = baseLinks(isDesktop);
  
  if (isVipUser) {
    return menuItems.filter(item => item.label !== 'Refer a Friend');
  }
  
  return menuItems;
};
