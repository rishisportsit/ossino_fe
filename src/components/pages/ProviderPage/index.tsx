import { useAppSelector, useAppDispatch } from 'store/index';
import {
  selectFilteredGamesByProviderId,
  selectIsLoading,
} from 'store/games/selectors';
import GameCard from 'components/shared/GameCard';
import { useParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import Loader from 'components/shared/ui/Loader';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import { fetchGames } from 'store/games/slice';
import { setSelectedGameType } from 'store/sidebar/slice';

const ProviderPage = () => {
  const { providerId } = useParams();
  const games = useAppSelector(selectFilteredGamesByProviderId(providerId));
  const isLoading = useAppSelector(selectIsLoading);
  const { screenWidth } = useBreakpoint();
  const { sort, search, providers, categories } = useCustomQueryParams();
  const [visibleRows, setVisibleRows] = useState(4);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 4);
  };

  // Reset visible rows when provider changes or any filter is applied
  useEffect(() => {
    setVisibleRows(4);
  }, [providerId, sort, search, providers, categories]);

  // Ensure games are loaded and refresh when provider changes
  const dispatch = useAppDispatch();
  const allGames = useAppSelector((state) => state.games.data);

  // Set selectedGameType to 'Providers' when component mounts or providerId changes
  useEffect(() => {
    dispatch(setSelectedGameType('Providers'));
  }, [dispatch, providerId]);

  useEffect(() => {
    // Only fetch if we have no games.
    // The selector handles filtering by providerId (now case-insensitive).
    if (!allGames || allGames.length === 0) {
      dispatch(fetchGames());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGames?.length, dispatch]);

  const { uniqueGames, visibleGames, hasMoreGames } = useMemo(() => {
    if (!games) return { uniqueGames: null, visibleGames: [], hasMoreGames: false };

    const seen = new Set();
    const filteredGames = games.filter((game) => {
      if (seen.has(game.id)) {
        return false;
      }
      seen.add(game.id);
      return true;
    });

    const isMobile = screenWidth < BREAKPOINTS.md;
    const gamesPerRow = isMobile ? 3 : 7;

    // Allow mobile pagination with 4 rows per page
    const maxGamesForMobile = visibleRows * 3; // Allow mobile pagination with 3 games per row
    const effectiveVisibleGames = isMobile
      ? Math.min(maxGamesForMobile, filteredGames.length)
      : visibleRows * gamesPerRow;

    const visible = filteredGames.slice(0, effectiveVisibleGames);
    const hasMore = filteredGames.length > visible.length;

    return {
      uniqueGames: filteredGames,
      visibleGames: visible,
      hasMoreGames: hasMore
    };
  }, [games, screenWidth, visibleRows]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[30vh]">
        <Loader />
      </div>
    );
  }

  if (!uniqueGames || uniqueGames.length === 0) {
    return (
      <div className="flex items-center justify-center h-[30vh]">
        <NoItemsMessage message="No games" />
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="pt-4 gap-2 xl:gap-3 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {visibleGames.map((game, index) => (
          <GameCard
            key={game.id}
            game={{
              ...game,
              name: game.name ?? game.title ?? '',
              aggregator_type: game.aggregator_type ? [game.aggregator_type] : [],
            }}
            index={index}
            cardClassName="w-full max-w-[220px] xl:max-w-[230px]"
            descriptionClassName="text-[10px]"
            titleClassName="text-[12px]"
          />
        ))}
      </div>
      {hasMoreGames && (
        <div className="flex justify-center pb-6">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-button-gradient btn-textColor  body-txtColor-1 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProviderPage;
