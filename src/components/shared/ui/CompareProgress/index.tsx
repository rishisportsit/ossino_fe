import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import { Root, Indicator } from '@radix-ui/react-progress';

import { cn } from 'helpers/ui';

const CompareProgress = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, value, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      'relative h-3.5 w-full overflow-hidden rounded-full bg-accent-2',
      className,
    )}
    {...props}
  >
    <Indicator
      className="h-full w-full flex-1 bg-primary-1 transition-all rounded-r-full"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    {value ? (
      <>
        <span className="body-txtColor-2 absolute left-2 z-10 top-1/2 text-10px transform -translate-y-1/2">
          {value}%
        </span>
        <span className="body-txtColor-1 absolute right-2 z-10 top-1/2 text-10px transform -translate-y-1/2">
          {100 - value}%
        </span>
      </>
    ) : null}
  </Root>
));
CompareProgress.displayName = Root.displayName;

export { CompareProgress };
