import type { HTMLAttributes } from 'react';

import { cn } from 'helpers/ui';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {}

const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        'rounded-full py-1 px-3 font-bold text-sm bg-primary-1 body-txtColor-2',
        className,
      )}
      {...props}
    />
  );
};

export default Badge;
