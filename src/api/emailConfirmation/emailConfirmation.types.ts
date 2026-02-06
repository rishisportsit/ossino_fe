export type ConfirmEmailRequestData = {
  token: string;
  authorisation_token: string;
};

export type ConfirmEmailResponseData = {
  message: string;
  status: string;
  emailVerified?: boolean;
};

export type EmailConfirmationState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};