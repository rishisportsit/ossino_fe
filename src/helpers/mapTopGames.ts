import type { ProviderCode, Game } from 'api/content/content.types';

const DEFAULT_GAME_IMAGE = '/images/default-game.png';

export interface TopGameRaw {
  gameName: string;
  gameCode: string;
  aggregatorName?: string;
  providerName: string;
}

export interface TopGameMapped {
  title: string;
  image: string;
  id: string;
  name: string;
  game: Game;
}

/**
 * Maps raw top games data and all games to a UI-friendly array for carousels, etc.
 * @param topGamesData Raw top games data from API
 * @param allGames All games from state
 * @returns Array of mapped top games for UI
 */
export function mapTopGames(
  topGamesData: TopGameRaw[] | undefined | null,
  allGames: Game[] | undefined | null
): TopGameMapped[] {
  if (!topGamesData?.length) return [];
  return topGamesData.map((topGame) => {
    const matchingGame = allGames?.find(
      (game) => game.id === topGame.gameCode || game.game_code === topGame.gameCode
    );
    return {
      title: topGame.gameName,
      image: matchingGame?.image || matchingGame?.imageUrl || DEFAULT_GAME_IMAGE,
      id: matchingGame?.id || topGame.gameCode,
      name: topGame.gameName,
      game: matchingGame || {
        id: topGame.gameCode,
        title: topGame.gameName,
        image: DEFAULT_GAME_IMAGE,
        name: topGame.gameName,
        aggregator_type: topGame.aggregatorName || '',
        providers: [topGame.providerName] as ProviderCode[],
        categories: [],
        group: '',
        players: 0,
        favorite: false,
        url: '',
      },
    };
  });
}
