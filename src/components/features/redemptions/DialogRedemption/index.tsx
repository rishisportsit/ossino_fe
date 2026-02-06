import { useCallback, useMemo, useState } from 'react';

import { redeemReward, type Redemption } from 'store/redemptions/slice';
import { useAppDispatch, useAppSelector } from 'store/index';

import { Button } from 'components/shared/ui/Button';
import { getLoyaltyDetails } from 'store/loyaltyDetails/slice';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from 'components/shared/ui/Dialog';
import { formatNumber } from 'helpers/numbers';
import Loader from 'components/shared/ui/Loader';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { selectDialogById } from 'store/dialog/selectors';
import { useDialog } from 'helpers/hooks';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { launchRealGame, setSelectedGameUrl } from 'store/games/slice';
import { selectUserData } from 'store/user/selectors';
import { selectWalletState } from 'store/wallet/selectors';
import { config } from 'config/index';
import { useNavigate } from 'react-router-dom';

enum Step {
  First,
  Second,
}

type StepViewProps = {
  onClick: () => void;
  data: Redemption;
};

const FirstStepView = ({ data, onClick }: StepViewProps) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.data);
  const loyaltyDetails = useAppSelector((state) => state.loyaltyDetails.data);

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      // Build RedeemPrizeRequestData from env and userData
      const operatorId = import.meta.env.VITE_OPERATOR_ID || '';
      const platformId = Number(import.meta.env.VITE_PLATFORM_ID) || 0;
      const brand = import.meta.env.VITE_OPERATOR_ID || '';
      const userId = userData?.id ? String(userData.id) : '';
      const loyaltyType = 'bonus'; // or get from data if needed
      const bonusId = data.bonusId;
      const bonusPrice = data.value || 0;
      const bonusCount = data.bonusCount; // or get from data if needed
      const accessToken = LocalStorageHelper.getItem(
        STORAGE_KEYS.accessToken,
      ) as string;
      let result = await dispatch(
        redeemReward({
          operatorId,
          platformId,
          brand,
          userId,
          loyaltyType,
          bonusId,
          token: accessToken,
          bonusPrice,
          bonusCount,
        }),
      ).unwrap();
      if (
        result &&
        result.status &&
        result.status == 200 &&
        (typeof result.message === 'undefined' || !result.message.error)
      ) {
        dispatch(getLoyaltyDetails());
        onClick();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img
        src={data.href}
        className="w-full max-w-36 rounded-3xl mb-8"
        alt=""
      />
      <p className="text-xl mb-2 text-center font-bold body-txtColor-1">
        {data.name}
      </p>
      <div className="flex gap-1 items-center mb-2">
        <img src="/images/redemptions/chip.png" className="w-4" alt="" />
        <span className="text-sm font-medium text-base-200">{data.value}</span>
      </div>
      <p className="text-sm text-base-200 mb-6 text-center max-w-60 md:text-base md:max-w-64">
        {data.description}
      </p>
      <div className="rounded-lg h-8 bg-background-1/10 w-full flex items-center justify-between px-4 mb-3">
        <span className="text-xs font-medium text-base-200">Coin Balance</span>
        <div className="flex gap-1 items-center">
          <img src="/images/redemptions/chip.png" className="w-4" alt="" />
          <span className="text-xs text-base-200 font-medium">
            {formatNumber(loyaltyDetails?.coins || 0)}
          </span>
        </div>
      </div>
      <Button
        variant={
          loading || (loyaltyDetails?.coins ?? 0) < (data.value ?? 0)
            ? 'outline'
            : 'filled'
        }
        disabled={loading || (loyaltyDetails?.coins ?? 0) < (data.value ?? 0)}
        onClick={handleClick}
        className="w-full"
      >
        {loading ? <Loader className="w-5 h-5" /> : 'Redeem Now'}
      </Button>
      {(loyaltyDetails?.coins ?? 0) < (data.value ?? 0) && (
        <div className="text-xs text-red-500 text-center mt-2">
          Insufficient coins
        </div>
      )}
    </>
  );
};

const SecondStepView = ({ data, onClick }: StepViewProps) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const { selectedCurrency } = useAppSelector(selectWalletState);
  const navigate = useNavigate();

  const handlePlayNow = async () => {
    if (data.gameCode) {
      // Launch real game
      const payload = {
        playerId: userData?.id?.toString(),
        playerToken: String(
          LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) || '',
        ),
        platformId: config.platformId,
        operatorId: config.operatorId,
        brandId: config.brandId,
        gameId: data.gameCode,
        aggregator: data.providerName || undefined,
        provider: data.providerName || undefined,
        currencyCode: selectedCurrency?.currencyCode,
        gamePlatform: 'WEB',
      };
      try {
        const { launchUrl } = await dispatch(launchRealGame(payload)).unwrap();
        if (launchUrl) {
          dispatch(setSelectedGameUrl({ url: launchUrl }));
        }
      } catch (err) {}
    } else {
      navigate('/sports');
    }
    onClick();
  };

  return (
    <>
      <div className="relative max-w-56 w-full aspect-square flex items-center justify-center mb-8">
        <img
          src="/images/success-gif.gif"
          className="w-full h-full absolute"
          alt=""
        />
        <img
          src={data.href}
          className="w-full max-w-32 rounded-3xl relative z-20"
          alt=""
        />
      </div>
      <h2 className="text-xl font-bold mb-1 body-txtColor-1">Congratulations!</h2>
      <p className="text-sm md:text-base text-center mb-6 text-base-200">
        You got&nbsp;{data.name}. Use it while your next game.
      </p>
      <Button variant="filled" onClick={handlePlayNow} className="w-full">
        Play Now
      </Button>
    </>
  );
};

const DialogRedemption = () => {
  const { data, open } = useAppSelector(
    selectDialogById(DIALOG_TYPE.redemption),
  );
  const { closeDialog } = useDialog();
  const [currentStep, setCurrentStep] = useState<Step>(Step.First);

  const close = useCallback(() => {
    closeDialog(DIALOG_TYPE.redemption);
    setCurrentStep(Step.First);
  }, [closeDialog]);

  const currentView = useMemo(() => {
    if (!data?.data) {
      return null;
    }

    switch (currentStep) {
      case Step.First:
        return (
          <FirstStepView
            onClick={() => setCurrentStep(Step.Second)}
            data={data.data}
          />
        );
      case Step.Second:
        return <SecondStepView onClick={close} data={data.data} />;

      default:
        return null;
    }
  }, [close, currentStep, data]);

  return (
    <Dialog open={open} onOpenChange={close}>
      {data?.data ? (
        <DialogContent className="max-w-80 md:max-w-[400px] p-4">
          <DialogTitle className="hidden" />
          <div className="flex flex-col items-center">{currentView}</div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default DialogRedemption;
