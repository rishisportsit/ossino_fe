import { createSelector } from '@reduxjs/toolkit';
import shuffle from 'lodash.shuffle';
import sortBy from 'lodash.sortby';
import { selectCategories } from 'store/categories/selectors';
import { selectProviders } from 'store/providers/selectors';
import { selectSelectedGameType } from 'store/sidebar/selectors';
import { type ProviderCode, type Game } from 'api/content/content.types';
import { type RootState } from '..';
import { selectFavoriteGameCodes } from 'store/favourites/selectors';
import { SORT_METHOD, mapApiIdToCategoryCode } from './constants';

export const selectFilter = (state: RootState) => state.games.filters;
export const selectGames = (state: RootState) => state.games.data;
export const selectIsLoading = (state: RootState) => state.games.loading;
export const selectError = (state: RootState) => state.games.error;
export const selectCurrentGameId = (state: RootState) =>
  state.games.currentGameId;

export const selectGameByCurrentId = createSelector(
  [selectCurrentGameId, selectGames],
  (id, games) => {
    return games?.find((game) => game.id === id);
  },
);

export const selectGamesWithFavorites = createSelector(
  [selectGames, selectFavoriteGameCodes],
  (games, favoriteGameCodes) => {
    if (!games) return games;

    
    const gamesWithFav = games.map(game => ({
      ...game,
      favorite: favoriteGameCodes.has(game.game_code || game.id),
    }));
    
    const favoritedGames = gamesWithFav.filter(g => g.favorite);
    
    return gamesWithFav;
  }
);

export const selectGamesByGameType = createSelector(
  [selectGamesWithFavorites, selectSelectedGameType],
  (games, selectedGameType) => {
    if (!games) return games;

    return games.filter(game => game.game_type === selectedGameType);
  }
);

export const selectFilteredGames = createSelector(
  [selectGamesWithFavorites, selectFilter, selectSelectedGameType],
  (games, filters, selectedGameType) => {
    const { categories, providers, sort, search, favorite } = filters;

    if (!games) return null;

    let filteredGames = games;

    if (selectedGameType.toLocaleLowerCase() == 'favourites') {
      return games.filter((game) => game.favorite);
    }

    if (selectedGameType.toLocaleLowerCase() != 'providers') {
      // Filter by selected game type
      filteredGames = filteredGames.filter((game) => game.game_type === selectedGameType);
    }
    // Filter by favorites if favorite filter is set
    if (favorite !== null) {
      filteredGames = filteredGames.filter((game) => game.favorite === favorite);
    }

    filteredGames = filteredGames.filter((game) => {
      const matchesCategory = categories?.length
        ? game.categories.some((gameCategory) => {
          // Normalize both filter and game category: replace spaces with '-' and lowercase
          const normalizedGameCategory = gameCategory.replace(/\s+/g, '-').toLowerCase();
          const normalizedMappedCategory = (mapApiIdToCategoryCode(gameCategory) || '').replace(/\s+/g, '-').toLowerCase();
          return categories.some((cat) => {
            const normalizedCat = cat.replace(/\s+/g, '-').toLowerCase();
            return normalizedCat === normalizedGameCategory || normalizedCat === normalizedMappedCategory;
          });
        })
        : true;

      const matchesProvider = providers?.length
        ? game.providers.some((provider) => providers.includes(provider))
        : true;

      return matchesCategory && matchesProvider;
    });

    if (search) {
      filteredGames = filteredGames.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sort) {
      filteredGames = sortBy(filteredGames, 'title');

      if (sort === SORT_METHOD.desc) {
        filteredGames = filteredGames.reverse();
      }

      if (sort === SORT_METHOD.random) {
        filteredGames = shuffle(filteredGames);
      }
    }

    return filteredGames;
  },
);

export const selectFilteredGamesForAllCategories = createSelector(
  [selectGamesWithFavorites, selectFilter, selectSelectedGameType],
  (games, filters, selectedGameType) => {
    const { providers, sort, search, favorite } = filters;

    let filteredGames = games?.filter((game) => {
      if (favorite) {
        return game.favorite;
      }
      return true;
    });

    // Filter by selected game type
    filteredGames = filteredGames?.filter((game) => game.game_type === selectedGameType);

    filteredGames = filteredGames?.filter((game) => {
      const matchesProvider = providers?.length
        ? game.providers.some((provider) => providers.includes(provider))
        : true;

      return matchesProvider;
    });

    if (search) {
      filteredGames = filteredGames?.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sort) {
      filteredGames = sortBy(filteredGames, 'title');

      if (sort === SORT_METHOD.desc) {
        filteredGames = filteredGames.reverse();
      }

      if (sort === SORT_METHOD.random) {
        filteredGames = shuffle(filteredGames);
      }
    }

    return filteredGames;
  },
);

