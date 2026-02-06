import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { BetData, BetSelectData } from 'store/betEvent/types';
import { useAppDispatch } from 'store/index';
import { setSelectedBetEvent } from 'store/betEvent/slice';

import { cn } from 'helpers/ui';
import Icon from 'components/shared/Icon';
import BetBlockSelect from '../event/BetBlockSelect';
import BetBlockButton from '../event/BetBlockButton';

type MatchDetailsProps = {
  live?: boolean;
  date: string;
  teams: string[];
  total: number;
  bets: (BetData | BetSelectData)[];
};

const MatchDetails = ({
  date,
  teams,
  total,
  bets,
  live,
}: MatchDetailsProps) => {
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(
      setSelectedBetEvent({
        type: 'soccer',
      }),
    );
    navigate('/sports/event');
  };

  return (
    <div className="border border-borderdefault py-4 px-3 rounded-xl flex flex-col gap-3">
      <div className="flex justify-between">
        {live ? (
          <div className="flex items-center">
            <div className="px-2 h-5 text-xs font-medium flex items-center rounded-full bg-status-error-200 mr-2">
              Live
            </div>
            <Icon
              id="timerIcon"
              href="/icons/timer.svg"
              className="body-txtColor-1 size-5 mr-1"
            />
            <span className="text-xs">{date}</span>
          </div>
        ) : (
          <span className="text-xs">{date}</span>
        )}
        <Icon id="chartIcon" href="/icons/chart.svg" className="size-5 text-primary-1 fill-current" />
      </div>
      <div className="flex justify-between">
        <button
          onClick={onClick}
          type="button"
          className="flex items-center gap-2"
        >
          {teams.map((team, index) => {
            return (
              <div
                key={team}
                className={cn(
                  'flex items-center gap-2',
                  index === 0 ? 'order-1' : 'order-3',
                )}
              >
                <img
                  src="/images/sports/hotMultis/MonzaFC.png"
                  alt=""
                  className="w-3 h-4"
                />
                <span className="text-xs">{team}</span>
              </div>
            );
          })}
          <span className="text-xs font-medium order-2">2:0</span>
        </button>
        <div className="px-2 h-5 rounded-xl bg-base-700 flex items-center">
          <span className="text-secondary-2 text-xs">+{total}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {bets.map(({ value, label }) => {
          return Array.isArray(value) ? (
            <BetBlockSelect key={label} label={label} values={value} />
          ) : (
            <BetBlockButton
              selected={label === selectedBet}
              onClick={() => setSelectedBet(label)}
              key={label}
              value={value}
              label={label}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MatchDetails;
