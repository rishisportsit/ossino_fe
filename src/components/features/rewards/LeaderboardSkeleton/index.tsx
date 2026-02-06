import { Skeleton } from 'components/shared/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/shared/ui/Table';

const LeaderboardSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-11" />
          <TableHead>User</TableHead>
          <TableHead className="text-end">Loyalty Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 9 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={index} className="border-b-[2px] border-b-base-800">
            <TableCell className="text-center text-base-200">
              {index + 1}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-[80px] h-4 rounded-xl" />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <Skeleton className="w-[60px] h-4 rounded-xl" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaderboardSkeleton;
