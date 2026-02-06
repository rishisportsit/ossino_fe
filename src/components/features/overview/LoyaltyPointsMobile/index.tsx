import type { LoyaltyPoint as TLoyaltyPoint } from 'store/loyaltyPoints/slice';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import Icon from 'components/shared/Icon';
import infoIcon from '/icons/info.svg?url';
import LoyaltyPointMobile from '../LoyaltyPointMobile';
import NoPointsMessage from '../NoPointsMessage';

type LoyaltyPointsMobileProps = {
  loyaltyPoints: TLoyaltyPoint[];
};

const LoyaltyPointsMobile = ({ loyaltyPoints }: LoyaltyPointsMobileProps) => {
  return (
    <Accordion type="single" collapsible className="w-full h-full">
      <AccordionItem value="item-1" className="w-full h-full flex flex-col">
        <AccordionTrigger className="p-4 bg-base-800 rounded-xl data-[state=open]:rounded-b-none">
          <div className="flex items-center gap-1">
            <h3 className="font-bold">Loyalty Points</h3>
            <Icon
              href={infoIcon}
              id="infoIcon"
              className="w-4 h-4 text-base-400 mt-[2px]"
            />
          </div>
        </AccordionTrigger>
        <AccordionContent className="h-full bg-base-800 rounded-b-xl p-4 pt-0">
          <div className="flex flex-col gap-1">
            {loyaltyPoints.length > 0 ? (
              loyaltyPoints.map(({ id, ...point }) => (
                <LoyaltyPointMobile key={id} {...point} />
              ))
            ) : (
              <div className="pt-[4%]">
                <NoPointsMessage />
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LoyaltyPointsMobile;
