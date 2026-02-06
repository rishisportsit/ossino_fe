import type { LoyaltyPoint } from 'store/loyaltyPoints/slice';
import LoyaltyPointDesktop from '../LoyaltyPointDesktop';
import NoPointsMessage from '../NoPointsMessage';

type LoyaltyPointsDesktopProps = {
  loyaltyPoints: LoyaltyPoint[];
};

const LoyaltyPointsDesktop = ({ loyaltyPoints }: LoyaltyPointsDesktopProps) => {
  return (
    <ul className="flex items-center gap-3 h-full">
      {loyaltyPoints.length > 0 ? (
        loyaltyPoints.map(({ id, ...point }) => (
          <li key={id} className="flex items-center gap-1 grow h-full">
            <LoyaltyPointDesktop {...point} />
          </li>
        ))
      ) : (
        <NoPointsMessage />
      )}
    </ul>
  );
};

export default LoyaltyPointsDesktop;
