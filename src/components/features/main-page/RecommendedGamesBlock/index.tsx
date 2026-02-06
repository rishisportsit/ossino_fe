import FeaturedGamesBlock from 'components/shared/FeaturedGamesBlock';
import FeaturedGamesBlockSkeleton from 'components/shared/FeaturedGamesBlockSkeleton';
import { useAppDispatch, useAppSelector } from 'store/index';
import { useEffect, useMemo } from 'react';
import { getAffiliateGames } from 'store/affiliateGames/slice';
import { selectUserData, selectIsVipUser } from 'store/user/selectors';
import { 
  selectAffiliateGames, 
  selectAffiliateGamesLoading 
} from 'store/affiliateGames/selectors';
import type { Game } from 'api/content/content.types';
import type { AffiliateGame } from 'api/affiliate/affiliate.types';
import type { RoundedGameIconProps } from '../GameIcon/GameRoundedCard';

const mapAffiliateGamesToGames = (
  affiliateGames: AffiliateGame[],
): RoundedGameIconProps[] => {
  return affiliateGames.map((game) => ({
    id: game.game_code,
    title: game.gameName,
    image: game.image?.configurl || game.image?.url || '/default-game-placeholder.png',
    name: game.gameName,
    game: {
      id: game.game_code,
      title: game.gameName,
      name: game.gameName,
      image: game.image?.configurl || game.image?.url || '',
      provider: game.provider,
      aggregator_type: game.aggregator_type,
      players: 100,
      group: game.provider,
      providers: [game.provider as any],
      categories: [game.gametype || 'casino'],
      favorite: false,
      url: '',
      game_code: game.game_code,
      game_type: game.gametype || '',
    } as Game,
  }));
};

const RecommendedGamesBlock = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserData);
  const isVipUser = useAppSelector(selectIsVipUser);
  const affiliateGames = useAppSelector(selectAffiliateGames);
  const loading = useAppSelector(selectAffiliateGamesLoading);

  const shouldShowRecommendedGames = useMemo(() => {
    return user?.affliateBtag && !isVipUser;
  }, [user?.affliateBtag, isVipUser]);

  const mappedGames = useMemo(() => {
    if (!affiliateGames) return [];
    return mapAffiliateGamesToGames(affiliateGames);
  }, [affiliateGames]);

  useEffect(() => {
    if (shouldShowRecommendedGames && user?.affliateBtag) {
      dispatch(getAffiliateGames({
        operatorId: 'ossino',
        platformId: '2',
        brand: 'ossino',
        affiliateId: user.affliateBtag,
      }));
    }
  }, [dispatch, shouldShowRecommendedGames, user?.affliateBtag]);

  if (!shouldShowRecommendedGames) {
    return null;
  }

  if (loading) {
    return <FeaturedGamesBlockSkeleton label="Recommended Games" />;
  }

  if (mappedGames.length === 0) {
    return null;
  }

  return <FeaturedGamesBlock games={mappedGames} label="Recommended Games" />;
};

export default RecommendedGamesBlock;