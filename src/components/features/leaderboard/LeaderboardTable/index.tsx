import type { UserLeaderboard } from 'api/loyalty/loyalty.models';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from 'components/shared/ui/Table';
import { cn } from 'helpers/ui';
import { formatNumber } from 'helpers/numbers';
import { Avatar, AvatarImage } from 'components/shared/ui/Avatar';
import { selectUserPosition } from 'store/leaderboard/selectors';
import { useAppSelector } from 'store/index';
import { faker } from '@faker-js/faker';

type LeaderboardTableProps = {
  leaderboard: UserLeaderboard[];
};

const LeaderboardTable = ({ leaderboard }: LeaderboardTableProps) => {


  const userPosition = useAppSelector(selectUserPosition);

  return (
    <Table className="border-separate border-spacing-y-3">
      <TableBody>
        {(() => {
          const N = 10;
          const rows = [];
          // Only show the top N as visible
          for (let i = 0; i < leaderboard.length && rows.length < N; i++) {
            const { place, value, id, avatar, username } = leaderboard[i];
            const currentUser = place === userPosition;
            let displayUsername = username;
            if (!currentUser) {
              const randomName = faker.person.firstName().toLowerCase();
              displayUsername = `${randomName}****.com`;
            }
            rows.push(
              <TableRow
                className={cn(
                  '[&>td]:bg-base-800 [&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl',
                  {
                    '[&>td]:border-y [&>td:last-child]:border-r [&>td:first-child]:border-l [&>td]:border-primary-1':
                      currentUser,
                    'xl:[&>td]:border-y xl:[&>td:last-child]:border-r xl:[&>td:first-child]:border-l xl:[&>td]:border-base-700':
                      !currentUser,
                  },
                )}
                key={id}
                id={`leaderboard-position-${place}`}
              >
                <TableCell className="text-start rounded-l-lg w-[52px]">
                  {place}
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={avatar} className="object-cover" />
                  </Avatar>
                  {displayUsername}
                </TableCell>
                <TableCell className="font-medium text-end text-primary-1">
                  {formatNumber(value, 0)}
                </TableCell>
              </TableRow>,
            );
          }
          // If user is not in the visible list, show ellipsis and user row
          const userInTop = leaderboard
            .slice(0, N)
            .some((l) => l.place === userPosition);
          const userRow = leaderboard.find((l) => l.place === userPosition);
          if (!userInTop && userRow) {
            // Always show ellipsis row before user row if user is not in top N
            rows.push(
              <TableRow key="ellipsis-row">
                <TableCell
                  colSpan={3}
                  className="text-center text-base-500 py-2"
                >
                  ...
                </TableCell>
              </TableRow>,
            );
            // Only insert a skeleton row if there is a gap between last visible and user
            const lastVisible = leaderboard[N - 1];
            if (lastVisible && userRow.place > lastVisible.place + 1) {
              rows.push(
                <TableRow key="skeleton-row">
                  <TableCell className="text-start rounded-l-lg w-[52px] bg-base-900 animate-pulse">
                    &nbsp;
                  </TableCell>
                  <TableCell className="bg-base-900 animate-pulse">
                    &nbsp;
                  </TableCell>
                  <TableCell className="bg-base-900 animate-pulse">
                    &nbsp;
                  </TableCell>
                </TableRow>,
              );
            }
            rows.push(
              <TableRow
                className={cn(
                  '[&>td]:bg-base-800 [&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl',
                  '[&>td]:border-y [&>td:last-child]:border-r [&>td:first-child]:border-l [&>td]:border-primary-1',
                )}
                key={userPosition}
                id={`leaderboard-position-${userPosition}`}
              >
                <TableCell className="text-start rounded-l-lg w-[52px]">
                  {userPosition}
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Avatar className="w-5 h-5">
                    <AvatarImage
                      src={userRow.avatar}
                      className="object-cover"
                    />
                  </Avatar>
                  <span className="font-bold">You</span>
                </TableCell>
                <TableCell className="font-medium text-end text-primary-1">
                  {formatNumber(userRow.value, 0)}
                </TableCell>
              </TableRow>,
            );
          }
          return rows;
        })()}
      </TableBody>
    </Table>
  );
};

export default LeaderboardTable;
