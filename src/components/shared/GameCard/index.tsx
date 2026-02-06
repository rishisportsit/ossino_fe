import { STORAGE_KEYS } from 'constants/storage';
import { useState, type MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/shared/Icon';
import { cn } from 'helpers/ui';
import StatusIndicator from 'components/shared/StatusIndicator';
import GameModal from 'components/shared/GameCard/GameModal';
import { useAppDispatch, useAppSelector } from 'store/index';
import { setCurrentGameId } from 'store/games/slice';
import { selectUserBalance } from 'store/user/selectors';
import bookmark from '/icons/bookmark.svg?url';
import info from '/icons/info.svg?url';
import {
  selectIsGameFavorited,
  selectIsGameFavoriteLoading,
  selectFavoriteGameData,
} from 'store/favourites/selectors';
import { toggleFavorite } from 'store/favourites/slice';
import { LocalStorageHelper } from 'helpers/storage';
import { ROUTES } from 'constants/routes';
import styles from './style.module.css';

const PINK = 'shadow-custom-shadow-3';
const GOLD = 'shadow-custom-shadow-4';
const PURPLE = 'shadow-custom-shadow-2';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    players: number;
    image: string;
    group: string;
    name: string;
    categories: string[];
    providers: string[];
    aggregator_type: string[];
  };
  index: number;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  operatorId?: string;
  brandId?: string;
}

const GameCard = ({
  game,
  index,
  cardClassName,
  descriptionClassName,
  titleClassName,
  operatorId = 'ossino',
  brandId = 'ossino',
}: GameCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const balance = useAppSelector(selectUserBalance);
  const gameIdentifier = game.game_code || game.id;
  const isFavorited = useAppSelector(selectIsGameFavorited(gameIdentifier));
  const isLoadingFavorite = useAppSelector(
    selectIsGameFavoriteLoading(gameIdentifier),
  );
  const favoriteGameData = useAppSelector(selectFavoriteGameData(gameIdentifier));
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const isOnFavoritesPage = pathname === ROUTES.favorites;
  const shouldShowAsFavorited = isOnFavoritesPage || isFavorited;
  
  const shadows = [PURPLE, PINK, GOLD];
  const currentShadow = shadows[index % shadows.length];

  const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);
  const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId);
  const isLoggedIn = !!(accessToken && userId);

  const livePlayers = Math.floor(Math.random() * 451) + 50;
  const formattedPlayersNumber = livePlayers.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });

  const closeModalHandler = () => {
    setIsOpenModal(false);
  };

  const setFavoriteHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (balance !== undefined && balance < 500) {
      setIsOpenModal(true);
      return;
    }
    const accessToken =
      LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) || '';
    const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId) || '';
    
    // Ensure aggregator is a string, not an array
    const aggregatorValue = Array.isArray(game.aggregator_type)
      ? game.aggregator_type[0] || ''
      : game.aggregator_type || '';
    
    const favoriteRequest = {
      accessToken: accessToken as string,
      action: isFavorited ? ('remove' as const) : ('set' as const),
      aggregator: aggregatorValue,
      brandId,
      categoryName: isFavorited && favoriteGameData 
        ? favoriteGameData.categoryName 
        : (game.categories[0] || ''),
      gameId: game.id,
      gameName: game.name,
      operatorId,
      providerName: game.providers[0] || '',
      userId: userId as string,
    };

    try {
      await dispatch(toggleFavorite(favoriteRequest)).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const setCurrentGameHandler = () => {
    dispatch(setCurrentGameId({ id: game.id }));
    const slug = game.name.replace(/\s+/g, '-');
    navigate(`/game-details/${encodeURIComponent(slug)}`);
  };

  return (
    <>
      <GameModal open={isOpenModal} onClose={closeModalHandler} />
      <div
        className={cn(
          'relative isolate cursor-pointer border border-border-1/[0.10] rounded-xl',
          cardClassName,
        )}
        onClick={setCurrentGameHandler}
      >
        {isLoggedIn && (
          <button
            type="button"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            onClick={setFavoriteHandler}
            disabled={isLoadingFavorite}
            className={cn(
              'z-[60] cursor-pointer absolute right-1.5 top-1.5 w-8 p-2 h-8 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-full',
              { 'opacity-50 cursor-not-allowed': isLoadingFavorite },
            )}
          >
            <span>
              <svg
                className={cn(
                  'h-4 w-4 fill-current',
                  isFavorited
                    ? 'text-primary-1'
                    : 'text-base-400 hover:text-primary-1',
                  { 'animate-pulse': isLoadingFavorite },
                )}
              >
                <use
                  className={cn(
                    'h-4 w-4 fill-current',
                    isFavorited
                      ? 'text-primary-1'
                      : 'text-base-400 hover:text-primary-1',
                  )}
                  href="/icons/bookmark.svg#bookmarkIcon"
                />
              </svg>
            </span>
          </button>
        )}
        <div className={cn('relative aspect-square w-full', styles.imageBox)}>
          <img
            src={game.image}
            alt={game.title}
            className="z-50 block absolute top-0 left-0 object-cover h-full w-full rounded-t-[12px]"
          />
        </div>
        <div className="relative overflow-hidden">
          <div
            className={cn(
              ' left-0 top-0 w-full h-full z-40 blur-1',
              styles.decorations,
            )}
          >
            <div
              className={cn(
                'absolute w-[85px] -top-[22px] z-20',
                styles.itemPurple,
                currentShadow,
              )}
            />
            {currentShadow === PURPLE && (
              <div
                className={cn(
                  'absolute w-8 -top-1 z-10 shadow-custom-shadow-1',
                  styles.itemYellow,
                )}
              />
            )}
          </div>
          <div className="py-3 px-2 z-50 relative">
            <h3
              className={cn(
                'font-bold body-txtColor-1 text-base leading-none capitalize',
                titleClassName,
              )}
            >
              {game.title}
            </h3>
            <span className="text-base-400 text-[12px] capitalize">{game.group}</span>
            <div className="flex justify-between items-center">
              <div
                className={cn(
                  'flex items-center text-[12px]',
                  descriptionClassName,
                )}
              >
                <StatusIndicator className="h-2.5 w-2.5" />
                <span className="pl-[5px] pr-[2px] ">
                  {formattedPlayersNumber}
                </span>
                <span className="text-base-400 ">playing</span>
              </div>
              <span>
                <Icon
                  id="infoIcon"
                  href={info}
                  className="w-[14px] h-[14px] fill-current text-base-400"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
