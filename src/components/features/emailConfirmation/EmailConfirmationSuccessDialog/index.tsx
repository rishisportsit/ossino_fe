import { Button } from 'components/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/shared/ui/Dialog';
import { useDialog } from 'helpers/hooks';
import { useAppSelector } from 'store/index';
import { selectDialogById } from 'store/dialog/selectors';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EmailConfirmationSuccessDialog = () => {
  const { open, data } = useAppSelector(selectDialogById(DIALOG_TYPE.success));
  const { closeDialog } = useDialog();
  const navigate = useNavigate();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog(DIALOG_TYPE.success);
    }
  };

  const handleClick = () => {
    closeDialog(DIALOG_TYPE.success);
    navigate('/');
  };

  useEffect(() => {
    if (open && data?.message?.includes('Email Verified')) {
      const timer = setTimeout(() => {
        handleClick();
      }, 5000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open, data?.message, handleClick]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent variant="success" className="lg:max-w-[480px]">
        <DialogHeader>
          <div className="relative w-[220px] h-[220px] mx-auto flex items-center justify-center">
            <img
              src="/images/success-gif.gif"
              alt="success"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="z-10 w-24 h-24 rounded-full bg-background-1/20 flex items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="w-[220px] md:w-[300px] mx-auto">
            <DialogTitle className="mb-2">
              {data?.message || 'Success!'}
            </DialogTitle>
            <DialogDescription>{data?.details}</DialogDescription>
          </div>
        </DialogHeader>
        <Button size="lg" onClick={handleClick}>
          {data?.buttonText || 'OK'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EmailConfirmationSuccessDialog;
