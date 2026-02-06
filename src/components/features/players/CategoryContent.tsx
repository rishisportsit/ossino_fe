import { useState } from 'react';

import { cn } from 'helpers/ui';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
import Select from 'components/shared/Select';

type Bet = {
  id: number;
  league: string;
  time: string;
  teams: { id: number; href: string }[];
  player: string;
  value: number;
};

type CategoryContentProps = {
  name: string;
  bets: Bet[];
  withTitle?: boolean;
};

const CategoryContent = ({
  name,
  bets,
  withTitle = false,
}: CategoryContentProps) => {
  const [selectedBet, setSelectedBet] = useState<number | null>(null);
  const [selectedOverUnder, setSelectedOverUnder] = useState<string>('2.5');
  
  const isPlayerAssists = name === 'Player Assists';
  
  // Mock dropdown options for Over/Under
  const overUnderOptions = ['1.5', '2.5', '3.5', '4.5'];
  
  return (
    <div className="flex flex-col items-center">
      {withTitle ? <p className="mb-3 w-full">{name}</p> : null}
      <div className="flex flex-col gap-2 rounded-xl w-full">
        {bets.map(({ id, league, player, teams, time, value }) => {
          return (
            <div
              key={id}
              className="p-3 rounded-xl flex flex-col gap-2 xl:border xl:border-borderdefault bg-base-800"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {teams.map(({ id, href }, index) => {
                    return (
                      <div
                        key={id}
                        className={cn(
                          'w-7 h-7 background-1 rounded-full flex items-center justify-center relative',
                          index === 0 ? 'z-0' : '-ml-1 z-10',
                        )}
                      >
                        <img
                          src="/images/sports/playerProps/Ellipse.png"
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover rounded-full"
                        />
                        <img
                          src={href}
                          alt=""
                          className="w-5 h-5 object-contain relative z-10"
                        />
                      </div>
                    );
                  })}
                </div>
                <span className="text-base-400 text-xs">{league}</span>
                <span className="text-xs">{time}</span>
              </div>
              <div className="flex justify-between items-center gap-3">
                <p className="text-xs font-medium flex-1">{player}</p>
                
                {isPlayerAssists ? (
                  <div className="flex gap-2">
                    {/* Dropdown for Over/Under selection */}
                    <Select
                      className="bg-base-680 body-txtColor-1 text-sm rounded-lg border-0 h-9 flex items-center justify-center w-20"
                      dropDownClassName="bg-base-680 body-txtColor-1"
                      withChevron
                      chevronClassName="!bg-inherit"
                      closeOnClick
                      usePortal
                      list={
                        <div className="p-2 space-y-1">
                          {overUnderOptions.map((option) => (
                            <div
                              key={option}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOverUnder(option);
                              }}
                              className={cn(
                                'px-2 py-1 hover:bg-base-690 rounded cursor-pointer',
                                selectedOverUnder === option && 'bg-base-690'
                              )}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      }
                    >
                      <span className="flex items-center justify-center w-full text-center">
                        {selectedOverUnder}
                      </span>
                    </Select>
                    
                    {/* Over button */}
                    <button
                      type="button"
                      className={cn(
                        'w-20 h-9 rounded-lg flex items-center justify-center text-xs font-medium',
                        id === selectedBet && selectedBet !== null
                          ? 'bg-secondary-2 text-base-900'
                          : 'bg-base-680 body-txtColor-1 hover:bg-base-690',
                      )}
                      onClick={() => setSelectedBet(id)}
                    >
                      {value}
                    </button>
                    
                    {/* Under button */}
                    <button
                      type="button"
                      className={cn(
                        'w-20 h-9 rounded-lg flex items-center justify-center text-xs font-medium',
                        'bg-base-680 body-txtColor-1 hover:bg-base-690',
                      )}
                      onClick={() => setSelectedBet(id)}
                    >
                      {(value + 0.3).toFixed(1)}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      'test w-24 h-9 rounded-xl flex items-center justify-center text-xs font-medium',
                      id === selectedBet
                        ? 'bg-secondary-2 text-base-900'
                        : 'bg-base-700 ',
                    )}
                    onClick={() => setSelectedBet(id)}
                  >
                    {value}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Button variant="text" className="flex items-center w-fit gap-2">
        Load more
        <Icon
          id="arrowDownIcon"
          href="/icons/arrowDown.svg"
          className="w-4 h-3 text-primary-1"
        />
      </Button>
    </div>
  );
};

export default CategoryContent;
