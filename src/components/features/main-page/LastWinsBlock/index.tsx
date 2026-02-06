import Slider from 'components/shared/Slider';
import { SwiperSlide } from 'swiper/react';
import LastWinsCard from 'components/shared/LastWinsCard';
import { useAppDispatch, useAppSelector } from 'store/index';
import {
  lastWinsSelector,
  selectLastWinsError,
  selectLastWinsLoading,
} from 'store/lastWins/selectors';
import { Skeleton } from 'components/shared/ui/Skeleton';
import ErrorMessage from 'components/shared/ErrorMessage';
import NoItemsMessage from 'components/shared/NoItemsMessage';
import { useEffect, useMemo } from 'react';
import { fetchLastWins } from 'store/lastWins/slice';
import { mapApiLastWinsToLastWins } from 'store/lastWins/helpers';

const LastWinsBlock = () => {
  const dispatch = useAppDispatch();
  const lastWinsApiData = useAppSelector(lastWinsSelector);
  const lastWinsError = useAppSelector(selectLastWinsError);
  const lastWinsLoading = useAppSelector(selectLastWinsLoading);
  const allGames = useAppSelector((state) => state.games.data);

  const lastWins = useMemo(() => {
    if (!lastWinsApiData || !allGames) return [];
    return mapApiLastWinsToLastWins(lastWinsApiData, allGames);
  }, [lastWinsApiData, allGames]);

  useEffect(() => {
    if (!lastWinsApiData && !lastWinsLoading) {
      dispatch(fetchLastWins());
    }
  }, [dispatch, lastWinsApiData, lastWinsLoading]);

  if (lastWinsError) {
    return (
      <div>
        <span className="text-base">Last Wins</span>
        <div className="py-[13px]">
          <ErrorMessage message={lastWinsError.message} />
        </div>
      </div>
    );
  }

  if (lastWinsLoading) {
    return (
      <Slider label="Last Wins" withShadow navigation>
        {Array.from({ length: 8 }).map((_, index) => (
          <SwiperSlide key={index} style={{ width: 'auto' }}>
            <Skeleton className="bg-base-600 rounded-[12px] w-[280px] h-16" />
          </SwiperSlide>
        ))}
      </Slider>
    );
  }

  if (!lastWins || lastWins.length === 0) {
    return (
      <div>
        <span className="text-base">Last Wins</span>
        <NoItemsMessage message="No last wins found" />
      </div>
    );
  }

  return (
    <Slider label="Last Wins" withShadow navigation>
      {lastWins.map((item) => (
        <SwiperSlide key={item.id} style={{ width: 'auto' }}>
          <LastWinsCard
            winnerName={item.winnerName}
            win={item.win}
            winTime={item.winTime}
            game={item.game}
            currency={item.currency}
          />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default LastWinsBlock;
