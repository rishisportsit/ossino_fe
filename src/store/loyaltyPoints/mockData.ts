import gameIcon from '/icons/game.svg?url';
import coinIcon from '/icons/coin.svg?url';
import playCircleIcon from '/icons/playCircle.svg?url';
import type { LoyaltyPoint } from './slice';

export const loyaltyPoints: LoyaltyPoint[] = [
  {
    id: 1,
    icon: {
      id: 'gameIcon',
      href: gameIcon,
    },
    title: 'Originals',
    points: 140,
  },
  {
    id: 2,
    icon: {
      id: 'coinIcon',
      href: coinIcon,
    },

    title: 'Slots',
    points: 1278,
  },
  {
    id: 3,
    icon: {
      id: 'playCircleIcon',
      href: playCircleIcon,
    },
    title: 'Live Casino',
    points: 20221,
  },
];
