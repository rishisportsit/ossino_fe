import type { BetData, BetSelectData } from 'store/betEvent/types';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import Search from './Search';
import MatchDetails from './MatchDetails';

type Match = {
  id: number;
  date: string;
  live?: boolean;
  teams: string[];
  total: number;
  bets: (BetData | BetSelectData)[];
};

type Data = {
  id: number;
  name: string;
  matches: Match[];
};

const data: Data[] = [
  {
    id: 1,
    name: 'International clubs / UEFA Champions League',
    matches: [
      {
        id: 1,
        date: '2H 45:34',
        live: true,
        teams: ['Milan FC', 'Monza FC'],
        total: 186,
        bets: [
          {
            id: 1,
            label: 'Goals',
            value: [2, 3, 4],
            type: 'goals',
          },
          {
            id: 2,
            label: 'Over',
            value: 1.81,
            type: 'over',
          },
          {
            id: 3,
            label: 'Under',
            value: 1.81,
            type: 'under',
          },
        ],
      },
      {
        id: 2,
        date: '2H 45:34',
        live: true,
        teams: ['Milan FC', 'Monza FC'],
        total: 186,
        bets: [
          {
            id: 1,
            label: 'Goals',
            value: [2, 3, 4],
            type: 'goals',
          },
          {
            id: 2,
            label: 'Over',
            value: 1.81,
            type: 'over',
          },
          {
            id: 3,
            label: 'Under',
            value: 1.81,
            type: 'under',
          },
        ],
      },
    ],
  },
];

const LiveTabContent = () => {
  return (
    <>
      <Search />
      <Accordion type="multiple" className="flex flex-col gap-4">
        {data.map(({ name, matches, id }) => {
          return (
            <AccordionItem
              key={id}
              value={name}
              className="bg-base-775 px-4 rounded-xl xl:bg-base-735 shadow-elevation"
            >
              <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-xs font-medium">
                {name}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col items-center pb-2">
                <div className="flex flex-col gap-3 mb-2 w-full">
                  {matches.map((match) => {
                    return <MatchDetails key={match.id} {...match} />;
                  })}
                </div>
                <Button
                  variant="text"
                  className="flex items-center w-fit gap-2"
                >
                  Load more
                  <Icon
                    id="arrowDownIcon"
                    href="/icons/arrowDown.svg"
                    className="w-4 h-3 text-primary-1"
                  />
                </Button>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default LiveTabContent;
