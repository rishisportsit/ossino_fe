import { initialBalances } from 'constants/currencies';
import Icon from 'components/shared/Icon';
import type { UserData } from './slice';
import userAvatarIcon from '/icons/userAvatar.svg?url';

export const userData: UserData = {
  id: 1,
  title: 'Amber Sprite',
  balance: 0,
  lifetimePoints: 0,
  toNextRank: 20,
  progress: 65,
  levelImage: '/images/levels/sprite.png',
  isVip: true,
  firstName: 'Alex',
  lastName: 'Williamson',
  userName: 'alexalex12',
  email: '8173333333@betcorrect.com',
  emailVerified: false,
  dateOfBirth: '1993-01-02',
  city: 'New York',
  idVerified: false,
  password: '12345678',
  passwordChanged: false,
  twoFactorEnabled: false,
  profileImage: null,
  level: 'Ruby Fhoenix',
  balances: initialBalances,
  pointsBalance: 0,
  avatar: <Icon href={userAvatarIcon} id="userAvatarIcon" className="h-4 w-4" />,
  brand: ""
};
