import type { ErrorDisplay } from 'store/const/errors';

export type ErrorState = {
  id?: string;
  message: string;
  status?: number;
  details?: string;
};

export type RejectionError = ErrorState & {
  errorDisplay?: ErrorDisplay;
};