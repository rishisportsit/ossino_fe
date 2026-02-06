import Icon from 'components/shared/Icon';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import { selectUserData } from 'store/user/selectors';
import { selectPlayerDetails } from 'store/settings/selectors';
import Badge from '../Badge';
import arrowRight from '/icons/arrowRight.svg?url';
import lock2 from '/icons/lock2.svg?url';

const TwoFactorAuthCard = () => {
  const account = useAppSelector(selectUserData);
  const playerDetails = useAppSelector(selectPlayerDetails);
  const { openDialog } = useDialog();

  const handleClick = () => {
    // For Google login users, read from playerDetails.userOtherInfo.emailVerified
    // For regular users, fallback to account.emailVerified
    const isEmailVerified = playerDetails?.userOtherInfo?.emailVerified ?? account?.emailVerified ?? false;

    if (!isEmailVerified) {
      openDialog(DIALOG_TYPE.emailVerification);
      return;
    }

    openDialog(DIALOG_TYPE.set2FA);
  };

  const isEnabled = account?.twoFactorEnabled ?? false;

  return (
    <div
      onClick={handleClick}
      className="bg-base-800 border border-base-700 p-4 rounded-xl cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center bg-base-700 rounded-full">
          <Icon href={lock2} id="lock2Icon" className="w-5 h-5 fill-1" />
        </div>
        <div className="grow flex items-center gap-2">
          <h3 className="text-sm font-medium leading-[18px]">2FA</h3>
          {!isEnabled ? (
            <Badge variant="disabled">Disabled</Badge>
          ) : (
            <Badge variant="success">Enabled</Badge>
          )}
        </div>
        <Icon href={arrowRight} id="arrowRightIcon" className="w-4 h-4 fill-current body-txtColor-1" />
      </div>
    </div>
  );
};

export default TwoFactorAuthCard;
