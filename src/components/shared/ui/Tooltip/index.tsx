import { type ReactNode, type PropsWithChildren } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from 'helpers/ui';

type TooltipProps = PropsWithChildren & {
  content: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
};

const Tooltip = ({
  content,
  side = 'bottom',
  children,
  className,
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={0}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className={cn(
              'z-[999] bg-base-700 select-none rounded-xl p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
              className,
            )}
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-base-700" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
