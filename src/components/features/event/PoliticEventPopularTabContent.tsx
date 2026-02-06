import type { BetData } from 'store/betEvent/types';

import { Accordion } from 'components/shared/ui/Accordion';
import Search from './Search';
import PoliticEventAccordionItem from './PoliticEventAccordionItem';

type Data = {
  id: number;
  name: string;
  type: string;
  bets: BetData[];
};

const data: Data[] = [
  {
    id: 1,
    name: 'Who will win presidential election?',
    type: 'who_will_win',
    bets: [
      {
        id: 1,
        label: 'Donald Trump',
        value: 4.7,
        type: 'donald_trump',
      },
      {
        id: 2,
        label: 'Kamala Harris',
        type: 'kamala_harris',
        value: 4.7,
      },
      {
        id: 3,
        label: 'FIELD (any others)',
        type: 'any_others',
        value: 4.7,
      },
    ],
  },
  {
    id: 2,
    name: 'What will Trump say at the debate?',
    type: 'what_will_say',
    bets: [
      {
        id: 1,
        label: 'Abortion',
        type: 'abortion',
        value: 4.7,
      },
      {
        id: 2,
        label: 'Border Czar',
        type: 'border_czar',
        value: 4.7,
      },
      {
        id: 3,
        label: 'Elon Musk',
        type: 'elon_musk',
        value: 4.7,
      },
    ],
  },
];

const PoliticEventPopularTabContent = () => {
  return (
    <>
      <Search />
      <Accordion type="multiple" className="flex flex-col gap-3">
        {data.map((item) => {
          return <PoliticEventAccordionItem key={item.id} {...item} />;
        })}
      </Accordion>
    </>
  );
};

export default PoliticEventPopularTabContent;
