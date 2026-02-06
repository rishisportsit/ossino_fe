import { STORAGE_KEYS } from 'constants/storage';
import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
} from 'axios';
import { LocalStorageHelper } from 'helpers/storage';

export class AxiosClient {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });

    this.api.interceptors.request.use((config) => {
      const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);

      if (!accessToken) {
        return config;
      }

      if (config.method !== 'GET') {
        if (config.data instanceof FormData) {
          return config;
        }

        const configWithData: InternalAxiosRequestConfig = {
          ...config,
          data: { ...config.data, accessToken },
        };

        return configWithData;
      }

      const configWithParams: InternalAxiosRequestConfig = {
        ...config,
        params: { ...config.params, accessToken },
      };

      return configWithParams;
    });

    this.api.interceptors.response.use(
      (response) => {
        const { data } = response;

        // Add validation for critical wallet balance endpoints
        if (response.config.url?.includes('wallet/balance') || response.config.url?.includes('getUserWallet')) {
          console.log('Wallet API Response:', {
            url: response.config.url,
            data: data,
            timestamp: new Date().toISOString()
          });

          // Basic validation for wallet response structure
          if (data && typeof data === 'object') {
            // Log any potential decimal precision issues
            if (data.result && Array.isArray(data.result)) {
              data.result.forEach((currency: any) => {
                if (currency.totalBalance && currency.multiplier) {
                  const computed = currency.totalBalance * currency.multiplier;
                  console.log(`Currency ${currency.currencyCode}: raw=${currency.totalBalance}, multiplier=${currency.multiplier}, computed=${computed}`);
                }
              });
            }
          }
        }

        if (
          data &&
          data.error === true &&
          data.result &&
          data.result.status === '401'
        ) {
          import('../store').then(({ store }) => {
            import('../store/user/slice').then(({ logout }) => {
              store.dispatch(logout());
            });
          });
          return Promise.reject(new Error('Unauthorized'));
        }
        return response;
      },
      (error) => {
        console.error('API Error:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
          timestamp: new Date().toISOString()
        });

        if (error.response?.status === 401) {
          import('../store').then(({ store }) => {
            import('../store/user/slice').then(({ logout }) => {
              store.dispatch(logout());
              // Optional: redirect to login
              // window.location.href = '/login'; 
            });
          });
        } else if (error.response?.status >= 500) {
          // Log server errors for debugging
          console.error('Server error details:', {
            url: error.config?.url,
            response: error.response?.data
          });
        }
        return Promise.reject(error);
      }
    );
  }

  protected get client() {
    return this.api;
  }

  static setAccessToken(accessToken: string) {
    LocalStorageHelper.setItem(STORAGE_KEYS.accessToken, accessToken);
  }

  static clearAccessToken() {
    LocalStorageHelper.removeItem(STORAGE_KEYS.accessToken);
  }
}
