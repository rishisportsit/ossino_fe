import { cn } from 'helpers/ui';
import { Button } from '../Button';
import { useState, useEffect } from 'react';


type NumberFieldProps = {
  value: number;
  onChange?: (next: number) => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  containerClassName?: string;
  inputClassName?: string;
  showButtons?: boolean;
  maxDecimalPlaces?: number;
};


const NumberField = ({
  value,
  onChange,
  onIncrease,
  onDecrease,
  containerClassName,
  inputClassName,
  maxDecimalPlaces,
  showButtons = true,
}: NumberFieldProps) => {
  const [inputValue, setInputValue] = useState(value.toString());
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [lastExternalValue, setLastExternalValue] = useState(value);

  useEffect(() => {

    if (!isUserTyping) {
      const currentNum = parseFloat(inputValue) || 0;
      const newNum = value;
      const threshold = 0.0001; // Small threshold for floating point comparison
      if (Math.abs(currentNum - newNum) > threshold || inputValue === '' || value !== lastExternalValue) {
        const newInputValue = value.toString();

        setInputValue(newInputValue);
        setLastExternalValue(value);
      } 
    }
  }, [value, isUserTyping, inputValue, lastExternalValue]);

  useEffect(() => {
    const handleCurrencyChange = (event: CustomEvent) => {
      if (event.detail?.shouldResetStake) {

        setIsUserTyping(false);
        setInputValue('0');
        setLastExternalValue(0);
      } else {
        setIsUserTyping(false);
        setTimeout(() => {
          setInputValue(value.toString());
          setLastExternalValue(value);
        }, 100);
      }
    };

    window.addEventListener('currencyToggleChanged', handleCurrencyChange as EventListener);
    return () => window.removeEventListener('currencyToggleChanged', handleCurrencyChange as EventListener);
  }, [value]);
  return (
    <div
      className={cn(
        'flex items-center gap-2 h-10 rounded-lg p-0.5 bg-base-700 w-full',
        containerClassName,
      )}
    >
      {showButtons && (
        <Button
          type="button"
          variant="filledWhite"
          className="h-full w-auto aspect-square p-0 text-xl"
          onClick={onDecrease}
        >
          -
        </Button>
      )}
      
      <input
        type="text"
        inputMode={showButtons ? "numeric" : "decimal"}
        value={inputValue}
        onChange={onChange ? (e) => {
          setIsUserTyping(true);
          let val = e.target.value;
          if (showButtons) {
            val = val.replace(/[^0-9]/g, '');
            setInputValue(val);
            const next = Number(val) || 0;
            onChange(next);
          } else {
            if (/^[0-9]*\.?[0-9]*$/.test(val)) {
              const parts = val.split('.');
              if (parts[1] && maxDecimalPlaces !== undefined && parts[1].length > maxDecimalPlaces) {
                val = parts[0] + '.' + parts[1].substring(0, maxDecimalPlaces);
              }
              setInputValue(val);
              let numValue: number;
              if (val.endsWith('.') && !val.includes('.', val.indexOf('.') + 1)) {
                numValue = parseFloat(val.slice(0, -1)) || 0;
              } else {
                numValue = parseFloat(val) || 0;
              }
              onChange(numValue);
            } else {
              return;
            }
          }
          
        } : undefined}
        className={cn(
          'h-full bg-transparent body-txtColor-1 text-center outline-none border-0 flex-1 text-xs font-medium',
          inputClassName,
        )}
      />
      
      {showButtons && (
        <Button
          type="button"
          variant="filledWhite"
          className="h-full w-auto aspect-square p-0 text-xl"
          onClick={onIncrease}
        >
          +
        </Button>
      )}
    </div>
  );
};

export default NumberField;
