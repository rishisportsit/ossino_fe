import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import { useAppSelector } from 'store/index';
import {
  selectLeaderboard,
  selectLeaderboardError,
  selectLeaderboardLoading,
  selectUserPosition,
} from 'store/leaderboard/selectors';
import crown from '/icons/crown.svg?url';
import { Skeleton } from 'components/shared/ui/Skeleton';

const LeaderboardButton = () => {
  const leaderboard = useAppSelector(selectLeaderboard);
  const userPosition = useAppSelector(selectUserPosition);
  const leaderboardLoading = useAppSelector(selectLeaderboardLoading);
  const leaderboardError = useAppSelector(selectLeaderboardError);

  const handleClick = () => {
    const currentUser = document.getElementById(
      `leaderboard-position-${userPosition}`,
    );

    if (currentUser) {
      currentUser.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (leaderboardLoading) {
    return (
      <div className="bg-base-800 rounded-lg h-8 px-4 flex items-center gap-1 w-fit">
        <Icon
          id="crownIcon"
          href={crown}
          className="h-5 w-5 fill-current body-txtColor-1"
        />
        <Skeleton className="rounded-sm w-[9px] h-4" />
      </div>
    );
  }

  if (leaderboardError) {
    return (
      <div className="bg-base-800 rounded-lg h-8 px-4 w-24 flex items-center gap-1 text-status-error-200 font-semibold">
        Error
      </div>
    );
  }
  if (!leaderboard) {
    return (
      <div className="bg-base-800 text-base-400 rounded-lg h-8 px-4 flex items-center gap-1">
        No data
      </div>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={!leaderboard}
      variant="default"
      className="bg-base-800 rounded-lg h-8 px-4 flex items-center gap-1 w-fit"
    >
      <Icon
        id="crownIcon"
        href={crown}
        className="h-5 w-5 fill-current body-txtColor-1"
      />
      <span className="text-sm font-medium body-txtColor-1">{userPosition}</span>
    </Button>
  );
};

export default LeaderboardButton;
