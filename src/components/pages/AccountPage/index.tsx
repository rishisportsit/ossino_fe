import DeleteAccountButton from 'components/features/settings/DeleteAccountButton';
import DeleteAccountDialog from 'components/features/settings/DeleteAccountDialog';
import EditAccountForm from 'components/features/settings/EditAccountForm';
import EditAvatar from 'components/features/settings/EditAvatar';
import EditAvatarCard from 'components/features/settings/EditAvatarCard';

const AccountPage = () => {
  return (
    <>
      <div className="lg:max-w-[600px]">
        <div className="mb-4">
          <EditAvatarCard />
        </div>
        <div className="mb-12 md:mb-[120px] xl:mb-12">
          <EditAccountForm />
        </div>
        <DeleteAccountButton />
      </div>
      <EditAvatar />
      <DeleteAccountDialog />
    </>
  );
};

export default AccountPage;
