import * as DialogPrimitive from '@radix-ui/react-dialog';
import CloseIcon from 'assets/icons/Close';
import { cn } from 'helpers/ui';
import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'max-h-screen overflow-y-scroll no-scrollbar fixed inset-0 px-7 z-[2100] bg-background-2/70  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const contentVariants = cva(
  'rounded-xl fixed left-[50%] top-[50%] z-[2200] grid min-w-[320px] w-[85%] md:min-w-[400px] max-w-[400px] max-h-[90%] no-scrollbar overflow-y-scroll translate-x-[-50%] translate-y-[-50%] gap-6 p-4 md:p-8 pt-8 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-gradient-pop-up',
        success: 'bg-gradient-pop-up-success',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof contentVariants> & {
      withClose?: boolean;
      overlayClassName?: string;
    }
>(
  (
    {
      className,
      children,
      variant,
      withClose = true,
      overlayClassName,
      ...props
    },
    ref,
  ) => {
    const handleInteractOutside = (ev: Event) => {
      const isToastItem = (ev.target as Element)?.closest(
        '[data-sonner-toaster]',
      );

      if (isToastItem) {
        ev.preventDefault();
      }
    };

    return (
      <DialogPortal>
        <DialogOverlay className={overlayClassName} />
        <div>
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              contentVariants({ variant, className }),
              'pop-up-border',
            )}
            {...props}
            onPointerDownOutside={handleInteractOutside}
            onInteractOutside={handleInteractOutside}
          >
            {children}
            {withClose ? (
              <DialogPrimitive.Close className="absolute right-3 top-3 cursor-pointer">
                <CloseIcon />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            ) : null}
          </DialogPrimitive.Content>
        </div>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center', className)}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-xl leading-6 font-bold tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-base-200 leading-[18px]', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
