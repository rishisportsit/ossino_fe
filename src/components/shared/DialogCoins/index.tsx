import { Button } from 'components/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from 'components/shared/ui/Dialog';

type DialogCoinsProps = {
  value: number | null;
  currency: string;
  onClose: () => void;
  description: string;
  title: string;
};

const DialogCoins = ({
  value,
  description,
  onClose,
  currency,
  title,
}: DialogCoinsProps) => {
  return (
    <Dialog open={!!value} onOpenChange={onClose}>
      <DialogContent
        className="max-w-80 md:max-w-[400px] p-10 md:p-8"
        withClose={false}
      >
        <DialogTitle className={`${title ? 'mb-2' : 'hidden'}`}>{title}</DialogTitle>
        <div className="flex flex-col items-center">
          <div className="relative max-w-56 w-full aspect-square flex justify-center items-center mb-8">
            <img
              src="/images/success-gif.gif"
              className="w-full h-full absolute"
              alt=""
            />
            <div className="w-[73px] h-[73px] rounded-full bg-primary-1 flex flex-col justify-center items-center relative z-20">
              <span className="body-txtColor-2 text-2xl leading-[24px] font-bold">
                {value}
              </span>
              <span className="body-txtColor-2 leading-[16px] font-medium">
                {currency}
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
          <h3 className="font-bold text-xl mb-2 text-center">
            Congratulations!
          </h3>
          <p className="text-sm md:text-base mb-6 text-center text-base-200">
            {description}&nbsp;
            <span className="text-primary-1 text-base md:font-bold">
              {value}&nbsp;{currency}
            </span>
          </p>
          <Button variant="filled" className="w-full" onClick={onClose}>
            Got It!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCoins;
