import type { BetData, SoccerBetData } from 'store/betEvent/types';

import { Accordion } from 'components/shared/ui/Accordion';
import Search from './Search';
import SportEventAccordionItem from './SportEventAccordionItem';

type Bet = BetData & {
  line: boolean;
};

type Data = SoccerBetData & {
  cols: number;
  showMore: boolean;
  titles?: string[];
  bets: Bet[];
};

const data: Data[] = [
  {
    id: 1,
    name: 'Match results',
    type: 'match_results',
    cols: 3,
    showMore: false,
    bets: [
      {
        id: 1,
        label: 'AC Milan',
        value: 4.7,
        type: 'ac_milan',
        line: false,
      },
      {
        id: 2,
        label: 'Draw',
        value: 3.75,
        type: 'draw',
        line: false,
      },
      {
        id: 3,
        label: 'AC Roma',
        value: 1.81,
        type: 'ac_roma',
        line: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Draw No Bet',
    type: 'draw_no_bet',
    cols: 2,
    showMore: false,
    bets: [
      {
        id: 1,
        label: 'AC Milan',
        value: 4.7,
        type: 'ac_milan',
        line: false,
      },
      {
        id: 2,
        label: 'AC Roma',
        value: 1.81,
        type: 'ac_roma',
        line: false,
      },
    ],
  },
  {
    id: 3,
    name: 'First Goal',
    type: 'first_goal',
    cols: 3,
    showMore: false,
    bets: [
      {
        id: 1,
        label: 'AC Milan',
        value: 4.7,
        type: 'ac_milan',
        line: false,
      },
      {
        id: 2,
        label: 'None',
        value: 3.75,
        type: 'ac_milan',
        line: false,
      },
      {
        id: 3,
        label: 'AC Roma',
        value: 1.81,
        type: 'ac_roma',
        line: false,
      },
    ],
  },
  {
    id: 4,
    name: 'Last Goal',
    type: 'last_goal',
    cols: 3,
    showMore: false,
    bets: [
      {
        id: 1,
        label: 'AC Milan',
        value: 4.7,
        type: 'ac_milan',
        line: false,
      },
      {
        id: 2,
        label: 'None',
        value: 3.75,
        type: 'ac_milan',
        line: false,
      },
      {
        id: 3,
        label: 'AC Roma',
        value: 1.81,
        type: 'ac_roma',
        line: false,
      },
    ],
  },
  {
    id: 5,
    name: 'First GoalScorer',
    type: 'first_goalscorer',
    cols: 2,
    showMore: true,
    bets: [
      {
        id: 1,
        label: 'Vesga, M',
        value: 4.7,
        type: 'vesga_u',
        line: true,
      },
      {
        id: 2,
        label: 'Gomez, U',
        value: 3.75,
        type: 'gomez_u',
        line: true,
      },
      {
        id: 3,
        label: 'Vivian, D',
        value: 4.7,
        type: 'vivian_d',
        line: true,
      },
      {
        id: 4,
        label: 'Williams, I',
        value: 3.75,
        type: 'williams_i',
        line: true,
      },
    ],
  },
  {
    id: 6,
    name: 'Correct Score',
    type: 'correct_score',
    cols: 3,
    showMore: false,
    bets: [
      {
        id: 1,
        label: '0:1',
        value: 4.7,
        type: '0_1',
        line: true,
      },
      {
        id: 2,
        label: '0:2',
        value: 3.75,
        type: '0_2',
        line: true,
      },
      {
        id: 3,
        label: '0:3',
        value: 4.7,
        type: '0_3',
        line: true,
      },
      {
        id: 4,
        label: '0:4',
        value: 4.7,
        type: '0_4',
        line: true,
      },
      {
        id: 5,
        label: '0:5',
        value: 4.7,
        type: '0_5',
        line: true,
      },
      {
        id: 6,
        label: '0:6',
        value: 4.7,
        type: '0_6',
        line: true,
      },
    ],
  },
  {
    id: 7,
    name: 'Correct score',
    type: 'correct_score2',
    cols: 2,
    showMore: true,
    titles: ['Over', 'Under'],
    bets: [
      {
        id: 1,
        label: '+1.0',
        value: 4.7,
        type: 'plus_1_0',
        line: true,
      },
      {
        id: 2,
        label: '-1.0',
        value: 3.75,
        type: 'minus_1_0',
        line: true,
      },
      {
        id: 3,
        label: '+0.5',
        value: 3.75,
        type: 'plus_0_5',
        line: true,
      },
      {
        id: 4,
        label: '-0.5',
        value: 3.75,
        type: 'minus_0_5',
        line: true,
      },
    ],
  },
];

const SportEventLiveTabContent = () => {
  return (
    <>
      <Search />
      <Accordion type="multiple" className="flex flex-col gap-3">
        {data.map((item) => {
          return <SportEventAccordionItem key={item.id} {...item} />;
        })}
      </Accordion>
    </>
  );
};

export default SportEventLiveTabContent;
