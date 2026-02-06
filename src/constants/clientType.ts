import { isMobile } from 'react-device-detect';

export const CLIENT_TYPES = {
  mobile: 'mobile',
  desktop: 'desktop',
} as const;

export const CLIENT_TYPE = isMobile
  ? CLIENT_TYPES.mobile
  : CLIENT_TYPES.desktop;

export type ClientType = keyof typeof CLIENT_TYPES;
