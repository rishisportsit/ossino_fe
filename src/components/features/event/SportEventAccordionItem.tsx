import { useState } from 'react';

import type { BetData, SoccerBetData } from 'store/betEvent/types';

import { cn } from 'helpers/ui';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import LineBetBlockButton from './LineBetBlockButton';
import BetBlockButton from './BetBlockButton';

type Bet = BetData & {
  line: boolean;
};

type SportEventAccordionItemProps = SoccerBetData & {
  cols: number;
  showMore: boolean;
  titles?: string[];
  bets: Bet[];
};

const SportEventAccordionItem = ({
  type,
  name,
  bets,
  cols,
  showMore,
  titles,
}: SportEventAccordionItemProps) => {
  const [selectedBet, setSelectedBet] = useState<number | null>(null);
  return (
    <AccordionItem
      value={type}
      className="bg-base-750 px-5 rounded-xl border border-base-700"
    >
      <AccordionTrigger className="text-sm font-medium">
        {name}
      </AccordionTrigger>
      <AccordionContent
        className={showMore ? 'pb-2 flex flex-col items-center' : 'pb-5'}
      >
        <div
          className={cn('grid gap-3 w-full', {
            'mb-2': showMore,
          })}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {titles
            ? titles.map((title) => (
              <span key={title} className="text-sm text-base-400 text-center">
                {title}
              </span>
            ))
            : null}
          {bets.map(({ label, value, line, type, id }) => {
            const Comp = line ? LineBetBlockButton : BetBlockButton;
            return (
              <Comp
                key={type}
                label={label}
                value={value}
                selected={id === selectedBet}
                onClick={() => setSelectedBet(id)}
              />
            );
          })}
        </div>
        {showMore ? (
          <Button variant="text" className="flex items-center w-fit gap-2">
            Load more
            <Icon
              id="arrowDownIcon"
              href="/icons/arrowDown.svg"
              className="w-4 h-3 text-primary-1"
            />
          </Button>
        ) : null}
      </AccordionContent>
    </AccordionItem>
  );
};

export default SportEventAccordionItem;
