interface BonusMessageProps {
  number: number;
  progress: number;
  bonusPercentage?: number;
  betcount?: number;


}

const BonusMessage = ({ number, progress, bonusPercentage,betcount }: BonusMessageProps) => {
  return (
    <div className="bg-base-725 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs body-txtColor-1 font-normal flex-1 mr-2">
          { progress < 100 ? `Add ${number} more selection to receive a bonus of ${bonusPercentage}%` : `You have reached the maximum bonus of ${bonusPercentage}%`}
        </span>
        <div className="w-5 h-5 bg-base-700 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-accent-4 text-xs font-bold">{betcount}</span>
        </div>
      </div>
      <div className="w-full bg-base-600 rounded-full h-1.5">
        <div 
          className="bg-special-2 h-1.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BonusMessage;
