import Slider from 'components/shared/Slider';
import { cn } from 'helpers/ui';
import 'swiper/css';
import { SwiperSlide } from 'swiper/react';
import GameRoundedIcon, {
  type RoundedGameIconProps,
} from '../../features/main-page/GameIcon/GameRoundedCard';

interface IRecentlyPlayedBlockProps {
  games: RoundedGameIconProps[];
  label: string;
  className?: string;
  headerClassName?: string;
  withShadow?: boolean;
  sportShadow?: boolean;
}

const FeaturedGamesBlock = ({
  games,
  label,
  headerClassName,
  className,
  withShadow,
  sportShadow,
}: IRecentlyPlayedBlockProps) => {
  return (
    <Slider 
      label={label} 
      navigation 
      headerClassName={headerClassName} 
      withShadow={withShadow} 
      sportShadow={sportShadow}
      loop={games.length > 1}
    >
      {games.map((game) => (
        <SwiperSlide
          key={game.id}
          className={cn('!w-auto', className)}
        >
          <GameRoundedIcon 
            title={game.title} 
            image={game.image} 
            id={game.id}
            name={game.name}
            game={game.game}
          />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default FeaturedGamesBlock;