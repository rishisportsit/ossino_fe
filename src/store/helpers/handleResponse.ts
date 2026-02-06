import type { ServiceResponse } from 'api/types/ServiceResponse';
import { type AxiosResponse } from 'axios';
import { ERROR_IDS } from 'store/const/errors';

export class ServiceError extends Error {
  id?: string;
  code?: number;
  details?: string;

  constructor({
    code,
    id,
    message,
    details,
  }: {
    id?: string;
    message?: string;
    code?: number;
    details?: string;
  }) {
    super(message);
    this.id = id;
    this.code = code;
    this.details = details;
  }
}

export const handleResponse = <T>(
  response: AxiosResponse<ServiceResponse<T>>,
) => {
  const { data } = response;

  if (!('error' in data)) {
    return data.result;
  }

  const errorId = data.result.message;
  let errorMessage;
  let details;

  switch (errorId) {
  case ERROR_IDS.USER_NAME_ALREADY_EXIST:
    errorMessage = 'User email already exists';
    details = 'Please try another email';
    break;
  case ERROR_IDS.INVALID_PASSWORD:
  case ERROR_IDS.INVALID_USER_NAME:
    errorMessage = 'Invalid email or password';
    details = 'Please enter valid email and password';
    break;
  default:
    break;
  }

  const statusCode = data.statusCode ? data.statusCode : undefined;

  throw new ServiceError({
    code: statusCode,
    id: errorId,
    message: errorMessage,
    details,
  });
};
