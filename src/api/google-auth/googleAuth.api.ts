import type { TokenResponse } from '@react-oauth/google';
import type { GoogleLoginRequestData } from 'api/auth/auth.types';
import axios from 'axios';

export const getGoogleAuthData = async (
  tokenResponse: Omit<
    TokenResponse,
    'error' | 'error_description' | 'error_uri'
  >,
): Promise<GoogleLoginRequestData> => {
  try {
    const { data: googleUser } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
    );

    const {
      sub: authenticationProviderUserId,
      given_name: firstName,
      family_name: lastName,
      email,
    } = googleUser;

    const result = {
      authenticationProviderUserId,
      authenticationProviderUserName: email,
      authenticationType: 'GOOGLE',
      firstName,
      lastName,
      email,
      channel: 'Internet',
      role: 'PLAYER',
      termsAndConditions: true,
    };

    return result;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Error sending request to google: ${e}`);
    throw e;
  }
};
