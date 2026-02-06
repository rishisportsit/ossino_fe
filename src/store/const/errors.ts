export const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_IDS = {
  USER_NAME_ALREADY_EXIST: 'USER_NAME_ALREADY_EXIST',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  INVALID_USER_NAME: 'INVALID_USER_NAME',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
} as const ;

export type ErrorDisplay = 'dialog' | 'toast';

export const ERROR_DISPLAY: Record<string, ErrorDisplay> = {
  DIALOG: 'dialog',
  TOAST: 'toast',
} as const;
