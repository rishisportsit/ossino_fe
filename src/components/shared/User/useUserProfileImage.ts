import { useAppSelector } from 'store/index';
import { selectPlayerDetails } from 'store/settings/selectors';
import { selectUserData } from 'store/user/selectors';

export const useUserProfileImage = () => {
  const playerDetails = useAppSelector(selectPlayerDetails);
  const account = useAppSelector(selectUserData);
  
  const profilePath = playerDetails?.userOtherInfo?.profilePath;
  const profileImage = profilePath || account?.profileImage;
  
  return {
    profileImage,
    hasProfileImage: !!profileImage,
    profilePath,
    localProfileImage: account?.profileImage
  };
};