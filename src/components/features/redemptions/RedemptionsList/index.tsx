import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import RedemptionCard from 'components/shared/RedemptionCard';
import RedemptionCardSkeleton from 'components/shared/RedemptionCardSkeleton';
import { useDialog } from 'helpers/hooks';
import { useEffect } from 'react';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  selectRedemptions,
  selectRedemptionsError,
  selectRedemptionsLoading,
} from 'store/redemptions/selectors';
import { getRedemptions, type Redemption } from 'store/redemptions/slice';

const RedemptionList = () => {
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();

  const redemptions = useAppSelector(selectRedemptions);
  const redemptionsError = useAppSelector(selectRedemptionsError);
  const redemptionsLoading = useAppSelector(selectRedemptionsLoading);

  const handleRedemptionClick = (redemption: Redemption) => {
    openDialog(DIALOG_TYPE.redemption, { data: redemption });
  };

  useEffect(() => {
    dispatch(getRedemptions());
  }, [dispatch]);

  if (redemptionsError) {
    const { message } = redemptionsError;

    return (
      <div className="flex h-[300px] flex-col justify-center xl:px-5 xl:py-[22.5px] xl:bg-base-800 xl:rounded-xl">
        <ErrorMessage message={message} />
      </div>
    );
  }

  if (redemptionsLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3 xl:p-5 xl:bg-base-800 xl:rounded-xl">
        {Array.from({ length: 7 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <RedemptionCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!redemptions || redemptions.length === 0) {
    return (
      <div className="flex h-[300px] flex-col justify-center xl:px-5 xl:py-[22.5px] xl:bg-base-800 xl:rounded-xl">
        <NoItemsMessage message="No redemptions found" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3 xl:p-5 xl:bg-base-800 xl:rounded-xl">
      {redemptions.map((redemption) => (
        <RedemptionCard
          key={redemption.id}
          onClick={() => handleRedemptionClick(redemption)}
          data={redemption}
          imgClassName="md:aspect-[1/0.8] xl:aspect-square"
        />
      ))}
    </div>
  );
};

export default RedemptionList;
