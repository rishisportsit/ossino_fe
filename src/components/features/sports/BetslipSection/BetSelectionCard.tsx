import { BetPart } from "api/SportsHomePage/sportsHomePage.types";
import { formatPlacedDateTime } from "helpers/common";


interface BetSelectionCardProps {
  selection: BetPart;
}

const BetSelectionCard = ({ selection }: BetSelectionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-secondary-light-2';
      case 'won':
      case 'cashedout':
        return 'text-secondary-light-2';
      case 'lost':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      case "open":
        return "text-secondary-light-2";
      default:
        return 'text-base-400';
    }
  };

  const { date: placedDate, time: placedTime } = formatPlacedDateTime(selection?.competitionStartDate || '');

  return (
    <div className="bg-transparent border border-third rounded-lg p-3">
      <div className="flex items-center justify-between mb-2 gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="body-txtColor-1 text-xs font-medium">
            {selection?.marketName}
          </span>
          <div className="w-px h-3 bg-base-600"></div>
          <span className={`text-[10px] font-medium ${getStatusColor(selection?.outcomeResult?.toLowerCase() || '')}`}>
            {selection?.outcomeResult}
          </span>
        </div>
        <span className="text-base-300 text-xs font-medium text-right">
          {placedDate}, {placedTime}
        </span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="body-txtColor-1 text-xs font-medium">{selection?.competitionName}</span>
        <span className="text-secondary-light-1 text-xs font-medium">{selection?.odds}</span>
      </div>
      <div className="flex items-center justify-between gap-1.5">
        <span className="body-txtColor-1 text-xs font-medium">Winner</span>
        <span className="text-secondary-light-1 text-xs font-medium text-right">{selection?.outcomeName}, {selection?.country}</span>
      </div>
    </div>
  );
};

export default BetSelectionCard;
