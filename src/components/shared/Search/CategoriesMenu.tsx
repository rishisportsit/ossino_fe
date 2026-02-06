import { FILTERS } from 'constants/filters.ts';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from 'components/shared/ui/Table';
import { Button } from 'components/shared/ui/Button';
import { Checkbox } from 'components/shared/ui/Checkbox';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectFilteredGameCountMapForAllCategories } from 'store/games/selectors';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import { cn } from 'helpers/ui';
import { replaceString } from 'helpers/common';
import { selectCategories } from 'store/categories/selectors';
import { mapApiIdToCategoryCode } from 'store/games/constants';
import { getCategories } from 'store/categories/slice';
import { useEffect } from 'react';

const CategoriesMenu = () => {
  const { categories, applyFilter, clearFilter } = useCustomQueryParams();
  const categoriesItems = useAppSelector(selectCategories);
  
  const dispatch = useAppDispatch();
  const location = window.location;
  let providerId: string | null = null;
  const providerMatch = location.pathname.match(/\/providers\/(\w+)/);
  if (providerMatch) {
    providerId = providerMatch[1];
  }

  useEffect(() => {
    if (categoriesItems?.length <= 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categoriesItems]);

  const filteredCategories = categoriesItems?.filter((item) => {
    let count = item.count || 0;
    if (providerId && item.providerCounts) {
      count = item.providerCounts[providerId] || 0;
    }
    return count > 0;
  });

  return (
    <div className={cn('min-w-[180px] xl:w-[250px] rounded-lg px-4')}>
      <Button
        className="bg-transparent border border-primary-1 text-primary-1 mt-2 w-full mb-2"
        onClick={() => {
          clearFilter(FILTERS.category);
        }}
      >
        Clear All
      </Button>
      <Table>
        <TableBody className="flex flex-col">
          {filteredCategories?.map((item) => {
            let count = item.count || 0;
            if (providerId && item.providerCounts) {
              count = item.providerCounts[providerId] || 0;
            }
            const filterValue = item.label;
            const isActive = categories?.includes(filterValue);
            return (
              <TableRow
                key={item.id}
                className="border-b border-b-[var(--borderdefault-1)] text-nowrap w-full"
              >
                <TableCell className="flex w-full">
                  <div
                    className="flex w-full items-center justify-between"
                    onClick={() => {
                      const filterValue = item.label;
                      applyFilter(FILTERS.category, filterValue);
                    }}
                  >
                    <span
                      className={cn(
                        'w-full flex gap-2 items-center capitalize cursor-pointer',
                      )}
                    >
                      <Checkbox
                        className="border-base-500"
                        checked={isActive}
                      />
                      <span className={cn('', { 'text-primary-1': isActive })}>
                        {item.label || replaceString(filterValue, /-/g, ' ')}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'body-txtColor-1 font-medium text-[10px] text-center w-[22px] h-[16px] rounded-[100px] bg-base-600',
                        { 'text-base-900 bg-primary-1': isActive },
                      )}
                    >
                      {count}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesMenu;