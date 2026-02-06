import Icon from 'components/shared/Icon';
import type { LoyaltyPoint as TLoyaltyPoint } from 'store/loyaltyPoints/slice';

type LoyaltyPointProps = Pick<TLoyaltyPoint, 'icon' | 'title' | 'points'>;

const LoyaltyPointMobile = ({ icon, title, points }: LoyaltyPointProps) => {
  return (
    <li className="p-3 border border-base-700 rounded-lg list-none">
      <div className="flex items-center gap-1">
        <Icon id={icon.id} href={icon.href} className="w-5 h-5 text-primary-1" />
        <h4 className="text-sm text-base-200 grow">{title}</h4>
        <span className="text-sm text-primary-1 font-medium">{points}</span>
      </div>
    </li>
  );
};

export default LoyaltyPointMobile;
