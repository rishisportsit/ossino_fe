import { cn } from 'helpers/ui';

import styles from './index.module.css';

interface MatchOfTheDayProps {
  matchDate: string;
  leftTeam: {
    name: string;
    icon: string;
  };
  rightTeam: {
    name: string;
    icon: string;
  };
  leftCoefficient: number;
  rightCoefficient: number;
}

const MatchOfTheDay = ({ 
  matchDate, 
  leftTeam, 
  rightTeam, 
  leftCoefficient, 
  rightCoefficient 
}: MatchOfTheDayProps) => {
  const middleCoefficient = ((leftCoefficient + rightCoefficient) / 2).toFixed(2);

  return (
    <div
      className={cn(
        'rounded-xl px-4 py-4 relative overflow-hidden w-[340px] h-[160px]',
        styles['bg-gradient'],
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="banner-bg banner-textColor px-3 h-6 rounded-full text-xs font-medium flex items-center">
          Match of the day
        </div>
        <div 
          className="banner-textColor-1 px-3 h-6 rounded-full text-xs flex items-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(40px)'
          }}
        >
          {matchDate}
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <div 
            className="w-[26px] h-[26px] rounded-full background-1 flex items-center justify-center"
            style={{
              backgroundImage: 'url(/images/sports/promotions/MatchOfTheDay/teamBg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <img
              src={leftTeam.icon}
              alt={leftTeam.name}
              className="object-contain"
            />
          </div>
          <span className="banner-textColor-1 font-[900] text-xl ">{leftTeam.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <div 
            className="w-[26px] h-[26px] rounded-full background-1 flex items-center justify-center"
            style={{
              backgroundImage: 'url(/images/sports/promotions/MatchOfTheDay/teamBg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <img
              src={rightTeam.icon}
              alt={rightTeam.name}
              className="object-contain"
            />
          </div>
          <span className="banner-textColor-1 font-[900] text-xl ">{rightTeam.name}</span>
        </div>
      </div>

      {/* Betting odds */}
      <div className="flex gap-2">
        <button 
          className="banner-textColor-1 px-3 py-2 text-sm font-medium flex-1"
          style={{
            borderRadius: '8px',
            backdropFilter: 'blur(35px)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
          }}
        >
          1 <span className="font-bold">{leftCoefficient}</span>
        </button>
        <button 
          className="banner-textColor-1 px-3 py-2 text-sm font-medium flex-1"
          style={{
            borderRadius: '8px',
            backdropFilter: 'blur(35px)',
            backgroundColor: '#141414'
          }}
        >
          <span style={{ color: '#7F7F7F' }}>X</span> <span className="font-bold">{middleCoefficient}</span>
        </button>
        <button 
          className="banner-textColor-1 px-3 py-2 text-sm font-medium flex-1"
          style={{
            borderRadius: '8px',
            backdropFilter: 'blur(35px)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
          }}
        >
          2 <span className="font-bold">{rightCoefficient}</span>
        </button>
      </div>

    </div>
  );
};

export default MatchOfTheDay;
