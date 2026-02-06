import { Button } from 'components/shared/ui/Button';
import { useFormContext } from 'react-hook-form';
import { useAppSelector } from 'store/index';
import { selectBonusOptions } from 'store/bonuses/selectors';
import { storeSelectedBonus, setPendingBonusRedirect } from 'helpers/bonusHelpers';

type SelectBonusButtonProps = {
  selectedBonusId: string;
  onDialogClose: () => void;
};

const SelectBonusButton = ({
  onDialogClose,
  selectedBonusId,
}: SelectBonusButtonProps) => {
  const { setValue } = useFormContext();
  const bonusOptions = useAppSelector(selectBonusOptions);

  const handleButtonClick = () => {
    setValue('promocode', selectedBonusId);
    
    if (bonusOptions && selectedBonusId) {
      const selectedBonus = bonusOptions.find(option => 
        String(option.id) === selectedBonusId
      );
      
      if (selectedBonus) {
        storeSelectedBonus(selectedBonus);
        
        if (selectedBonus.type !== 'NONE') {
          setPendingBonusRedirect();
        }
      }
    }
    
    onDialogClose();
  };

  return (
    <Button
      size="lg"
      onClick={handleButtonClick}
      disabled={!selectedBonusId}
      className="w-full btn-textColor"
    >
      Select Bonus
    </Button>
  );
};

export default SelectBonusButton;
