import type { LeaderboardData, UserLeaderboard } from './slice';

const userLeaderboard: UserLeaderboard[] = [
  {
    id: 1,
    place: 1,
    username: 'arti88',
    avatar: '/images/users/user-1.jfif',
    value: 799999,
  },
  {
    id: 2,
    place: 2,
    username: 'user342',
    avatar: '/images/users/user-2.jfif',
    value: 1799999,
  },
  {
    id: 3,
    place: 3,
    username: 'ganlow',
    avatar: '/images/users/user-3.jfif',
    value: 2000999,
  },
  {
    id: 4,
    place: 4,
    username: 'niko',
    avatar: '/images/users/user-4.jfif',
    value: 2064999,
  },
  {
    id: 5,
    place: 5,
    username: 'useruser123',
    avatar: '/images/users/user-5.jfif',
    value: 25124999,
  },
  {
    id: 6,
    place: 6,
    username: 'arti5sun',
    avatar: '/images/users/user-6.jfif',
    value: 255999,
  },
  {
    id: 7,
    place: 7,
    username: 'natali447473',
    avatar: '/images/users/user-1.jfif',
    value: 253999,
  },
  {
    id: 8,
    place: 8,
    username: 'arti5sun',
    avatar: '/images/users/user-2.jfif',
    value: 25213999,
  },
  {
    id: 9,
    place: 9,
    username: 'arti5sun',
    avatar: '/images/users/user-3.jfif',
    value: 253999,
  },
];

export const leaderboardData: LeaderboardData = {
  leaderboard: userLeaderboard,
  userPosition: 5,
};
