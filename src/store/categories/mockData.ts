import type { MenuItem } from "components/shared/MenuItem/menuItems";
import blackjack from '/icons/blackjack.svg?url';
import blackjack2 from '/icons/blackjack2.svg?url';
import coin from '/icons/coin.svg?url';
import game from '/icons/game.svg?url';
import level from '/icons/level.svg?url';
import playCircle from '/icons/playCircle.svg?url';

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
