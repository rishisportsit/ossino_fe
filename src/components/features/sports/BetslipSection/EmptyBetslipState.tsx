import Icon from 'components/shared/Icon';
import receiptIcon from '/icons/receipt-item.svg?url';

interface EmptyBetslipStateProps {
  text: string | null;
}

const EmptyBetslipState = ({ text }: EmptyBetslipStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4">
        <Icon
            id="betslip-placeholder"
            href={receiptIcon}
            className="w-16 h-16 icon-placeholder"
          />

      </div>
      <p className="text-base-400 text-center text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default EmptyBetslipState;
