import type { BetData, BetSelectData } from 'store/betEvent/types';

import MatchDetails from './MatchDetails';

type Data = {
  id: number;
  date: string;
  live?: boolean;
  teams: string[];
  total: number;
  bets: (BetData | BetSelectData)[];
};

const data: Data[] = [
  {
    id: 1,
    date: '04 Sep, 15:45',
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
    date: '06 Sep, 10:20',
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
];

const MatchesDailyTabContent = () => {
  return (
    <div className="flex flex-col gap-3 bg-base-775 p-4 rounded-xl">
      {data.map((item) => {
        return <MatchDetails key={item.id} {...item} />;
      })}
    </div>
  );
};

export default MatchesDailyTabContent;
