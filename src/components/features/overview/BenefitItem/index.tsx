import type { BenefitItem as TBenefitItem } from 'store/benefits/slice';
import { cn } from 'helpers/ui';

const BenefitItem = ({
  description,
  isOpened,
  title,
}: Omit<TBenefitItem, 'id'>) => {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className={cn(
        "h-6 w-6 flex items-center justify-center rounded-full transition-all duration-200 flex-shrink-0",
        {
          'bg-secondary-1': isOpened, 
          'bg-base-600': !isOpened,
        }
      )}>
        {isOpened ? (
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="body-txtColor-2"
          >
            <path 
              d="M20 6L9 17L4 12" 
              stroke="#000" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-base-400"
          >
            <path 
              d="M20 6L9 17L4 12" 
              stroke="#000" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={cn(
          "text-sm font-bold mb-1 leading-[16px] transition-colors duration-200",
          {
            'body-txtColor-1': isOpened,
            'text-base-300': !isOpened,
          }
        )}>
          {title}
        </h4>
        <p className={cn(
          "leading-4 text-xs transition-colors duration-200",
          {
            'text-base-200': isOpened,
            'text-base-300': !isOpened,
          }
        )}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default BenefitItem;