import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectRegisterBonusesData,
  selectRegisterBonusesError,
  selectRegisterBonusesLoading,
} from 'store/registerBonuses/selectors';
import {
  selectBonusOptions,
  selectRegistrationBonusesLoading,
  selectRegistrationBonusesError,
} from 'store/bonuses/selectors';
import { getRegisterBonuses } from 'store/registerBonuses/slice';
import { getRegistrationBonuses } from 'store/bonuses/slice';
import BonusItem from '../BonusItem';
import BonusOptionItem from '../BonusOptionItem';
import BonusSkeleton from '../BonusItemSkeleton';

const getImageForBonus = (bonusCode: string) => {
  if (bonusCode === 'Sports') {
    return '/images/sport-bonus.png';
  }

  if (bonusCode === 'Casino') {
    return '/images/slot-bonus.png';
  }

  return '';
};

type BonusesListProps = {
  selectedBonusId: string;
  setSelectedBonusId: Dispatch<SetStateAction<string>>;
  useNewBonuses?: boolean;
};

const BonusesList = ({
  selectedBonusId,
  setSelectedBonusId,
  useNewBonuses = false,
}: BonusesListProps) => {
  const dispatch = useAppDispatch();

  const registerBonuses = useAppSelector(selectRegisterBonusesData);
  const registerBonusesLoading = useAppSelector(selectRegisterBonusesLoading);
  const registerBonusesError = useAppSelector(selectRegisterBonusesError);

  const bonusOptions = useAppSelector(selectBonusOptions);
  const registrationBonusesLoading = useAppSelector(selectRegistrationBonusesLoading);
  const registrationBonusesError = useAppSelector(selectRegistrationBonusesError);

  const handleBonusClick = (bonusId: string) => {
    setSelectedBonusId(bonusId);
  };

  useEffect(() => {
    if (useNewBonuses) {
      dispatch(getRegistrationBonuses({}));
    } else {
      dispatch(getRegisterBonuses());
    }
  }, [dispatch, useNewBonuses]);

  const isLoading = useNewBonuses ? registrationBonusesLoading : registerBonusesLoading;
  const error = useNewBonuses ? registrationBonusesError : registerBonusesError;
  const hasData = useNewBonuses ? 
    (bonusOptions && bonusOptions.length > 0) : 
    (registerBonuses && registerBonuses.length > 0);

  if (error) {
    const message = useNewBonuses ? 
      (error.message || 'Failed to load bonuses') : 
      (registerBonusesError?.message || 'Failed to load bonuses');

    return (
      <div className="flex flex-col h-[214px] justify-center">
        <ErrorMessage message={message} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: useNewBonuses ? 3 : 2 }).map((_, index) => (
          <BonusSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="flex flex-col justify-center h-[214px]">
        <NoItemsMessage message="No bonuses available" />
      </div>
    );
  }

  if (useNewBonuses && bonusOptions) {
    return (
      <div className="flex flex-col gap-3">
        {bonusOptions.map((option) => (
          <BonusOptionItem
            key={option.id}
            {...option}
            isSelected={String(option.id) === selectedBonusId}
            onClick={() => handleBonusClick(String(option.id))}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {registerBonuses!.map((bonus) => (
        <BonusItem
          key={bonus.id}
          {...bonus}
          image={getImageForBonus(bonus.bonusCode)}
          isSelected={String(bonus.id) === selectedBonusId}
          onClick={() => handleBonusClick(String(bonus.id))}
        />
      ))}
    </div>
  );
};

export default BonusesList;
