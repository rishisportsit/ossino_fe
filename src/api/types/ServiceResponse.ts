type CommonFields = {
  code: string;
  message: string;
  targetSystem: string;
};

type ErrorResponse = CommonFields & {
  error: true;
  statusCode: number;
  result: {
    status: number | string;
    data?: null;
    message: string;
  };
};

type SuccessResponse<T> = CommonFields & {
  result: T;
};

export type ServiceResponse<T> = ErrorResponse | SuccessResponse<T>;
