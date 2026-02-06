import { FILTERS } from 'constants/filters.ts';
import { useAppSelector } from 'store/index';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from 'components/shared/ui/Table';
import { cn } from 'helpers/ui';
import { selectProviders } from 'store/providers/selectors';
import { selectFilteredGameCountMapForAllProviders } from 'store/games/selectors';
import { Checkbox } from 'components/shared/ui/Checkbox';
import { Button } from 'components/shared/ui/Button';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import { replaceString } from 'helpers/common';

const ProvidersMenu = () => {
  const { providers, categories, applyFilter, clearFilter } =
    useCustomQueryParams();
  const providersItems = useAppSelector(selectProviders);
  const providersCount = useAppSelector(
    selectFilteredGameCountMapForAllProviders,
  );

  console.log('ProvidersMenu - providersItems:', providersItems);
  console.log('ProvidersMenu - providersCount:', providersCount);
  console.log('ProvidersCount keys:', Object.keys(providersCount));

  if (!providersItems || providersItems.length === 0) {
    console.log('No providers items available');
    return (
      <div
        className={cn('z-[1000] min-w-[180px] xl:w-[250px] rounded-lg px-4')}
      >
        <p className="text-center text-gray-400 py-4">No providers available</p>
      </div>
    );
  }

  const providerMatchMap = new Map<
    string,
    { count: number; matchKey: string }
  >();

  const filteredProviders = providersItems?.filter((item) => {
    let count = 0;
    let matchKey = '';

    if (providersCount[item.id]) {
      count = providersCount[item.id];
      matchKey = item.id;
    }

    if (count === 0) {
      const nameWithUnderscore = item.name.replace(/\s+/g, '_');
      if (providersCount[nameWithUnderscore]) {
        count = providersCount[nameWithUnderscore];
        matchKey = nameWithUnderscore;
      }
    }

    if (count === 0) {
      const nameNoSpaces = item.name.replace(/\s+/g, '');
      if (providersCount[nameNoSpaces]) {
        count = providersCount[nameNoSpaces];
        matchKey = nameNoSpaces;
      }
    }

    if (count === 0 && providersCount[item.name.toLowerCase()]) {
      count = providersCount[item.name.toLowerCase()];
      matchKey = item.name.toLowerCase();
    }

    console.log(
      `Provider ${item.name} (id: ${item.id}) -> matchKey: ${matchKey}, count: ${count}`,
    );

    if (count > 0) {
      providerMatchMap.set(item.id, { count, matchKey });
      return true;
    }
    return false;
  });

  return (
    <div className={cn('z-[1000] min-w-[180px] xl:w-[250px] rounded-lg px-4')}>
      <Button
        onClick={() => {
          clearFilter(FILTERS.provider);
        }}
        className="bg-transparent border border-primary-1 text-primary-1 mt-2 w-full mb-2"
      >
        Clear All
      </Button>
      {filteredProviders && filteredProviders.length > 0 ? (
        <Table>
          <TableBody className="flex flex-col">
            {filteredProviders.map((item) => {
              const matchInfo = providerMatchMap.get(item.id);
              const count = matchInfo?.count || 0;
              const matchKey = matchInfo?.matchKey || item.id;
              const isActive = providers?.includes(matchKey);

              return (
                <TableRow
                  key={item.id}
                  className="border-b border-b-[var(--borderdefault-1)] text-nowrap w-full"
                >
                  <TableCell className="flex w-full">
                    <div
                      className="flex w-full items-center justify-between"
                      onClick={() => {
                        applyFilter(FILTERS.provider, matchKey);
                      }}
                    >
                      <span
                        className={cn(
                          'w-full flex gap-2 items-center capitalize cursor-pointer ',
                        )}
                      >
                        <Checkbox
                          className="border-base-500 "
                          checked={isActive}
                        />
                        <span
                          className={cn('', { 'text-primary-1': isActive })}
                        >
                          {replaceString(item.name, /_/g, ' ')}
                        </span>
                      </span>

                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-400 py-4">
          No providers with games
        </p>
      )}
    </div>
  );
};

export default ProvidersMenu;
