export type RegisterRequestData = {
  email: string;
  password: string;
  referalCode: string;
  termsAndConditions: boolean;
  username: string;
  affiliateBtag?: string;
};

export type LoginRequestData = {
  userName: string;
  password: string;
};

export type GoogleLoginRequestData = {
  authenticationProviderUserId: string;
  authenticationProviderUserName: string;
  authenticationType: string;
  channel: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  termsAndConditions: boolean;
};

export type GoogleLoginResponseData = {
  status: number;
  data: {
    status: string;
    authorisationToken: string;
  };
};

export type LoginResponseData = {
  accessToken: string;
  status: string;
  player_details: {
    userId: number;
    firstName: string | null;
    lastName: string | null;
    nickName: string;
    userRefCode: string;
    userOtherInfo: {
      brand: string;
      email: string;
      city: string | null;
      emailVerified: boolean;
      mfaenabled: boolean;
      vip?: boolean;
      affliateBtag?: string | null;
    };
  };
};

export type GetPlayerBalanceResponseData = {
  balance: number;
  currency: string;
};

export type LogoutRequestData = {
  accessToken: string;
};

export type ForgotPasswordRequestData = {
  email: string;
};

export type PasswordResponseData = {
  status: string;
  data: string;
  message: string;
};

export type ChangePasswordRequestData = {
  accessToken: string;
  newPassword: string;
  oldPassword: string;
  channelType: string;
};
