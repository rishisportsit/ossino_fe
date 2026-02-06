import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectUserData } from 'store/user/selectors';
import { selectWalletState } from 'store/wallet/selectors';
import { launchRealGame, setSelectedGameUrl } from 'store/games/slice';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { config } from 'config/index';
import type { Game } from 'api/content/content.types';
import type { LaunchRealGameRequest } from 'api/games/games.types';

export type RoundedGameIconProps = {
  title: string;
  image: string;
  id: string;
  name?: any;
  game?: Game; // Optional full game object for launching
};

const GameRoundedIcon = ({ title, image, id, name, game }: RoundedGameIconProps) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const { selectedCurrency } = useAppSelector(selectWalletState);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleClick = async () => {
    // Only launch if we have a game object
    if (!game || isLaunching) return;

    setIsLaunching(true);
    
    try {
      const isOriginalsGame = game.categories?.some(
        (cat) => cat?.toLowerCase() === 'originals',
      );

      const payload: LaunchRealGameRequest = {
        playerId: userData?.id?.toString(),
        playerToken: LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) || '',
        platformId: config.platformId,
        operatorId: config.operatorId,
        brandId: config.brandId,
        gameId: game.id,
        aggregator: isOriginalsGame ? 'negames' : game.aggregator_type,
        provider: isOriginalsGame ? 'negames' : game.provider,
        currencyCode: selectedCurrency?.currencyCode,
        gamePlatform: 'WEB',
      };

      const { launchUrl } = await dispatch(launchRealGame(payload)).unwrap();
      if (launchUrl) {
        dispatch(setSelectedGameUrl({ url: launchUrl }));
      }
    } catch (err) {
      console.error('Failed to launch game:', err);
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="flex flex-col w-16 xl:w-[88px] gap-2">
      <div
        onClick={handleClick}
        className="flex m-0 justify-center cursor-pointer relative"
      >
        <img
          className="border border-transparent rounded-full w-16 h-16 xl:w-[88px] xl:h-[88px] object-cover bg-base-900 hover:border-accent-3 cursor-pointer"
          alt="Game Icon"
          src={image}
        />
        {isLaunching && (
          <div className="absolute inset-0 bg-background-2/50 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-accent-3 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <span
        title={title}
        className="inline text-xs leading-[14px] text-center overflow-hidden whitespace-nowrap font-bold text-ellipsis capitalize"
      >
        {title}
      </span>
    </div>
  );
};

export default GameRoundedIcon;