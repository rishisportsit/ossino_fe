import GameCard from 'components/shared/GameCard';
import Slider from 'components/shared/Slider';
import { SwiperSlide } from 'swiper/react';
import { type Game } from 'api/content/content.types';
import NoGamesMessage from '../NoGamesMessage';

type GamesSliderProps = {
  games: Game[] | null;
  label: string;
  href: string;
};

const GamesSlider = ({ games, label, href }: GamesSliderProps) => {
  if (!games || games.length === 0) {
    return <NoGamesMessage message="No games found" label={label} />;
  }

  return (
    <Slider
      label={label}
      count={games.length}
      showMore
      withShadow
      navigation
      to={href}
    >
      {games.map((game, index) => (
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

export default GamesSlider;
