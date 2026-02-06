import { useNavigate } from 'react-router-dom';
import { type MouseEvent, useState } from 'react';

import { useAppDispatch } from 'store/index';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/shared/ui/Accordion';
import { setSelectedBetEvent } from 'store/betEvent/slice';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import LineBetBlock from '../event/LineBetBlockButton';
import Search from './Search';

type Bet = {
  date: string;
  total: number;
  name: string;
  variants: {
    label: string;
    value: number;
  }[];
};

const data = [
  {
    name: 'US Presidential Election 2024',
    bets: [
      {
        date: '04 Sep, 15:45',
        total: 2,
        name: 'Who will win presidential election?',
        variants: [
          {
            label: 'Donald Trump',
            value: 4.7,
          },
          {
            label: 'Kamala Harris',
            value: 2.05,
          },
          {
            label: 'FIELD (any others)',
            value: 2.05,
          },
        ],
      },
      {
        date: '04 Sep, 15:45',
        total: 8,
        name: 'What will Trump say at the debate?',
        variants: [
          {
            label: 'Abortion',
            value: 4.7,
          },
          {
            label: 'Border Czar',
            value: 2.05,
          },
          {
            label: 'Elon Musk',
            value: 2.05,
          },
        ],
      },
    ],
  },
];

const Bets = ({ date, total, name, variants }: Bet) => {
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setSelectedBetEvent({ type: 'politics' }));
    navigate('/sports/event');
  };
  return (
    <div className="px-3 py-4 border border-base-600 rounded-xl flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-xs">{date}</span>
        <div className="rounded-full px-2 h-5 flex items-center bg-base-600">
          <span className="text-secondary-2 text-xs">+{total}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="font-medium text-xs text-start"
      >
        {name}
      </button>
      <div className="flex flex-col gap-2">
        {variants.map(({ label, value }) => {
          return (
            <LineBetBlock
              key={label}
              label={label}
              value={value}
              selected={label === selectedBet}
              onClick={() => setSelectedBet(label)}
            />
          );
        })}
      </div>
    </div>
  );
};

const UpcomingTabContent = () => {
  return (
    <>
      <Search />
      <Accordion type="multiple" className="flex flex-col gap-4">
        {data.map(({ name, bets }) => {
          return (
            <AccordionItem
              key={name}
              value={name}
              className="bg-base-775 px-4 rounded-xl shadow-elevation"
            >
              <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-xs font-medium">
                {name}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col items-center pb-2">
                <div className="flex flex-col gap-4 w-full mb-2">
                  {bets.map((bet) => {
                    return <Bets key={bet.name} {...bet} />;
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

export default UpcomingTabContent;
