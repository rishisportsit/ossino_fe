import Icon from 'components/shared/Icon';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppSelector } from 'store/index';
import arrowRight from '/icons/arrowRight.svg?url';
import key from '/icons/key.svg?url';
import { selectUserData } from 'store/user/selectors';
import Badge from '../Badge';

const ChangePasswordCard = () => {
  const account = useAppSelector(selectUserData);
  const { openDialog } = useDialog();

  const handleClick = () => {
    openDialog(DIALOG_TYPE.changePassword);
  };

  const isCompleted = account?.passwordChanged ?? false;

  return (
    <div
      onClick={handleClick}
      className="bg-base-800 border border-base-700 p-4 rounded-xl cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center bg-base-700 rounded-full">
          <Icon href={key} id="keyIcon" className="w-5 h-5 fill-1" />
        </div>
        <div className="grow flex items-center gap-2">
          <h3 className="text-sm font-medium leading-[18px]">
            Change Password
          </h3>
          {/* {!isCompleted ? <Badge variant="disabled">Incompleted</Badge> : null} */}
        </div>
        <Icon href={arrowRight} id="arrowRightIcon" className="w-4 h-4 fill-current body-txtColor-1" />
      </div>
    </div>
  );
};

export default ChangePasswordCard;
