import { Link, type LinkProps } from 'react-router-dom';

import { cn } from 'helpers/ui';
import arrowRight from '/icons/arrowRight.svg?url';
import Icon from 'components/shared/Icon';

const LinkWithArrow = ({ children, className, ...props }: LinkProps) => {
  return (
    <Link
      {...props}
      className={cn(
        'text-primary-2 text-sm font-medium flex items-center gap-1',
        className,
      )}
    >
      {children}
      <Icon
        id="arrowRightIcon"
        href={arrowRight}
        className="w-4 h-4 fill-current text-primary-2"
      />
    </Link>
  );
};

export default LinkWithArrow;
