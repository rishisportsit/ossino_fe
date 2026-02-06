import { useAppSelector } from 'store/index';
import { selectPlayerDetails } from 'store/settings/selectors';
import { selectUserData } from 'store/user/selectors';

const useUserDisplayName = () => {
  const accountInfo = useAppSelector(selectPlayerDetails);
  const account = useAppSelector(selectUserData);
  if (accountInfo) {
    const fullName =
      `${accountInfo.firstName ?? ''} ${accountInfo.lastName ?? ''}`.trim();
    if (fullName) return fullName;
    if (accountInfo.userName) return accountInfo.userName;
    if (accountInfo.nickName) return accountInfo.nickName;
    if (accountInfo.userOtherInfo && accountInfo.userOtherInfo.email)
      return accountInfo.userOtherInfo.email;
  }
  if (account && account.email) return account.email;
  return '—';
}

export default useUserDisplayName;