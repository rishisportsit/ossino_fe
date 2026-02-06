import GoogleIcon from 'assets/icons/Google';
import { Button } from 'components/shared/ui/Button';
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from 'store/user/slice';
import { useAppDispatch } from 'store/index';
import { getGoogleAuthData } from 'api/google-auth/googleAuth.api';

const GoogleAuth = () => {
  const dispatch = useAppDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const googleAuthResponse = await getGoogleAuthData(tokenResponse);
        await dispatch(loginWithGoogle(googleAuthResponse)).unwrap();
      } catch (error) {
        console.error('Google login error:', error);
      }
    },
    onError: (error) => {
      console.error('Google OAuth error:', error);
    },
    scope: 'email profile',
  });

  return (
    <>
      <p className="text-xs font-regular text-center leading-4 mb-4">
        Or continue with
      </p>
      <Button
        variant="social"
        size="lg"
        className="w-full gap-2.5 border"
        onClick={() => googleLogin()}
      >
        <GoogleIcon /> Google
      </Button>
    </>
  );
};

export default GoogleAuth;
