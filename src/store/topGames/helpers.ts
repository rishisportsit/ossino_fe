import type { TopGamesResponse } from 'api/content/content.types';
import type { AxiosResponse } from 'axios';
import type { GameIconProps } from 'components/features/main-page/GameIcon/GameCard';

export const handleResponse = (
  response: AxiosResponse<TopGamesResponse>,
): GameIconProps[] => {
  const { gameList } = response.data;

  const gameIcons: GameIconProps[] = gameList.map((game) => ({
    title: game.name,
    link: game.url,
    image: game.image.url,
  }));

  return gameIcons;
};
