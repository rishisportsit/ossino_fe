import { cn } from 'helpers/ui';

interface MatchCardProps {
  league: {
    name: string;
    flag: string;
    logo: string;
  };
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  matchTime: string;
  matchDate: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  selectedOdds?: 'home' | 'draw' | 'away';
}

const MatchCard = ({
  league,
  homeTeam,
  awayTeam,
  matchTime,
  matchDate,
  odds,
  selectedOdds
}: MatchCardProps) => {
  return (
    <div className="bg-base-800 rounded-lg p-4 w-[280px] h-[140px] flex flex-col">
      {/* League Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img
            src={league.flag}
            alt={league.name}
            className="w-4 h-3"
          />
          <span className="body-txtColor-1 text-sm font-medium">{league.name}</span>
        </div>
        <img
          src={league.logo}
          alt={league.name}
          className="w-4 h-4"
        />
      </div>

      {/* Match Details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full background-1 flex items-center justify-center">
            <img
              src={homeTeam.logo}
              alt={homeTeam.name}
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="body-txtColor-1 text-sm font-medium">{homeTeam.name}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="body-txtColor-1 text-sm font-medium">{matchTime}</span>
          <span className="text-base-400 text-xs">{matchDate}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="body-txtColor-1 text-sm font-medium">{awayTeam.name}</span>
          <div className="w-8 h-8 rounded-full background-1 flex items-center justify-center">
            <img
              src={awayTeam.logo}
              alt={awayTeam.name}
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Betting Odds */}
      <div className="flex gap-2">
        <button 
          className={cn(
            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
            selectedOdds === 'home' 
              ? "bg-green-500 body-txtColor-1" 
              : "bg-base-700 body-txtColor-1 hover:bg-base-600"
          )}
        >
          1 <span className="font-bold">{odds.home}</span>
        </button>
        <button 
          className={cn(
            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
            selectedOdds === 'draw' 
              ? "bg-red-500 body-txtColor-1" 
              : "bg-base-700 body-txtColor-1 hover:bg-base-600"
          )}
        >
          <span style={{ color: '#7F7F7F' }}>X</span> <span className="font-bold">{odds.draw}</span>
        </button>
        <button 
          className={cn(
            "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
            selectedOdds === 'away' 
              ? "bg-green-500 body-txtColor-1" 
              : "bg-base-700 body-txtColor-1 hover:bg-base-600"
          )}
        >
          2 <span className="font-bold">{odds.away}</span>
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
