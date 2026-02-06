import { SwiperSlide } from 'swiper/react';
import GameCard from 'components/shared/GameCard';
import Slider from 'components/shared/Slider';
import { useAppSelector } from 'store/index';
import { selectGames } from 'store/games/selectors';

const RecommendedGames = () => {
  const games = useAppSelector(selectGames);
  return (
    <Slider
      label="Recommended Games"
      count={games?.length}
      withShadow
      navigation
    >
      {games?.map((game, index) => (
        <SwiperSlide key={game.id} style={{ width: 'auto' }}>
          <GameCard
            game={game}
            index={index}
            cardClassName="w-[140px]"
            titleClassName="text-nowrap truncate"
          />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default RecommendedGames;
