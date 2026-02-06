import { Skeleton } from 'components/shared/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from 'components/shared/ui/Table';
import { cn } from 'helpers/ui';
import { LEADERBOARD_TOP_STYLES } from '../LeaderboardTop';

const LeaderboardSkeleton = () => {
  return (
    <div className="xl:p-5 xl:bg-base-800 xl:rounded-xl xl:flex-1">
      <div className="flex gap-3 mb-3 xl:mb-0 items-end pt-8 xl:p-5 xl:bg-base-900 xl:rounded-xl xl:justify-center xl:pt-12">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={cn(
              'bg-gradient-to-t from-black to-90% flex-1 backdrop-blur-[210px] rounded-t-xl relative flex flex-col items-center justify-end pb-4 xl:max-w-[186px]',
              LEADERBOARD_TOP_STYLES[index],
            )}
          >
            <div className="p-1 background-2 h-fit w-fit rounded-full absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3/4">
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            <Skeleton className="w-5 h-5 rounded-full mb-1" />
            <Skeleton className="w-[45px] h-[18px] rounded-xl mb-1" />
            <Skeleton className="w-[88px] h-[21px] rounded-xl" />
          </div>
        ))}
      </div>
      <Table className="border-separate border-spacing-y-3 ">
        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="[&>td]:bg-base-800 h-[46.33px] [&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl xl:[&>td]:border-y xl:[&>td:last-child]:border-r xl:[&>td:first-child]:border-l xl:[&>td]:border-base-700"
            >
              <TableCell className="w-[52px]">
                <Skeleton className="w-4 h-4 rounded-md" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-[120px] h-5 rounded-xl" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <Skeleton className="w-[120px] h-5 rounded-xl" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardSkeleton;
