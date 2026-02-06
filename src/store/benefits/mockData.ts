import type { Benefit } from './slice';

export const benefits: Benefit[] = [
  {
    id: 1,
    title: 'Amber Sprite',
    points: 20,
    image: '/images/levels/sprite.png',
    isOpened: true,
    items: [
      {
        id: 1,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: true,
      },
      {
        id: 2,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: true,
      },
      {
        id: 3,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Bronze Griffin',
    points: 20,
    image: '/images/levels/griffin.png',
    isOpened: false,
    progress: {
      title: 'Earn 3 more point to reach Rookie Level',
      percentage: 88,
      currentPoints: 17,
      totalPoints: 20,
    },
    items: [
      {
        id: 1,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 2,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 3,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
    ],
  },
  {
    id: 3,
    title: 'Ruby Phoenix',
    points: 50,
    image: '/images/levels/phoenix.png',
    isOpened: false,
    progress: {
      title: 'Earn 3 more point to reach Rookie Level',
      percentage: 88,
      currentPoints: 17,
      totalPoints: 20,
    },
    items: [
      {
        id: 1,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 2,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 3,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
    ],
  },
  {
    id: 4,
    title: 'Emerald Dragon',
    points: 200,
    isOpened: false,
    image: '/images/levels/dragon.png',
    progress: {
      title: 'Earn 3 more point to reach Rookie Level',
      percentage: 88,
      currentPoints: 17,
      totalPoints: 20,
    },
    items: [
      {
        id: 1,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 2,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 3,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
    ],
  },
  {
    id: 5,
    title: 'Platinum Chimera',
    points: 500,
    isOpened: false,
    image: '/images/levels/chimera.png',
    progress: {
      title: 'Earn 3 more point to reach Rookie Level',
      percentage: 88,
      currentPoints: 17,
      totalPoints: 20,
    },
    items: [
      {
        id: 1,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 2,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 3,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
    ],
  },
  {
    id: 6,
    title: 'Diamond Hydra',
    points: 1000,
    isOpened: false,
    image: '/images/levels/hydra.png',
    progress: {
      title: 'Earn 3 more point to reach Rookie Level',
      percentage: 88,
      currentPoints: 17,
      totalPoints: 20,
    },
    items: [
      {
        id: 1,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 2,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 3,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
    ],
  },
  {
    id: 7,
    title: 'Titanic Leviathan',
    points: 5000,
    isOpened: false,
    image: '/images/levels/leviathan.png',
    progress: {
      title: 'Earn 3 more point to reach Rookie Level',
      percentage: 88,
      currentPoints: 17,
      totalPoints: 20,
    },
    items: [
      {
        id: 1,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 2,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
      {
        id: 3,
        title: 'Weekly Bonuses',
        description: 'Receive up to 20% back on house',
        isOpened: false,
      },
    ],
  },
];
