import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'helpers/ui';
import type { HTMLAttributes } from 'react';

const badgeVariants = cva(
  'text-xs font-medium leading-4 rounded-[100px] h-6 flex items-center justify-center px-3',
  {
    variants: {
      variant: {
        error: 'text-status-error-100 bg-state-negative-bg',
        success: 'text-status-success bg-state-positive-bg',
        warning: 'text-status-warning bg-state-warning-bg',
        disabled: 'text-base-400 bg-base-400/[0.10]',
      },
    },
    defaultVariants: { variant: 'disabled' },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

const Badge = ({ children, variant, className, ...props }: BadgeProps) => {
  return (
    <span {...props} className={cn(badgeVariants({ variant, className }))}>
      {children}
    </span>
  );
};

export default Badge;
