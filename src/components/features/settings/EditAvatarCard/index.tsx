import Icon from 'components/shared/Icon';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import { selectUserData } from 'store/user/selectors';
import { selectPlayerDetails, selectUploadedFilePreview } from 'store/settings/selectors';
import edit from '/icons/edit.svg?url';
import levelAvatar from '/icons/levelAvatar.svg?url';

const EditAvatarCard = () => {
  const account = useAppSelector(selectUserData);
  const playerDetails = useAppSelector(selectPlayerDetails);
  const uploadedFilePreview = useAppSelector(selectUploadedFilePreview);
  const { openDialog } = useDialog();

  if (!account) return null;

  const { level } = account;
  const profilePath = playerDetails?.userOtherInfo?.profilePath;
  const profileImage = uploadedFilePreview || profilePath || account.profileImage;
  const displayName = playerDetails?.nickName || account.userName;

  const handleClick = () => {
    openDialog(DIALOG_TYPE.editAvatar);
  };

  return (
    <div
      className="bg-base-725 rounded-lg p-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex-shrink-0 rounded-full bg-base-600 flex items-center justify-center relative overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt="avatar"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src="/images/levels/phoenix.png"
              alt="avatar"
              width={36}
              height={36}
            />
          )}
        </div>
        <div className="grow line-clamp-2">
          <h3 className="text-lg font-bold leading-none break-words mb-2">{displayName}</h3>
          <p className="text-sm leading-none text-base-300 flex items-center gap-1">
            <Icon href={levelAvatar} id="levelAvatarIcon" className="w-4 h-4" />
            {level}
          </p>
        </div>
        <Icon href={edit} id="editIcon" className="w-4 h-4 flex-shrink-0 fill-1" />
      </div>
    </div>
  );
};

export default EditAvatarCard;