export const selectFilteredGamesForAllProviders = createSelector(
  [selectGamesWithFavorites, selectFilter, selectSelectedGameType],
  (games, filters, selectedGameType) => {
    const { categories, sort, search, favorite } = filters;

    let filteredGames = games?.filter((game) => {
      if (favorite) {
        return game.favorite;
      }
      return true;
    });

    // Handle Favourites specially - show only favorite games regardless of game_type
    if (selectedGameType.toLowerCase() === 'favourites') {
      filteredGames = filteredGames?.filter((game) => game.favorite);
    } else if (selectedGameType.toLowerCase() !== 'providers' && selectedGameType.toLowerCase() !== 'lobby') {
      // Filter by selected game type only if it's not Providers, Favourites, or Lobby
      filteredGames = filteredGames?.filter((game) => game.game_type === selectedGameType);
    }

    filteredGames = filteredGames?.filter((game) => {
      const matchesCategory = categories?.length
        ? game.categories.some((gameCategory) => {
          // Normalize both filter and game category: replace spaces with '-' and lowercase
          const normalizedGameCategory = gameCategory.replace(/\s+/g, '-').toLowerCase();
          const normalizedMappedCategory = (mapApiIdToCategoryCode(gameCategory) || '').replace(/\s+/g, '-').toLowerCase();
          return categories.some((cat) => {
            const normalizedCat = cat.replace(/\s+/g, '-').toLowerCase();
            return normalizedCat === normalizedGameCategory || normalizedCat === normalizedMappedCategory;
          });
        })
        : true;

      return matchesCategory;
    });

    if (search) {
      filteredGames = filteredGames?.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sort) {
      filteredGames = sortBy(filteredGames, 'title');

      if (sort === SORT_METHOD.desc) {
        filteredGames = filteredGames.reverse();
      }

      if (sort === SORT_METHOD.random) {
        filteredGames = shuffle(filteredGames);
      }
    }

    return filteredGames;
  },
);

export const selectGamesByCategory = (category: string) =>
  createSelector([selectGamesWithFavorites], (games) =>
    games?.filter((game) => game.categories.includes(category)),
  );

export const selectGameCountMap = createSelector([selectGamesWithFavorites], (games) => {
  const categoryCountMap = {} as { [key in string]: number };

  games?.forEach((game) => {
    game.categories.forEach((category: string) => {
      if (!categoryCountMap[category]) {
        categoryCountMap[category] = 0;
      }
      categoryCountMap[category] += 1;

      const categoryCode = mapApiIdToCategoryCode(category);
      if (categoryCode && categoryCode !== category) {
        if (!categoryCountMap[categoryCode]) {
          categoryCountMap[categoryCode] = 0;
        }
        categoryCountMap[categoryCode] += 1;
      }
    });
  });

  return categoryCountMap;
});

