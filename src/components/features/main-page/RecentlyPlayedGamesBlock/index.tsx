import FeaturedGamesBlock from 'components/shared/FeaturedGamesBlock';
import FeaturedGamesBlockSkeleton from 'components/shared/FeaturedGamesBlockSkeleton';
import { useAppDispatch, useAppSelector } from 'store/index';
import { useEffect, useMemo } from 'react';
import { getRecentlyPlayedGames } from 'store/recentlyPlayed/slice';
import type { Game } from 'api/content/content.types';
import type { RecentlyPlayedGame } from 'store/recentlyPlayed/types';
import type { RoundedGameIconProps } from '../GameIcon/GameRoundedCard';

const normalizeString = (str: string): string => {
  return str?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
};

const mapRecentlyPlayedToGames = (
  recentlyPlayedGames: RecentlyPlayedGame[],
  allGames: Game[],
): RoundedGameIconProps[] => {
  return recentlyPlayedGames.map((recentGame) => {
    let matchedGame = allGames.find(
      (game) =>
        game.game_code === recentGame.gameCode ||
        game.id === recentGame.gameCode,
    );

    if (!matchedGame) {
      const normalizedRecentName = normalizeString(recentGame.gameName);
      const normalizedRecentProvider = normalizeString(recentGame.providerName);

      matchedGame = allGames.find((game) => {
        const normalizedGameName = normalizeString(
          game.name || game.title || '',
        );
        const normalizedGameProvider = normalizeString(game.provider || '');

        return (
          normalizedGameName === normalizedRecentName &&
          normalizedGameProvider === normalizedRecentProvider
        );
      });
    }

    if (!matchedGame) {
      const normalizedRecentName = normalizeString(recentGame.gameName);
      matchedGame = allGames.find((game) => {
        const normalizedGameName = normalizeString(
          game.name || game.title || '',
        );
        return normalizedGameName === normalizedRecentName;
      });
    }

    return {
      id: recentGame.gameCode,
      title: recentGame.gameName,
      image:
        recentGame.image ||
        matchedGame?.image ||
        '/default-game-placeholder.png',
      name: matchedGame?.name || matchedGame?.title || recentGame.gameName,
      game: matchedGame,
    };
  });
};

const RecentlyPlayedGamesBlock = () => {
  const dispatch = useAppDispatch();
  const recentlyPlayedData = useAppSelector(
    (state) => state.recentlyPlayed.data,
  );
  const loading = useAppSelector((state) => state.recentlyPlayed.loading);
  const user = useAppSelector((state) => state.user.data);
  const allGames = useAppSelector((state) => state.games.data);

  const mappedGames = useMemo(() => {
    if (!recentlyPlayedData || !allGames) return [];

    return mapRecentlyPlayedToGames(recentlyPlayedData, allGames);
  }, [recentlyPlayedData, allGames]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getRecentlyPlayedGames());
    }
  }, [dispatch, user?.id]);

  if (!user?.id) {
    return null;
  }

  if (loading) {
    return <FeaturedGamesBlockSkeleton label="Recently Played" />;
  }

  if (mappedGames.length === 0) {
    return null;
  }

  return <FeaturedGamesBlock games={mappedGames} label="Recently Played" />;
};

export default RecentlyPlayedGamesBlock;
