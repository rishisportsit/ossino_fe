import { type Badge } from 'store/badges/slice';

import { cn } from 'helpers/ui';
import { useNavigate } from 'react-router-dom';
import tickCircle from '/tickCircle.svg?url';
import { Button } from 'components/shared/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from 'components/shared/ui/Dialog';
import CircleProgress from 'components/shared/ui/CircleProgress';
import Icon from 'components/shared/Icon';
import './DialogBadge.css';

const DialogBadge = ({
  data,
  onClose,
}: {
  data: Badge | null;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <Dialog open={!!data} onOpenChange={onClose}>
      {data ? (
        <DialogContent className="max-w-80 md:max-w-[400px] md:p-8">
          <DialogTitle className="hidden" />
          <div className="flex flex-col items-center">
            <div className="max-w-36 w-full mb-7 animate-coin-flip">
              <CircleProgress
                strokeWidth={2}
                value={data.completed}
                minValue={0}
                maxValue={100}
                mainClassName="stroke-secondary-1"
                secondaryClassName="stroke-[#E0FF88]/[0.55] blur-[3px]"
                bgClassName="stroke-base-700 opacity-1"
              >
                <div className="p-2">
                  <div className="rounded-full flex items-center justify-center overflow-hidden relative">
                    <img
                      src={data.iconUrl ?? '/images/badges/cup.png'}
                      className="aspect-square w-full"
                      alt=""
                    />
                    {data.completed < 100 ? (
                      <div className="absolute h-full w-full top-0 left-0 backdrop-blur-[10px] bg-base-645/[0.70] rounded-full" />
                    ) : null}
                  </div>
                </div>
              </CircleProgress>
            </div>
            <p className="font-bold text-xl text-center mb-2 body-txtColor-1">
              {data.name
                .replace(/_/g, ' ')
                .replace(
                  /\w\S*/g,
                  (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
                )}
            </p>
            <div className="flex items-center gap-1 mb-2">
              <Icon
                id="tickCircleIcon"
                href={tickCircle}
                className={cn('w-[14px] h-[14px] fill-current', {
                  'text-base-500': data.completed < 100,
                  'text-secondary-1': data.completed === 100,
                })}
              />
              <span className="text-base-100 font-medium text-sm">
                {data.completed}/100
              </span>
            </div>
            <p className="text-sm text-base-200 mb-6 text-center md:text-base">
              {data.description}
            </p>
            <Button
              variant="filled"
              onClick={() => {
                if (data && data.completed < 100) {
                  navigate('/');
                } else {
                  onClose();
                }
              }}
              className="w-full"
            >
              {data.completed < 100 ? 'Play Now' : 'Got It'}
            </Button>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default DialogBadge;
