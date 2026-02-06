import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import { Root, Indicator } from '@radix-ui/react-progress';

import { cn } from 'helpers/ui';

const Progress = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, value, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      'relative h-1.5 w-full overflow-hidden rounded-full bg-background-1/10',
      className,
    )}
    {...props}
  >
    <Indicator
      className="h-full w-full flex-1 bg-accent-2 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </Root>
));
Progress.displayName = Root.displayName;

export { 
  Progress 
};
