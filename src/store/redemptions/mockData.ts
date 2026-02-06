import { type Redemption } from './slice';

export const redemptions: Redemption[] = [
  {
    id: 1,
    href: '/images/redemptions/free-spins.png',
    name: '10 Free Spins',
    value: 100,
    bonusCount: 10,
    bonusId: 18,
    description:
      'Some description here on how it can be archived and how users can use this prize.',
  },
  {
    id: 2,
    href: '/images/redemptions/free-bets.png',
    name: '20 Free Bets',
    value: 100,
    bonusCount: 20,
    bonusId: 18,
    description:
      'Some description here on how it can be archived and how users can use this prize.',
  },
  {
    id: 3,
    href: '/images/redemptions/cards.png',
    name: '50 Free ',
    value: 100,
    bonusCount: 50,
    bonusId: 18,
    description:
      'Some description here on how it can be archived and how users can use this prize.',
  },
  // {
  //   id: 4,
  //   href: '/images/redemptions/surprise-box.png',
  //   name: 'Surprise Box',
  //   value: 100,
  //   bonusCount: 1,
  //   description:
  //     'Some description here on how it can be archived and how users can use this prize.',
  // },
];
