import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import { cn } from 'helpers/ui';
import type { Benefit } from 'store/benefits/slice';
import { useAppSelector } from 'store/index';
import { selectLoyaltyDetails } from 'store/loyaltyDetails/selectors';
import BenefitHeading from '../BenefitHeading';
import BenefitItem from '../BenefitItem';
import BenefitProgress from '../BenefitProgress';

type BenefitAccordionProps = Benefit & {
  level?: string;
  id: number;
};

const BenefitAccordion = ({
  id,
  title,
  points,
  isOpened,
  progress,
  items,
  image,
  level,
}: BenefitAccordionProps) => {
  const loyaltyDetails = useAppSelector(selectLoyaltyDetails);

  const isCurrentLevel =
    loyaltyDetails?.level &&
    (level ? level === loyaltyDetails.level : id === loyaltyDetails.level);

  return (
    <AccordionItem value={`benefit-${id}`} className={cn("border-0 rounded-xl", isCurrentLevel && "ring-2 ring-amber-500/50 ring-offset-0 rounded-xl")}>
      <AccordionTrigger
        className={cn(
          'data-[state=open]:bg-base-725 bg-base-800 gap-3 data-[state=open]:border-base-725 xl:border xl:border-base-700 p-4 rounded-xl data-[state=open]:rounded-b-none transition-all duration-200 hover:bg-base-775',
          {
            'bg-gradient-to-r from-base-725 to-base-750':
              isCurrentLevel,
            '[&[data-state=open]_.benefit-image]:border [&[data-state=open]_.benefit-image]:border-base-600':
              !isOpened,
            'shadow-lg': isCurrentLevel,
          },
        )}
      >
        <BenefitHeading
          image={image}
          isOpened={isOpened}
          points={points}
          title={title}
        />
      </AccordionTrigger>
      <AccordionContent
        className={cn(
          'bg-base-725 px-4 pb-5 rounded-b-xl transition-all duration-200',
          {
            'bg-gradient-to-b from-base-725 to-base-750':
              isCurrentLevel,
          },
        )}
      >
        {progress && (
          <div className="mb-5 p-3 bg-base-800/50 rounded-lg border border-base-600">
            <BenefitProgress {...progress} />
          </div>
        )}

        <div className="border-t border-base-600 pt-4">
          {isCurrentLevel && (
            <div className="mb-4 p-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/20">
              <div className="flex items-center gap-2 text-sm text-amber-300">
                <span className="text-amber-400">⭐</span>
                <span className="font-medium">Your Current Level Benefits</span>
              </div>
            </div>
          )}

          <ul className="flex flex-col xl:flex-row gap-4">
            {items.map(({ id, ...item }) => (
              <li key={id} className="xl:grow">
                <BenefitItem {...item} />
              </li>
            ))}
          </ul>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default BenefitAccordion;
