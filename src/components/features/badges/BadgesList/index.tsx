import BadgeCard from 'components/shared/BadgeCard';
import BadgeCardSkeleton from 'components/shared/BadgeCardSkeleton';
import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { useEffect } from 'react';
import {
  selectBadges,
  selectBadgesError,
  selectBadgesLoading,
} from 'store/badges/selectors';
import { type Badge, getBadges } from 'store/badges/slice';
import { useAppDispatch, useAppSelector } from 'store/index';

type BadgesListProps = {
  setSelectedBadge: (badge: Badge) => void;
};

const BadgesList = ({ setSelectedBadge }: BadgesListProps) => {
  const dispatch = useAppDispatch();

  const badges = useAppSelector(selectBadges);
  const badgesError = useAppSelector(selectBadgesError);
  const badgesLoading = useAppSelector(selectBadgesLoading);

  useEffect(() => {
    dispatch(getBadges());
  }, [dispatch]);

  if (badgesError) {
    const { message } = badgesError;

    return (
      <div className="flex h-[201px] flex-col justify-center xl:px-5 xl:py-[22.5px] xl:bg-base-800 xl:rounded-xl">
        <ErrorMessage message={message} />
      </div>
    );
  }

  if (badgesLoading) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-9 gap-3 md:gap-4 xl:px-5 xl:py-[22.5px] xl:bg-base-800 xl:rounded-xl">
        {Array.from({ length: 7 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <BadgeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!badges || badges.length === 0) {
    return (
      <div className="flex h-[201px] flex-col justify-center xl:px-5 xl:py-[22.5px] xl:bg-base-800 xl:rounded-xl">
        <NoItemsMessage message="No badges found" />
      </div>
    );
  }

  const sortedBadges = [...badges].sort((a, b) => {
    if (typeof b.completed === 'number' && typeof a.completed === 'number') {
      return b.completed - a.completed;
    }
    return 0;
  });

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-9 gap-3 md:gap-4 xl:p-5 xl:bg-base-800 xl:rounded-xl">
      {sortedBadges.map((badge) => (
        <BadgeCard
          key={badge.id}
          data={badge}
          onClick={() => setSelectedBadge(badge)}
        />
      ))}
    </div>
  );
};

export default BadgesList;
