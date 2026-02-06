import { type AxiosError, isAxiosError } from 'axios';
import { type ErrorState } from 'store/types/Error';
import { ERROR_CODES } from 'store/const/errors';
import { ServiceError } from './handleResponse';

const defaultErrors: Record<number, ErrorMessage> = {
  [ERROR_CODES.BAD_REQUEST]: { message: 'Bad request' },
  [ERROR_CODES.UNAUTHORIZED]: {
    message: 'Session expired',
    details: 'Please log in again',
  },
  [ERROR_CODES.FORBIDDEN]: { message: 'Forbidden' },
  [ERROR_CODES.NOT_FOUND]: { message: 'Not found' },
  [ERROR_CODES.VALIDATION_ERROR]: { message: 'Validation error' },
  [ERROR_CODES.TOO_MANY_REQUESTS]: { message: 'Too many requests' },
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: { message: 'Internal server error' },
};

type ErrorMessage = {
  message: string;
  details?: string;
};

export const handleError = (
  error: unknown,
  customErrorMessages: Record<number, ErrorMessage> = {},
  defaultMessage = 'Something went wrong',
): ErrorState => {
  if (error instanceof ServiceError) {
    const { message, code, id, details } = error;

    let resultMessage = message ?? defaultMessage;
    if (code && customErrorMessages[code]) {
      resultMessage = customErrorMessages[code].message;
    }

    return {
      id,
      message: resultMessage,
      status: code,
      details,
    };
  }

  if (!isAxiosError(error)) {
    return {
      message: defaultMessage,
      status: undefined,
    };
  }

  const axiosError = error as AxiosError;
  const status = axiosError.response?.status;

  // Check for custom error message based on status
  if (status && customErrorMessages[status]) {
    const { message, details } = customErrorMessages[status];

    return {
      message,
      status,
      details,
    };
  }

  // Use default error message for the status code if available
  if (status && defaultErrors[status]) {
    const { message, details } = defaultErrors[status];

    return {
      message,
      status,
      details,
    };
  }

  // Network or timeout errors
  if (axiosError.code === 'ECONNABORTED') {
    return { message: 'Request timeout', status };
  }

  if (axiosError.code === 'ERR_NETWORK') {
    return { message: 'Network error. Please check your connection.', status };
  }

  // Default fallback for axios errors
  return {
    message: defaultMessage,
    status,
  };
};
