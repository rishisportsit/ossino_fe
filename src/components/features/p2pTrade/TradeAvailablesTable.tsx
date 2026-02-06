import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/shared/ui/Table';

const TradeAvailablesTable = () => {
  return (
    <div>
      <p className="font-bold">Trades Available</p>
      <Table className="border-separate border-spacing-y-3">
        <TableHeader className="background-2">
          <TableRow className="translate-y-2">
            <TableHead className="">Price</TableHead>
            <TableHead className="text-end">Est. Payout</TableHead>
            <TableHead className="text-end">Units</TableHead>
            <TableHead className="text-end">Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="[&>td]:bg-base-800 [&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl [&>td]:border-y [&>td:last-child]:border-r [&>td:first-child]:border-l [&>td]:border-base-700">
            <TableCell className="text-xs">$90.00</TableCell>
            <TableCell className="text-end font-medium text-xs">
              $100.00
            </TableCell>
            <TableCell className="text-end text-xs">120</TableCell>
            <TableCell className="text-end text-secondary-3 font-medium text-xs">
              10%
            </TableCell>
          </TableRow>
          <TableRow className="[&>td]:bg-base-800 [&>td:first-child]:rounded-l-xl [&>td:last-child]:rounded-r-xl [&>td]:border-y [&>td:last-child]:border-r [&>td:first-child]:border-l [&>td]:border-base-700">
            <TableCell className="text-xs">$90.00</TableCell>
            <TableCell className="text-end font-medium text-xs">
              $100.00
            </TableCell>
            <TableCell className="text-end text-xs">120</TableCell>
            <TableCell className="text-end text-secondary-3 font-medium text-xs">
              10%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TradeAvailablesTable;
