import type { Message } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMessage = (obj: any): obj is Message => {
  return (
    typeof obj.avatarLink === 'string' &&
    typeof obj.nickName === 'string' &&
    typeof obj.text === 'string'
  );
};
