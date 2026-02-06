import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'helpers/ui';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-button-gradient disabled:bg-none disabled:bg-base-500 disabled:body-txtColor-1',
        outline: 'border border-primary-1 bg-none rounded-lg text-primary-1',
        social: 'border border-1 bg-none rounded-xl body-txtColor-1',
        filled:
          'bg-primary-1 body-txtColor-2 disabled:text-base-500 disabled:bg-base-500',
        destructive: 'border border-status-error-100 text-status-error-100',
        filledWhite: 'background-1 text-base-900',
        outlineWhite: 'border border-1 bg-none rounded-lg body-txtColor-1',
        filledGray: 'bg-base-700 text-base-500',
        text: 'text-primary-1',
      },
      size: {
        sm: 'h-8 text-xs px-2',
        default: 'h-10 px-[23px] py-2',
        lg: 'h-12 px-8',
        xl: 'h-14 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    // Compute the className using buttonVariants as usual
    let finalClassName = cn(buttonVariants({ variant, size, className }));
    // If bg-button-gradient is present, append btn-textColor
    if (finalClassName.includes('bg-button-gradient')) {
      finalClassName = cn(finalClassName, 'btn-textColor');
    }
    return (
      <Comp
        className={finalClassName}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

// eslint-disable-next-line object-curly-newline
export { Button, buttonVariants };
