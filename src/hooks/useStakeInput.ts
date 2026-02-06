import { useState, useCallback } from 'react';

export interface UseStakeInputOptions {
  shouldShowCurrencySymbol?: boolean;
  maxDecimalPlaces?: number;
  onStakeChange?: (stake: number) => void;
  onErrorsClear?: () => void;
}

export const useStakeInput = (options: UseStakeInputOptions = {}) => {
  const { 
    shouldShowCurrencySymbol = true, 
    maxDecimalPlaces = 10, 
    onStakeChange,
    onErrorsClear 
  } = options;
  
  const [stake, setStakeState] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [isUserTyping, setIsUserTyping] = useState(false);

  const updateStake = useCallback((newStake: number) => {
    setStakeState(newStake);
    setInputValue(newStake.toString());
    onStakeChange?.(newStake);
    onErrorsClear?.();
  }, [onStakeChange, onErrorsClear]);

  const handleIncrement = useCallback((incrementValue?: number) => {
    const increment = incrementValue || (shouldShowCurrencySymbol ? 1 : 0.01);
    const newStake = Math.max(0, stake + increment);
    updateStake(newStake);
    setIsUserTyping(false);
  }, [stake, shouldShowCurrencySymbol, updateStake]);

  const handleDecrement = useCallback((decrementValue?: number) => {
    const decrement = decrementValue || (shouldShowCurrencySymbol ? 1 : 0.01);
    const newStake = Math.max(0, stake - decrement);
    updateStake(newStake);
    setIsUserTyping(false);
  }, [stake, shouldShowCurrencySymbol, updateStake]);

  const handleInputChange = useCallback((value: string) => {
    setIsUserTyping(true);
    let val = value;
    
    if (shouldShowCurrencySymbol) {
      val = val.replace(/[^0-9]/g, '');
      setInputValue(val);
      const next = Number(val) || 0;
      setStakeState(next);
      onStakeChange?.(next);
    } else {
      if (/^[0-9]*\.?[0-9]*$/.test(val)) {
        const parts = val.split('.');
        if (parts[1] && parts[1].length > maxDecimalPlaces) {
          val = parts[0] + '.' + parts[1].substring(0, maxDecimalPlaces);
        }
        setInputValue(val);
        
        let numValue: number;
        if (val.endsWith('.') && !val.includes('.', val.indexOf('.') + 1)) {
          numValue = parseFloat(val.slice(0, -1)) || 0;
        } else {
          numValue = parseFloat(val) || 0;
        }
        setStakeState(numValue);
        onStakeChange?.(numValue);
      } else {
        return;
      }
    }
    onErrorsClear?.();
  }, [shouldShowCurrencySymbol, maxDecimalPlaces, onStakeChange, onErrorsClear]);

  const handleInputBlur = useCallback(() => {
    setIsUserTyping(false);
  }, []);

  const handleQuickStake = useCallback((amount: number) => {
    const newStake = stake + amount;
    updateStake(newStake);
    setIsUserTyping(false);
  }, [stake, updateStake]);

  const resetStake = useCallback(() => {
    setStakeState(0);
    setInputValue('');
    setIsUserTyping(false);
  }, []);

  return {
    stake,
    inputValue,
    isUserTyping,
    handleIncrement,
    handleDecrement,
    handleInputChange,
    handleInputBlur,
    handleQuickStake,
    resetStake,
    updateStake
  };
};