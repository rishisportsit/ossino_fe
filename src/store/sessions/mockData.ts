import type { Session } from './slice';

export const mockSessions: Session[] = [
  {
    id: 1,
    deviceType: 'mobile',
    deviceName: 'Iphone 12',
    country: 'Germany',
    status: 'online',
    lastVisited: new Date(),
  },
  {
    id: 2,
    deviceType: 'desktop',
    deviceName: 'Mac OS X (Chrome 10)',
    country: 'Germany',
    status: 'offline',
    lastVisited: new Date('2024-10-26'),
  },
  {
    id: 3,
    deviceType: 'desktop',
    deviceName: 'MacBook Pro M3 Pro',
    country: 'Italy',
    status: 'offline',
    lastVisited: new Date('2020-05-20'),
  },
];
