import { CLIENT_TYPE } from 'constants/clientType';
import type { AxiosResponse } from 'axios';
import { config } from 'config/index';
import { AxiosClient } from '../axiosClient';
import type { ServiceResponse } from '../types/ServiceResponse';
import type {
  ChangePasswordRequestData,
  ForgotPasswordRequestData,
  GetPlayerBalanceResponseData,
  LoginRequestData,
  LoginResponseData,
  LogoutRequestData,
  PasswordResponseData,
  RegisterRequestData,
  GoogleLoginRequestData,
  GoogleLoginResponseData,
} from './auth.types';

const { wrapperServiceUrl } = config;

class AuthApi extends AxiosClient {
  async register(data: RegisterRequestData) {
    const result = await this.client.post('/api/v1/register', {
      ...data,
      clientType: CLIENT_TYPE,
      role: 'PLAYER',
      affiliateBtag: data.affiliateBtag || '',
    });

    return result;
  }

  async login(
    data: LoginRequestData,
  ): Promise<AxiosResponse<ServiceResponse<LoginResponseData>>> {
    const result = await this.client.post('/api/v1/player/authenticate', {
      ...data,
      channelType: CLIENT_TYPE,
      isUserdetailsRequired: true,
    });

    return result;
  }

  async loginWithGoogle(
    data: GoogleLoginRequestData,
  ): Promise<AxiosResponse<ServiceResponse<GoogleLoginResponseData>>> {
    const result = await this.client.post(
      '/api/v1/player/authenticate/custom',
      {
        ...data,
        isUserdetailsRequired: true,
      },
    );

    return result;
  }

  async getPlayerBalance(): Promise<AxiosResponse<ServiceResponse<GetPlayerBalanceResponseData>>> {
    const result = await this.client.post('/api/v1/player/balance', { clientType: CLIENT_TYPE });
    return result;
  }

  async logout(
    data: LogoutRequestData,
  ): Promise<AxiosResponse<ServiceResponse<null>>> {
    const result = await this.client.post('/api/v1/player/logout', {
      ...data,
      channelType: CLIENT_TYPE,
    });

    return result;
  }

  async forgotPassword(
    data: ForgotPasswordRequestData,
  ): Promise<AxiosResponse<ServiceResponse<PasswordResponseData>>> {
    const result = await this.client.post(
      '/v1/player/forgot/pin/request/email',
      { ...data, clientType: CLIENT_TYPE },
    );

    return result;
  }

  async changePassword(
    data: ChangePasswordRequestData,
  ): Promise<AxiosResponse<ServiceResponse<PasswordResponseData>>> {
    const result = await this.client.post(
      '/api/v1/player/change/password',
      { ...data, clientType: CLIENT_TYPE },
    );

    return result;
  }
}

const ApiInstance = new AuthApi(wrapperServiceUrl);

export {
  ApiInstance as AuthApi
};

