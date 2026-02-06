import { useState, useMemo, useEffect } from 'react';
import GameCard from 'components/shared/GameCard';
import { useAppDispatch, useAppSelector } from 'store/index';
import { useParams } from 'react-router-dom';
import {
  selectError,
  selectFilteredGamesByCategoryId,
  selectIsLoading,
} from 'store/games/selectors';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import GameCardSkeleton from 'components/shared/GameCard/GameCardSkeleton';
import ErrorMessage from 'components/shared/ErrorMessage';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { fetchGames } from 'store/games/slice';

function CategoryPage() {
  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 4);
  };
  const { categoryId } = useParams();
  const games = useAppSelector(selectFilteredGamesByCategoryId(categoryId)) as
    | any[]
    | undefined;
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError) as { message?: string } | null;
  const { screenWidth } = useBreakpoint();

  const [visibleRows, setVisibleRows] = useState(4);
  const dispatch = useAppDispatch();

  // Match the CSS grid breakpoints: grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7
  const gamesPerRow = useMemo(() => {
    if (screenWidth >= BREAKPOINTS.lg) return 7; // lg:grid-cols-7
    if (screenWidth >= BREAKPOINTS.md) return 5; // md:grid-cols-5
    return 3; // grid-cols-3 and sm:grid-cols-3
  }, [screenWidth]);

  const gamesPerPage = gamesPerRow * 4;
  const { sort, search, providers, categories } = useCustomQueryParams();

  useEffect(() => {
    setVisibleRows(4);
  }, [categoryId, sort, search, providers, categories]);

  useEffect(() => {
    if (!games || !games.length) {
      dispatch(fetchGames());
    }
    // Only run when categoryId changes or on mount
  }, [dispatch, categoryId, games]);

  const { visibleGames, hasMoreGames } = useMemo(() => {
    if (!games) return { uniqueGames: null, visibleGames: [], hasMoreGames: false };

    // Remove duplicate games by ID
    const seen = new Set();
    const deduplicatedGames = games.filter((game) => {
      if (seen.has(game.id)) {
        return false;
      }
      seen.add(game.id);
      return true;
    });

    const maxVisibleGames = visibleRows * gamesPerRow;
    const visibleGames = deduplicatedGames.slice(0, maxVisibleGames);
    const hasMoreGames = deduplicatedGames.length > visibleGames.length;

    return {
      visibleGames,
      hasMoreGames
    };
  }, [games, visibleRows, gamesPerRow]);

  if (error) {
    const { message } = error;
    return (
      <div className="py-[31px] flex items-center justify-center">
        <ErrorMessage message={message || 'An error occurred'} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pt-4 gap-2 xl:gap-3 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {Array.from({ length: gamesPerPage }).map((_, index) => (
          <GameCardSkeleton key={index} className="h-[238.5px]" />
        ))}
      </div>
    );
  }
  if (!games || !games.length) {
    return (
      <div className="flex justify-center items-center h-[254.5px]">
        <NoItemsMessage message="No games found" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"></div>
      </div>
      <div className="pt-4 gap-2 xl:gap-3 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {visibleGames.map((game, index) => (
          <GameCard
            key={game.id}
            game={{
              ...game,
              name: game.name ?? game.title ?? '',
            }}
            index={index}
            descriptionClassName="text-[10px] md:text-xs"
            titleClassName="text-xs md:text-sm xl:text-base"
          />
        ))}
      </div>
      {hasMoreGames && (
        <div className="flex justify-center pb-6">
          <button
            onClick={handleShowMore}
            className="px-8 py-3  bg-button-gradient btn-textColor body-txtColor-1 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
