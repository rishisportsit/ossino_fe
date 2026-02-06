import { Button } from 'components/shared/ui/Button';
import { cn } from 'helpers/ui';

import { useNavigate } from 'react-router-dom';
import classes from './index.module.css';

type PlayAndErnProps = {
  layout?: 'default' | 'horizontal';
};

const PlayAndErn = ({ layout = 'default' }: PlayAndErnProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        'rounded-xl p-4 pb-5 gradient relative overflow-hidden bg-gradient-to-b from-gradient-third-1 to-80% to-gradient-third-2 shadow-[0_11.04px_22.08px_0_#00000080]',
        {
          'flex gap-4 items-center justify-between pr-[30px] min-h-[108px]':
            layout === 'horizontal',
        },
      )}
    >
      <div className="relative z-10">
        <p className="leading-6 font-black mb-0.5 text-xl">PLAY & EARN</p>
        <p className="max-w-52 text-xs mb-2 leading-4">
          Get rewarded every time you play. New Ranks give you better rewards!
        </p>
        {layout === 'default' && (
          <Button variant="filled" size="sm" onClick={() => {navigate('/')}}>
            Play Now
          </Button>
        )}
      </div>
      <img
        src="/images/present.png"
        alt=""
        className={cn('w-[70px] absolute', {
          'top-10 right-8': layout === 'default',
          'top-[24%] left-[52%] z-10': layout === 'horizontal',
        })}
      />
      <img
        src="/images/star-1.png"
        alt=""
        className={cn({
          'w-9 absolute top-1 right-[90px]': layout === 'default',
          'w-5 absolute top-[11%] left-[51%] z-10': layout === 'horizontal',
        })}
      />
      <img
        src="/images/star-2.png"
        alt=""
        className={cn({
          'w-4 absolute top-2 right-8': layout === 'default',
          'w-2 h-2 absolute top-4 left-[60.7%] z-10': layout === 'horizontal',
        })}
      />
      <img
        src="/images/star-3.png"
        alt=""
        className={cn({
          'w-5 absolute top-24 right-3': layout === 'default',
          'w-3 absolute top-[64%] left-[65%] z-10': layout === 'horizontal',
        })}
      />
      {layout === 'horizontal' && (
        <Button variant="filled" size="sm" onClick={() => {navigate('/')}}>
          Play Now
        </Button>
      )}
      {layout === 'horizontal' && (
        <div
          className={cn(
            'absolute left-[42%] top-[42%] w-[226px] h-[227px] rotate-[111deg] blur-[51px]',
            classes.gradient,
          )}
        />
      )}
    </div>
  );
};

export default PlayAndErn;
