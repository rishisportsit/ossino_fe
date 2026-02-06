import { ValidationErrorData } from 'hooks/useValidation';

interface BetErrorDisplayProps {
  apiError?: string | null;
  validationError?: ValidationErrorData | string | null;
  className?: string;
  variant?: 'success' | 'error';
  defaultMargin?: string;
}

export const BetErrorDisplay = ({ apiError, validationError, className = '', variant = 'error', defaultMargin = "mb-4" }: BetErrorDisplayProps) => {

  if (apiError) {
    const isSuccess = variant === 'success';
    const textColor = isSuccess ? 'text-green-300' : 'text-red-400';
    const bgColor = isSuccess ? 'bg-green-900/20' : 'bg-red-900/20';
    const borderColor = isSuccess ? 'border-green-900/30' : 'border-red-900/30';

    return (
      <div className={` ${defaultMargin} ${className}`}>
        <div className={`mt-2 text-xs text-center ${textColor} px-2 ${bgColor} rounded border ${borderColor} py-2`}>
          {apiError}
        </div>
      </div>
    );
  }

  if (!validationError) return null;

  if (typeof validationError === 'string') {
    return (
      <div className={`mb-4 ${className}`}>
        <div className="mt-2 text-xs text-center text-red-400 px-2 bg-red-900/20 rounded border border-red-900/30 py-2">
          {validationError}
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-4 ${className}`}>
      <div className="mt-2 text-xs text-center text-red-400 px-2 bg-red-900/20 rounded border border-red-900/30 py-2">
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          <span>{validationError.message}</span>
          <img
            src={validationError.currencyIcon}
            alt={validationError.currencyCode}
            className={validationError.isUSD ? "h-3 w-3" : "h-4 w-4"}
          />
          <span className={validationError.message.includes('payout') ? "text-green-400 font-semibold" : ""}>
            {validationError.message.includes('payout') ? `(${validationError.value})` : validationError.value}
          </span>
        </div>
      </div>
    </div>
  );
};