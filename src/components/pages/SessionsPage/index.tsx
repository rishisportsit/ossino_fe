import DeviceLogoutDialog from 'components/features/settings/DeviceLogoutDialog';
import LogoutOfAllSessionsDialog from 'components/features/settings/LogoutOfAllSessionsDialog';
import SessionsList from 'components/features/settings/SessionsList';

const SessionsPage = () => {
  return (
    <>
      <SessionsList />
      <DeviceLogoutDialog />
      <LogoutOfAllSessionsDialog />
    </>
  );
};

export default SessionsPage;
