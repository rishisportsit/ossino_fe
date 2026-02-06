import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import {
  ERROR_CODES,
  ERROR_DISPLAY,
  type ErrorDisplay,
} from 'store/const/errors';
import { DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import type { ErrorState } from 'store/types/Error';

type ErrorPayload = ErrorState & {
  errorDisplay?: ErrorDisplay;
  skipErrorMiddleware?: boolean;
};

export const errorMiddleware: Middleware =
  ({ dispatch }) =>
    (next) =>
      (action) => {
        const response = next(action);

        if (isRejectedWithValue(action)) {
          const payload = action.payload as ErrorPayload;

          if (payload?.skipErrorMiddleware || payload?.message?.includes('REQUEST_IN_PROGRESS_WAIT')) {
            return response;
          }

          const {
            status,
            message,
            details,
            errorDisplay = 'toast' as ErrorDisplay,
          } = payload;

          if (status === ERROR_CODES.UNAUTHORIZED) {
            dispatch(openDialog({ id: DIALOG_TYPE.login, data: { tab: 'login' } }));
          }

          if (errorDisplay === ERROR_DISPLAY.TOAST) {
            console.error('Toast error:', { status, message, details });
            toast.error(message);
          }

          if (errorDisplay === ERROR_DISPLAY.DIALOG) {
            dispatch(
              openDialog({ id: DIALOG_TYPE.error, data: { message, details } }),
            );
          }
        }

        return response;
      };
