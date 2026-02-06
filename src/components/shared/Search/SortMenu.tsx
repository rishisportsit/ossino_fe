import { Table, TableBody, TableCell, TableRow } from 'components/shared/ui/Table';
import { SORT_METHOD } from 'store/games/constants';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import { cn } from 'helpers/ui';
import { replaceString } from 'helpers/common';

import { useLocation } from 'react-router-dom';

const SortMenu = () => {
  const { sort, applyFilter } = useCustomQueryParams();
  const { pathname } = useLocation();

  // Hide 'random' only on provider list page (/providers), show everywhere else
  let allowedSortKeys = ['asc', 'desc', 'random'];
  if (pathname?.toLowerCase() === '/providers') {
    allowedSortKeys = ['asc', 'desc'];
  }

  return (
    <Table className={cn('min-w-[180px] xl:w-[250px] rounded-lg ')}>
      <TableBody className="flex flex-col px-4">
        {Object.entries(SORT_METHOD)
          .filter(([key]) => allowedSortKeys.includes(key))
          .map(([key, value]) => (
            <TableRow key={key} className="border-b-[2px] border-b-[var(--borderdefault-1)] text-nowrap">
              <TableCell className="text-base-200 w-full flex">
                <div
                  className={cn('w-full capitalize cursor-pointer', { 'text-primary-1': sort === value })}
                  onClick={(e) => {
                    e.stopPropagation()
                    applyFilter('sort', value)
                  }}
                >
                  {replaceString(value, /-/g, ' ')}
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default SortMenu