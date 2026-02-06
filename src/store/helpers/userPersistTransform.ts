import { createTransform } from 'redux-persist';
import type { UserState } from 'store/user/slice';

export const UserPersistTransform = createTransform(
  (inboundState, key) => {
    if (key === 'user') {
      const userState = inboundState as UserState | null;

      if (!userState) {
        return null;
      }

      const { loggedIn, data } = userState;
      return { loggedIn, data };
    }

    return inboundState;
  },
  (outboundState) => outboundState,
  { whitelist: ['user'] },
);
