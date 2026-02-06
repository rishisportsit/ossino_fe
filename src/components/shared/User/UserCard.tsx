import { type Icon as IconType } from 'components/shared/MenuItem/menuItems';
import Icon from 'components/shared/Icon';
import ProgressBar from 'components/shared/ProgressBar';
import rightArrow from '/icons/arrowRight.svg?url';
import UserProfileAvatar from './UserProfileAvatar';
import useUserDisplayName from './UserDisplayName';
import { Link } from 'react-router-dom';

type StatusType = {
  icon: IconType;
  label: string;
  levelImage?: any;
  image?: any;
};

interface IUserCardProps {
  currentsStatus: StatusType;
  nextStatus?: StatusType | null;
  progress: number;
}

const UserCard = ({ currentsStatus, nextStatus, progress }: IUserCardProps) => {
  const userName = useUserDisplayName();
  const roundedProgress = Math.round(progress);

  let nextStatusIcon: React.ReactNode = null;
  if (nextStatus) {
    if ('id' in nextStatus.icon && 'href' in nextStatus.icon) {
      nextStatusIcon = (
        <Icon
          id={nextStatus.icon.id}
          href={nextStatus.icon.href}
          className="w-3 h-3"
        />
      );
    } else if ('component' in nextStatus.icon) {
      const Component = nextStatus.icon.component;
      nextStatusIcon = <Component className="w-3 h-3" />;
    }
  }

  return (
    <Link
      to="/loyalty/rewards"
      className="flex flex-col items-center bg-base-700 rounded-lg cursor-pointer no-underline px-3"
    >
      <div className="flex w-full py-2 items-center border-b border-borderdefault">
        <UserProfileAvatar
          levelImage={
            currentsStatus?.levelImage ||
            currentsStatus?.image ||
            (currentsStatus?.icon && 'href' in currentsStatus.icon
              ? currentsStatus.icon.href
              : undefined)
          }
          levelName={currentsStatus?.label}
          withIndicator
          size="md"
        />
        <div className="flex-1 min-w-0 ml-2">
          <span className="block text-[14px] body-txtColor-1 truncate">
            {userName}
          </span>
        </div>
        <Icon
          id="arrowRightIcon"
          href={rightArrow}
          className="w-4 h-4 ml-2 flex-shrink-0 fill-current body-txtColor-1"
        />
      </div>
      
      <div className="flex w-full flex-col py-2">
        <div className="flex w-full items-center">
          <span className="body-txtColor-1 text-xs px-1">
            {currentsStatus.label}
          </span>
        </div>
        <div className="pt-2">
          <ProgressBar progress={progress} />{' '}
          <div className="flex w-full pt-1 justify-between">
            <span className="body-txtColor-1 text-xs">{roundedProgress}%</span>{' '}
            {nextStatus ? (
              <div className="flex items-center">
                {nextStatusIcon}
                <span className="body-txtColor-1 text-xs px-1">
                  {nextStatus.label}
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="body-txtColor-1 text-xs px-1">🏆 Max Level</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default UserCard;
