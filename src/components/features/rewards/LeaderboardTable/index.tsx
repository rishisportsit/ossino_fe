import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { Avatar, AvatarImage } from 'components/shared/ui/Avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/shared/ui/Table';
import { formatNumber } from 'helpers/numbers';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectLeaderboard,
  selectLeaderboardError,
  selectLeaderboardLoading,
  selectUserPosition,
} from 'store/leaderboard/selectors';
import { getLeaderboard } from 'store/leaderboard/slice';
import LeaderboardSkeleton from '../LeaderboardSkeleton';
import { cn } from 'helpers/ui';
import { faker } from '@faker-js/faker';

const LeaderboardTable = () => {
  const dispatch = useAppDispatch();

  const leaderboard = useAppSelector(selectLeaderboard);
  const leaderboardError = useAppSelector(selectLeaderboardError);
  const leaderboardLoading = useAppSelector(selectLeaderboardLoading);
  const userPosition = useAppSelector(selectUserPosition);

  useEffect(() => {
    dispatch(getLeaderboard());
  }, [dispatch]);

  if (leaderboardError) {
    const { message } = leaderboardError;

    return (
      <div className="h-[465px] flex flex-col justify-center">
        <ErrorMessage message={message} />
      </div>
    );
  }

  if (leaderboardLoading) {
    return <LeaderboardSkeleton />;
  }

  if (
    !leaderboard ||
    !leaderboard.leaderboard ||
    !Array.isArray(leaderboard.leaderboard) ||
    leaderboard.leaderboard.length === 0
  ) {
    return (
      <div className="h-[465px] flex flex-col justify-center">
        <NoItemsMessage message="No leaderboard data" />
      </div>
    );
  }

  return (
    <Table className="w-full table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-11">Rank</TableHead>
          <TableHead className="text-center">User</TableHead>
          <TableHead className="text-end">Loyalty Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.leaderboard.map(
          ({ place, username, value, id, avatar }) => {
            const currentUser = place === userPosition;
            let displayUsername = username;

            if (!currentUser) {
              const randomName = faker.person.firstName().toLowerCase();
              displayUsername = `${randomName}****.com`;
            }

            return (
              <TableRow key={id} className="border-b-[2px] border-b-base-800">
                <TableCell className="text-center text-base-200">
                  {place}
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={avatar} className="object-cover" />
                  </Avatar>
                  <span
                    className={cn('truncate', currentUser ? 'font-bold' : '')}
                  >
                    {displayUsername}
                  </span>
                </TableCell>
                <TableCell className="font-medium text-end text-primary-1">
                  {formatNumber(value || 0, 0)}
                </TableCell>
              </TableRow>
            );
          },
        )}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;
