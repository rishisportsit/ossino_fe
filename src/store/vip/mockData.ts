import {
  type VipDetailsData,
  type Game,
  type VipEarningHistory,
} from './slice';
import { VipEarningHistoryType } from './types';

export const vipGames: Game[] = [
  {
    title: 'Fruit Tower',
    image: '/src/assets/images/games/fruit-towers.svg',
    link: '#',
    id: 1,
  },
  {
    title: 'Razor Shark',
    image: '/src/assets/images/games/razor-shark.svg',
    link: '#',
    id: 2,
  },
  {
    title: 'Mines',
    image: '/src/assets/images/games/mines.svg',
    link: '#',
    id: 3,
  },
  {
    title: 'Soccer Mania',
    image: '/src/assets/images/games/soccer.svg',
    link: '#',
    id: 4,
  },
  {
    title: 'Old Gun',
    image: '/src/assets/images/games/old-gun.svg',
    link: '#',
    id: 5,
  },
  {
    title: 'Mines',
    image: '/src/assets/images/games/mines.svg',
    link: '#',
    id: 6,
  },

  {
    title: 'Fruit Tower',
    image: '/src/assets/images/games/fruit-towers.svg',
    link: '#',
    id: 7,
  },
  {
    title: 'Mines',
    image: '/src/assets/images/games/mines.svg',
    link: '#',
    id: 8,
  },
  {
    title: 'Soccer Mania',
    image: '/src/assets/images/games/soccer.svg',
    link: '#',
    id: 9,
  },
  {
    title: 'Fruit Tower',
    image: '/src/assets/images/games/fruit-towers.svg',
    link: '#',
    id: 10,
  },
  {
    title: 'Mines',
    image: '/src/assets/images/games/mines.svg',
    link: '#',
    id: 11,
  },
  {
    title: 'Soccer Mania',
    image: '/src/assets/images/games/soccer.svg',
    link: '#',
    id: 12,
  },
];

export const vipDetails: VipDetailsData = {
  name: '',
  url: '', // Empty URL so components use dynamic affiliate URL instead
  games: [1, 2, 3, 4, 5],
  overview: {
    totalEarningCoins: 500,
    numOfSignups: 1232,
    availableEarnings: 36,
  },
};

export const vipEarningHistory: VipEarningHistory[] = [
  {
    id: 1,
    type: VipEarningHistoryType.FriendSignedUp,
    value: 5,
    name: 'rajesh3421',
    date: new Date().toString(),
  },
  {
    id: 2,
    type: VipEarningHistoryType.GamePlayed,
    value: 10,
    name: 'rajesh3421',
    date: new Date().toString(),
  },
  {
    id: 3,
    type: VipEarningHistoryType.FriendSignedUp,
    value: 30,
    name: 'rajesh3421',
    date: new Date().toString(),
  },
];
