import { useState, useEffect } from 'react';
import { Switch } from 'components/shared/ui/Switch';
import StakeControl from './StakeControl';
import Icon from 'components/shared/Icon';
import rocketIcon from '/icons/rocet.svg?url';

interface BetType {
  id: string;
  name: string;
  combinations: number;
  stake: number;
}

interface BetslipControlsProps {
  stake: number;
  onStakeChange?: (value: number) => void;
  onPlaceBet?: () => void;
  variant?: 'standard' | 'system';
  betTypes?: BetType[];
  totalOdds?: number;
  bonusPercentage?: number;
  
}

const BetslipControls = ({ stake, onStakeChange, onPlaceBet, variant = 'standard', betTypes }: BetslipControlsProps) => {

  const defaultBetTypes: BetType[] = [
    { id: 'playAll', name: 'Play All', combinations: 0, stake },
    { id: 'singles', name: 'Singles', combinations: 2, stake },
    { id: 'doubles', name: 'Doubles', combinations: 1, stake },
  ];

  const activeBetTypes = betTypes || defaultBetTypes;
  
  const [betTypeStakes, setBetTypeStakes] = useState<Record<string, number>>(() => {
    const initialStakes: Record<string, number> = {};
    activeBetTypes.forEach(betType => {
      initialStakes[betType.id] = betType.stake || stake;
    });
    return initialStakes;
  });

  useEffect(() => {
    setBetTypeStakes(prev => {
      const updated: Record<string, number> = {};
      activeBetTypes.forEach(betType => {
        updated[betType.id] = prev[betType.id] ?? betType.stake ?? stake;
      });
      return updated;
    });
  }, [stake, activeBetTypes]);

  const updateBetTypeStake = (betTypeId: string, value: number) => {
    setBetTypeStakes(prev => ({
      ...prev,
      [betTypeId]: value
    }));
  };

  const totalStake = Object.values(betTypeStakes).reduce((sum, stakeValue) => sum + (stakeValue || 0), 0);
  return (
    <>
      <div className="bg-base-725 rounded-lg p-4 lg:-mx-4 lg:-mb-4 lg:mt-4 shadow-[0_-6px_12px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Switch defaultChecked aria-label="Odds Change" />
            <span className="text-xs font-regular body-txtColor-1 ml-2">Odds Change</span>
          </div>
          {/* <button className="flex items-center gap-1 px-3 h-7 bg-base-700 text-special-2 rounded text-xs font-medium">
            Get x2.5
             <Icon
                 id="rocketIcon"
                  href={rocketIcon}
                  className="w-4 h-4 fill-current text-primary-1"
                          />
          </button> */}
        </div>

        {/* Divider */}
        <div className="border-t border-base-600 my-4"></div>

        {variant === 'system' ? (
          <>
            <div className="bg-base-700 rounded-lg p-3 mb-4">
              <div className="grid [grid-template-columns:1.2fr_1fr_1.6fr] text-xs text-base-300 mb-2 pb-2 border-b border-base-600">
                <span className="font-medium">Type</span>
                <span className="font-medium">Com</span>
                <span className="font-medium">Stake</span>
              </div>
              <div className="space-y-2">
                {activeBetTypes.map((betType) => (
                  <div key={betType.id} className="grid [grid-template-columns:1.2fr_1fr_1.6fr] items-center text-sm body-txtColor-1">
                    <span className="font-normal">{betType.name}</span>
                    <span className="font-normal ml-2">
                      {betType.combinations === 0 ? '-' : betType.combinations}
                    </span>
                    <div className="flex items-center justify-end">
                      <StakeControl 
                        value={betTypeStakes[betType.id] || 0} 
                        // onChange={(value) => updateBetTypeStake(betType.id, value)} 
                        showQuickAdd={false} 
                        containerClassName="bg-base-725"
                        inputWidth="w-10"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-base-300">Total Stake</span>
                <span className="text-sm font-medium text-secondary-light-1">{totalStake.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-base-300">Est. Payout</span>
                <div className="flex items-center">
                  <img src="/icons/tether.svg" alt="Tether" className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium text-secondary-light-1">756.00</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-base-300">Total Odds</span>
              <span className="text-sm font-medium text-secondary-light-1">6.52</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-base-300">Total Stake</span>
              <span className="text-sm font-medium text-secondary-light-1">154.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-base-300">Est. Payout</span>
              <div className="flex items-center">
                <img src="/icons/tether.svg" alt="Tether" className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium text-secondary-light-1">262.00</span>
              </div>
            </div>
          </div>
        )}

        {/* Stake Input */}
        {variant !== 'system' && (
          <div className="mb-4">
            <StakeControl value={stake}  />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="w-[38px] h-[38px] bg-base-640 rounded-lg flex items-center justify-center">
            <img src="/icons/trash.svg" alt="trash" className="w-5 h-5" />
          </button>
          <button
            className="flex-1 h-[38px] bg-button-gradient btn-textColor rounded-lg text-sm font-medium transition-opacity hover:opacity-90 flex items-center justify-center"
            onClick={onPlaceBet}
          >
            Place bet
          </button>
        </div>




      </div>
      
    </>
  );
};

export default BetslipControls;


