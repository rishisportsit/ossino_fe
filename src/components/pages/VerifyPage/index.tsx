import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Accordion } from 'components/shared/ui/Accordion';
import EmailVerificationAccordion from 'components/features/settings/EmailVerificationAccordion';
// import PersonalInfoAccordion from 'components/features/settings/PersonalInfoAccordion';
import IdVerificationAccordion from 'components/features/settings/IdVerificationAccordion';
import ErrorDialog from 'components/shared/ErrorDialog';
import Loader from 'components/shared/ui/Loader';

import { useAppDispatch, useAppSelector } from 'store/index';
import { confirmEmail } from 'store/emailConfirmation/slice';
import { selectEmailConfirmationLoading } from 'store/emailConfirmation/selectors';
import { selectUserData } from 'store/user/selectors';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';

const VerifyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const token = searchParams.get('token');
  const confirmationLoading = useAppSelector(selectEmailConfirmationLoading);

  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    if (token && userData?.id) {
      const authToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);

      if (authToken && typeof authToken === 'string') {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('token');
        setSearchParams(newSearchParams, { replace: true });

        dispatch(
          confirmEmail({
            token,
            authorisation_token: authToken,
          }),
        ).then((result) => {
          if (confirmEmail.rejected.match(result)) {
            toast.error('Failed to confirm email. Please try again.');
          }
        });
      } else {
        toast.error('Please log in to confirm your email.');
      }
    }
  }, [token, userData?.id, dispatch, searchParams, setSearchParams]);

  if (confirmationLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader />
        <p className="mt-4 text-sm text-base-300">Confirming your email...</p>
      </div>
    );
  }

  return (
    <>
      <Accordion type="multiple" className="flex flex-col gap-3">
        <EmailVerificationAccordion />
        {/* <PersonalInfoAccordion /> */}
        <IdVerificationAccordion />
      </Accordion>
      <ErrorDialog />
    </>
  );
};

export default VerifyPage;
