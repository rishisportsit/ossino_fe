import { Progress } from 'components/shared/ui/Progress';
import type { BenefitProgress as TBenefitProgress } from 'store/benefits/slice';
import { cn } from 'helpers/ui';

const BenefitProgress = ({
  currentPoints,
  percentage,
  title,
  totalPoints,
}: TBenefitProgress) => {
  const isHighProgress = percentage >= 80;
  const isMediumProgress = percentage >= 50 && percentage < 80;

  const remainingPoints = totalPoints - currentPoints;

  return (
    <div className="space-y-2">
      {/* Title and Remaining Points */}
      <div className="flex justify-between text-xs text-base-200 font-medium">
        <p>{title}</p>
        {remainingPoints > 0 && (
          <p className="text-base-400">
            Earn{' '}
            <span className="font-semibold body-txtColor-1">{remainingPoints}</span>{' '}
            More Point
            {remainingPoints > 1 ? 's' : ''} To Reach Next Level
          </p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <Progress
          value={percentage}
          className={cn(
            'h-3 bg-base-600 transition-all duration-300 shadow-inner rounded-full overflow-hidden',
            {
              'shadow-emerald-500/20': isHighProgress,
              'shadow-amber-500/20': isMediumProgress,
            },
          )}
          style={
            {
              '--progress-background': isHighProgress
                ? 'linear-gradient(90deg, #10b981, #059669)'
                : isMediumProgress
                  ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                  : 'linear-gradient(90deg, #6366f1, #4f46e5)',
            } as React.CSSProperties
          }
        />
        {isHighProgress && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-full" />
        )}
      </div>

      {/* Percentage and Current/Total Points */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-semibold body-txtColor-1 transition-colors duration-200">
          {percentage}%
        </span>

        <div className="flex items-center gap-1">
          <span className="body-txtColor-1 font-medium">{currentPoints}</span>
          <span className="text-base-400">/</span>
          <span className="text-base-300">{totalPoints}</span>
        </div>
      </div>
    </div>
  );
};

export default BenefitProgress;
