import { useCallback, useMemo, useState } from 'react';

import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import { Dialog, DialogContent, DialogTitle } from 'components/shared/ui/Dialog';
import { burnCoins } from 'store/coinsOverview/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import fire2 from '/icons/fire2.svg?url';
import Loader from 'components/shared/ui/Loader';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useDialog } from 'helpers/hooks';

enum Step {
  First,
  Second,
}

type BurnCoinsResponse = {
  message: string;
  amount: number;
  status: string;
  astraRes: any;
  astraError: any;
};

type FirstStepViewProps = {
  onSubmit: (response: BurnCoinsResponse) => void;
  onClose: () => void;
  value: number;
  expectedCashback?: number;
  cashPercentage?: number;
};

type SecondStepViewProps = {
  onClose: () => void;
  value: number;
  actualCashback: number;
};

const FirstStepView = ({ 
  value, 
  onSubmit, 
  onClose, 
  expectedCashback = 0,
  cashPercentage = 0 
}: FirstStepViewProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await dispatch(burnCoins({ coins: value })).unwrap();
      onSubmit(response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-24 w-24 bg-base-700 mb-8 rounded-full flex items-center justify-center">
        <Icon id="fire2Icon" href={fire2} className="w-10 h-10 text-primary-1 fill-current" />
      </div>
      <p className="font-bold text-xl body-txtColor-1">
        Burn&nbsp;{value}&nbsp;Casino Coins?
      </p>
      <div className="mb-6 text-center">
        <p className="text-base-200 mb-2">
          You will get Instant&nbsp;
          <span className="text-base font-bold text-primary-1">
            ₮{expectedCashback.toFixed(4)}
          </span>&nbsp;Cashback
        </p>
        <p className="text-xs text-base-400">
          ({cashPercentage}% cashback rate)
        </p>
        <p className="text-xs text-base-400 mt-1">
          credited to your wallet immediately.
        </p>
      </div>
      <Button variant="filled" disabled={loading} onClick={handleClick} className="w-full mb-2">
        {loading ? <Loader className='w-5 h-5' /> : 'Confirm'}
      </Button>
      <Button variant="outline" onClick={onClose} className="w-full">
        Cancel
      </Button>
    </>
  );
};

const SecondStepView = ({ value, onClose, actualCashback }: SecondStepViewProps) => {
  return (
    <>
      <div className="relative max-w-56 w-full aspect-square flex justify-center items-center mb-8">
        <img
          src="/images/success-gif.gif"
          className="w-full h-full absolute"
          alt=""
        />
        <div className="w-[90px] h-[90px] rounded-full bg-primary-1 flex flex-col justify-center items-center relative z-20">
          <span className="body-txtColor-2 text-lg leading-[18px] font-bold">
            ₮{actualCashback}
          </span>
          <span className="body-txtColor-2 text-xs leading-[14px] font-medium">
            cashback
          </span>
        </div>
        <img
          src="/images/present-top.png"
          alt=""
          className="absolute z-30 w-20 top-10 left-[35px]"
        />
        <img
          src="/images/present-bottom.png"
          alt=""
          className="absolute z-10 top-32 w-24"
        />
      </div>
      <h3 className="font-bold text-xl mb-2 text-center body-txtColor-1">
        Congratulations!
      </h3>
      <p className="text-sm md:text-base mb-2 text-center text-base-200">
        Successfully burned&nbsp;
        <span className="text-primary-1 font-bold">
          {value}&nbsp;coins
        </span>
      </p>
      <p className="text-sm md:text-base mb-6 text-center text-base-200">
        Your account has been credited with&nbsp;
        <span className="text-primary-1 text-base font-bold">
          ₮{actualCashback}&nbsp;cashback
        </span>
      </p>
      <Button variant="filled" className="w-full" onClick={onClose}>
        Got It!
      </Button>
    </>
  );
};

const DialogBurnCoins = () => {
  const { open, data } = useAppSelector(selectDialogById(DIALOG_TYPE.burnCoins));
  const { closeDialog } = useDialog();

  const [currentStep, setCurrentStep] = useState<Step>(Step.First);
  const [actualCashback, setActualCashback] = useState<number>(0);

  const onClose = useCallback(() => {
    closeDialog(DIALOG_TYPE.burnCoins);
  }, [closeDialog]);

  const close = useCallback(() => {
    onClose();
    setCurrentStep(Step.First);
    setActualCashback(0);
  }, [onClose]);

  const handleBurnSuccess = useCallback((response: any) => {
    
    let actualAmount = 0;
    
    if (response?.data?.amount) {
      actualAmount = response.data.amount;
    } else if (response?.amount) {
      actualAmount = response.amount;
    }
    
    setActualCashback(actualAmount); 
    setCurrentStep(Step.Second);
  }, []);

  const currentView = useMemo(() => {
    if (!data?.value) {
      return null;
    }

    switch (currentStep) {
      case Step.First:
        return (
          <FirstStepView
            onSubmit={handleBurnSuccess}
            onClose={onClose}
            value={data.value}
            expectedCashback={data.expectedCashback}
            cashPercentage={data.cashPercentage}
          />
        );
      case Step.Second:
        return (
          <SecondStepView 
            onClose={close} 
            value={data.value}
            actualCashback={actualCashback}
          />
        );
      default:
        return null;
    }
  }, [close, currentStep, data, onClose, handleBurnSuccess, actualCashback]);

  return (
    <Dialog open={!!open} onOpenChange={close}>
      {data?.value ? (
        <DialogContent className="max-w-80 md:max-w-[400px] p-4 pt-8 bg-base-900">
          <DialogTitle className="hidden"/>
          <div className="flex flex-col items-center">{currentView}</div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default DialogBurnCoins;