export const selectFilteredGameCountMapForAllCategories = createSelector(
  [selectGamesWithFavorites, selectFilter, selectSelectedGameType],
  (games, filters, selectedGameType) => {
    const { providers, search, favorite } = filters;

    // Apply all active filters except categories
    let filteredGames = games?.filter((game) => {
      if (favorite) {
        return game.favorite;
      }
      return true;
    });

    // Handle Favourites specially - show only favorite games regardless of game_type
    if (selectedGameType.toLowerCase() === 'favourites') {
      filteredGames = filteredGames?.filter((game) => game.favorite);
    } else if (selectedGameType.toLowerCase() !== 'providers' && selectedGameType.toLowerCase() !== 'lobby') {
      // Filter by selected game type only if it's not Providers, Favourites, or Lobby
      filteredGames = filteredGames?.filter((game) => game.game_type === selectedGameType);
    }

    filteredGames = filteredGames?.filter((game) => {
      const matchesProvider = providers?.length
        ? game.providers.some((provider) => providers.includes(provider))
        : true;

      return matchesProvider;
    });

    if (search) {
      filteredGames = filteredGames?.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Count games by category after applying other filters
    const categoryCountMap = {} as { [key in string]: number };

    filteredGames?.forEach((game) => {
      game.categories.forEach((category: string) => {
        if (!categoryCountMap[category]) {
          categoryCountMap[category] = 0;
        }
        categoryCountMap[category] += 1;

        const categoryCode = mapApiIdToCategoryCode(category);
        if (categoryCode && categoryCode !== category) {
          if (!categoryCountMap[categoryCode]) {
            categoryCountMap[categoryCode] = 0;
          }
          categoryCountMap[categoryCode] += 1;
        }
      });
    });

    return categoryCountMap;
  },
);

export const selectFilteredGameCountMapForAllProviders = createSelector(
  [selectFilteredGamesForAllProviders],
  (games) => {
    if (!games) return {};

    const uniqueGames = Array.from(
      new Map(games.map((game) => [game.id, game])).values()
    );

    const providerCountMap: Record<string, number> = {};

    uniqueGames.forEach((game) => {
      game.providers.forEach((provider) => {
        providerCountMap[provider] = (providerCountMap[provider] || 0) + 1;
      });
    });

    return providerCountMap;
  }
);


export const selectFilteredProviders = createSelector(
  [selectProviders, selectFilter],
  (providers, filters) => {
    const { sort, search } = filters;

    let sortedProviders = sortBy(providers, 'code');

    if (sort === SORT_METHOD.desc) {
      sortedProviders = sortBy(providers, 'code').reverse();
    }

    if (sort === SORT_METHOD.random) {
      sortedProviders = shuffle(providers);
    }

    if (search) {
      return sortedProviders?.filter((provider) => {
        return provider.id
          .split('-')[0]
          .toLowerCase()
          .includes(search.toLowerCase());
      });
    }

    return sortedProviders;
  },
);

export const selectGamesByCategories = createSelector(
  selectCategories,
  selectGamesWithFavorites,
  (categories, games) => {
    if (!categories?.length || !games?.length) {
      return null;
    }

    const sortedGames = sortBy(games, 'order');

    const categoryMap = new Map(
      categories.map((category) => [
        category.id,
        {
          href: category.href ?? '/',
          games: [] as Game[],
        },
      ]),
    );

    for (const game of sortedGames) {
      for (const categoryId of game.categories) {
        const categoryEntry = categoryMap.get(categoryId);

        if (categoryEntry) {
          categoryEntry.games.push(game);
        }
      }
    }

    return Object.fromEntries(categoryMap);
  },
);

export const selectGamesByCategoryId = (categoryId: string | undefined) =>
  createSelector([selectGamesWithFavorites], (games) => {
    if (!categoryId || !games?.length) {
      return [];
    }

    return games.filter((game) => game.categories.includes(categoryId));
  });

export const selectFilteredGamesByCategoryId = (
  categoryId: string | undefined,
) =>
  createSelector(
    [selectGamesByCategoryId(categoryId), selectFilter, selectSelectedGameType],
    (categoryGames, filters, selectedGameType) => {
      const { providers, sort, search, favorite } = filters;

      let filteredGames = categoryGames?.filter((game) => {
        if (favorite) {
          return game.favorite;
        }
        return true;
      });

      // Filter by selected game type
      filteredGames = filteredGames?.filter((game) => game.game_type === selectedGameType);

      filteredGames = filteredGames?.filter((game) => {
        const matchesProvider = providers?.length
          ? game.providers.some((provider) => providers.includes(provider))
          : true;

        return matchesProvider;
      });

      if (search) {
        filteredGames = filteredGames?.filter((game) =>
          game.title.toLowerCase().includes(search.toLowerCase()),
        );
      }

      if (sort) {
        filteredGames = sortBy(filteredGames, 'title');

        if (sort === SORT_METHOD.desc) {
          filteredGames = filteredGames.reverse();
        }

        if (sort === SORT_METHOD.random) {
          filteredGames = shuffle(filteredGames);
        }
      }

      return filteredGames;
    },
  );

export const selectGamesByProviderId = (providerId: string | undefined) =>
  createSelector([selectGamesWithFavorites], (games) => {
    if (!providerId || !games?.length) {
      return [];
    }

    const normalizedProviderId = providerId.toLowerCase();

    return games.filter((game) =>
      game.providers.some((p) => p.toLowerCase() === normalizedProviderId)
    );
  });

export const selectFilteredGamesByProviderId = (
  providerId: string | undefined,
) =>
  createSelector(
    [selectGamesByProviderId(providerId), selectFilter, selectSelectedGameType],
    (providerGames, filters, selectedGameType) => {
      const { categories, sort, search, favorite } = filters;

      let filteredGames = providerGames?.filter((game) => {
        if (favorite) {
          return game.favorite;
        }
        return true;
      });

      if (selectedGameType.toLocaleLowerCase() != 'providers') {
        // Filter by selected game type
        filteredGames = filteredGames.filter((game) => game.game_type === selectedGameType);
      }
      filteredGames = filteredGames.filter((game) => {
        const matchesCategory = categories?.length
          ? game.categories.some((gameCategory) => {
            // Normalize both filter and game category: replace spaces with '-' and lowercase
            const normalizedGameCategory = gameCategory.replace(/\s+/g, '-').toLowerCase();
            const normalizedMappedCategory = (mapApiIdToCategoryCode(gameCategory) || '').replace(/\s+/g, '-').toLowerCase();
            return categories.some((cat) => {
              const normalizedCat = cat.replace(/\s+/g, '-').toLowerCase();
              return normalizedCat === normalizedGameCategory || normalizedCat === normalizedMappedCategory;
            });
          })
          : true;

        // Note: We intentionally ignore 'filters.providers' here because 
        // this selector is scoped to a specific providerId (from arguments).
        // Using the global filter would cause race conditions during navigation.

        return matchesCategory;
      });

      if (search) {
        filteredGames = filteredGames?.filter((game) =>
          game.title.toLowerCase().includes(search.toLowerCase()),
        );
      }

      if (sort) {
        filteredGames = sortBy(filteredGames, 'title');

        if (sort === SORT_METHOD.desc) {
          filteredGames = filteredGames.reverse();
        }

        if (sort === SORT_METHOD.random) {
          filteredGames = shuffle(filteredGames);
        }
      }

      return filteredGames;
    },
  );