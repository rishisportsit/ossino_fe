import { ROUTES } from 'constants/routes.ts';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from 'components/shared/PageHeader';
import Search from 'components/shared/Search';
import { useAppSelector } from 'store/index';
import {
  selectIsLoading as selectIsGamesLoading,
  selectFilteredGames,
} from 'store/games/selectors';
import {
  selectProvidersLoading,
  selectProviders,
} from 'store/providers/selectors';
import Loader from 'components/shared/ui/Loader';
import { selectFavoritesCount } from 'store/favourites/selectors';

const SearchLayout = () => {
  const providers = useAppSelector(selectProviders);
  const { pathname } = useLocation();

  const isProviderPath = pathname.replace(/\/$/g, '') === ROUTES.providers;
  const isCategoriesPath = pathname.replace(/\/$/g, '') === ROUTES.categories;
  const isFavoritesPath = pathname.replace(/\/$/g, '') === ROUTES.favorites;

  const games = useAppSelector(selectFilteredGames);
  const isProvidersLoading = useAppSelector(selectProvidersLoading);
  const isGamesLoading = useAppSelector(selectIsGamesLoading);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const count = () => {
    if (isProvidersLoading || isGamesLoading) {
      return (
        <>
          <Loader />
        </>
      );
    }

    if (isProviderPath) {
      return providers?.length;
    }

    if (isFavoritesPath) {
      return favoritesCount;
    }

    return games?.length;
  };

  if (isCategoriesPath) {
    return <div className="p-5">Please, choose the category</div>;
  }

  return (
    <div className="px-4 xl:px-5 pt-[76px] md:pt-0">
      {pathname !== ROUTES.search && (
        <PageHeader>
          {!isProviderPath && (
            <div className="flex items-center justify-between gap-2">
              <span className="w-1.5 h-1.5 background-1 rounded-full" />
              {count()}
            </div>
          )}
        </PageHeader>
      )}
      <div className="xl:bg-base-800 xl:rounded-[12px] xl:p-5 z-10">
        <Search />
        <Outlet />
      </div>
    </div>
  );
};

export default SearchLayout;
