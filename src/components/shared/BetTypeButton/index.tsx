interface BetTypeButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const BetTypeButton = ({ label, isSelected, onClick }: BetTypeButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-colors ${
        isSelected
          ? 'bg-special-2 body-txtColor-2'
          : 'bg-transparent text-base-200 hover:body-txtColor-1'
      }`}
    >
      {label}
    </button>
  );
};

export default BetTypeButton;
