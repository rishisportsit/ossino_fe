// import { ROUTES } from 'constants/routes';
import { STORAGE_KEYS } from 'constants/storage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/index';
import { LocalStorageHelper } from 'helpers/storage';
import PageHeader from 'components/shared/PageHeader';
import AboutGame from 'components/features/game-detail/AboutGame';
import GameInfo from 'components/features/game-detail/GameInfo';
import RecommendedGames from 'components/features/game-detail/RecommendedGames';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import MobileStatsMenu from 'components/features/game-detail/MobileStatsMenu';
import GameModal from 'components/shared/GameCard/GameModal';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from 'components/shared/ui/Sheet';
import StatsBlock from 'components/features/game-detail/StatsBlock';
import DailyRaceBlock from 'components/features/game-detail/DailyRaceBlock';
import ImageBlock from 'components/features/game-detail/ImageBlock';
import { resetCurrentGameId } from 'store/games/slice';
import { toggleFavorite } from 'store/favourites/slice';
import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import { selectUserBalance } from 'store/user/selectors';
import status from '/icons/statusUp.svg?url';
import { selectIsGameFavorited } from 'store/favourites/selectors';

const GameDetails = () => {
  const { VITE_OPERATOR_ID } = import.meta.env;
  const [isOpenStats, setIsOpenStats] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const balance = useAppSelector(selectUserBalance);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const games = useAppSelector((state) => state.games.data);
  const { screenWidth } = useBreakpoint();
  const { name } = useParams();
  const normalizedName = name
    ? decodeURIComponent(name).replace(/-/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
    : '';
  const game = games?.find(
    (g) =>
      (g.name && g.name?.replace(/-/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase() === normalizedName) ||
      (g.title && g.title?.replace(/-/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase() === normalizedName),
  );

  const gameId = game?.id || '';
  const isFavorited = useAppSelector(selectIsGameFavorited(gameId));
  const isLoadingFavorite =
    useAppSelector((state) => state.favourites.actionLoading[gameId]) || false;
  const isMediumScreen = screenWidth >= BREAKPOINTS.md;
  const isLargeScreen = screenWidth >= BREAKPOINTS.xl;

  const openStatsHandler = () => {
    if (isLargeScreen) {
      return;
    }
    setIsOpenStats(!isOpenStats);
  };

  const setFavoriteHandler = () => {
    if (balance !== undefined && balance < 500) {
      setIsOpenModal(true);
    } else if (game) {
      const accessToken =
        (LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) as string) || '';
      const userId =
        (LocalStorageHelper.getItem(STORAGE_KEYS.userId) as string) || '';
      const aggregatorValue = game?.aggregator_type || '';
      dispatch(
        toggleFavorite({
          accessToken,
          action: isFavorited ? 'remove' : 'set',
          aggregator: typeof aggregatorValue === 'string' ? aggregatorValue : (aggregatorValue || ''),
          brandId: VITE_OPERATOR_ID || '',
          categoryName: game?.categoryname || '',
          gameId: game?.id,
          gameName: game?.name || game?.title || '',
          operatorId: VITE_OPERATOR_ID || '',
          providerName: game?.provider || '',
          userId,
        }),
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetCurrentGameId());
    };
  }, [dispatch]);

  if (!game) {
    return (
      <div className="flex items-center justify-center pt-[76px] md:pt-0 flex-col gap-4"></div>
    );
  }

  return (
    <>
      <GameModal open={isOpenModal} onClose={() => setIsOpenModal(false)} />
      <div className="flex flex-col px-4 pt-[76px] md:pt-4 relative xl:px-5">
        <PageHeader childrenClassName="bg-transparent justify-end px-0">
          <div className="flex gap-2">
            {!isLargeScreen && (
              <Button
                onClick={openStatsHandler}
                className="bg-base-800 w-8 p-2 h-full flex items-center justify-center"
              >
                <Icon
                  id="statusUpIcon"
                  href={status}
                  className="w-4 h-4 text-primary-1"
                />
              </Button>
            )}
            {typeof LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) === 'string' && (
              isLoadingFavorite ? (
                <span className="w-8 h-8 flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 text-primary-1" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </span>
              ) : (
                <button
                  type="button"
                  aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  onClick={setFavoriteHandler}
                  className={cn(
                    'z-[60] cursor-pointer w-8 p-2 h-full flex items-center justify-center bg-base-800 rounded-full',
                  )}
                >
                  <span>
                    <svg
                      className={cn(
                        'h-4 w-4 fill-current',
                        isFavorited
                          ? 'text-primary-1'
                          : 'bg-base-700-opacity-30 hover:text-primary-1',
                      )}
                    >
                      <use
                        className={cn(
                          'h-4 w-4 fill-current',
                          isFavorited
                            ? 'text-primary-1'
                            : 'bg-base-700-opacity-30 hover:text-primary-1',
                        )}
                        href="/icons/bookmark.svg#bookmarkIcon"
                      />
                    </svg>
                  </span>
                </button>
              )
            )}
          </div>
        </PageHeader>
        <div className="relative z-0 flex flex-col gap-8 md:gap-5 ">
          <div className="w-full z-20 grid grid-cols-1 md:grid-cols-2 gap-5 xl:grid xl:grid-cols xl:grid-cols-[2fr_1fr]">
            <ImageBlock image={game.image} title={game.title} />
            <GameInfo game={game} />
          </div>
          <AboutGame />
          <RecommendedGames />
        </div>
      </div>

      {!isMediumScreen && (
        <MobileStatsMenu open={isOpenStats} onClose={openStatsHandler} />
      )}
      {!isLargeScreen && isMediumScreen && (
        <Sheet open={isOpenStats} onOpenChange={setIsOpenStats}>
          <SheetContent className="" side="right">
            <SheetTitle className="hidden" />
            <SheetDescription className="hidden" />
            <SheetHeader>
              <h3 className="flex items-center gap-2 text-base">
                <Icon
                  id="statusUpIcon"
                  href={status}
                  className="w-4 h-4 fill-current  body-txtColor-1"
                />
                Live Stats
              </h3>
            </SheetHeader>
            <StatsBlock />
            <DailyRaceBlock />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default GameDetails;
