import type { Game } from 'api/content/content.types';
import type { ApiLastWin, LastWinsType } from './types';
import { generateDisplayName } from 'helpers/displayName';
import { formatRelativeTime } from 'helpers/common';

const normalizeString = (str: string): string => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

const findMatchingGame = (lastWin: ApiLastWin, allGames: Game[]): Game | null => {
  let matchedGame = allGames.find(
    (game) =>
      game.game_code === lastWin.gameId ||
      game.id === lastWin.gameId,
  );

  if (matchedGame) {
    return matchedGame;
  }

  const normalizedLastWinName = normalizeString(lastWin.gameName);

  matchedGame = allGames.find((game) => {
    const normalizedGameName = normalizeString(
      game.name || game.title || '',
    );
    return normalizedGameName === normalizedLastWinName;
  });

  return matchedGame || null;
};

// Use the centralized timezone-aware formatter from common helpers
const formatTimestamp = formatRelativeTime;

export const mapApiLastWinsToLastWins = (
  apiLastWins: ApiLastWin[],
  allGames: Game[],
): LastWinsType[] => {
  return apiLastWins.map((lastWin) => {
    const matchedGame = findMatchingGame(lastWin, allGames);
    
    // Generate display name using the new utility function
    const displayName = generateDisplayName(
      lastWin.firstName || '',
      lastWin.lastName || '',
      lastWin.email || ''
    );

    return {
      id: lastWin.betId,
      winnerName: displayName,
      win: lastWin.amount,
      winTime: formatTimestamp(lastWin.timestamp),
      game: {
        src: matchedGame?.image || '/default-game-placeholder.png',
        alt: lastWin.gameName,
      },
      gameId: lastWin.gameId,
      gameName: lastWin.gameName,
      betId: lastWin.betId,
      amount: lastWin.amount,
      currency: lastWin.currency,
      timestamp: lastWin.timestamp,
    };
  });
};

export const handleResponse = (response: any): ApiLastWin[] => {
  const lastWinsData = response?.data?.result?.data?.lastWins || response?.data?.data?.lastWins || [];

  if (!Array.isArray(lastWinsData)) {
    return [];
  }

  return lastWinsData;
};