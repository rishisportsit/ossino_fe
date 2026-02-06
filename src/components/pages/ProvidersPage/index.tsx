import { useAppSelector, useAppDispatch } from 'store/index';
import ProvidersCard from 'components/shared/ProvidersCard';
import {
  selectProviders,
  selectProvidersError,
  selectProvidersLoading,
} from 'store/providers/selectors';
import { selectGames } from 'store/games/selectors';
import { mapApiIdToProviderCode } from 'store/providers/constants';
import { Skeleton } from 'components/shared/ui/Skeleton';
import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { SORT_METHOD } from 'store/games/constants';
import sortBy from 'lodash.sortby';
import shuffle from 'lodash.shuffle';
import { useEffect } from 'react';
import { setSelectedGameType } from 'store/sidebar/slice';

const ProvidersPage = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectProvidersError);
  const isLoading = useAppSelector(selectProvidersLoading);
  const providers = useAppSelector(selectProviders);
  const games = useAppSelector(selectGames);
  const sort = useAppSelector((state) => state.games.filters.sort);

  // Set selectedGameType to 'Providers' when component mounts
  useEffect(() => {
    dispatch(setSelectedGameType('Providers'));
  }, [dispatch]);

  // Only show providers with one or more games available
  let filteredProviders = providers?.filter((provider) => {
    const providerCode = mapApiIdToProviderCode(provider.id);
    return providerCode && games?.some((game) => game.providers.includes(providerCode));
  }) ?? [];

  // Sort providers according to sort filter
  if (sort === SORT_METHOD.asc) {
    filteredProviders = sortBy(filteredProviders, 'name');
  } else if (sort === SORT_METHOD.desc) {
    filteredProviders = sortBy(filteredProviders, 'name').reverse();
  } else if (sort === SORT_METHOD.random) {
    filteredProviders = shuffle(filteredProviders);
  }

  if (error) {
    const { message } = error;
    return (
      <div className="py-[31px] flex items-center justify-center">
        <ErrorMessage message={message} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pt-4 gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="bg-base-600 min-w-[164px] h-20 md:h-24 rounded-[12px]"
          />
        ))}
      </div>
    );
  }

  if (!filteredProviders.length) {
    return (
      <div className="py-[31px] flex items-center justify-center">
        <NoItemsMessage message="No providers found" />
      </div>
    );
  }

  return (
    <div className="pt-4 gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {filteredProviders.map((provider) => (
        <ProvidersCard
          className="min-w-[164px]"
          key={provider.id}
          provider={provider}
        />
      ))}
    </div>
  );
};

export default ProvidersPage;
