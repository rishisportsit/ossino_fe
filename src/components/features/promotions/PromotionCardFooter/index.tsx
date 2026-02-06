import type { Promotion } from 'store/promotions/types';
import { format } from 'date-fns';

type PromotionCardFooterProps = Pick<Promotion['data'], 'title' | 'endDate'>;

const PromotionCardFooter = ({ endDate, title }: PromotionCardFooterProps) => {
  return (
    <div className="p-3">
      <p className="text-sm font-medium leading-4 mb-1">{title}</p>
      <p className="text-xs text-base-400 leading-4">
        Ends at {format(endDate, 'hh:mm a, MM/dd/yyyy')}
      </p>
    </div>
  );
};

export default PromotionCardFooter;
