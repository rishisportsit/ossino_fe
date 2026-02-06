import { type ReactNode } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { cn } from 'helpers/ui';
import Icon from 'components/shared/Icon';
import arrowLeft from '/icons/arrowLeft.svg?url';
import { cleanUrlSegment, replaceString } from 'helpers/common';
import { mapApiIdToProviderCode } from 'store/providers/constants';

interface PageHeaderProps {
  className?: string;
  children?: ReactNode;
  childrenClassName?: string;
  to?: string;
  label?: string;
  onClick?: () => void;
  pathNameFromComponent?: string;
}

const PageHeader = ({
  className,
  children,
  childrenClassName,
  to,
  label,
  onClick,
  pathNameFromComponent,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const { categoryId, providerId } = useParams();
  const { pathname } = useLocation();

  const title = () => {
    if (label) {
      return label;
    }
    const path = cleanUrlSegment(pathNameFromComponent ? pathNameFromComponent : pathname);

    if (categoryId) {
      return replaceString(categoryId, /-/g, ' ');
    }

    if (providerId) {
      const mappedProvider = mapApiIdToProviderCode(providerId);
      if (mappedProvider) {
        return replaceString(mappedProvider, /-/g, ' ');
      }
      return null;
    }

    return path;
  };

  const navigateHandler = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (to) {
      navigate(to);
      return;
    }
    navigate(-1);
  };

  return (
    <div className={cn('flex justify-between mb-5', className)}>
      <div className="flex gap-2 min-w-0">
        <button
          type="button"
          onClick={navigateHandler}
          className={cn(
            'bg-base-800 flex justify-center items-center rounded-lg min-w-8 min-h-8',
          )}
        >
          <Icon
            id="arrowLeftIcon"
            href={arrowLeft}
            className="w-4 h-4 fill-current body-txtColor-1"
          />
        </button>
        {title() && (
          <div className="bg-base-800 rounded-lg h-8 px-4 flex items-center w-fit min-w-0">
            <span className="text-sm font-medium text-primary-2 capitalize truncate">
              {title()}
            </span>
          </div>
        )}
      </div>
      {children ? (
        <div
          className={cn(
            'bg-base-800 rounded-lg h-8 px-4 flex items-center gap-2 w-fit',
            childrenClassName,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default PageHeader;
