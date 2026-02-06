import { useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectGamesByCategories,
  selectGames,
  selectIsLoading,
} from 'store/games/selectors';
import { type Game } from 'api/content/content.types';
import {
  selectTopGames,
  selectTopGamesLoading,
  selectHighestBets,
} from 'store/playerInsights/selectors';
import { selectCategories } from 'store/categories/selectors';
import { getTopLossesGames, getPlayerInsights } from 'store/playerInsights/slice';
import GameCard from 'components/shared/GameCard';
import FeaturedGamesBlock from 'components/shared/FeaturedGamesBlock';
import MostCommonSearches from 'components/features/search/MostCommonSearches';
import CategoriesBlock from 'components/shared/CategoriesBlock';
import Icon from 'components/shared/Icon';
import { cn } from 'helpers/ui';
import notFound from '/icons/searchZoomOut.svg?url';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import MenuListLoader from 'components/shared/SideBar/MenuListLoader';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { setSelectedGameType } from 'store/sidebar/slice';

const DEFAULT_GAME_IMAGE = '/images/default-game.png'; // Place a default image in public/images/

const SearchPage = () => {
  const isLoggedIn = useAppSelector((state) => state.user.loggedIn);
  const dispatch = useAppDispatch();
  const { search, sort, providers, categories: urlCategories, setCategories } = useCustomQueryParams();

  useEffect(() => {
    dispatch(setSelectedGameType('Lobby'));
  }, [dispatch]);

  const [currentCategory, setCurrentCategory] = useState<string[]>(() => {
    return urlCategories.length > 0 ? urlCategories : ['Lobby'];
  });

  useEffect(() => {
    if (urlCategories.length > 0) {
      setCurrentCategory(urlCategories);
    } else {
      setCurrentCategory(['Lobby']);
    }
  }, [urlCategories]);

  const categories = useAppSelector(selectCategories);
  const gamesByCategories = useAppSelector(selectGamesByCategories);
  const allGames = useAppSelector(selectGames);
  const topLossesGames = useAppSelector(selectTopGames);
  const topGamesLoading = useAppSelector(selectTopGamesLoading);
  const highestBets = useAppSelector(selectHighestBets);
  const { screenWidth } = useBreakpoint();
  const uniqueHighestBets = highestBets.filter((item, idx, arr) =>
    arr.findIndex((g) => g.gameName === item.gameName) === idx
  );
  const mappedHighestBets = uniqueHighestBets.map((item, idx) => ({
    id: idx + 1,
    label: item.gameName,
  }));
  const [visibleRows, setVisibleRows] = useState(4);

  function getFilteredGames() {
    // Fallback: if gamesByCategories or categories are empty, use allGames
    if (!gamesByCategories || !categories || Object.keys(gamesByCategories).length === 0 || categories.length === 0) {
      if (!allGames) return [];
      let games = [...allGames];
      // Provider filter
      if (providers && providers.length > 0) {
        games = games.filter((game) =>
          game.providers && game.providers.some((provider) => providers.includes(provider))
        );
      }
      // Apply search filter if search term exists
      if (search && games.length > 0) {
        games = games.filter((game) =>
          game.title?.toLowerCase().includes(search?.toLowerCase())
        );
      }
      // Sorting
      if (sort === 'asc') {
        games = [...games].sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === 'desc') {
        games = [...games].sort((a, b) => b.title.localeCompare(a.title));
      } else if (sort === 'random') {
        games = [...games].sort(() => Math.random() - 0.5);
      }
      return games;
    }

    let games: Game[] = [];

    if (currentCategory.length === 0 || (currentCategory.length === 1 && currentCategory[0] === 'Lobby')) {
      games = Object.values(gamesByCategories).flatMap(
        (categoryData) => categoryData.games || [],
      );
    } else {
      const selectedCategoryObjs = categories.filter(
        (cat) => currentCategory.includes(cat.label)
      );
      games = selectedCategoryObjs.flatMap((cat) => {
        const categoryData = gamesByCategories[cat.id];
        return categoryData?.games || [];
      });
    }

    games = games.filter((game, idx, arr) => arr.findIndex((g) => g.id === game.id) === idx);

    if (providers && providers.length > 0) {
      games = games.filter((game) =>
        game.providers && game.providers.some((provider) => providers.includes(provider))
      );
    }

    if (search && games.length > 0) {
      games = games.filter((game) =>
        game.title?.toLowerCase().includes(search?.toLowerCase())
      );
    }

    if (sort === 'asc') {
      games = [...games].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'desc') {
      games = [...games].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === 'random') {
      games = [...games].sort(() => Math.random() - 0.5);
    }

    return games;
  }

  const games = getFilteredGames();
  const topGames = useMemo(() => {
    if (!topLossesGames?.length) return [];

    return topLossesGames
      .map((topGame) => {
        const matchingGame = allGames?.find(
          (game) => game.id === topGame.gameCode || game.game_code === topGame.gameCode
        );

        return {
          title: topGame.gameName,
          image:
            matchingGame?.image ||
            matchingGame?.imageUrl ||
            DEFAULT_GAME_IMAGE,
          id: matchingGame?.id || topGame.gameCode,
          name: topGame.gameName,
          game: matchingGame,
        };
      });
  }, [topLossesGames, allGames]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTopLossesGames());
      dispatch(getPlayerInsights());
    }
  }, [dispatch, isLoggedIn]);

  // Sync currentCategory with URL categories
  useEffect(() => {
    if (urlCategories.length > 0) {
      setCurrentCategory(urlCategories);
    } else {
      setCurrentCategory(['Lobby']);
    }
  }, [urlCategories]);

  useEffect(() => {
    setVisibleRows(4);
  }, [sort, search, providers, categories]);

  const gamesPerRow = useMemo(() => {
    if (screenWidth >= BREAKPOINTS.xl) return 7; // xl:grid-cols-7
    if (screenWidth >= BREAKPOINTS.md) return 5; // md:grid-cols-5
    return 3; // grid-cols-3
  }, [screenWidth]);

  const visibleGames = useMemo(() => {
    if (!games) return [];
    return games.slice(0, visibleRows * gamesPerRow);
  }, [games, visibleRows, gamesPerRow]);

  const hasMoreGames = games && games.length > visibleGames.length;

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 4);
  };

  const isLoading = useAppSelector(selectIsLoading);

  if (isLoading) {
    return (
      <div className="mt-8">
        <MenuListLoader isOpen />
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-4">
      <div className="flex flex-col gap-2">
        <MostCommonSearches searchItems={mappedHighestBets} />
        {/* Optionally, handle reversed items for mobile if needed */}
      </div>
      <div className="grid grid-cols-1">
        {isLoggedIn && <div className={cn('py-8', { 'order-3': !games?.length })}>
          {topGamesLoading ? (
            <MenuListLoader isOpen />
          ) : (
            <FeaturedGamesBlock
              games={topGames || []}
              label="Top Games"
              headerClassName="pr-0"
            />
          )}
        </div>}
        <div className={cn('pt-5', { 'order-1 mb-5': !games?.length })}>
          <CategoriesBlock applyCurrentCategory={setCategories} currentCategory={currentCategory} />
        </div>
        {!games?.length && (
          <div className="order-3 w-full rounded-lg flex justify-center items-center py-24 px-16 bg-base-800 md:h-[360px]">
            <div className="flex flex-col gap-2 justify-center items-center w-[218px]">
              <Icon
                id="searchZoomOutIcon"
                href={notFound}
                className="w-16 h-16 icon-placeholder"
              />
              <p className="text-center text-xs xl:text-base">
                No results for{' '}
                <span className="text-primary-1 ">{search}</span>{' '}in{' '}
                <span className="text-primary-1 ">{currentCategory}</span>{' '}
                Apply new criteria or clear search
              </p>
            </div>
          </div>
        )}

        {!!games?.length && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-2 mt-5">
              {visibleGames.map((game, index) => {
                let aggregatorType: string[] = [];
                if (Array.isArray(game.aggregator_type)) {
                  aggregatorType = game.aggregator_type;
                } else if (typeof game.aggregator_type === 'string') {
                  aggregatorType = [game.aggregator_type];
                }
                return (
                  <GameCard
                    key={game.id}
                    game={{
                      ...game,
                      name: game.name ?? game.title ?? '',
                      aggregator_type: aggregatorType,
                    }}
                    index={index}
                    descriptionClassName="text-[10px] md:text-xs"
                    titleClassName="text-xs md:text-sm xl:text-base"
                  />
                );
              })}
            </div>

            {hasMoreGames && (
              <div className="flex justify-center pb-6">
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="px-8 py-3 bg-button-gradient btn-textColor body-txtColor-1 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;