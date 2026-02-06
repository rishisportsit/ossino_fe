import { useState } from 'react';
import BetTypeButton from '../../../shared/BetTypeButton';
import BetAccordion from './BetAccordion';
import BetFilters from './BetFilters';

interface BetSelection {
  id: string;
  betType: string;
  team: string;
  status: 'running' | 'won' | 'lost' | 'pending';
  date: string;
  time: string;
  match: string;
  odds: number;
  prediction: string;
}

interface MultipleBet {
  id: string;
  betId: string;
  status: 'accepted' | 'pending' | 'won' | 'lost';
  placedDate: string;
  placedTime: string;
  selections: BetSelection[];
  totalStake: number;
  estimatedPayout: number;
  cashoutAmount?: number;
  cashoutPercentage?: number;
}

const MyBetsContent = () => {
  const [activeBetType, setActiveBetType] = useState<'open' | 'history'>(
    'open',
  );
  const [showOnlyCashout, setShowOnlyCashout] = useState(false);
  const [expandedBets, setExpandedBets] = useState<Record<string, boolean>>({});

  // Mock data
  const multipleBets: MultipleBet[] = [
    {
      id: '1',
      betId: 'AAH84786',
      status: 'accepted',
      placedDate: '29 Aug',
      placedTime: '12:00',
      cashoutPercentage: 41,
      selections: [
        {
          id: '1',
          betType: '1x2',
          team: 'Juventus',
          status: 'running',
          date: '29 Aug',
          time: '10:50',
          match: 'Juventus - Como',
          odds: 4.7,
          prediction: 'Juventus, Italy',
        },
        {
          id: '2',
          betType: '1x2',
          team: 'Milan',
          status: 'running',
          date: '29 Aug',
          time: '10:45',
          match: 'Milan - Monza',
          odds: 1.81,
          prediction: 'Milan, Italy',
        },
        {
          id: '3',
          betType: '1x2',
          team: 'Milan',
          status: 'running',
          date: '29 Aug',
          time: '11:00',
          match: 'Milan - Monza',
          odds: 1.81,
          prediction: 'Milan, Italy',
        },
        {
          id: '4',
          betType: '1x2',
          team: 'Milan',
          status: 'running',
          date: '29 Aug',
          time: '11:30',
          match: 'Milan - Monza',
          odds: 1.81,
          prediction: 'Milan, Italy',
        },
      ],
      totalStake: 154.0,
      estimatedPayout: 2462.0,
      cashoutAmount: 1548.0,
    },
  ];

  const copyBetId = (betId: string) => {
    navigator.clipboard.writeText(betId);
  };

  const toggleBet = (betId: string) => {
    setExpandedBets((prev) => ({
      ...prev,
      [betId]: !prev[betId],
    }));
  };

  return (
    <div className="space-y-4">
      {/* Bet Type Tabs */}
      <div className="bg-base-700 rounded-lg p-0.5 mb-4">
        <div className="flex">
          <BetTypeButton
            label="Open Bets"
            isSelected={activeBetType === 'open'}
            onClick={() => setActiveBetType('open')}
          />
          <BetTypeButton
            label="Bet History"
            isSelected={activeBetType === 'history'}
            onClick={() => setActiveBetType('history')}
          />
        </div>
      </div>

      {/* Bet Filters */}
      <BetFilters
        activeBetType={activeBetType}
        showOnlyCashout={showOnlyCashout}
        onShowOnlyCashoutChange={setShowOnlyCashout}
      />

      {/* Multiple Bets */}
      {activeBetType === 'open' && (
        <div className="space-y-2">
          {multipleBets.map((bet) => (
            <BetAccordion
              key={bet.id}
              bet={bet}
              isExpanded={expandedBets[bet.id]}
              onToggle={toggleBet}
              onCopyBetId={copyBetId}
            />
          ))}
        </div>
      )}

      {/* Bet History */}
      {activeBetType === 'history' && (
        <div className="space-y-2">
          {multipleBets.map((bet) => (
            <BetAccordion
              key={bet.id}
              bet={bet}
              isExpanded={expandedBets[bet.id]}
              onToggle={toggleBet}
              onCopyBetId={copyBetId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBetsContent;
