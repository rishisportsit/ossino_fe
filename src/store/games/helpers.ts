import type {
  ApiGameItem,
  Game,
  ProviderCode,
} from 'api/content/content.types';
import type { AxiosResponse } from 'axios';

export const handleResponse = (response: AxiosResponse<ApiGameItem[]>) => {
  const { data } = response;

  const games: Game[] = [];
  const uniqueProviders = new Set<string>();

  data.forEach((gameItem) => {
    const { game } = gameItem;

    game.forEach((apiGame) => {
      uniqueProviders.add(apiGame.provider);
      
      const game: Game = {
        id: apiGame.game_code,
        categories: [apiGame.categoryname.replace(/\s+/g, '-').toLowerCase()],
        favorite: false,
        group: apiGame.provider,
        image: apiGame.image.url,
        players: 100,
        providers: [apiGame.provider as ProviderCode],
        title: apiGame.name,
        url: apiGame.url,
        aggregator_type: apiGame.aggregator_type,
        categoryicon: apiGame.categoryicon,
        categoryname: apiGame.categoryname,
        cmsstatus: apiGame.cmsstatus,
        configname: apiGame.configname,
        description: apiGame.description,
        game_code: apiGame.game_code,
        game_type: apiGame.game_type,
        gamekind: apiGame.gamekind,
        gamevariant: apiGame.gamevariant,
        imageConfigUrl: apiGame.image?.configurl,
        imageUrl: apiGame.image?.url,
        name: apiGame.name,
        order: apiGame.order,
        provider: apiGame.provider,
        url_thumb: apiGame.url_thumb,
        userTags: apiGame.userTags,
      };

      games.push(game);
    });
  });

  console.log('All unique providers from games:', Array.from(uniqueProviders).sort());

  return games;
};
