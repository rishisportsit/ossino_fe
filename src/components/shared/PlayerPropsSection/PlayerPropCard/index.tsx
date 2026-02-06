import { useNavigate } from 'react-router-dom';

import { Button } from 'components/shared/ui/Button';
import type { PlayerPropCardProps } from '../types';

const PlayerPropCard = ({
  homeTeam,
  awayTeam,
  matchTime,
  peopleBet,
  player,
  betType,
  odds,
}: PlayerPropCardProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/sports/betslip');
  };

  return (
    <div className="w-[204px] h-[290px] flex flex-col gradient-player-prop rounded-[12px] border border-base-700 relative overflow-hidden">
      {/* Player Image */}
      <img
        src={player.avatar}
        alt={player.name}
        className="absolute inset-x-0 bottom-12 w-full h-[65%] object-contain z-0"
      />

      {/* Gradient overlay on player image */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black to-transparent z-10"></div>

      <div className="p-4 relative z-20 flex flex-col h-full">
        {/* Match Info Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-7 h-7 background-1 rounded-full flex items-center justify-center relative z-0">
                <img
                  src="/images/sports/playerProps/Ellipse.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                />
                <img
                  src={homeTeam.logo}
                  alt={homeTeam.name}
                  className="w-5 h-5 object-contain relative z-10"
                />
              </div>
              <div className="w-7 h-7 background-1 rounded-full flex items-center justify-center relative -ml-1 z-10">
                <img
                  src="/images/sports/playerProps/Ellipse.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                />
                <img
                  src={awayTeam.logo}
                  alt={awayTeam.name}
                  className="w-5 h-5 object-contain relative z-10"
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="body-txtColor-1 text-10px font-medium">{matchTime}</div>
            <div className="text-secondary-light-2 text-10px font-medium">
              {peopleBet} People Bet
            </div>
          </div>
        </div>

        {/* Spacer to push bet type and button to bottom */}
        <div className="flex-grow"></div>

        {/* Bet Type */}
        <div className="text-left mb-2">
          <div className="body-txtColor-1 text-xs font-medium leading-normal">
            {betType.type} {betType.value} - {betType.playerName} 
            <div>{betType.stat}</div>
          </div>
        </div>

        {/* Odds Button */}
        <div className="mt-auto">
          <Button onClick={onClick} size="sm" className="w-full btn-textColor">
            {odds}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPropCard;
