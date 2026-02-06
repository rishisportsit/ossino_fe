import { useState } from 'react';
import { cn } from 'helpers/ui';
import styles from './Accordion.module.css';
import Icon from 'components/shared/Icon';
import searchIcon from '/icons/searchNormal.svg?url';
import close from '/icons/close.svg?url';
import MarketSelector from './MarketSelector';

interface MarketTab {
  id: string;
  name: string;
}

interface BettingMarket {
  id: string;
  name: string;
  isExpanded: boolean;
  options: {
    id: string;
    name: string;
    odds: number;
  }[];
}

interface BetslipDashboardProps {
  className?: string;
}

const BetslipDashboard = ({ className = '' }: BetslipDashboardProps) => {
  const [selectedTab, setSelectedTab] = useState<string>('all-markets');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMarkets, setExpandedMarkets] = useState<Record<string, boolean>>({});
  const [selectedBets, setSelectedBets] = useState<Record<string, boolean>>({});

  const marketTabs: MarketTab[] = [
    { id: 'all-markets', name: 'All Markets' },
    { id: 'main-markets', name: 'Main Markets' },
    { id: 'bet-builder', name: 'Bet Builder' },
    { id: 'players', name: 'Players' },
    { id: 'goals', name: 'Goals' },
    { id: 'corners', name: 'Corners' },
  ];

  const bettingMarkets: BettingMarket[] = [
    {
      id: 'match-results',
      name: 'Match Results',
      isExpanded: true,
      options: [
        { id: 'milan', name: 'AC Milan', odds: 4.70 },
        { id: 'draw', name: 'Draw', odds: 3.75 },
        { id: 'roma', name: 'AC Roma', odds: 1.81 },
      ]
    },
    {
      id: 'draw-no-bet',
      name: 'Draw No Bet',
      isExpanded: true,
      options: [
        { id: 'milan-dnb', name: 'AC Milan', odds: 3.75 },
        { id: 'roma-dnb', name: 'AC Roma', odds: 1.81 },
      ]
    },
    {
      id: 'first-goal',
      name: 'First Goal',
      isExpanded: true,
      options: [
        { id: 'milan-first', name: 'AC Milan', odds: 4.70 },
        { id: 'none-first', name: 'None', odds: 3.75 },
        { id: 'roma-first', name: 'AC Roma', odds: 1.81 },
      ]
    },
    {
      id: 'last-goal',
      name: 'Last Goal',
      isExpanded: true,
      options: [
        { id: 'milan-last', name: 'AC Milan', odds: 4.70 },
        { id: 'none-last', name: 'None', odds: 3.75 },
        { id: 'roma-last', name: 'AC Roma', odds: 1.81 },
      ]
    },
    {
      id: 'first-goalscorer',
      name: 'First GoalScorer',
      isExpanded: true,
      options: [
        { id: 'vesga', name: 'Vesga, M', odds: 4.70 },
        { id: 'gomez', name: 'Gomez, U', odds: 4.70 },
        { id: 'vivian', name: 'Vivian, D', odds: 4.70 },
        { id: 'williams', name: 'Williams, I', odds: 4.70 },
      ]
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const filteredMarkets = bettingMarkets.filter(market => {
    const matchesSearch = market.name?.toLowerCase().includes(searchQuery?.toLowerCase());
    
    switch (selectedTab) {
      case 'all-markets':
        return matchesSearch;
      case 'main-markets':
        return matchesSearch && ['match-results', 'draw-no-bet'].includes(market.id);
      case 'bet-builder':
        return matchesSearch && ['first-goal', 'last-goal'].includes(market.id);
      case 'players':
        return matchesSearch && market.id === 'first-goalscorer';
      case 'goals':
        return matchesSearch && ['first-goal', 'last-goal', 'first-goalscorer'].includes(market.id);
      case 'corners':
        return matchesSearch && false;
      default:
        return matchesSearch;
    }
  });

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleMarket = (marketId: string) => {
    setExpandedMarkets(prev => ({
      ...prev,
      [marketId]: !prev[marketId]
    }));
  };

  const handleBetSelection = (marketId: string, optionId: string) => {
    const betKey = `${marketId}-${optionId}`;
    setSelectedBets(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        if (key.startsWith(`${marketId}-`)) {
          newState[key] = false;
        }
      });
      
      if (!prev[betKey]) {
        newState[betKey] = true;
      }
      
      return newState;
    });
  };

  return (
    <div className={`${className}`}>
      {/* Market Tabs */}
      <div className="mb-6">
        <MarketSelector
          markets={marketTabs}
          selectedMarket={selectedTab}
          onMarketChange={setSelectedTab}
        />
      </div>

      {/* Search Field */}
      <div className="mb-6">
        <div className="relative">
          <span className="absolute transform translate-y-1/2 w-5 h-5 left-3.5">
            <Icon
              id="searchNormalIcon"
              href={searchIcon}
              className="fill-base-500"
            />
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute transform translate-y-1/2 w-5 h-5 right-3.5 bg-base-620 rounded-full"
            >
              <Icon
                id="closeIcon"
                href={close}
                className="fill-1"
              />
            </button>
          )}
          <input
            placeholder="Filter Markets"
            className="h-10 rounded-lg bg-base-700 z-0 outline-0 w-full px-10 body-txtColor-1 placeholder-base-400"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Betting Markets Accordions */}
      <div className="space-y-2">
        {filteredMarkets.length > 0 ? (
          filteredMarkets.map((market) => (
          <div key={market.id} className="bg-base-750 border border-base-680 rounded-xl overflow-hidden">
            {/* Market Header */}
            <button
              onClick={() => toggleMarket(market.id)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-base-700 transition-colors"
            >
              <span className="body-txtColor-1 font-medium">{market.name}</span>
              <div 
                className={cn(styles.chevron, expandedMarkets[market.id] && styles.chevronExpanded)}
              />
            </button>

            {/* Market Content */}
            <div 
              className={cn(styles.content, expandedMarkets[market.id] && styles.contentExpandedSmall)}
            >
              <div className="px-4 pb-4">
                <div className={market.id === 'first-goalscorer' ? 'grid grid-cols-2 gap-2' : 'flex gap-2 flex-wrap'}>
                  {market.options.map((option) => {
                    const betKey = `${market.id}-${option.id}`;
                    const isSelected = selectedBets[betKey];
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleBetSelection(market.id, option.id)}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          market.id === 'first-goalscorer' ? 'min-w-0' : 'min-w-0 flex-1'
                        } ${
                          isSelected 
                            ? 'bg-secondary-light-5 hover:bg-secondary-light-7' 
                            : 'bg-base-800 hover:bg-base-700'
                        }`}
                      >
                        <span className={`text-sm ${isSelected ? 'body-txtColor-2' : 'text-base-400'}`}>
                          {option.name}
                        </span>
                        <span className={`font-medium ${isSelected ? 'body-txtColor-2' : 'body-txtColor-1'}`}>
                          {option.odds}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-base-400 text-sm">No markets found</div>
            <div className="text-base-500 text-xs mt-1">Try a different search term</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BetslipDashboard;
