import { Link } from 'react-router-dom';

import { cn } from 'helpers/ui';
import arrowLeft from '/icons/arrowLeft.svg?url';
import Icon from 'components/shared/Icon';

export type BackLinkProps = {
  to: string;
  className?: string;
};

const BackLink = ({ to, className = '' }: BackLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'bg-base-800 flex justify-center items-center rounded-lg w-8 h-8',
        className,
      )}
    >
      <Icon
        id="arrowLeftIcon"
        href={arrowLeft}
        className="w-4 h-4 fill-current body-txtColor-1"
      />
    </Link>
  );
};

export default BackLink;
