import { type DIALOG_TYPE } from 'store/dialog/slice';

import newReleases from '/icons/monitor.svg?url';
import ticketDiscount from '/icons/ticketDiscount.svg?url';
import favorites from '/icons/bookmark.svg?url';
import providers from '/icons/likeDislike.svg?url';
import loyalty from '/sprite-other-icons.svg?url';
import referral from '/icons/profile2user.svg?url';
import lobby from '/icons/home2.svg?url';
import game from '/icons/game.svg?url';
import coin from '/icons/coin.svg?url';
import playCircle from '/icons/playCircle.svg?url';
import blackjack from '/icons/blackjack.svg?url';
import level from '/icons/level.svg?url';
import blackjack2 from '/icons/blackjack2.svg?url';

import type { SVGProps } from 'react';
export type Icon =
  | { id: string; href: string }
  | { component: (props: SVGProps<SVGSVGElement>) => JSX.Element };

export type MenuItem = {
  id: number | string;
  icon: Icon;
  label: string;
  count?: number;
  href?: string;
  dialogId?: keyof typeof DIALOG_TYPE;
  data?: NonNullable<unknown>;
  protected?: boolean;
  providerCounts?: Record<string, number>;
  hideIconWhenExpanded?: boolean;
  menu_type_name?: string;
};

export const menuItems: MenuItem[] = [
  {
    id: 1,
    icon: {
      id: 'home2Icon',
      href: lobby,
    },
    label: 'home',
    href: '/',
  },
  {
    id: 2,
    icon: {
      id: 'monitorIcon',
      href: newReleases,
    },
    label: 'new-releases',
    href: 'categories/new-releases',
  },
  {
    id: 3,
    icon: {
      id: 'ticketDiscountIcon',
      href: ticketDiscount,
    },
    label: 'promotions',
    href: 'promotions',
  },
  {
    id: 4,
    icon: {
      id: 'bookmarkIcon',
      href: favorites,
    },
    label: 'favorites',
    href: 'favorites',
    protected: true,
  },
  {
    id: 5,
    icon: {
      id: 'likeDislikeIcon',
      href: providers,
    },
    label: 'providers',
    href: 'providers',
  },
  {
    id: 6,
    icon: {
      id: 'crownIcon',
      href: loyalty,
    },
    label: 'rewards',
    href: 'loyalty/rewards',
    protected: true,
  },
  {
    id: 7,
    icon: {
      id: 'profile2userIcon',
      href: referral,
    },
    label: 'referral',
    href: 'referral',
    protected: true,
  },
];

export const categoriesItems: MenuItem[] = [
  {
    id: 8,
    icon: {
      id: 'gameIcon',
      href: game,
    },
    label: 'originals',
    count: 15,
    href: 'categories/originals',
  },
  {
    id: 9,
    icon: {
      id: 'coinIcon',
      href: coin,
    },
    label: 'slots',
    count: 85,
    href: 'categories/slots',
  },
  {
    id: 10,
    icon: {
      id: 'playCircleIcon',
      href: playCircle,
    },
    label: 'live-casino',
    count: 24,
    href: 'categories/live-casino',
  },
  {
    id: 11,
    icon: {
      id: 'blackjackIcon',
      href: blackjack,
    },
    label: 'blackjack',
    count: 45,
    href: 'categories/blackjack',
  },
  {
    id: 12,
    icon: {
      id: 'levelIcon',
      href: level,
    },
    label: 'roulette',
    count: 50,
    href: 'categories/roulette',
  },
  {
    id: 13,
    icon: {
      id: 'blackjack2Icon',
      href: blackjack2,
    },
    label: 'baccarat',
    count: 28,
    href: 'categories/baccarat',
  },
];
