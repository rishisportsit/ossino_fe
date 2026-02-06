import { useState } from 'react';

import type { BetData } from 'store/betEvent/types';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import LineBetBlockButton from './LineBetBlockButton';

type PoliticEventAccordionItemProps = {
  name: string;
  type: string;
  bets: BetData[];
};

const PoliticEventAccordionItem = ({
  type,
  name,
  bets,
}: PoliticEventAccordionItemProps) => {
  const [selectedBet, setSelectedBet] = useState<number | null>(null);
  return (
    <AccordionItem
      value={type}
      className="bg-base-750 px-5 rounded-xl border border-base-700"
    >
      <AccordionTrigger className="text-xs font-medium">
        {name}
      </AccordionTrigger>
      <AccordionContent className="pb-5 flex flex-col gap-2">
        {bets.map(({ label, value, id }) => {
          return (
            <LineBetBlockButton
              key={id}
              label={label}
              value={value}
              selected={id === selectedBet}
              onClick={() => setSelectedBet(id)}
            />
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};

export default PoliticEventAccordionItem;
