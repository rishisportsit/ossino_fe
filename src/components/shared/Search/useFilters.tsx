import { type ReactNode, useCallback, useMemo } from 'react';
import Select from 'components/shared/Select';
import Icon from 'components/shared/Icon';
import { useLocation } from 'react-router-dom';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import ProvidersMenu from 'components/shared/Search/ProvidersMenu';
import SortMenu from 'components/shared/Search/SortMenu';
import CategoriesMenu from 'components/shared/Search/CategoriesMenu';
import sortIcon from '/icons/sort.svg?url';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import { ROUTES } from 'constants/routes.ts';
import likeDislike from '/icons/likeDislike.svg?url';
import game from '/icons/whiteGame.svg?url';

export const IDS = {
  categoryIconId: 'whiteGameIcon',
  sortIconId: 'sortIcon',
  providerIconId: 'likeDislikeIcon',
} as const;

export const useFilters = () => {
  const { screenWidth } = useBreakpoint();
  const xl = screenWidth >= BREAKPOINTS.xl;
  const { sort, providers, categories } = useCustomQueryParams();
  const { pathname } = useLocation();

  const providerLabel = providers?.length
    ? `Providers: ${providers.length}`
    : 'All Providers';
  const categoryLabel = categories?.length
    ? `Categories: ${categories.length}`
    : 'All Categories';

  const renderSelect = useCallback(
    (iconHref: string, iconId: string, list: ReactNode, label?: string) => (
      <Select
        withChevron={xl}
        className="h-10 w-10 xl:min-w-[250px] px-2.5 py-2.5 xl:px-3 "
        chevronClassName="xl:bg-transparent"
        list={list}
        usePortal={!xl}
        dropdownWidthMode={!xl ? 'viewport' : 'trigger'}
      >
        <div className="flex items-center gap-3">
          <Icon id={iconId} href={iconHref} className="w-5 h-5 fill-iconprimary" />
          <span className="hidden xl:block text-nowrap text-[12px] capitalize">
            {label}
          </span>
        </div>
      </Select>
    ),
    [xl],
  );

  const renderProviderFilters = useCallback(
    () => <>{renderSelect(sortIcon, IDS.sortIconId, <SortMenu />, sort)}</>,
    [renderSelect, sort],
  );

  const renderAllFilters = useCallback(
    () => (
      <>
        {renderSelect(
          game,
          IDS.categoryIconId,
          <CategoriesMenu />,
          categoryLabel,
        )}
        {renderSelect(
          likeDislike,
          IDS.providerIconId,
          <ProvidersMenu />,
          providerLabel,
        )}
        {renderSelect(sortIcon, IDS.sortIconId, <SortMenu />, sort)}
      </>
    ),
    [categoryLabel, providerLabel, renderSelect, sort],
  );

  const renderFavoritesFilters = useCallback(
    () => (
      <>
        {renderSelect(
          likeDislike,
          IDS.providerIconId,
          <ProvidersMenu />,
          providerLabel,
        )}
        {renderSelect(sortIcon, IDS.sortIconId, <SortMenu />, sort)}
      </>
    ),
    [providerLabel, renderSelect, sort],
  );
  const renderSearchFilters = useCallback(
    () => (
      <>
        {renderSelect(
          game,
          IDS.categoryIconId,
          <CategoriesMenu />,
          categoryLabel,
        )}
        {renderSelect(
          likeDislike,
          IDS.providerIconId,
          <ProvidersMenu />,
          providerLabel,
        )}
        {renderSelect(sortIcon, IDS.sortIconId, <SortMenu />, sort)}
      </>
    ),
    [categoryLabel, providerLabel, renderSelect, sort],
  );

  const renderDefaultFilters = useCallback(
    () => (
      <>
        {renderSelect(
          pathname.includes(ROUTES.providers) ? game : likeDislike,
          pathname.includes(ROUTES.providers)
            ? IDS.categoryIconId
            : IDS.providerIconId,
          pathname.includes(ROUTES.providers) ? (
            <CategoriesMenu />
          ) : (
            <ProvidersMenu />
          ),
          pathname.includes(ROUTES.providers) ? categoryLabel : providerLabel,
        )}
        {renderSelect(sortIcon, IDS.sortIconId, <SortMenu />, sort)}
      </>
    ),
    [categoryLabel, pathname, providerLabel, renderSelect, sort],
  );

  return useMemo(() => {
    if (pathname === ROUTES.providers) {
      return renderProviderFilters();
    }

    if (pathname === ROUTES.search) {
      return renderSearchFilters();
    }

    if (pathname === ROUTES.favorites) {
      return renderFavoritesFilters();
    }

    return renderDefaultFilters();
  }, [
    pathname,
    screenWidth,
    renderDefaultFilters,
    renderProviderFilters,
    renderFavoritesFilters,
    renderSearchFilters,
  ]);
};
