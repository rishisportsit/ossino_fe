import ChangePassword from 'components/features/settings/ChangePassword';
import ChangePasswordCard from 'components/features/settings/ChangePasswordCard';
import EmailVerificationDialog from 'components/features/settings/EmailVerificationDialog';
import Set2FADialog from 'components/features/settings/Set2FADialog';
// import TwoFactorAuthCard from 'components/features/settings/TwoFactorAuthCard';

const SecurityPage = () => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-bold leading-none mb-2">Password</h2>
        {/* <p className="text-sm text-base-300 leading-5 mb-3">
          Last changed May 9, 2024
        </p> */}
        <ChangePasswordCard />
      </div>
      {/* <div>
        <h2 className="text-lg font-bold leading-none mb-2">
          Two-factor Authentication
        </h2>
        <p className="text-sm text-base-300 leading-5 mb-3">
          On each login, you&apos;ll be required to use the code created from
          your app to login.
        </p>
        <TwoFactorAuthCard />
      </div> */}
      <ChangePassword />
      <EmailVerificationDialog />
      <Set2FADialog />
    </>
  );
};

export default SecurityPage;
