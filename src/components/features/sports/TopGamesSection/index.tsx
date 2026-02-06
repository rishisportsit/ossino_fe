import FeaturedGamesBlock from 'components/shared/FeaturedGamesBlock';
import { mocked } from 'components/shared/FeaturedGamesBlock/mocked';

const TopGamesSection = () => {
  return <FeaturedGamesBlock games={mocked} label="Top Games" withShadow sportShadow />;
};

export default TopGamesSection;


