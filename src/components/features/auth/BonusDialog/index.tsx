import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/shared/ui/Dialog';
import { useState, useEffect } from 'react';
import { useAppSelector } from 'store/index';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import BonusBanner from '../BonusBanner';
import BonusSelector from '../BonusSelector';

const BonusDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldReopenAfterPolicy, setShouldReopenAfterPolicy] = useState(false);
  
  const footerContentDialog = useAppSelector(selectDialogById(DIALOG_TYPE.footerContent));

  useEffect(() => {
    if (shouldReopenAfterPolicy && !footerContentDialog?.open) {
      setIsOpen(true);
      setShouldReopenAfterPolicy(false);
    }
  }, [footerContentDialog?.open, shouldReopenAfterPolicy]);

  const handleClose = () => {
    setIsOpen(false);
    setShouldReopenAfterPolicy(false);
  };

  const handlePolicyOpened = () => {
    setShouldReopenAfterPolicy(true);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <BonusBanner />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="mb-8 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center mx-auto">
            <img
              src="/images/prize1-large.png"
              alt="prize"
              width={51}
              height={56}
            />
          </div>
          <DialogTitle className="mb-2">We have a surprise for you</DialogTitle>
          <DialogDescription>
            We give a bonus for the first deposit of the account.
          </DialogDescription>
        </DialogHeader>
        <BonusSelector onDialogClose={handleClose} onPolicyOpened={handlePolicyOpened} />
      </DialogContent>
    </Dialog>
  );
};

export default BonusDialog;
