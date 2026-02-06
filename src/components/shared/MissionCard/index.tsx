import { useAppDispatch, useAppSelector } from 'store/index';
import { selectUserData } from 'store/user/selectors';
import { selectWalletState } from 'store/wallet/selectors';
import { config } from 'config/index';
import { launchRealGame, setSelectedGameUrl } from 'store/games/slice';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { type Mission } from 'store/missions/slice';

import { Button } from 'components/shared/ui/Button';
import { Progress } from 'components/shared/ui/Progress';
import { cn } from 'helpers/ui';

type MissionCardProps = {
  onClick?: () => void;
  data: Mission;
  imgClassName?: string;
  withIcon?: boolean;
};

const MissionCard = ({
  onClick,
  data,
  imgClassName,
  withIcon = true,
}: MissionCardProps) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const { selectedCurrency } = useAppSelector(selectWalletState);

  const handleRealPlay = async () => {
    // Treat mission as a game object for launching
    const isOriginalsGame = data.description
      ?.toLowerCase()
      .includes('originals');
    const playerToken = String(
      LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) || '',
    );
    const payload = {
      playerId: userData?.id?.toString(),
      playerToken,
      platformId: config.platformId,
      operatorId: config.operatorId,
      brandId: config.brandId,
      gameId: data.gameCode,
      aggregator: data.aggregator,
      provider: data.providerId,
      currencyCode: selectedCurrency?.currencyCode,
      gamePlatform: 'WEB',
    };
    try {
      const { launchUrl } = await dispatch(launchRealGame(payload)).unwrap();
      if (launchUrl) dispatch(setSelectedGameUrl({ url: launchUrl }));
    } catch (err) {
      console.error('Failed to launch real game:', err);
    }
  };

  return (
    <div className="overflow-hidden w-full h-full rounded-t-xl flex flex-col">
      <img
        src={data.imageUrl}
        className={cn(
          'aspect-square w-full relative z-10 object-cover',
          imgClassName,
        )}
        alt=""
        onClick={handleRealPlay}
        style={{ cursor: 'pointer' }}
      />
      <div className="border border-t-0 border-border-1/[0.1] py-3 px-2 rounded-b-xl relative bg-base-800 flex-1">
        <div
          style={{ backgroundImage: `url(${data.imageUrl})` }}
          className="aspect-square absolute w-[90px] blur-[50px] -top-20 left-1/2 -translate-x-1/2"
        />
        <div className="relative z-10 flex flex-col justify-between h-full">
          <p className="font-medium text-sm line-clamp-2 mb-1 flex-1 body-txtColor-1">
            {data.description}
          </p>
          <p className="text-base-400 font-medium text-xs">{data.brandId}</p>
          <Progress value={data.progress} className="my-3" />
          <Button
            variant={data.prizeAwarded ? 'outline' : 'filled'}
            size="sm"
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium focus-visible:outline-none h-8 text-xs px-2 w-full',
              data.prizeAwarded
                ? 'text-base-500 border-base-500'
                : 'bg-primary-1 body-txtColor-2',
              'disabled:pointer-events-none disabled:text-base-500 disabled:bg-primary-1 disabled:opacity-20',
            )}
            onClick={data.prizeAwarded ? undefined : onClick}
            disabled={data.progress < 100}
          >
            {data.prizeAwarded ? 'Rewarded' : 'Reward'}&nbsp;
            {withIcon ? (
              <img src="/images/redemptions/chip.png" className="h-4" alt="" />
            ) : null}
            {data.prizeAmount}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
